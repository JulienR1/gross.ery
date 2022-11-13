import rimraf from "rimraf";
import inquirer from "inquirer";
import fsExtra from "fs-extra";
import { config } from "dotenv";
import { executeCommand, executeManyCommands } from "./terminal.mjs";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

config();

const buildDirPath = join(process.cwd(), "build");
const rootPath = join(process.cwd(), "..", "..");
const sharedDirPath = join(rootPath, "shared");
const serverDirPath = join(rootPath, "cloud-service");

const sharedDistPath = join(sharedDirPath, "dist");
const sharedBuildPath = join(buildDirPath, "shared");
const sharedBuildDistPath = join(sharedBuildPath, "dist");
const sharedPackageJson = join(sharedDirPath, "package.json");
const sharedBuildPackageJson = join(sharedBuildPath, "package.json");

const serverDistPath = join(serverDirPath, "dist");
const serverBuildPath = join(buildDirPath, "dist");

const packageJsonPath = join(serverDirPath, "package.json");
const buildPackageJsonPath = join(buildDirPath, "package.json");

const originalPackageLockPath = join(serverDirPath, "package-lock.json");
const buildPackageLockPath = join(buildDirPath, "package-lock.json");

const main = async () => {
  await updateVersion();
  await backupDatabase();

  await buildSharedModule();
  await buildServer();
  await generateBuildDir();
  await updatePackageLock();

  await setupGit();
  await pushToRemote();
};

const backupDatabase = async () => {
  const { shouldBackupDatabase } = await inquirer.prompt({
    name: "shouldBackupDatabase",
    type: "confirm",
    message: "Backup database locally?",
    default: true,
  });

  if (shouldBackupDatabase) {
    const nowStr = new Date().getTime().toString();
    const backupPath = join("backups", nowStr);

    await executeCommand({
      title: "Creating database backup",
      command: `mongodump --uri="${process.env.DB_URI}" --out="${backupPath}"`,
      showLogs: true,
    });
  }
};

const updateVersion = async () => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  const versionIsValid = (versionInput) => {
    const isNewerVersion =
      versionInput.localeCompare(packageJson.version, undefined, {
        numeric: true,
        sensitivity: "base",
      }) >= 0;
    const isValidFormat = /(\d)+\.(\d)+\.(\d)+/g.test(versionInput);

    return isNewerVersion && isValidFormat;
  };

  const { newVersion } = await inquirer.prompt({
    message: "Enter server version.",
    name: "newVersion",
    type: "input",
    default: packageJson.version,
    validate: versionIsValid,
  });

  const updatedPackageJson = { ...packageJson, version: newVersion };
  writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson));
};

const buildSharedModule = async () => {
  await executeCommand({
    title: "Building shared module",
    command: "npm run build",
    dir: sharedDirPath,
  });
};

const buildServer = async () => {
  await executeCommand({
    title: "Building server",
    command: "npm run build",
    dir: serverDirPath,
  });
};

const generateBuildDir = () => {
  const copyDirSettings = { overwrite: true, recursive: true };

  fsExtra.copySync(sharedDistPath, sharedBuildDistPath, copyDirSettings);
  fsExtra.copySync(sharedPackageJson, sharedBuildPackageJson);
  fsExtra.copySync(serverDistPath, serverBuildPath, copyDirSettings);
  fsExtra.copySync(originalPackageLockPath, buildPackageLockPath);

  const deployPackageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  delete deployPackageJson.devDependencies;
  delete deployPackageJson.jest;
  deployPackageJson.scripts = {
    start: deployPackageJson.scripts.start,
  };
  deployPackageJson.dependencies.shared = "file:shared";

  writeFileSync(
    buildPackageJsonPath,
    JSON.stringify(deployPackageJson),
    "utf8"
  );
};

const updatePackageLock = async () => {
  await executeManyCommands({
    title: "Updating package-lock",
    commands: ["npm i", "rimraf node_modules"],
    chainCommands: true,
    dir: buildDirPath,
  });
};

const setupGit = async () => {
  await executeManyCommands({
    title: "Initializing git",
    commands: ["git init", "git add .", 'git commit -m "Automatic release"'],
    chainCommands: true,
    dir: buildDirPath,
  });
};

const pushToRemote = async () => {
  await executeManyCommands({
    title: "Pushing to release branch",
    commands: [
      `git remote add origin ${process.env.RELEASE_GIT_URL}`,
      "git push -u origin master:releases --force",
    ],
    showLogs: true,
    chainCommands: true,
    dir: buildDirPath,
  });
};

rimraf.sync(buildDirPath);
try {
  await main();
} catch (err) {
  console.log("Process failed.");
  console.log(err);
} finally {
  rimraf.sync(buildDirPath);
}

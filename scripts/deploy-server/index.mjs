import rimraf from "rimraf";
import inquirer from "inquirer";
import fsExtra from "fs-extra";
import { config } from "dotenv";
import { executeCommand, executeManyCommands } from "./terminal.mjs";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

config();

const main = async () => {
  const serverPackageJson = join(
    process.cwd(),
    "..",
    "..",
    "cloud-service",
    "package.json"
  );
  const packageJson = JSON.parse(readFileSync(serverPackageJson, "utf8"));
  const { newVersion } = await inquirer.prompt({
    message: `Enter server version.`,
    name: "newVersion",
    type: "input",
    default: packageJson.version,
    validate: (input) =>
      input.localeCompare(packageJson.version, undefined, {
        numeric: true,
        sensitivity: "base",
      }) >= 0,
  });

  const updatedPackageJson = { ...packageJson, version: newVersion };
  writeFileSync(serverPackageJson, JSON.stringify(updatedPackageJson));

  // TODO
  const { shouldBackupDatabase } = await inquirer.prompt({
    name: "shouldBackupDatabase",
    type: "confirm",
    message: "Backup database locally?",
    default: true,
  });

  await executeCommand({
    title: "Building shared module",
    command: "npm run build",
    dir: join(process.cwd(), "..", "..", "shared"),
  });

  await executeCommand({
    title: "Building server",
    command: "npm run build",
    dir: join(process.cwd(), "..", "..", "cloud-service"),
  });

  const sharedDistFolder = join(process.cwd(), "..", "..", "shared", "dist");
  const targetSharedDistFolder = join(process.cwd(), "build", "shared");

  const serverFolder = join(process.cwd(), "..", "..", "cloud-service");
  const targetServerFolder = join(process.cwd(), "build");
  const serverDistFolder = join(serverFolder, "dist");
  const targetServerDistFolder = join(targetServerFolder, "dist");

  fsExtra.copySync(sharedDistFolder, targetSharedDistFolder, {
    overwrite: true,
    recursive: true,
  });
  fsExtra.copySync(serverDistFolder, targetServerDistFolder, {
    overwrite: true,
    recursive: true,
  });
  fsExtra.copySync(
    join(serverFolder, "package-lock.json"),
    join(serverDistFolder, "package-lock.json")
  );

  const deployPackageJson = { ...packageJson };
  delete deployPackageJson.devDependencies;
  delete deployPackageJson.jest;
  deployPackageJson.scripts = {
    start: deployPackageJson.scripts.start,
  };
  deployPackageJson.dependencies.shared = "file:shared";
  writeFileSync(
    join(targetServerFolder, "package.json"),
    JSON.stringify(deployPackageJson),
    "utf-8"
  );

  await executeManyCommands({
    title: "Updating package-lock",
    commands: ["npm i", "rimraf node_modules"],
    dir: join(process.cwd(), "build"),
    chainCommands: true,
  });

  await executeManyCommands({
    title: "Initializing git",
    commands: ["git init", "git add .", 'git commit -m "Automatic release"'],
    dir: join(process.cwd(), "build"),
    chainCommands: true,
  });

  await executeCommand({
    title: "Pushing to heroku",
    command: `git push ${process.env.HEROKU_URL} --force`,
    dir: join(process.cwd(), "build"),
    showLogs: true,
  });
};

const buildDirPath = join(process.cwd(), "build");
rimraf.sync(buildDirPath);

try {
  await main();
} catch (err) {
  console.log("Process failed.");
  console.log(err);
} finally {
  rimraf.sync(buildDirPath);
}

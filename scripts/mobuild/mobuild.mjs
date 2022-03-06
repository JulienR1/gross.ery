import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

import { getReadline } from "./readline.mjs";
import { SubprocessManager } from "./subprocessManager.mjs";
import { getUtils } from "./utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mobileAppDir = path.join(__dirname, "../../mobileApp");
const androidDir = path.join(mobileAppDir, "android");
const gradleDir = path.join(androidDir, "app");
const buildDir = path.join(gradleDir, "build", "outputs");

const gradleFilePath = path.join(gradleDir, "build.gradle");
const gradleBackupFilePath = path.join(gradleDir, "build.backup.gradle");

const withReadline = async (rl) => {
	let gradleFile = fs.readFileSync(gradleFilePath, "utf8");

	const { setGradlePassword, getBuildType, incrementVersionCode, updateVersionName, getBuildCommandArgs } =
		getUtils(rl);

	try {
		console.log("MobileApp building tool..");
		const buildType = await getBuildType();
		if (buildType === "bundle") {
			gradleFile = incrementVersionCode(gradleFile);
		}
		gradleFile = await updateVersionName(gradleFile);

		fs.writeFileSync(gradleBackupFilePath, gradleFile);
		gradleFile = await setGradlePassword(gradleFile);
		fs.writeFileSync(gradleFilePath, gradleFile);

		console.log("Starting build..");
		const buildArgs = getBuildCommandArgs(buildType);
		await subprocessManager.createSubprocess("gradlew.bat", buildArgs, androidDir);

		console.log("Opening build directory..");
		exec(`start "" ${buildDir}`);
	} catch {
		console.log("Something went wrong. Could not process.");
	} finally {
		if (fs.existsSync(gradleBackupFilePath)) {
			fs.copyFileSync(gradleBackupFilePath, gradleFilePath);
			fs.rmSync(gradleBackupFilePath);
		}
	}
};

const subprocessManager = new SubprocessManager();
getReadline()(withReadline, subprocessManager.killAll);

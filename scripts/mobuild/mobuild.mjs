import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { Writable } from "stream";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main = async (readline) => {
	console.log("MobileApp building tool..");

	const gradlePassword = await mute(readline, "Enter Gradle password:\n> ");
	console.log("OK.");

	const mobileAppDir = path.join(__dirname, "../../mobileApp");
	const androidDir = path.join(mobileAppDir, "android");
	const gradleDir = path.join(mobileAppDir, "android/app");
	const gradleFilePath = path.join(gradleDir, "build.gradle");
	const gradleBackupFilePath = path.join(gradleDir, "build.backup.gradle");

	let gradleFile = fs.readFileSync(gradleFilePath, "utf8");

	const versionCodeRegex = /^\s*(versionCode \d+)\s*$/gm;
	const versionCode = gradleFile.match(versionCodeRegex)?.[0];
	if (!versionCode) {
		console.log("Invalid build.gradle file, missing versionCode.");
		return;
	}
	const oldVersion = parseInt(versionCode.match(/\d+/)[0]);
	const newVersion = oldVersion + 1;
	const newVersionStr = versionCode.replace(/\d+/, newVersion);
	const gradleFileWithVersion = gradleFile.replace(versionCodeRegex, newVersionStr);

	const versionNameLineRegex = /^\s*(versionName "\d+\.\d+\.\d+")\s*$/gm;
	const versionNameRegex = /\d+\.\d+\.\d+/;
	const versionName = gradleFileWithVersion.match(versionNameLineRegex)?.[0];
	if (!versionName) {
		console.log("Invalid build.gradle file, missing versionName.");
		return;
	}
	const oldVersionName = versionName.match(versionNameRegex)[0];
	console.log(`Current version: ${oldVersionName}`);
	const newVersionName = await new Promise((resolve) =>
		readline.question("Enter new version:\n> ", (answer) => resolve(answer))
	);
	if (!newVersionName.match(versionNameRegex) || oldVersionName.localeCompare(newVersionName) >= 0) {
		console.log(`Invalid version: ${newVersionName}`);
		return;
	}
	const newVersionNameStr = versionName.replace(versionNameRegex, newVersionName);
	const gradleWithBothVersions = gradleFileWithVersion.replace(versionNameLineRegex, newVersionNameStr);

	const modifiedGradleFile = gradleWithBothVersions.replace(/PASSWORD HERE/g, gradlePassword);

	fs.writeFileSync(gradleBackupFilePath, gradleWithBothVersions);
	fs.writeFileSync(gradleFilePath, modifiedGradleFile);

	let commandToExecute = "";
	const bundleOrPackage = await new Promise((resolve) =>
		readline.question("Generate [P]ackage (.apk) or [B]undble (.aab)\n> ", (answer) => resolve(answer))
	);
	switch (bundleOrPackage?.[0].toLowerCase()) {
		case "p":
			commandToExecute = "assembleRelease";
			break;
		case "b":
			commandToExecute = "bundleRelease";
			break;
		default:
			console.log("Invalid entry.");
			return;
	}

	console.log("Starting build..");
	await execute("gradlew.bat", [commandToExecute], androidDir);

	fs.copyFileSync(gradleBackupFilePath, gradleFilePath);
	fs.rmSync(gradleBackupFilePath);
};

const mute = async (rl, question) =>
	new Promise((resolve) => {
		console.log(question);
		rl.output.muted = true;
		rl.question("", (answer) => {
			rl.output.muted = false;
			return resolve(answer);
		});
	});

const execute = (command, args, dir) =>
	new Promise((resolve) => {
		const subprocess = spawn(command, args, { cwd: dir ?? __dirname });
		allSubprocesses.push(subprocess);

		subprocess.stdout.on("data", (data) => console.log(data.toString()));
		subprocess.stderr.on("data", (data) => console.log(data.toString()));
		subprocess.on("close", () => {
			const subprocessIndex = allSubprocesses.findIndex((currentSubprocess) => currentSubprocess === subprocess);
			if (subprocessIndex) {
				allSubprocesses.splice(subprocessIndex);
			}
			resolve();
		});
	});

const mutableOutput = new Writable({
	write: function (chunk, encoding, callback) {
		if (!this.muted) {
			process.stdout.write(chunk, encoding);
		}
		callback();
	},
});

const allSubprocesses = [];
const rl = readline.createInterface({ input: process.stdin, output: mutableOutput, terminal: true });

rl.on("SIGINT", () => {
	allSubprocesses.forEach((subprocess) => {
		console.log("Killing process..");
		subprocess.kill("SIGINT");
	});
	rl.pause();
});

main(rl).then(() => rl.close());

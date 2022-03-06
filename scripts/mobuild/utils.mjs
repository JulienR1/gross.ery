export const getUtils = (rl) => {
	const setGradlePassword = async (gradleFile) => {
		const gradlePassword = await rl.mutedQuestion("Enter Gradle password:\n> ");
		console.log("OK.");
		return gradleFile.replace(/PASSWORD HERE/g, gradlePassword);
	};

	const getBuildType = async () =>
		new Promise((resolve, reject) =>
			rl.question("Generate [P]ackage (.apk) or [B]undle (.aab)\n> ", (answer) => {
				const buildType = answer?.[0].toLowerCase();
				switch (buildType) {
					case "b":
						return resolve("bundle");
					case "p":
						return resolve("package");
					default:
						return reject();
				}
			})
		);

	const getBuildCommandArgs = (buildType) => {
		switch (buildType) {
			case "bundle":
				return ["bundleRelease"];
			case "package":
			default:
				return ["assembleRelease"];
		}
	};

	const incrementVersionCode = (gradleFile) => {
		const versionCodeRegex = /^\s*(versionCode \d+)\s*$/gm;
		const versionCode = gradleFile.match(versionCodeRegex)?.[0];
		if (!versionCode) {
			console.log("Invalid build.gradle file, missing versionCode.");
			throw Error();
		}

		const oldVersion = parseInt(versionCode.match(/\d+/)[0]);
		const newVersion = oldVersion + 1;
		const newVersionStr = versionCode.replace(/\d+/, newVersion);
		const gradleFileWithVersion = gradleFile.replace(versionCodeRegex, newVersionStr);

		return gradleFileWithVersion;
	};

	const updateVersionName = async (gradleFile) => {
		const versionNameLineRegex = /^\s*(versionName "\d+\.\d+\.\d+")\s*$/gm;
		const versionNameRegex = /\d+\.\d+\.\d+/;

		const versionName = gradleFile.match(versionNameLineRegex)?.[0];
		if (!versionName) {
			console.log("Invalid build.gradle file, missing versionName.");
			throw Error();
		}
		const oldVersionName = versionName.match(versionNameRegex)[0];
		console.log(`Current version: ${oldVersionName}`);

		const newVersionName = await new Promise((resolve) =>
			rl.question("Enter new version:\n> ", (answer) => resolve(answer))
		);
		if (
			!newVersionName.match(versionNameRegex) ||
			oldVersionName.localeCompare(newVersionName, undefined, { numeric: true, sensitivity: "base" }) >= 0
		) {
			console.log(`Invalid version: ${newVersionName}`);
			throw Error();
		}
		const newVersionNameStr = versionName.replace(versionNameRegex, newVersionName);
		return gradleFile.replace(versionNameLineRegex, newVersionNameStr);
	};

	return { setGradlePassword, getBuildType, incrementVersionCode, updateVersionName, getBuildCommandArgs };
};

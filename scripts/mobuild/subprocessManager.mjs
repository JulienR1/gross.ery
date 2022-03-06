import { spawn } from "child_process";

export function SubprocessManager() {
	this.subprocesses = [];

	this.createSubprocess = (command, args, dir) =>
		new Promise((resolve) => {
			const subprocess = spawn(command, args, { cwd: dir ?? __dirname });
			addSubprocess(subprocess);

			subprocess.stdout.on("data", (data) => console.log(data.toString()));
			subprocess.stderr.on("data", (data) => console.log(data.toString()));
			subprocess.on("close", () => {
				removeSubprocess(subprocess);
				resolve();
			});
		});

	this.killAll = () => {
		this.subprocesses.forEach((subprocess) => {
			console.log("Killing process..");
			subprocess.kill("SIGINT");
		});
	};

	const addSubprocess = (subprocess) => {
		this.subprocesses.push(subprocess);
	};

	const removeSubprocess = (subprocess) => {
		const index = this.subprocesses.findIndex((currentSubprocess) => currentSubprocess === subprocess);
		if (index) {
			this.subprocesses.splice(index, 1);
		}
	};
}

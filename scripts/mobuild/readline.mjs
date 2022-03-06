import * as readline from "readline";
import { Writable } from "stream";

export const getReadline = () => {
	const mutableOutput = new Writable({
		write: function (chunk, encoding, callback) {
			if (!this.muted) {
				process.stdout.write(chunk, encoding);
			}
			callback();
		},
	});

	const rl = readline.createInterface({ input: process.stdin, output: mutableOutput, terminal: true });

	rl.mutedQuestion = async (question) =>
		new Promise((resolve) => {
			console.log(question);
			rl.output.muted = true;
			rl.question("", (answer) => {
				rl.output.muted = false;
				return resolve(answer);
			});
		});

	return async (rlFunction, onKill) => {
		rl.on("SIGINT", () => {
			onKill?.();
			rl.pause();
		});

		await rlFunction(rl);
		rl.close();
	};
};

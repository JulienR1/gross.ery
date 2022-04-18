import { exec } from "child_process";
import { withLoader } from "./loader.mjs";

export const executeCommand = async ({
  title,
  command,
  dir,
  errorMsg,
  showLogs,
}) => {
  await executeManyCommands({
    title,
    commands: [command],
    dir,
    errorMsg,
    showLogs,
    chainCommands: false,
  });
};

export const executeManyCommands = async ({
  title,
  commands,
  dir,
  errorMsg,
  showLogs,
  chainCommands,
}) => {
  try {
    console.log(title);

    const commandProcess = async () => {
      const executeCommand = (command) =>
        new Promise((resolve) =>
          exec(
            command,
            {
              cwd: dir ?? process.cwd(),
              stdio: "ignore",
              shell: "powershell.exe",
            },
            (error, stdout, stderror) => {
              if (showLogs) {
                if (error || stderror) {
                  console.log(error ?? stderror);
                } else {
                  console.log(stdout);
                }
              }
              console.log(command);
              return resolve();
            }
          )
        );

      if (chainCommands) {
        return new Promise(async (resolve) => {
          for (const command of commands) {
            await executeCommand(command);
          }
          return resolve();
        });
      } else {
        return Promise.all(commands.map(executeCommand));
      }
    };

    await withLoader(commandProcess);

    console.log(`'${title}' complete.`);
  } catch {
    console.log(errorMsg ?? "An error occured.");
  }
};

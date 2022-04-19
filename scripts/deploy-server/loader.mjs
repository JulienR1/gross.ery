import spinners from "cli-spinners";
import logUpdate from "log-update";

const { dots } = spinners;

export const withLoader = async (process) => {
  let i = 0;
  const loaderInterval = setInterval(() => {
    logUpdate(dots.frames[(i = ++i % dots.frames.length)]);
  }, dots.interval);

  try {
    await process();
  } catch (ex) {
    throw ex;
  } finally {
    clearInterval(loaderInterval);
    logUpdate.clear();
  }
};

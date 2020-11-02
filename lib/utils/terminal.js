/**
 * @description: 执行终端命令相关
 * @param {*}
 * @return {*}
 * @author: camus
 */
/* exec,spawn 都可以，spawn偏向底层，exec对spawn进行了封装 */
const { spawn } = require("child_process");
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    /**
     * @description: 用于回应已经执行完，并且阻塞后续进程
     * @param {*}
     * @return {*}
     * @author: camus
     */
    childProcess.on("close", () => {
      resolve();
    });
  });
};
module.exports = {
  commandSpawn,
};

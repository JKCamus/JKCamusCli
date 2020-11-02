const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const log = require("./log");

/**
 * @description: 编译模板方法，用于编译写好的vue，js等模板
 * @param {*} templateName
 * @param {*} data
 * @return {*}
 * @author: camus
 */
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, res) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

/**
 * @description: 通过判断是否有父级文件，递归创建文件夹，从子判断到父，然后从父生成文件夹到子
 * @param {*} pathName
 * @return {*}
 * @author: camus
 */
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

/**
 * @description:  判断path是否存在，如果不存在，创建对应的文件夹
 * @param {*} path
 * @param {*} content
 * @return {*}
 * @author: camus
 */
const writeToFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("the file already exists~");
    return;
  }
  return fs.promises.writeFile(path, content);
};

module.exports = {
  createDirSync,
  writeToFile,
  compile,
};

const { promisify } = require("util");
const path = require("path");
const log = require("../utils/log");

/**
 * @description: 通过promisify包装的down-git-repo的callback形式转换为
 * promise形式，避免在回调里处理，发生回调地域
 * @author: camus
 */
const download = promisify(require("download-git-repo"));
const open = require("open");
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { createDirSync, writeToFile, compile } = require("../utils/utils");

/**
 * @description: 创建项目action，拉取vueRepo地址的vue项目，并且安装依赖，打开浏览器
 * @param {*} project
 * @return {*}
 * @author: camus
 */
const createProjectAction = async (project) => {
  log.hint("camus help you create your project~");
  await download(vueRepo, project, { clone: true });
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
  open("http://localhost:8080/");
};

/**
 * @description: 抽离公共，读取模板，写入对应的路径
 * @param {*} name
 * @param {*} dest
 * @param {*} templateName
 * @param {*} fileName
 * @return {*}
 * @author: camus
 */
const handleEjsToFile = async (name, dest, templateName, fileName) => {
  const result = await compile(templateName, {
    name,
    lowerName: name.toLowerCase(),
  });
  const targetPath = path.resolve(dest, fileName);
  writeToFile(targetPath, result);
};

/**
 * @description: 根据对应ejs模板创建对应的组件，可以自定义创建组件的地址
 * @param {*} name
 * @param {*} dest
 * @return {*}
 * @author: camus
 */
const addComponentAction = async (name, dest) => {
  if (createDirSync(dest)) {
    handleEjsToFile(name, dest, "vue-component.ejs", `${name}.vue`);
  }
};
/**
 * @description: 根据对应组件模板和router模板生成page页，包含路由等，并且无父文件，会新建符文件
 * @param {*} name
 * @param {*} dest
 * @return {*}
 * @author: camus
 */
const addPageAndRouteAction = async (name, dest) => {
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    addComponentAction(name, targetDest, "vue-component.ejs", `${name}.vue`);
    handleEjsToFile(name, targetDest, "vue-router.ejs", "router.js");
  }
};

const addStoreAction = async (name, dest) => {
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    handleEjsToFile(name, targetDest, "vue-store.ejs", "index.js");
    handleEjsToFile(name, targetDest, "vue-types.ejs", "types.js");
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
};

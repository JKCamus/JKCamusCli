const program = require("commander");
const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
} = require("./actions");

/**
 * @description: 创建 命令包含指令，描述，动作
 * @param {*}
 */
const createCommands = () => {
  /**
   * @description: 新建项目
   * @param {*}
   * @return {*}
   * @author: camus
   */
  program
    .command("create <project> [other...]")
    .description("clone a repository into a folder")
    .action(createProjectAction);
  /**
   * @description: 新建组件
   * @param {*}
   * @return {*}
   * @author: camus
   */
  program
    .command("addcpn <name>")
    .description(
      "add vue component,eg: camus addcpn HelloWorld [-d src/components]"
    )
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });
  /**
   * @description: 新建页面 包含一个cpn加一个路由，该路由已被动态加载
   * @param {*}
   * @return {*}
   * @author: camus
   */
  program
    .command("addpage <page>")
    .description(
      "add vue page && router config,eg: camus addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRouteAction(page, program.dest || "src/pages");
    });
  /**
   * @description: 创建一个store，包含index和一个type
   * @param {*}
   * @return {*}
   * @author: camus
   */
  program
    .command("addstore <name>")
    .description("add vue store,eg: camus addstore favor [-d dest]")
    .action((store) => {
      addStoreAction(store, program.dest || "src/store/modules");
    });
};

module.exports = createCommands;

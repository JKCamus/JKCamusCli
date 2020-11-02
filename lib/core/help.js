const program = require("commander");
const helpOptions = () => {
  program.option("-c --camus", "a camus cli");
  program.option(
    "-d --dest <dest>",
    "a destination folder,eg: -d /src/components"
  );
  program.option("-f --framework <framework>", "your frameWork");
  program.on("--help", () => {
    console.log("");
    console.log("other:");
    console.log("   other options~");
  });
};
module.exports = helpOptions;

#!/usr/bin/env node

const program = require("commander");

program
  .version(`vxp-cli ${require("../package").version}`)
  .usage("<command> [options]");

program
  .command("create <app-name>")
  .description("创建一个插件化项目。")
  .action(name => {
    require("../lib/create")(name);
  });

program
  .command("add <plugin>")
  .description("在已创建的项目中添加插件。")
  .action(plugin => {
    require("../lib/add")(plugin);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const clearConsole = require("./utils/clearConsole");
const Creator = require("./Creator");

async function create(projectName) {
  const cwd = process.cwd();
  const inCurrent = projectName === ".";
  const name = inCurrent ? path.relative("../", cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || ".");

  if (fs.existsSync(targetDir)) {
    clearConsole();
    if (inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: "ok",
          type: "confirm",
          message: "确认在当前目录创建新项目?"
        }
      ]);
      if (!ok) {
        return;
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `目标目录 ${chalk.cyan(targetDir)} 已存在，如何处理？`,
          choices: [
            { name: "重写", value: "overwrite" },
            { name: "融合", value: "merge" },
            { name: "取消", value: false }
          ]
        }
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\n移除目录 ${chalk.cyan(targetDir)}...`);
        await fs.remove(targetDir);
      }
    }
  }

  const creator = new Creator(name, targetDir);
  await creator.create();
}

module.exports = (...args) => {
  return create(...args).catch(() => {
    process.exit(1);
  });
};

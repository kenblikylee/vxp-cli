const EventEmitter = require("events");
// const chalk = require('chalk')
// const { logWithSpinner, stopSpinner } = require('./utils/spinner')
const clearConsole = require("./utils/clearConsole");
const yoenv = require("./yoenv");

module.exports = class Creator extends EventEmitter {
  constructor(name, context) {
    super();

    this.name = name;
    this.context = context;
  }

  async create() {
    clearConsole();
    yoenv.run(`app -n ${this.name} -d ${this.context}`);
    // logWithSpinner(`✨`, `创建项目 ${this.name} 到目录 ${chalk.yellow(this.context)}.`)
    // setTimeout(() => {
    //   stopSpinner()
    // }, 3000)
  }
};

const globby = require("globby");
const path = require("path");

module.exports = async function copyTplsDelegate(resolve, data) {
  this.templateFiles = await globby(["**/*"], { cwd: this.templatePath() });
  this.templateFiles.forEach(_f => {
    if (path.extname(_f) === ".ejs") {
      this.fs.copyTpl(
        this.templatePath(_f),
        resolve(_f.replace(/\.ejs$/, "")),
        data
      );
    } else {
      this.fs.copy(this.templatePath(_f), resolve(_f));
    }
  });
};

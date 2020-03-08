const Generator = require("yeoman-generator");
const _ = require("lodash");
const path = require("path");
const extend = _.merge;
const originUrl = require("git-remote-origin-url");
const copyTpls = require("../../utils/copyTpls");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.option("name", {
      type: String,
      required: true,
      defaults: "",
      alias: "n",
      desc: "包名"
    });
    this.option("dest", {
      type: String,
      required: true,
      defaults: this.destinationPath(),
      alias: "d",
      desc: "生成目录"
    });
  }

  async initializing() {
    this.dest = this.options.dest;
    this.resolve = p => path.resolve(this.dest, p);
    const curPkg = this.fs.readJSON(this.resolve("package.json"), {});
    this.pkg = extend(
      {
        name: this.options.name,
        description: "A pluggable vue project powered by vxp.",
        version: "1.0.0-alpha",
        private: true,
        workspaces: ["packages/*"],
        scripts: {
          vxp: "vxp"
        },
        dependencies: {},
        devDependencies: {},
        license: "MIT",
        keywords: ["vxp", "vue", "pluggable"],
        author: this.user.git.name(),
        email: this.user.git.email()
      },
      curPkg
    );

    return originUrl(this.destRoot)
      .then(url => {
        this.pkg.homepage = url;
      })
      .catch(() => {
        this.pkg.homepage = "";
      });
  }

  prompting() {}

  default() {}

  writing() {
    copyTpls.call(this, this.resolve, this.pkg);
    this.fs.writeJSON(this.resolve("package.json"), this.pkg);
  }

  install() {
    // this.yarnInstall();
  }
};

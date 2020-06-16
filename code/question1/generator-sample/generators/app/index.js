// 文件作为Generator的核心入口
// 继承一个Yeoman Generator的类型

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname,
    })
      .then(answers => {
        this.answers = answers
      })
  }

  writing() {
    // 把每个文件都通过模板转换到目标路径
    const templates = [
      '.env',
      '.env.analyz',
      '.env.production',
      '.gitignore',
      'babel.config.js',
      'package.json',
      'package-lock.json',
      'README.md',
      'vue.config.js',
      'public/index.html',
      'public/logo.png',
      'src/api/baseUrl.js',
      'src/api/axiosServices.js',
      'src/api/apiSugar/index.js',
      'src/assets/logo.png',
      'src/config/router.config.js',
      'src/layouts/UserLayout.vue',
      'src/router/index.js',
      'src/store/index.js',
      'src/utils/numToMoney.js',
      'src/App.vue',
      'src/main.js',
      'src/permission.js'
    ];

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers,
      )
    })
  }
};
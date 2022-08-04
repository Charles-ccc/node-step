const inquirer = require('inquirer')
const config = require('../../config')
const downloadFn = require('./download')

const cliAction = async (project, args) => {
  // 命令行执行逻辑代码
  // console.log(project)
  // console.log(args)
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      choices: config.framework,
      message: '请选择框架'
    }
  ])

  // 下载代码模版到对应文件
  downloadFn(config.frameworkUrl[answer.framework], project)

  console.log(answer);
}

module.exports = cliAction
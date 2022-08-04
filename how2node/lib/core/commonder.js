const cliAction = require('./action')

const cliCommonder = function (program) {
  program
  // 处理自定义命令
  .command('create <project> [other...]')
  // 别命
  .alias('crt')
  // 描述
  .description('创建项目')
  // 处理任务
  .action(cliAction)
}

module.exports = cliCommonder
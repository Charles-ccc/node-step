const download = require('download-git-repo')
const config = require('../../config')
const ora = require('ora')
const chalk = require('chalk')

const downloadFn = function (url, project) {
  const spinner = ora().start();
  spinner.text = 'downloading...';
  download('direct:' + url, project, {clone: true}, err => {
    if (!err) {
      spinner.succeed('download success')
      console.log(chalk.blue.bold('Done! You can run:'))
      console.log(chalk.yellow('cd ' + project))
      console.log(chalk.yellow('npm install'));
      console.log(chalk.yellow('npm run dev'));
      console.log(chalk.red('Have Fun'));
    } else {
      spinner.fail('download fail')
    }
  })
}

module.exports = downloadFn
const ora = require('ora')

const spinner = ora().start();
spinner.text = 'Loading rainbows';
setTimeout(() => {
  spinner.succeed('End')
  // spinner.fail('End')
  // spinner.info('End')
}, 2000);
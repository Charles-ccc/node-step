#! /usr/bin/env node
// 命令行的入口文件

// 原始获取命令行参数 process.argv[2]
// commander 处理命令行参数
const { program } = require('commander')
program.option('-f --framework <framework>', '设置框架')
program
  // 处理自定义命令
  .command('create <project> [other...]')
  // 别命
  .alias('crt')
  // 描述
  .description('创建项目')
  // 处理任务
  .action((project, args) => {
    // 命令行执行逻辑代码
    console.log(project)
    console.log(args)
  })

program.parse(process.argv)
#! /usr/bin/env node
// 命令行的入口文件

// 原始获取命令行参数 process.argv[2]
// commander 处理命令行参数
const { program } = require('commander')
// 模块化处理
const cliHelp = require('../lib/core/help')
cliHelp(program)

const cliCommonder = require('../lib/core/commonder')
cliCommonder(program)

program.parse(process.argv)
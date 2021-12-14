#! /usr/bin/env node
'use strict'
// 定义脚手架的文件路径，__dirname是当前文件所在的路径
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')
const chalk = require('chalk')
chalk.level = 3 // 设置chalk等级为3
// 获取package.json中的version来做为项目的版本号
program.version(require('../package').version)
// 定义脚手架的用法，在program.help方法中会显示
program.usage('<command>')
program
    .command('create <app-name>')
    .description('create a new project')
    .alias('i')
    .action((name)=>{
        require('../inquirer/index.js')(name)
    })

// program.parse(arguments)会处理参数，没有被使用的选项会被存放在program.args数组中
program.parse(process.argv);
//
// if (program.args.length) {
//     program.help()
// }

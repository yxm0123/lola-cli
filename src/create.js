const inquirer = require('inquirer')
const chalk =require('chalk')
const {exec} = require('child_process')
const fs = require('fs');
const ora = require('ora');
module.exports = async (projectName) =>{
	let prompts=[
		{
			type: 'list',
			message: 'Please select a template',
			name: 'projectType',
			choices:[
				{
					name: 'vue3-component-template',
					value:'vue3-component-template'
				},
				{
					name: 'vue3-project-template',
					value:'vue3-project-template'
				},
				{
					name: 'tools-template',
					value:'tools-template'
				}
			],
			validate:(val)=>{
				if(!val) {
					return chalk.red('Project type cannot be empty')
				}
				return  true
			}
		}
	];
	try{
		let answer = await inquirer.prompt(prompts);
		let projectType = answer.projectType
		if(projectType) {
			const gitUrl = `https://github.com/yxm0123/${answer.projectType}.git`
			let spinner = ora(chalk.gray('template is download...\r\n'));
			spinner.start()
			exec(`git clone ${gitUrl} ${projectName}`,(error,stdout,stderr)=> {
				if(error){
					console.log(chalk.red('template clone fail'),error)
					process.exit()
				}
				fs.readFile(`${process.cwd()}/${projectName}/package.json`,(error,data)=>{
					if(error){
						console.log(chalk.red('Failed to create file',error))
						process.exit()
					}
					data= JSON.parse(data.toString())
					data.name = projectName
					fs.writeFile(`${process.cwd()}/${projectName}/package.json`,JSON.stringify(data,"","\t"),(err)=>{
						if(err){
							console.log(chalk.red('fail to write to file...'))
							process.exit()
						}
						exec('yarn', {cwd: `${process.cwd()}/${projectName}`},(errs)=>{
							if(errs){
								console.log(errs, 'exec yarn fail')
								process.exit()
							}
							console.log('yarn success')
							console.log(chalk.green('Template download completed'));
							spinner.stop()
							console.log(`\r\nSuccessfully created project ${chalk.cyan(projectName)}`)
							console.log(`\r\ncd ${chalk.cyan(projectName)}`)
							console.log('yarn serve\r\n')
							process.exit()
						});
					})
				})
			})
		}else {
			return chalk.red('Project type cannot be empty')
			process.exit()
		}
	}catch(e){
		console.log(e)
	}

	// inquirer.prompt(prompts).then(answer => {
	//     console.log(answer)
	//     // console.log(chalk.green('create start\n'))
	// })
}

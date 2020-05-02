const {Command, flags} = require('@oclif/command')
const deploy = require('../deploy')

class DeployCommand extends Command {
  async run() {
    const {flags} = this.parse(DeployCommand)
    const file = flags.file

    const {error} = deploy.run({file})
    if (error) this.error(error)
  }
}

DeployCommand.description = `Describe the command here
...
Extra documentation goes here
`

DeployCommand.flags = {
  file: flags.string({char: 'f', description: 'release file', required: true}),
}

module.exports = DeployCommand

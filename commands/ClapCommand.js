class ClapCommand extends frozor.Command{
    constructor(){
        super({
            name: 'clap',
            description: 'Clapify yo messages',
            args: frozor.CommandArg.getVariableArgs(3000, 'words', 'String')
        });
    }

    async run(msg){
        return msg.edit(msg.args.join(':clap:'));
    }
}

module.exports = ClapCommand;
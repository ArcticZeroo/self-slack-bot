class ClapCommand extends Command{
    constructor(){
        super('clap', [], 'Clapify yo messages', CommandArg.getVariableArgs(3000, 'words', 'String'));
    }

    run(msg){
        msg.edit(msg.args.join(':clap:'));
    }
}

module.exports = ClapCommand;
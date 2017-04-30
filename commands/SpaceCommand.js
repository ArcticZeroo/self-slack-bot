class SpaceCommand extends Command{
    constructor(){
        super('space', [], 'Spacify yo text!', CommandArg.getVariableArgs(300, 'text', 'String'));
    }

    async run(msg){
        msg.edit(msg.args.join(' ').split('').join(' '));
    }
}

module.exports = SpaceCommand;
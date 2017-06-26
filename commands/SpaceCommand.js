class SpaceCommand extends frozor.Command{
    constructor(){
        super({
            name: 'space',
            description: 'Spacify yo text!',
            args: frozor.CommandArg.getVariableArgs(300, 'text', 'String')
        });
    }

    async run(msg){
        msg.edit(msg.args.join(' ').split('').join(' '));
    }
}

module.exports = SpaceCommand;
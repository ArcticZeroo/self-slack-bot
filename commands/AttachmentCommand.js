class AttachmentCommand extends frozor.Command{
    constructor(){
        super({
            name: 'attach',
            description: 'Attach a message!',
            args: frozor.CommandArg.getVariableArgs(300, 'args', 'string')
        });
    }

    async run(msg){
        let args = frozor.CommandArg.parseArgs(msg.args);

        return msg.edit(args.editText || '', {attachments: [args]});
    }
}

module.exports = AttachmentCommand;
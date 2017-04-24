class AttachmentCommand extends Command{
    constructor(){
        super('attach', [], 'Attach a message!', CommandArg.getVariableArgs(300, 'args', 'string'));
    }

    run(msg){
        let args = CommandArg.parseArgs(msg.args);

        msg.edit(args.editText || '', {attachments: [args]});
    }
}

module.exports = AttachmentCommand;
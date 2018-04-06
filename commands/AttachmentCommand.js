class AttachmentCommand extends frozor.Command{
    constructor(){
        super({
            name: 'attach',
            description: 'Attach a message!'
        });

        this.addInfiniteArgs('args');
        this.minArgs = 1;
    }

    async run(msg){
        let args = frozor.CommandArg.parseArgs(msg.args);

        return msg.edit(args.editText || '', {attachments: [args]});
    }
}

module.exports = AttachmentCommand;
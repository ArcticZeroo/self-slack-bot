class RepeatTextCommand extends frozor.Command{
    constructor(){
        super({
            name: 'repeat',
            aliases: ['r'],
            description: 'Repeats specified text n times'
        });

        this.addInfiniteArgs('words');
        this.minArgs = 1;
    }

    async run(msg){
        const args = frozor.CommandArg.parseArgs(msg.args);

        if (!args.text && !args.count) {
            args.count = msg.args[0];
            args.text = msg.args.slice(1).join(' ');
            args.space = true;
        }

        if(!args.text || !args.count){
            msg.prefixReply('Text and count must both be specified.');
            return;
        }

        if(isNaN(args.count)){
            msg.prefixReply('Count must be a number.');
        }else{
            let count = parseInt(args.count);

            if(count < 1){
                msg.prefixReply('Count must be a positive number.')
            }else{
                let endLength = ((args.space) ? (args.text+1)  : (args.text)) * count;

                if(endLength > 2999){
                    msg.prefixReply(`Your message is too long. It must be less than *3000* characters, but yours was *${endLength}*.`);
                    return;
                }

                let repeatText = args.text;

                if(count > 1){
                    for(let i = 1; i < count; i++){
                        repeatText += (args.space) ? ' ' + args.text : args.text;
                    }
                }

                msg.edit(repeatText);
            }
        }
    }
}

module.exports = RepeatTextCommand;
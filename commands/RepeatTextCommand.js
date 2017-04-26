class RepeatTextCommand extends Command{
    constructor(){
        super('repeat', ['r'], 'Repeats specified text n times', CommandArg.getVariableArgs(3000, 'words', 'String'));
    }

    run(msg){
        let args = CommandArg.parseArgs(msg.args);

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
                let repeatText = '';

                for(let i = 0; i < count; i++){
                    repeatText += (args.space) ? ' ' + args.text : args.text;
                }

                msg.edit(repeatText);
            }
        }
    }
}

module.exports = RepeatTextCommand;
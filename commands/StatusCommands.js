function setStatus(bot, emoji, text, cb) {
    bot.api.methods.users.profile.set({
        profile:{
            status_text: text,
            status_emoji: emoji
        }
    }, cb)
}

function handleStatusTextChange() {
    
}

function handleStatusEmojiChange() {
    
}


class ChangeStatusCommand extends Command{
    constructor(){
        super('status');
    }

    run(msg, bot, extra){
        if(msg.args.length === 1){
            if(globalRegex.SLACK_EMOJI.test(msg.args[0])){
                // Set just the status emoji in this org
                setStatus(bot, msg.args[0])
            }else{
                setStatus()
            }
        }
    }
}
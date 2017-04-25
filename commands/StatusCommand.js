class ChangeStatusCommand extends Command{
    constructor(){
        super('status', ['changestatus', 'setstatus'], 'Sets your status.', CommandArg.getVariableArgs(300, 'args', 'String'));
    }

    run(msg, bot, extra){
        let parsed = CommandArg.parseArgs(msg.args);

        // This will set the status to message args if no args are specified.
        if(!parsed.hasOwnProperty('text') && !parsed.hasOwnProperty('emoji')){
            parsed.text = msg.args.join(' ');
        }

        if(parsed.hasOwnProperty('propogate')){
            parsed.propogate = parsed.propogate.toBoolean();
        }

        let profile = {};

        if(parsed.hasOwnProperty('text')){
            if(parsed.text.length > 100){
                msg.reply(`Status cannot be greater than 100 characters long.`);
                return;
            }

            profile.status_text = parsed.text;
        }

        if(parsed.hasOwnProperty('emoji')){
            if(!globalRegex.SLACK_EMOJI.test(parsed.emoji)){
                msg.reply('That emoji does not appear to be valid.');
                return;
            }

            profile.status_emoji = parsed.emoji;
        }

        function setStatus(slackBot) {
            if(slackBot.animatedStatus != null){
                slackBot.animatedStatus.stop();
                slackBot.animatedStatus = null;
            }

            slackBot.api.methods.users.profile.set({ profile });
        }

        if(parsed.propogate){
            Object.each(extra.slackBots, setStatus);
        }else{
            setStatus(bot);
        }

        msg.reply(`Your status has been set in *${(parsed.propogate) ? Object.keys(extra.slackBots).length : 1}* slack org(s)`);
    }
}

module.exports = ChangeStatusCommand;
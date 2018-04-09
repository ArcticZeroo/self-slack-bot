class ChangeStatusCommand extends frozor.Command{
    constructor(){
        super({
            name: 'status',
            aliases: ['changestatus', 'setstatus'],
            description: 'Sets your status using text args. Uses property text, emoji, and propagate (whether it should go to all teams)'
        });

        this.addInfiniteArgs('args');
    }

    async run(msg, bot, extra){
        if(msg.args.length === 0){
            const me = bot.api.cache.users[bot.self.id];
            msg.edit('', { attachments:[{title: 'My Status', text: (me.profile.status_emoji || '') + ' ' + (me.profile.status_text || ''), color: Colors.MATERIAL_BLUE}] });
            return;
        }

        let parsed = frozor.CommandArg.parseArgs(msg.args);

        // This will set the status to message args if no args are specified.
        if(!parsed.hasOwnProperty('text') && !parsed.hasOwnProperty('emoji')){
            parsed.text = msg.args.join(' ');
        }

        if(parsed.hasOwnProperty('propagate')){
            parsed.propagate = parsed.propagate.toBoolean();
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

        async function setStatus(slackBot) {
            try{
                if(slackBot.animatedStatus != null){
                    slackBot.animatedStatus.stop();
                    slackBot.animatedStatus = null;
                }

                await slackBot.api.methods.users.profile.set({ profile });
            }catch (e){
                log.error(`Could not update slack status for ${log.chalk.slack(slackBot.prefix)}: ${e}`);
            }
        }

        if(parsed.propagate){
            Object.each(extra.slackBots, setStatus);
        }else{
            setStatus(bot).catch(()=>{});
        }

        msg.reply(`Your status has been set in *${(parsed.propagate) ? Object.keys(extra.slackBots).length : 1}* slack org(s)`);
    }
}

module.exports = ChangeStatusCommand;
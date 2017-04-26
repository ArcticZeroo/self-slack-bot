class SelfInfoCommand extends Command{
    constructor(){
        super('self', ['selfinfo', 'me'], 'Info about the user running the bot.');
    }

    run(msg, bot, extra){
        const emojiUse = JSON.parse(bot.self.prefs.emoji_use);
        const frecencyJumper = JSON.parse(bot.self.prefs.frecency_jumper);
        // Gets entries, sorts by the value, gets first item
        let emojiTopUse = Object.entries(emojiUse).sort((a,b)=> b[1] - a[1])[0];

        function getInfoItem(name, value) {
            return [name, value];
        }

        let info = [];

        info.push(getInfoItem('Name', bot.self.name));
        info.push(getInfoItem('ID', bot.self.id));
        info.push(getInfoItem('Created', new Date(bot.self.created*1000).toLocaleString()));
        //info.push(getInfoItem('Admin', bot.self.name));
        info.push(getInfoItem('Top Emoji', `:${emojiTopUse[0]}: (${emojiTopUse[1]} Uses)`));
        info.push(getInfoItem('Emoji Type', bot.self.prefs.emoji_mode));

        if(frecencyJumper.hasOwnProperty('')){
            let frecencyTop = frecencyJumper[''].sort((a,b)=> b.count - a.count)[0];
            info.push(getInfoItem('Most Mentioned User', `<@${frecencyTop.id}> (${frecencyTop.count} Visits)`));
        }

        msg.edit('', { attachments: [ { color: '#2196F3', fields: info.map((info)=> ({ title: info[0], value: info[1], short: true })) } ] })
    }
}

module.exports = SelfInfoCommand;
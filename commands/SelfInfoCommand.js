class SelfInfoCommand extends Command{
    constructor(){
        super('self', ['selfinfo', 'me'], 'Self!');
    }

    run(msg, bot, extra){
        const emojiUse = JSON.parse(bot.self.prefs.emoji_use);
        let emojiTopUse = [undefined, 0];
        for(let emoji of Object.keys(emojiUse)){
            if(emojiUse[emoji] > emojiTopUse[1]){
                emojiTopUse = [emoji, emojiUse[emoji]];
            }
        }

        msg.edit(`*Storage.Self*\n-----------\n*Name*: ${bot.self.name}\n*ID*: ${bot.self.id}\n*Created*: ${new Date(bot.self.created*1000).toLocaleString()}\n*Top Emoji*: :${emojiTopUse[0]}: (${emojiTopUse[1]} uses)`);
    }
}

module.exports = SelfInfoCommand;
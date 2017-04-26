class CustomEmojiCommand extends Command{
    constructor(){
        super('customemoji', ['cemoji']);
    }

    run(msg, bot){
        const emojiUse = JSON.parse(bot.self.prefs.emoji_use);

        bot.api.methods.emoji.list((err, res)=>{
            let emojiTopUse = Object.entries(emojiUse).filter((emoji)=> res.emoji.hasOwnProperty(emoji[0])).sort((a,b)=> b[1] - a[1])[0];

            msg.edit(`This slack team has *${Object.keys(res.emoji).length}* custom emoji. ${(emojiTopUse) ? `My most used custom emoji is :${emojiTopUse}:`: 'I\'ve never used a custom emoji in this team before.'}`);
        });
    }
}

module.exports= CustomEmojiCommand;
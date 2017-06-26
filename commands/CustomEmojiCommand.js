class CustomEmojiCommand extends frozor.Command{
    constructor(){
        super({
            name: 'customemoji',
            aliases: ['emoji']
        });
    }

    async run(msg, bot){
        const emojiUse = JSON.parse(bot.self.prefs.emoji_use);

        try{
            let res = await bot.api.methods.emoji.list();

            let emojiTopUse = Object.entries(emojiUse).filter((emoji)=> res.emoji.hasOwnProperty(emoji[0])).sort((a,b)=> b[1] - a[1])[0];

            return msg.edit(`This slack team has *${Object.keys(res.emoji).length}* custom emoji. ${(emojiTopUse) ? `My most used custom emoji is :${emojiTopUse[0]}: (*${emojiTopUse[1]}* Uses)`: 'I\'ve never used a custom emoji in this team before.'}`);
        }catch (e){
            return msg.reply(`Unable to get emoji list due to error: \`\`\`${e}\`\`\``)
        }
    }
}

module.exports= CustomEmojiCommand;
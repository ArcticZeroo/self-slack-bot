const EMOJI_COUNT = 15;

class CustomEmojiCommand extends Command{
    constructor(){
        super('emoji', ['emojileaderboard']);
    }

    run(msg, bot){
        const emojiUse = JSON.parse(bot.self.prefs.emoji_use);

        let emojiTopUse = Object.entries(emojiUse).sort((a,b)=> b[1] - a[1]).slice(0, EMOJI_COUNT);

        let editText = `My Top *${Math.min(emojiTopUse.length, EMOJI_COUNT)}* Used Emoji:`;

        for(let i = 0; i < emojiTopUse.length; i++){
            editText += `\n[${i+1}] :${emojiTopUse[i][0]}: - \`${emojiTopUse[i][1]}\` use(s)`
        }

        msg.edit(editText);
    }
}

module.exports= CustomEmojiCommand;
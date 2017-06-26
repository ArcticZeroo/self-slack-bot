class LastMessageCommand extends frozor.Command{
    constructor(){
        super({
            name: 'lol',
            aliases: ['lolcount'],
            description: 'Gets "lol" count for a user',
            args: [new frozor.CommandArg('user', 'String')]
        });
    }

    async run(msg, bot){
        const lookup = msg.args[0];

        async function getLastMessage(user) {
            msg.edit('Getting lol count...');

            try {
                let res = await bot.api.methods.search.messages({query: `from:${user.name} lol`});

                msg.edit(`*${user.name}* has said lol \`${res.messages.total}\` time(s)`);
            }catch (err){
                msg.reply(`Could not get message history for *${lookup}* due to an error:\`\`\`${err}\`\`\``);
            }
        }

        if(lookup.isValidSlackMention()){
            // It's a slack mention
            const id = lookup.getSlackIdFromMention();

            if(!id){
                msg.delete();
                bot.chat(msg.user.id, `${lookup} doesn't appear to be a valid slack mention.`);
                return;
            }

            let user;

            try{
                user = await bot.api.storage.users(id);
            }catch (err){
                msg.reply(`Couldn't get user info for ${lookup}: \`\`\`${err}\`\`\``);
            }

            getLastMessage(user).catch(log.error);
        }else{
            // It's a username
            getLastMessage({name: lookup.toLowerCase()}).catch(log.error);
        }
    }
}

module.exports = LastMessageCommand;
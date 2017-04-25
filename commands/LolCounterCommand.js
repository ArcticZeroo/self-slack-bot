class LastMessageCommand extends Command{
    constructor(){
        super('lol', ['lolcount'], 'Gets "lol" count for a user', [new CommandArg('user', 'String')]);
    }

    run(msg, bot){
        const lookup = msg.args[0];

        function getLastMessage(user) {
            msg.edit('Getting lol count...');
            bot.api.methods.search.messages({
                query: `from:${user.name} lol`,
            }, (err,res)=>{
                if (err) {
                    msg.reply(`Could not get message history for *${lookup}* due to an error:\`\`\`${err}\`\`\``);
                } else {
                    msg.edit(`*${user.name}* has said lol \`${res.messages.total}\` time(s)`);
                }
            });
        }



        if(lookup.isValidSlackMention()){
            // It's a slack mention
            const id = lookup.getSlackIdFromMention();

            if(!id){
                msg.delete();
                bot.chat(msg.user.id, `${lookup} doesn't appear to be a valid slack mention.`);
            }

            bot.api.storage.users.get(id, (err, user)=>{
                if(err){
                    msg.reply(`Couldn't get user info for ${user}: \`\`\`${err}\`\`\``);
                }else{
                    getLastMessage(user);
                }
            });
        }else{
            // It's a username
            getLastMessage({name: lookup.toLowerCase()});
        }
    }
}

module.exports = LastMessageCommand;
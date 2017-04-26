class LastMessageCommand extends Command{
    constructor(){
        super('last', ['lastmessage'], 'Gets last message for a user', [new CommandArg('user', 'String')]);
    }

    run(msg, bot){
        const lookup = msg.args[0];

        function getLastMessage(user) {
            msg.edit('Looking up last sent message...');
            bot.api.methods.search.messages({
                query: `from:${user.name}`,
                sort: 'timestamp',
                count: 1
            }, (err,res)=>{
                if (err) {
                    msg.reply(`Could not get last message for *${lookup}* due to an error:\`\`\`${err}\`\`\``);
                } else {
                    if(res.messages.total === 0){
                        msg.edit(`*${user.name}* has no searchable messages.`);
                    }else{
                        const lastMessage = res.messages.matches[0];
                        msg.edit(`*${user.name}* last sent a message at \`${new Date(lastMessage.ts * 1000).toLocaleString()}\` ${(lastMessage.channel.name.isValidSlackId()) ? 'in a private conversation.' : `in *#${lastMessage.channel.name}*. He said:\`\`\`${lastMessage.text}\`\`\``}`);
                    }
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
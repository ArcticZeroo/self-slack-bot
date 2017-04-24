class UserInfoCommand extends Command{
    constructor(){
        super('user', ['userinfo'], 'Users!', [new CommandArg('user')]);
    }

    run(msg, bot, extra){
        const lookup = msg.args[0];

        function sendUserInfo(user) {
            function getInfoItem(name, value) {
                return `*${name}*: ${value}`;
            }

            let info = [];

            info.push('Storage.Users.' + user.name);
            info.push('-----------');
            info.push(getInfoItem('ID', user.id));
            info.push(getInfoItem('Username', user.name));

            if(user.profile.real_name && user.profile.real_name !== ''){
                info.push(getInfoItem('Real Name', user.profile.real_name));
            }

            if((user.profile.status_emoji || user.profile.status_text) && (user.profile.status_emoji !== '' || user.profile.status_text !== '')){
                info.push(getInfoItem('Status', (user.profile.status_emoji || '') + ' ' + (user.profile.status_text || '')))
            }

            if(user.is_restricted){
                info.push(getInfoItem('Is Restricted', user.is_restricted));
            }

            if(user.is_admin){
                info.push(getInfoItem('Is Admin', user.is_admin));
            }

            if(user.is_bot){
                info.push(getInfoItem('Is Bot', user.is_bot));
            }

            msg.edit(info.join('\n'))
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
                    sendUserInfo(user);
                }
            });
        }else{
            // It's a username
            let nameLookup = lookup.toLowerCase();
            const user = bot.api.storage.users.findInCache((u)=> u.name === nameLookup);

            if(!user){
                msg.reply(`Couldn't find *${nameLookup}* in cache.`);
            }else{
                sendUserInfo(user);
            }
        }
    }
}

module.exports = UserInfoCommand;
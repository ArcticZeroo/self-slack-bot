class UserInfoCommand extends frozor.Command{
    constructor(){
        super({
            name: 'user',
            aliases: ['userinfo', 'users', 'uinfo'],
            description: 'Information about a specified user',
            args: ['user']
        });
    }

    async run(msg, bot, extra){
        const lookup = msg.args[0];

        function sendUserInfo(user) {
            function getInfoItem(name, value) {
                return [name, value];
            }

            let info = [];

            info.push(getInfoItem('ID', user.id));
            info.push(getInfoItem('Username', user.name));

            if(user.profile.real_name && user.profile.real_name !== ''){
                info.push(getInfoItem('Real Name', user.profile.real_name));
            }

            if((user.profile.status_emoji || user.profile.status_text) && (user.profile.status_emoji !== '' || user.profile.status_text !== '')){
                info.push(getInfoItem('Status', (user.profile.status_emoji || '') + ' ' + (user.profile.status_text || '')))
            }

            if(user.deleted) {
                info.push(getInfoItem('Disabled', 'Yes'));
            }

            if(user.has_2fa != null) {
                info.push(getInfoItem('Has 2FA', user.has_2fa.toYesNo()));
            }

            if(user.is_restricted) {
                info.push(getInfoItem('Is Restricted', user.is_restricted.toYesNo()));
            }

            if(user.is_admin) {
                info.push(getInfoItem('Is Admin', user.is_admin.toYesNo()));
            }

            if(user.is_bot) {
                info.push(getInfoItem('Is Bot', user.is_bot.toYesNo()));
            }

            msg.edit('', { attachments: [ { color: Colors.MATERIAL_BLUE, fields: info.map((info)=> ({ title: info[0], value: info[1], short: true })) } ] })
        }

        if(lookup.isValidSlackMention()){
            // It's a slack mention
            const id = lookup.getSlackIdFromMention();

            if(!id){
                msg.delete();
                bot.chat(msg.user.id, `${lookup} doesn't appear to be a valid slack mention.`);
                return;
            }

            try{
                sendUserInfo(await bot.api.storage.users.get(id));
            }catch (err){
                msg.reply(`Couldn't get user info for ${lookup}: \`\`\`${err}\`\`\``);
            }
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
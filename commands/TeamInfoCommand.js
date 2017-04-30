class UserInfoCommand extends Command{
    constructor(){
        super('team', ['teaminfo', 'teams', 'tinfo'], 'Information about a specified team');
    }

    async run(msg, bot, extra){
        function sendTeamInfo(team) {
            function getInfoItem(name, value) {
                return [name, value];
            }

            let info = [];

            info.push(getInfoItem('ID', team.id));
            info.push(getInfoItem('Name', team.name));
            info.push(getInfoItem('Domain', team.domain));
            info.push(getInfoItem('Users', Object.keys(bot.api.cache.users).length));

            msg.edit('', { attachments: [ { thumb_url: team.icon.image_88, color: Colors.MATERIAL_BLUE, fields: info.map((info)=> ({ title: info[0], value: info[1], short: true })) } ] })
        }

        try{
            sendTeamInfo(await bot.api.storage.team.get());
        }catch (err){
            msg.reply(`Couldn't get team info due to an error: \`\`\`${err}\`\`\``);
        }
    }
}

module.exports = UserInfoCommand;
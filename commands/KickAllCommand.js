class KickAllCommand extends frozor.Command {
    constructor() {
        super({
            name: 'kickall'
        });
    }

    async run(msg, bot) {
        const channel = msg.channel;

        let type;
        if (bot.api.cache.channels[channel]) {
            type = 'channel';
        } else if (bot.api.cache.groups[channel]) {
            type = 'group';
        } else {
            return msg.reply('Sorry, but I wasn\'t able to find that channel in the cache.');
        }

        let result;
        try{
            result = await bot.api.methods[`${type}s`].info({channel});
        } catch (e) {
            return msg.reply('Sorry, but I couldn\'t get channel info for that channel.');
        }

        const channelInfo = result[type];

        for (const user of channelInfo.members) {
            if (user === bot.self.id) {
                continue;
            }

            const userData = bot.api.cache.users[user];

            if (userData.is_admin) {
                continue;
            }

            try {
                await bot.api.methods[`${type}s`].kick({channel, user});
            } catch (e) {
                return msg.reply(`I wasn\'t able to kick *${userData.username}*, sorry. Try again later?`);
            }
        }

        return msg.reply('Successfully kicked all users (that aren\'t you).');
    }
}

module.exports = KickAllCommand;
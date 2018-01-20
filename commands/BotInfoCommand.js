const pkg = require('../package.json');

class BotInfoCommand extends frozor.Command{
    constructor(){
        super({
            name: 'info',
            aliases: ['version', 'about']
        });
    }

    async run(msg, bot){
        return msg.edit('', {attachments: [{
            title: 'Bot Info',
            text: `Slack Self Bot *v${pkg.version}* by *ArcticZeroo* running in slack workspace *${bot.prefix}*!`,
            color: '#2196F3'
        }]});
    }
}

module.exports = BotInfoCommand;
const pkg = require('../package.json');

class BotInfoCommand extends frozor.Command{
    constructor(){
        super({
            name: 'info',
            aliases: ['version', 'about'],
            description: 'Send info about the bot you\'re running!'
        });
    }

    async run(msg, bot){
        return msg.edit('', {attachments: [{
            title: 'Bot Info',
            text: `Slack Self Bot *v${pkg.version}* by *${pkg.author}* running in slack workspace *${bot.prefix}*!`,
            color: '#2196F3',
            mrkdwn_in: ['text']
        }]});
    }
}

module.exports = BotInfoCommand;
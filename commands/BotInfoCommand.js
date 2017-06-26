class BotInfoCommand extends frozor.Command{
    constructor(){
        super({
            name: 'info',
            aliases: ['version', 'about']
        });
    }

    async run(msg, bot){
        return msg.edit(`Slack Self Bot *v${process.env.npm_package_version}* by *ArcticZeroo* running on SlackBot *${bot.prefix}*!`);
    }
}

module.exports = BotInfoCommand;
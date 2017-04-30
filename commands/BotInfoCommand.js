class BotInfoCommand extends Command{
    constructor(){
        super('info', ['version', 'about']);
    }

    async run(msg, bot){
        msg.edit(`Slack Self Bot *v${process.env.npm_package_version}* running on SlackBot *${bot.prefix}*!`)
    }
}

module.exports = BotInfoCommand;
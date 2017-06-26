class PingCommand extends frozor.Command{
    constructor(){
        super({
            name: 'ping',
            aliases: ['speedtest'],
            description: 'Gets ping to slack/bot'
        });
    }

    async run(msg){
        msg.edit(`Latency to Slack: \`${Math.floor(Date.now() - Math.floor(msg.ts*1000))} ms\``);
    }
}

module.exports = PingCommand;
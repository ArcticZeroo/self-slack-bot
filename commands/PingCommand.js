class PingCommand extends Command{
    constructor(){
        super('ping', ['speedtest'], 'Gets ping to slack/bot');
    }

    run(msg){
        msg.edit(`Latency to Slack: \`${Math.floor(Date.now() - Math.floor(msg.ts*1000))} ms\``);
    }
}

module.exports = PingCommand;
class PingCommand extends Command{
    constructor(){
        super('ping');
    }

    run(msg){
        msg.edit(`Latency to Slack: \`${Date.now() - msg.ts*1000} ms\``);
    }
}

module.exports = PingCommand;
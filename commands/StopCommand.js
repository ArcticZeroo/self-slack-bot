class StopCommand extends frozor.Command{
    constructor(){
        super({
            name: 'stop',
            aliases: ['exit', 'restart', 'reload'],
            description: 'Stop the self bot'
        })
    }

    async run(msg){
        await msg.delete();
        process.exit();
    }
}

module.exports = StopCommand;
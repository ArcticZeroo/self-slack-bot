class StopCommand extends Command{
    constructor(){
        super('stop', ['exit', 'restart', 'reload'], 'Stop the self bot')
    }

    async run(msg){
        await msg.delete();
        process.exit();
    }
}

module.exports = StopCommand;
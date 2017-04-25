class StopCommand extends Command{
    constructor(){
        super('stop', ['exit', 'restart', 'reload'], 'Stop the self bot')
    }

    run(msg){
        msg.delete(()=> process.exit());
    }
}

module.exports = StopCommand;
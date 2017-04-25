class DisplayTimeCommand extends Command{
    constructor(){
        super('time', ['mytime'], 'Sends a message with the host\'s time.');
    }

    run(msg){
        msg.edit(`Right now, it is \`${new Date().toLocaleString()}\``);
    }
}

module.exports = DisplayTimeCommand;
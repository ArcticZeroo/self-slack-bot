class DisplayTimeCommand extends Command{
    constructor(){
        super('time');
    }

    run(msg){
        msg.edit(`Right now, it is \`${new Date().toLocaleString()}\``);
    }
}

module.exports = DisplayTimeCommand;
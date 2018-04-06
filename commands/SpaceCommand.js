class SpaceCommand extends frozor.Command{
    constructor(){
        super({
            name: 'space',
            description: 'Spacify yo text!'
        });

        this.addInfiniteArgs('words');
        this.minArgs = 1;
    }

    async run(msg){
        msg.edit(msg.args.join(' ').split('').join(' '));
    }
}

module.exports = SpaceCommand;
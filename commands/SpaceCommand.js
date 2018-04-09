class SpaceCommand extends frozor.Command{
    constructor(){
        super({
            name: 'space',
            description: 'Spacify yo text! (edits spaces between every character in your text)'
        });

        this.addInfiniteArgs('words');
        this.minArgs = 1;
    }

    async run(msg){
        msg.edit(msg.args.join(' ').split('').join(' '));
    }
}

module.exports = SpaceCommand;
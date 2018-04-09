class ClapCommand extends frozor.Command{
    constructor(){
        super({
            name: 'clap',
            description: 'Clapify yo messages (edits claps into every space in your text)'
        });

        this.addInfiniteArgs('words');
        this.minArgs = 1;
    }

    async run(msg){
        return msg.edit(msg.args.join(':clap:'));
    }
}

module.exports = ClapCommand;
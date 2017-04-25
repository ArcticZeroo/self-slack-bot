const config = require('../config');

class ClapCommand extends Command{
    constructor(){
        super('space', [], 'Spacify yo messages', CommandArg.getVariableArgs(3000, 'words', 'String'));
    }

    run(msg){
        // This is dumb but it works
        msg.edit(msg.args.join(' ').split('').join(' '));
    }
}

module.exports = ClapCommand;
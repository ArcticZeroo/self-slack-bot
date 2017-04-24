const config = require('../config');

class ClapCommand extends Command{
    constructor(){
        super('space', [], 'Spacify yo messages', CommandArg.getVariableArgs(3000, 'words', 'String'));
    }

    run(msg){
        msg.edit(msg.text.replace(config.bot.prefix+msg.commandName, '').split('').join(' '));
    }
}

module.exports = ClapCommand;
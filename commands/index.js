require('./globals');
const log = new (require('frozor-logger'))('COMMANDS');

// Return a new instance of any command given, automatically appends 'Command' if not set to false
function getCommand(name, addCommand = true) {
    return ( new (require(`./${name}${(addCommand) ? 'Command' : ''}`))() );
}

const CopypastaCommands = require('./CopypastaCommands');

module.exports = [

    // Regular Commands

    getCommand('Eval'),
    getCommand('SelfInfo'),
    getCommand('UserInfo'),
    getCommand('Clap'),
    getCommand('LastMessage'),
    getCommand('LolCounter'),
    getCommand('Ping'),
    getCommand('DisplayTime'),
    getCommand('Attachment'),
    getCommand('Space'),
    getCommand('Status'),
    getCommand('AnimatedStatus'),
    getCommand('Help'),

    ...CopypastaCommands
];
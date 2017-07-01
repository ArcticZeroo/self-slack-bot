require('./globals');

// Return a new instance of any command given, automatically appends 'Command' if not set to false
function getCommand(name, addCommand = true) {
    return ( new (require(`./${name}${(addCommand) ? 'Command' : ''}`))() );
}

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
    getCommand('Stop'),
    getCommand('RepeatText'),
    getCommand('CustomEmoji'),
    getCommand('EmojiLeaderboard'),
    getCommand('TeamInfo'),
    getCommand('BotInfo'),

    ...require('./CopypastaCommands'),
    ...require('./ImagePostCommands')
];
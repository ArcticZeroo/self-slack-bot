const ChatHandler = require('frozor-slackbot').ChatHandler;

module.exports = [
    [ChatHandler.getWildcardRegex('dooty'), (m)=> m.reply(':trumpet: :trumpet:')],
    [ChatHandler.getWildcardRegex('high noon|what time'), (m)=> m.reply('http://i.imgur.com/wv5Rew4.png')]
];
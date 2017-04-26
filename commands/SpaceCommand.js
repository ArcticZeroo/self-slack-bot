// Determine whether it's development, set it to a global variable
const DEVELOPMENT = global.DEVELOPMENT =  (process.env.NODE_ENV === 'dev');

// Load defs, so I can do things like Object.values if I need them anywhere in the bot.
require('./lib/defs');


const Logger = require('frozor-logger');
const {SlackBot, SlackCommandMessage, SlackMessage} = requi
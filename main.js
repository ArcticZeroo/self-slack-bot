// Determine whether it's development, set it to a global variable
const DEVELOPMENT = global.DEVELOPMENT =  (process.env.NODE_ENV === 'dev');

// Load defs, so I can do things like Object.values if I need them anywhere in the bot.
require('./lib/defs');


const Logger = require('frozor-logger');
const {SlackBot, ChatHandler, SlackCommandMessage, SlackMessage} = require('frozor-slackbot');

const {Command, CommandHandler} = require('frozor-commands');

SlackMessage.prototype.reply = function (text, shouldDelete = true, args = {}, cb) {
    if(shouldDelete){
        this.delete();
    }

    this.bot.chat(this.user.id, text, args, cb);
};

const commandHandler = new CommandHandler(null, {
    logger: function (msg, cmd, bot, success) {
        bot.api.storage.users.get(msg.user.id, (err, user)=>{
            if(!user){
                user = {name: 'Unknown', id: 'Unknown'}
            }

            let name = `${log.chalk.cyan(user.name)}${log.chalk.white('@')}${log.chalk.magenta(user.id)}`;

            bot.log.command(name + ' (Self)', cmd.name, `Slack (${bot.prefix})`, success);
        });

        return false;
    },
    minargs: (msg, cmd, bot)=>`Not enough arguments to run *${cmd.name}*! Usage: \`${cmd.getUsageStatement()}\``,
    maxargs: (msg, cmd, bot)=> `Too many arguments to run *${cmd.name}*! Usage: \`${cmd.getUsageStatement()}\``,
    error: (msg, cmd, bot, e)=> `Ran into an error while running *${cmd.name}*: \`\`\`${e}\`\`\``,
    nocommand: (msg, bot)=> `You tried to run *${msg.commandName}*, but that command doesn't exist.`
});

const log = global.log = new Logger();

const config = require('./config');
const commands = require('./commands');

let slackBots = {};
let commandExtra = { commandHandler };

function registerEvents(slackBot) {
    slackBot.api.once('message', (msg)=>{
        log.debug(`Setting first event on bot ${log.chalk.cyan(slackBot.prefix)}`);
        slackBot.firstEvent = msg.ts;
    });

    slackBot.api.on('message', (msg)=>{
        if(msg.subtype || msg.hasOwnProperty('edited')) return;

        if(msg.ts <= slackBot.firstEvent) return;

        if(slackBot.self && msg.user === slackBot.self.id){
            if(msg.text.startsWith(config.bot.prefix)){
                let commandMessage = new SlackCommandMessage(msg, slackBot, 0);

                commandMessage.commandName = commandMessage.commandName.replace(config.bot.prefix, '');

                slackBot.emit('command', commandMessage);
            }
        }

    });

    slackBot.on('command', (msg)=>{
        commandHandler.process(msg, commandExtra, slackBot);
    });
}

for(let command of commands){
    commandHandler.register(command);
}

function createBotFromPrefix(prefix) {
    let bot = new SlackBot(config.tokens[prefix], true, prefix.toUpperCase(), { customCommandHandling: true });

    bot.init();

    registerEvents(bot);

    slackBots[prefix.toUpperCase()] = bot;
}

if(DEVELOPMENT){
    createBotFromPrefix('SELF');
    slackBots.SELF.api.on('event', (e)=> log.debug(e));
}else{
    delete config.tokens['SELF'];

    for(let prefix of Object.keys(config.tokens)){
        createBotFromPrefix(prefix);
    }
}

commandExtra.slackBots = slackBots;
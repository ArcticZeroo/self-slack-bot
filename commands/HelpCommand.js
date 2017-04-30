const config = require('../config');

class HelpCommand extends Command{
    constructor(){
        super('help', ['commands'], 'Lists all commands.');
    }

    async run(msg, bot, extra){
        let response = 'Available Commands:';

        Object.entries(extra.commandHandler.commands)
            .filter((entry)=> entry[1].aliases.indexOf(entry[0]) === -1 && entry[1].type === 'command')
            .map((entry)=> ({name: entry[0], command: entry[1]}) )
            .sort((a, b)=> a.name.localeCompare(b.name))
            .forEach((entry)=>{
                response += `\n*${entry.command.name}* ${(entry.command.description) ? `- ${entry.command.description} ` : ''}| \`${config.bot.prefix}${entry.command.getUsageStatement()}\``;
            });

        msg.reply(response);
    }
}

module.exports = HelpCommand;
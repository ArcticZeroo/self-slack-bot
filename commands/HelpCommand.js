const config = require('../config');

class HelpCommand extends Command{
    constructor(){
        super('help', ['commands'], 'Lists all commands.');
    }

    run(msg, bot, extra){
        let response = 'Available Commands:';

        Object.entries(extra.commandHandler.commands)
            .map((entry)=> ({name: entry[0], command: entry[1]}) )
            .filter((entry)=> entry.command.aliases.indexOf(entry.name) == -1 && entry.command.type == 'command')
            .sort((a, b)=> a.name.localeCompare(b.name))
            .forEach((entry)=>{
                let command = entry.command;
                response += `\n*${command.name}* ${(command.description) ? `- ${command.description} ` : ''}| \`${config.bot.prefix}${command.getUsageStatement()}\``;
            });

        msg.reply(response);
    }
}

module.exports = HelpCommand;
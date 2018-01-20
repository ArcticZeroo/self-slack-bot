const config = require('../config');

class HelpCommand extends frozor.Command{
    constructor(){
        super({
            name: 'help',
            aliases: ['commands'],
            description: 'Lists all commands.'
        });
    }

    async run(msg, bot, extra){
        let response = 'Available Commands:';

        const done = [];

        const commands = extra.commandHandler.commands.keyArray().map(k => extra.commandHandler.commands.get(k)).sort((a, b) => a.name.localeCompare(b.name));

        for (const command of commands) {
            if (done.includes(command.name) || command.type !== 'command')
            {
                continue;
            }

            done.push(command.name);

            response += `\n*${command.name}* ${(command.description) ? `- ${command.description} ` : ''}| \`${config.bot.prefix}${command.getUsageStatement()}\``;
        }

        msg.reply(response);
    }
}

module.exports = HelpCommand;
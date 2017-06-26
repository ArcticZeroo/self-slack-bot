const {Command, CommandArg} = require('frozor-commands');

if (!global.frozor) {
    global.frozor = {};
}


frozor.Command = Command;
frozor.CommandArg = CommandArg;
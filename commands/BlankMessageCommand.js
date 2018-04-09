class BlankMessageCommand extends frozor.Command {
    constructor() {
        super({
            name: 'blank',
            aliases: ['blankmessage'],
            description: 'Send a blank message using the RTL character.'
        });

        this.maxArgs = Number.POSITIVE_INFINITY;
    }

    async run(msg, bot) {
        // Send a unicode character, in this case
        // the RTL unicode char.
        return msg.edit('\u202E');
    }
}

module.exports = BlankMessageCommand;
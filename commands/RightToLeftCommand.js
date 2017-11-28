class RightToLeftCommand extends frozor.Command {
    constructor() {
        super({
            name: 'rtl',
            aliases: ['righttoleft', 'reverse']
        });

        this.maxArgs = Number.POSITIVE_INFINITY;
    }

    async run(msg, bot) {
        return msg.edit('\u202E' + msg.args.slice(1).join(' '));
    }
}

module.exports = RightToLeftCommand;
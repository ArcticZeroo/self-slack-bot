class RightToLeftCommand extends frozor.Command {
    constructor() {
        super({
            name: 'rtl',
            aliases: ['righttoleft', 'reverse'],
            description: 'Sends all text right-to-left',
            args: [{
                name: 'Text',
                type: 'String[]'
            }]
        });

        this.maxArgs = Number.POSITIVE_INFINITY;
    }

    async run(msg, bot) {
        return msg.edit('\u202E' + msg.args.join(' '));
    }
}

module.exports = RightToLeftCommand;
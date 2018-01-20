const nodeyourmeme = require('nodeyourmeme');

class KnowYourMemeCommand extends frozor.Command {
    constructor() {
        super({
            name: 'knowyourmeme',
            description: 'Search information about a meme',
            aliases: ['kym', 'meme'],
            args: [{
                name: 'Search Term',
                type: 'String[]'
            }]
        });

        this.maxArgs = Number.POSITIVE_INFINITY;
    }

    async run(msg) {
        msg.edit('', { attachments: [{ color: '#FF9800', text: `Retrieving meme info...` }] });

        const searchTerm = msg.args.join(' ').toLowerCase();

        let promise;
        if (searchTerm === 'random' || searchTerm === 'random meme') {
            promise = nodeyourmeme.random();
        } else {
            promise = nodeyourmeme.search(searchTerm);
        }

        let info;
        try {
            info = await promise;
        } catch (e) {
            console.error(e);
            return msg.reply('Could not retrieve meme data, please try again later.');
        }

        return msg.edit('', { attachments: [{
            color: '#2196F3',
            text: info,
            title: searchTerm.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' '),
            footer: 'Know Your Meme'
        }] });
    }
}

module.exports = KnowYourMemeCommand;
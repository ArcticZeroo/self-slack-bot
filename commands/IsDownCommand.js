const snekfetch = require('snekfetch');
const cheerio = require('cheerio');

const SITE_MATCH = /<.*\|(.*)>/;
const DOWN_MATCH = /it&apos;s (not )?just you/i;

class IsDownCommand extends frozor.Command {
    constructor() {
        super({
            name: 'isup',
            aliases: ['isdown', 'downforeveryone'],
            args: [new frozor.CommandArg('Website', 'String')],
            description: 'Check whether a website is down or not'
        });
    }

    isDown(text) {
        return !!(DOWN_MATCH.exec(text)[1]);
    }

    async run(msg) {
        let site = msg.args[0];

        if (SITE_MATCH.test(site)) {
            site = SITE_MATCH.exec(site)[1];
        }

        let res;
        try {
            res = await snekfetch.get(`http://downforeveryoneorjustme.com/${site}`);
        } catch (e) {
            return msg.reply('Sorry, but I couldn\'t send a request to downforeveryoneorjustme.com, try again later?');
        }

        const $ = cheerio.load(res.text);

        const text = $('#content p').html();

        if (this.isDown(text)) {
            return msg.edit(`It's not just me, *${site}* seems to be down!`);
        } else {
            return msg.edit(`It's just me, *${site}* doesn't seem to be down.`);
        }
    }
}

module.exports = IsDownCommand;
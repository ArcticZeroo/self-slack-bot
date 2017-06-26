class DisplayTimeCommand extends frozor.Command{
    constructor(){
        super({
            name: 'time',
            aliases: ['mytime'],
            description: 'Sends a message with the host\'s time.'
        });
    }

    async run(msg){
        return msg.edit('', {attachments: [{mrkdwn_in: ['text'], color: Colors.MATERIAL_BLUE, text: `Right now, it is \`${new Date().toLocaleString()}\``}]});
    }
}

module.exports = DisplayTimeCommand;
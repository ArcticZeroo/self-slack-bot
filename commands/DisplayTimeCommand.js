class DisplayTimeCommand extends Command{
    constructor(){
        super('time', ['mytime'], 'Sends a message with the host\'s time.');
    }

    async run(msg){
        msg.edit('', {attachments: [{mrkdwn_in: ['text'], color: Colors.MATERIAL_BLUE, text: `Right now, it is \`${new Date().toLocaleString()}\``}]});
    }
}

module.exports = DisplayTimeCommand;
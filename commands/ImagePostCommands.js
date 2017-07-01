function getImagePostCommand(name, image, text, aliases = []) {
    class ImagePostCommand extends frozor.Command{
        constructor(){
            super({
                name, aliases,
                description: `Sends a ${name} copypasta`
            });

            this.image = image;
            this.text = text;
        }

        async run(msg, bot){
            return msg
                // Edit the message to have the URL, for those who can't or won't unfurl
                .edit(this.image)
                // Then, return the Promise for unfurling the same image, so that it'll be caught by the same 'catch'
                .then(r => bot.api.methods.chat.unfurl({channel: msg.channel, ts: message.ts, unfurls: { [this.image]: {text} }}))
                // Finally, call msg.error if something goes wrong. I think that exists.
                .catch(msg.error.bind(msg));
        }
    }

    return new ImagePostCommand();
}

const imageposts = [
    ['googleit', 'https://i.imgur.com/X20kba7.gif', 'GOOGLE IT'],
    ['bloodyhell', 'https://media.giphy.com/media/5yLgocEzAWWo8zFkq08/giphy.gif', 'BLOODY HELL']
];

module.exports = imageposts.map((a)=> getImagePostCommand.apply(null, a));

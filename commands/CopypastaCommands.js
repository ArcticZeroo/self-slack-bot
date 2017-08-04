function getCopypastaCommand(name, copypasta, aliases = []) {
    class CopypastaCommand extends frozor.Command{
        constructor(){
            super({
                name, aliases,
                description: `Sends a ${name} copypasta`
            });
        }

        async run(msg){
            return msg.edit(copypasta);
        }
    }

    return new CopypastaCommand();
}

const copypastas = [
    ['goodshit', `👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌there👌👌👌 right✔there ✔✔if i do ƽaү so my self 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit`],
    ['helicopter', `I sexually Identify as an Attack Helicopter. Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners. People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful. I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body. From now on I want you guys to call me “Apache” and respect my right to kill from above and kill needlessly. If you can’t accept me you’re a heliphobe and need to check your vehicle privilege. Thank you for being so understanding.`],
    ['lenny', '( ͡° ͜ʖ ͡°)'],
    ['donger', 'ヽ༼ຈل͜ຈ༽ﾉ', ['raiseit']],
    ['tableflip', '(╯°□°）╯︵ ┻━┻'],
    ['allowit', 'http://i.imgur.com/dVDJiez.gif', ['illallowit', 'i\'llallowit']],
    ['googleit', 'https://i.imgur.com/X20kba7.gif'],
    ['bloodyhell', 'https://media.giphy.com/media/5yLgocEzAWWo8zFkq08/giphy.gif']
];

module.exports = copypastas.map((a)=> getCopypastaCommand.apply(null, a));
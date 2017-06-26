const AnimatedStatuses = require('../config/status_frames');
const Animator = require('../lib/Animator');

class AnimatedStatusCommand extends frozor.Command{
    constructor(){
        super({
            name: 'animatestatus',
            aliases: ['animstatus', 'astatus'],
            description: 'Sets your animated status',
            args: [new frozor.CommandArg('status', 'String'), new frozor.CommandArg('interval', 'Number', false)]
        });
    }

    async run(msg, bot, extra){
        let parsed = frozor.CommandArg.parseCommandArgs(msg.args, this);

        let interval = 5000;
        if(!isNaN(parsed.interval)){
            interval = Math.max(5000, parseInt(parsed.interval));
        }

        parsed.status = parsed.status.toUpperCase();

        if (parsed.status === 'STOP') {
            bot.animatedStatus.stop();
            return msg.reply('Your animated status has stopped.');
        }

        if(!AnimatedStatuses.hasOwnProperty(parsed.status)){
            return msg.reply('That animated status does not exist!');
        }

        if(bot.animatedStatus != null){
            bot.animatedStatus.stop();
            bot.animatedStatus = null;
        }

        async function updateStatus(frame) {
            try{
                await bot.api.methods.users.profile.set({ profile: { status_emoji: `:${frame}:` } });
            }catch (e){
                log.error(`Unable to update an animated status frame: ${e}`);
            }
        }

        bot.animatedStatus = new Animator(AnimatedStatuses[parsed.status], updateStatus, interval);
        bot.animatedStatus.start();

        return msg.reply(`Your status is now being animated with the *${parsed.status}* animation.`);
    }
}

module.exports = AnimatedStatusCommand;
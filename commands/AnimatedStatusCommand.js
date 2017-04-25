const AnimatedStatuses = require('../config/status_frames');
const Animator = require('../lib/Animator');

class AnimatedStatusCommand extends Command{
    constructor(){
        super('animatestatus', ['animstatus', 'astatus'], 'Sets your animated status.', [new CommandArg('status', 'String'), new CommandArg('interval', 'Number', false)]);
    }

    run(msg, bot, extra){
        let parsed = CommandArg.parseCommandArgs(msg.args, this);

        let interval = 5000;
        if(!isNaN(parsed.interval)){
            interval = Math.max(5000, parseInt(parsed.interval));
        }

        parsed.status = parsed.status.toUpperCase();

        if(!AnimatedStatuses.hasOwnProperty(parsed.status)){
            msg.reply('That animated status does not exist!');
            return;
        }

        if(bot.animatedStatus != null){
            bot.animatedStatus.stop();
            bot.animatedStatus = null;
        }

        function updateStatus(frame) {
            bot.api.methods.users.profile.set({ profile: { status_emoji: `:${frame}:` } });
        }

        bot.animatedStatus = new Animator(AnimatedStatuses[parsed.status], updateStatus, interval);
        bot.animatedStatus.start();

        msg.reply(`Your status is now being animated with the *${parsed.status}* animation.`);
    }
}

module.exports = AnimatedStatusCommand;
const { Attachment, Field } = require('frozor-slack-attachments');

class EvalCommand extends Command{
    constructor(){
        super('eval', ['evaluate', 'run', 'exec'], 'Evaluates JS... scary!', CommandArg.getVariableArgs(3000, 'terms', 'String'));
    }

    run(msg, bot, extra) {
        const start = Date.now();

        const result = new Attachment().addMarkdownField('text').addMarkdownField('fields');

        try {
            let output = eval(msg.args.join(' '));

            if (output.length > 2900) {
                output = output.splice(0, 2900) + ' [...]'
            }

            const end = Date.now();

            const time = end - start;

            result
                .setColor('good')
                .addField(new Field().setTitle('Output').setValue(`\`\`\`${output}\`\`\``))
                .addField(new Field().setTitle('Execution Time').setValue(time + ' ms'))
        } catch (e) {
            result
                .setColor('danger')
                .setText(`*Execution Error*: \`\`\`${e}\`\`\``);
        }

        msg.edit(`*Input:* \`${msg.args.join(' ')}\``, {attachments: [result]});
    }
}

module.exports = EvalCommand;
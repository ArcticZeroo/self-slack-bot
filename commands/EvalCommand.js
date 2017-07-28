const now = require('performance-now');
const { Attachment, Field } = require('frozor-slack-attachments');

class EvalCommand extends frozor.Command{
    constructor(){
        super({
            name: 'eval',
            aliases: ['run', 'evaluate', 'js', 'exec'],
            description: 'Evaluates JS... scary!',
            args: frozor.CommandArg.getVariableArgs(3000, 'terms', 'String')
        });
    }

    async run(msg, bot, extra) {
        const start = now();

        const result = new Attachment()
            .addMarkdownField('fields')
            .addField(new Field().setTitle('Input').setValue(`\`\`\`${msg.args.join(' ')}\`\`\``));

        try {
            let output = eval(msg.args.join(' '));

            if (output.length > 2900) {
                output = output.slice(0, 2900) + ' [...]'
            }

            const end = now();

            const time = end - start;

            result
                .setColor('good')
                .addField(new Field().setTitle('Output').setValue(`\`\`\`${output}\`\`\``))
                .setFooter(`Execution Time: ${time.toFixed(2)} ms`)
        } catch (e) {
            result
                .setColor('danger')
                .addField(new Field().setTitle('Execution Error').setValue(`\`\`\`${e}\`\`\``));
        }

        msg.edit('', {attachments: [result]});
    }
}

module.exports = EvalCommand;
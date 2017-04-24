class EvalCommand extends Command{
    constructor(){
        super('eval', ['evaluate'], 'Evaluates JS... scary!', CommandArg.getVariableArgs(3000, 'terms', 'String'));
    }

    run(msg, bot, extra){
        const start = Date.now();

        const output = eval(msg.args.join(' '));

        const end = Date.now();

        const time = end - start;

        msg.edit(`Eval Output:\n\`\`\`${output}\`\`\`\nExecution time: \`${time} ms\``);
    }
}

module.exports = EvalCommand;
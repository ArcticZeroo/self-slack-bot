const { docs } =  require('frozor-commands');
const commands = require('../commands');

console.log('Generating docs...');

docs({ commands, output: { path: '../docs/commands/' } }).then(() => console.log('Finished! Check docs/commands')).catch(console.error);
# Self-Slack-Bot
Self bot for slack, written in node.js!

##Requirements
(These are installed automatically via npm)
* frozor-slackbot
* frozor-slack
* frozor-websocket
* frozor-logger
* frozor-commands
* Probably something else I forget and am too lazy to look at my package.json for

Lots of frozor! They laughed at me when I spent hours writing my own slack API when 50 of them exist for node, but who's laughing now? Can your API put spaces between every character in your message? Probably, but mine is BETTER!

##Installation:
```cmd
git clone https://github.com/ArcticZeroo/self-slack-bot
cd self-slack-bot
npm i
```
In order to actually use the the bot, you need to create a file named `tokens.js` inside the `config` folder. Inside this file, you will export an object containing tokens for all the slack orgs you want to use the bot in. 

Tokens can be created [here](https://api.slack.com/custom-integrations/legacy-tokens). Ensure you do not share your token, because it can be used to read and send messages as yourself, among other things.

`tokens.js` should look something like this:

```javascript
module.exports = {
    SLACKBOT_PREFIX: 'SLACK_TOKEN',
    PREFIX_TWO: 'SLACK_TOKEN_TWO'
}
```

Where the key is the prefix the created slackbot will have, and the value is the token the slackBot will use.

If you're adding new commands, consider adding a token with the key `SELF` and setting `NODE_ENV=dev`, which will automatically only start the `SELF` token. When the script runs outside of `NODE_ENV=dev`, `SELF` is removed from the array and is thereby not initialized unless in development mode. 

##Commands
By default, to run a command you should type `!!<command> [args]` at the beginning of a message. To change this, edit the `prefix` key in `config/bot.js`.

Commands can ONLY be run by the user whose tokens are supplied in `tokens.js`.

If a command fails for any reason (does not exist, invalid arg count, something threw an error), the message you sent to ran the command will be *deleted*, and a message will be sent in DM explaining the issue.

If a command succeeds, the original will be edited to reflect the output of that given command.

Available commands:
* attach
    * This directly takes your arguments (e.g. title=hello) and converts them to a slack attachment. Use slack's attachment API to make these.
* clap
    * Takes👏all👏your👏args👏(text)👏and👏puts👏claps👏between👏them
* copypasta
    * Prints a predefined copypasta. These are actually separate commands (e.g. helicopter is !!helicopter)
        * helicopter
            * The "I sexually identify as an attack helicopter" thing
        * good shit
            * You know what this is
        * lenny
        * raiseit
        * donger
* time
    * prints the time the server is running on. Should probably change this to be based on slack profile settings, will do later.
* eval
    * Evaluates given args and edits to show execution time and return value. Can use this to perform slack API tasks under your token by accessing `msg.bot.api.methods[the_method](args)`
* last
    * Takes a username or mention as an argument and finds their last sent message.
* lol
    * Takes a username or mention as an argument and finds how many times they've sent lol
* ping
    * Gets ping to slack in ms (pretty sure this is inaccurate)
* self
    * Gets self information
* space
    * p u t s   s p a c e s  b e t w e e n   a l l   o f   y o u r   t e x t
* status (WIP)
    * Will set status text / emoji. Options will be specifiable in the command on whether or not it should set text, emoji, or both, and whether it should propogate across all bots set up in `tokens.js`
* user
    * takes a username or slack mention as an argument, and returns info about them.
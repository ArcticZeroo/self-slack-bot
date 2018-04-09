# Self-Slack-Bot

Self bot for slack, written in node.js!

## Features

* Commands that can only be activated by you!
* Multi-org (team) support
* Made by a cool guy who has cool APIs
* Very easy to add new commands

## Requirements

(These are installed automatically via npm)
* frozor-slackbot
* frozor-slack
* frozor-websocket
* frozor-logger
* frozor-commands
* Probably something else I forget and am too lazy to look at my package.json for

Lots of frozor! They laughed at me when I spent hours writing my own slack API when 50 of them exist for node, but who's laughing now? Can your API put spaces between every character in your message? Probably, but mine is BETTER!

## Installation:

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
    PREFIX_1: 'SLACK_TOKEN_1',
    PREFIX_2: 'SLACK_TOKEN_2'
}
```

Where the key is the prefix the created slackbot will have, and the value is the token the slackBot will use.

If you're adding new commands and would like to test them before deploying, consider adding a token with the key `SELF` and setting `NODE_ENV=dev`, which will automatically only start the `SELF` token. When the script runs outside of `NODE_ENV=dev`, `SELF` is removed from the array and is thereby not initialized unless in development mode.

Once you've run `npm i` and set up `config/tokens.js`, just run `node main`! It's a bit spammy at first if you have a lot of slack orgs/teams, but after that it quiets down.

## Commands

By default, to run a command you should type `!!<command> [args]` at the beginning of a message. To change this, edit the `prefix` key in `config/bot.js`.

Commands can ONLY be run by the user whose tokens are supplied in `tokens.js`.

If a command fails for any reason (does not exist, invalid arg count, something threw an error), the message you sent to ran the command will be *deleted*, and a message will be sent in DM explaining the issue.

If a command succeeds, the original will be edited to reflect the output of that given command.

Named arguments (such as those required in the attach command) can be formatted as `key=value`, `key="value with spaces"`, `--key value`, `--key value with spaces`.

For instance:
```cmd
!!attach title=hello text=world color=#2196f3
```

or
```cmd
!!attach --title Hello World --text What's up --color #2196F3
```

Available commands:
_Note: These docs are outdated. Check out each command's documentation in [docs/commands](docs/commands)_

* animatestatus
    * Animates your status. Slack updates status every 5 seconds, and mobile doesn't seem to update often. You can specify the frame time but if it's too short it'll basically be skipped. 
    * `!!animatestatus <ANIMATION_NAME> [Optional INTERVAL in ms]`
    * default animations are `CATS` and `WEATHER`, add more in `config/status_frames.js`
* attach
    * This directly takes your arguments (e.g. title=hello) and converts them to a slack attachment. Use slack's attachment API to make these.
* clap
    * Takes👏all👏your👏args👏(text)👏and👏puts👏claps👏between👏them
* copypasta
    * Prints a predefined copypasta. These are actually separate commands (e.g. helicopter is `!!helicopter`)
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
    * e.g. `!!space put spaces between my text`
* status
    * Sets your status text / emoji. If only one is specified the other is nulled. Uses command arguments.
    * Arguments:
        * emoji: sets the emoji if set
        * text: sets the text if set
        * propagate: if true, all running slack bots will also set your status to the same thing.
* stop
    * exits the process. If you're running this in pm2 or another process manager, it will restart the bots.
* repeat
    * Repeats specified text a specified number of times. This uses command arguments. 
    * Required arguments are text and count, and space may be used as an additional argument to add spaces between repeated text.
        * e.g. `!!repeat --text My Text --count 10 --space true`
* user
    * takes a username or slack mention as an argument, and returns info about them.
    
## Add New Commands

To add a new command, you need to do the following:

* Create the command class somewhere in the code (I put separate commands in their own .js files)
    * Documentation for commands can be found at the [frozor-commands](https://github.com/ArcticZeroo/frozor-commands) repo.
* Instantiate the command class (I put them all inside commands/index.js by running getCommand, which I recommend you do if it's inside commands/ for ease of use)
* Register it in the command handler (if you've put it inside commands/index.js, it is automatically registered for you, so you can skip this step)

Check out any of the commands provided in `commands/` for some examples. It's pretty simple.

To edit a message, call `message.edit(newText)` (this is async). To delete the message and send something to the user's DMs, call `message.reply(messageToSendToTheirDMs)`. If you don't want to delete the message, add a boolean as the second parameter (the value in this case would be `false` for `shouldDelete`).

Further explanation might be found in any of the repositories for anything this bot requires:
* [frozor-commands](https://github.com/ArcticZeroo/frozor-commands)
* [frozor-slackbot](https://github.com/ArcticZeroo/frozor-slackbot)
* [frozor-slack](https://github.com/ArcticZeroo/frozor-slack)

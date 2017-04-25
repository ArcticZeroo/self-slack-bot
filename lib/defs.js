Object.each = function (obj, cb) {
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            cb(obj[prop], prop);
        }
    }
};

Object.values = function (obj) {
    let values = [];

    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            values.push(obj[prop]);
        }
    }

    return values;
};

Object.entries = function (obj) {
    let entries = [];

    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            entries.push([prop, obj[prop]]);
        }
    }

    return entries;
};

const regex = global.globalRegex = {
    MINECRAFT_NAME: /^([A-Z0-9_]{1,16}|\$)$/i,
    SLACK_MENTION: /^<@([U][A-Z0-9]{8})>$/,
    SLACK_ID: /^([U][A-Z0-9]{8})$/,
    SLACK_EMOJI: /^:([A-Za-z]+):$/
};

String.prototype.isValidMinecraftName = function () {
    return regex.MINECRAFT_NAME.test(this);
};

String.prototype.isValidSlackMention = function () {
    return regex.SLACK_MENTION.test(this);
};

String.prototype.getSlackIdFromMention = function () {
    let exec = regex.SLACK_MENTION.exec(this);

    return exec ? exec[1] : null;
};

String.prototype.isValidSlackId = function () {
    return regex.SLACK_ID.test(this);
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random()*this.length)];
};

String.prototype.toBoolean = function () {
    return (this.toLowerCase() === 'true')
};
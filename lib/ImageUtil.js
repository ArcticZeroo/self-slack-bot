// Request has to be in cache anyways, so we'll load it
let request = require('request');
// Wait till requested to load this
let colorThief;

function getImageFromUrl(url, cb) {
    request(url, (err, res, body)=>{
        if(err){
            cb(err);
        }else if(!res.statusCode.toString().startsWith('2')){
            cb(res.statusCode);
        }else{
            cb(body);
        }
    })
}

function getDominantColor(img) {
    if(!colorThief){
        colorThief = require('color-thief')
    }

    return colorThief.getColor(img);
}

function getDominantColorFromUrl(url, cb) {
    getImageFromUrl(url, (err, img)=>{
        if(err){
            cb(err);
        }else{
            cb(null, getDominantColor(img));
        }
    });
}

getDominantColorFromUrl('https://a.slack-edge.com/66f9/img/avatars-teams/ava_0016-34.png', (err, color)=>{
    if(err){
        console.log(err)
    }else{
        console.log(color);
    }
});
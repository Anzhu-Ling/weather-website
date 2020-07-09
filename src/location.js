const request = require('request')

const location = (callback) =>{
    let url = `http://api.ipstack.com/check?access_key=64ea2151d2396b088f26f1dc8da85d16&format=1`
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback(error, undefined)
        }
        else if(body.length==0){
            callback("Unable to retrieve location", undefined)
        }
        else{
            let data = body
            callback(undefined, data)
        }
    })
}

module.exports = location;
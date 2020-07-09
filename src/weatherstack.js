const request = require('request')
const chalk = require('chalk')

const weatherstack = (longitude,latitude,callback) => {
        let url = `http://api.weatherstack.com/current?access_key=1253db601b50363aa938e20ccb1aa730&query=${latitude},${longitude}&units=f`
        //console.log(url)
        request({url: url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to weather service', undefined)
            }
            else if (body.error){
                callback(body.error.info, undefined)
            }
            else{
                callback(undefined, body)
            }
        })
}

module.exports = weatherstack
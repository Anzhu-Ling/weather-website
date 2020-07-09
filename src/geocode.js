const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => { 
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW56aHVsIiwiYSI6ImNrYmltMDlpbzBncWkyb3FuNWFqOHdlemkifQ.KUoAaoSET1DPQntF56p6tA&limit=1`
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to geocode service', undefined)
        }
        else if(body.length==0){
            callback("unable to find location", undefined)
        }
        else{ 
            let data =[body.features[0].center[0],body.features[0].center[1],body.features[0].text]
            callback(undefined, data)
        }
    })
}

module.exports=geocode
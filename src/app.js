const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode.js');
const weatherstack = require('./weatherstack.js');
const location = require('./location.js')

const app = express()
const port = process.env.PORT || 3000

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'))
//app.set('partials', path.join(__dirname, '../templates/partials'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//set up static director to get files from
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) =>{
    /*ocation((error, data) => {
        if (error){
            return res.send({
                error: error
            })
        }
        let locationData = data;
        weatherstack(data.longitude, data.latitude, (error, weatherdata)=>{
            if (error){
                return res.send({
                    error: error
                })
            }
            res.render('index',{
                font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
                title: 'Home',
                name: 'Anzhu Ling',
                location: locationData.city,
                temperature: weatherdata.current.temperature,
                feelsLike: weatherdata.current.feelslike,
                humidity: `${weatherdata.current.humidity}%`,
                windSpeed: weatherdata.current.wind_speed
            })
        })
    })*/
    res.render('index', {
            font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
            title: 'Home',
            name: 'Anzhu Ling',
            location: "El Dorado",
            temperature: 84,
            feelsLike: 90,
            humidity: `85%`,
            windSpeed: 44
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
        title: 'Help',
        name: 'Anzhu Ling'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
        title: 'About',
        name: 'Anzhu Ling'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.location){
        return res.send({
            error: 'you must provide a location'
        })
    }
    location((error, data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        geocode(req.query.location, (error, data = {})=>{
            if (error){
                return res.send({
                    error: error
                })
            }
               weatherstack(data[0],data[1],(error, data)=>{
                if (error){
                    return res.send({
                        error: error
                    })
                }
                    res.send({
                        address: req.query.location,
                        weather: data
                    })
                })
        });
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
        title: 404,
        error: "Help article not found",
        name: 'Anzhu Ling'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        font: "https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap",
        title: 404,
        error: "Page not found",
        name: 'Anzhu Ling'
    })
})


app.listen(port, ()=>{
    console.log('Server running on port 3000')
})
//jshint esversion:6
const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Gurugram&appid=e812f1522c15640288b552b716139b71&units=metric"
    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp
            //console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[1].icon
            const imageURL = "https://openweathermap.org/img/wn" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temparture in gurugram is " + temp + "degree Celcius.</h1>")
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    });
})


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})

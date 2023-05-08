const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const { request } = require("http");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) =>{
    // console.log(req.body.cityNames);

    const cityName = req.body.cityNames;
    const appID = "fcf162a3767df42acd31cc536d7dd70c";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",ng&appid=" + appID + "&units=" + units;

    https.get(url, (response) => {
        // console.log(response.statusCode);
        // console.log(url);

        response.on("data", (data) =>{ // I used an arrow function as a callback function for the JSON.parse method
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log("This is the temperature of lagos: " + temp);
            // console.log("This is the weather description: " + weatherDescription);
            // response.write("test content");
            
            //res.send("<h1>The temperature in Lagos is: " + temp + " degrees Celcius. <br/><br/>The weather is currently: " + weatherDescription + " </h1>");
            // We can use the multiple write methods to send to send data to the client side
            // but ensure to have the send() method
            res.send("<img src="+ imageURL + ">" + "<h1>The temperature in " + cityName +" is: " + Math.floor(temp) + " degrees Celcius. <br/><br/>The weather is currently: " + weatherDescription + " </h1>");
        })
    })
    // res.send("Server is running"); we cannot have more than one send methods 
    //

})

app.listen(3000, function () {
    console.log("Server started on port 3000");
})

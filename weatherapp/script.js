const apiKey = "6084ac3cacd44c118e5114020260306";

function updateTime(){

    const now = new Date();

    document.getElementById("dateTime")
    .innerHTML =
    now.toLocaleString();
}

setInterval(updateTime,1000);

updateTime();

async function getWeather(){

    const city =
    document.getElementById("cityInput").value;

    if(city === ""){

        alert("Please enter a city name");
        return;
    }

    const url =
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes`;

    try{

        const response =
        await fetch(url);

        const data =
        await response.json();

        document.getElementById("cityName")
        .innerText =
        `${data.location.name},
         ${data.location.country}`;

        document.getElementById("temperature")
        .innerText =
        `${data.current.temp_c}°C`;

        document.getElementById("condition")
        .innerText =
        data.current.condition.text;

        document.getElementById("humidity")
        .innerText =
        `${data.current.humidity}%`;

        document.getElementById("wind")
        .innerText =
        `${data.current.wind_kph} km/h`;

        document.getElementById("feelsLike")
        .innerText =
        `${data.current.feelslike_c}°C`;

        document.getElementById("weatherIcon")
        .src =
        "https:" +
        data.current.condition.icon;

        document.getElementById("sunrise")
        .innerText =
        data.forecast.forecastday[0]
        .astro.sunrise;

        document.getElementById("sunset")
        .innerText =
        data.forecast.forecastday[0]
        .astro.sunset;

        const weather =
        data.current.condition.text
        .toLowerCase();

        if(weather.includes("sunny")){

            document.body.className =
            "sunny";
        }

        else if(
            weather.includes("rain")
        ){

            document.body.className =
            "rainy";
        }

        else{

            document.body.className =
            "cloudy";
        }

    }

    catch(error){

        alert(
            "City not found!"
        );

        console.log(error);
    }
}
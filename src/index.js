/* ---API CODE - split into api file--- */
let searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', () =>    {
    let citySearch = document.getElementById("search-input");
    let city = citySearch.value;
    getCoordinates(city);
})

let tempUnit = 'imperial';
getCoordinates('nashville'); //On window load.

async function getCoordinates(searchedCity) {

    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=e8e4472081188c6fed6d3fafb70a83a0', {mode: 'cors'});
    
    try {
        const coordData = await response.json();
        const latitude = coordData[0].lat;
        const longitude = coordData[0].lon;
        const cityName = coordData[0].name;
        const state = coordData[0].state;
        const country = coordData[0].country;
        cityDisplay(cityName, state, country);
        getWeather(latitude, longitude);
    } catch {
        alert('Please enter a valid city name!')
    }
}

async function getWeather(lat, lon) {
    getTempUnits();
    console.log(tempUnit)
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=e8e4472081188c6fed6d3fafb70a83a0&units=' + tempUnit);
    const weatherData = await response.json();
    
    let currentTemp = weatherData.main.temp;
    let feelsLikeTemp = weatherData.main.feels_like;
    let humidity = weatherData.main.humidity;
    let mainDescription = weatherData.weather[0].main;



    weatherDisplay(mainDescription);
    tempDisplay(currentTemp, feelsLikeTemp);
    indicatorDisplay(humidity);
}

/* ---DOM CODE - split into dom file--- */
function cityDisplay(city, state, country)  {
    const cityName = document.getElementById("city-name");
    if (state === undefined) {
        cityName.textContent = `${city}, ${country}`;
    } else {
        cityName.textContent = `${city}, ${state}`;
    }
}

function weatherDisplay(weather)    {
    const weatherText = document.getElementById("weather-text");
    weatherText.textContent = weather;
    
    clearWeatherDisplay();
    setWeatherDisplay(weather);
}

function clearWeatherDisplay()  {
    const weatherIcon = document.getElementById("wi");
    weatherIcon.classList.remove("wi-owm-800")
    weatherIcon.classList.remove("wi-cloudy")
    weatherIcon.classList.remove("wi-rain")
    weatherIcon.classList.remove("wi-snow")
    weatherIcon.classList.remove("wi-day-sprinkles")
}

function setWeatherDisplay(weather){
    const weatherIcon = document.getElementById("wi");
    switch (weather) {
        case "Clear":
            weatherIcon.classList.add("wi-owm-800");
            break;
        case "Clouds":
            weatherIcon.classList.add("wi-cloudy");            
            break;
        case "Rain":
            weatherIcon.classList.add("wi-rain");
            break;
        case "Snow":
            weatherIcon.classList.add("wi-snow");
            break;
        case "Mist":
            weatherIcon.classList.add("wi-day-sprinkle");
            break;
        } 
}

function tempDisplay(temp, feelsLikeTemp)   {
    const temperature = document.getElementById("temperature");
    const feelsLikeTempDisplay = document.getElementById("feels-like-temp-display");

    temperature.textContent = Math.round(temp);
    feelsLikeTempDisplay.textContent =  Math.round(feelsLikeTemp);
}


function indicatorDisplay(hum) {
    const humidity = document.getElementById("humidity-percent");
    humidity.textContent = `Humidity: ${hum}%`;
}


//Overall function of  code;

function getTempUnits()    {
    const tempSelection = document.querySelectorAll(".temp-selection");
    const farenheit = document.getElementById("f-button");
    
    for(let i = 0; i < tempSelection.length; i++)    {
        tempSelection[i].addEventListener('click', () =>  {
            console.log('ji')
            for(let i = 0; i < tempSelection.length; i++)   {
                tempSelection[i].classList.remove("active");
            }
            tempSelection[i].classList.add("active");
            if (farenheit.classList.contains("active"))    {
                return tempUnit = "imperial";
            } else {
                return tempUnit = "metric";
            }
        })
    }
}

function changeUnits()   {
    const tempSelection = document.querySelectorAll(".temp-selection");
    const temperature = document.getElementById("temperature");
    const feelsLikeTempDisplay = document.getElementById("feels-like-temp-display");
    
    for(let i = 0; i < tempSelection.length; i++)    {
        tempSelection[i].addEventListener('click', () =>  {
            if (tempSelection[i].id === "f-button") {
                let oldTemp = temperature.textContent;
                let newTemp= Math.round((oldTemp * (9/5) + 32));
                temperature.textContent = newTemp;

                let oldFeelsLike = feelsLikeTempDisplay.textContent;
                let newFeelsLike = Math.round((oldFeelsLike * (9/5) + 32));
                feelsLikeTempDisplay.textContent = newFeelsLike;

            } else {
                let oldTemp = temperature.textContent;
                let newTemp = Math.round((oldTemp - 32) * (5/9));
                temperature.textContent = newTemp;

                let oldFeelsLike = feelsLikeTempDisplay.textContent;
                let newFeelsLike = Math.round((oldFeelsLike  - 32) * (5/9))
                feelsLikeTempDisplay.textContent = newFeelsLike;
            }
        })
    }
}

changeUnits();
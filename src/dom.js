//Handles displaying city name, with state or country name, depending on if there is a state name provided
export function cityDisplay(city, state, country)  {
    
    const cityName = document.getElementById("city-name");
    
    if (state === undefined) {
        cityName.textContent = `${city}, ${country}`;
    } else {
        cityName.textContent = `${city}, ${state}`;
    }
}

//Handles displaying the weather image and name
export function weatherDisplay(weather)    {

    const weatherText = document.getElementById("weather-text");
    weatherText.textContent = weather;
    
    clearWeatherDisplay();
    setWeatherDisplay(weather);
}

//Clears class list of all weather types so multiple do not get added to the class name
function clearWeatherDisplay()  {

    const weatherIcon = document.getElementById("wi");
    weatherIcon.classList.remove("wi-owm-800")
    weatherIcon.classList.remove("wi-cloudy")
    weatherIcon.classList.remove("wi-rain")
    weatherIcon.classList.remove("wi-snow")
    weatherIcon.classList.remove("wi-day-sprinkles")
}

//Sets weather image based off weather type
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

//Rounds and displays temp received from fetch request
export function tempDisplay(temp, feelsLikeTemp)   {

    const temperature = document.getElementById("temperature");
    const feelsLikeTempDisplay = document.getElementById("feels-like-temp-display");

    temperature.textContent = Math.round(temp);
    feelsLikeTempDisplay.textContent =  Math.round(feelsLikeTemp);
}

//Displays humidity received from fetch request
export function indicatorDisplay(hum) {

    const humidity = document.getElementById("humidity-percent");
    humidity.textContent = `Humidity: ${hum}%`;
}

export function changeUnits()   {

    const tempSelection = document.querySelectorAll(".temp-selection");
    const temperature = document.getElementById("temperature");
    const feelsLikeTempDisplay = document.getElementById("feels-like-temp-display");
    
    for(let i = 0; i < tempSelection.length; i++)    {

        //Asigns a click function to each temp button that changes the temp and feels like temp.
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
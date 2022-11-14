import * as dom from './dom';

//  On window load, set tempUnit to 'imperial', set city to 'nashville'
let tempUnit = 'imperial';
getCoordinates('nashville');

//Gets coordinates for inputted city
export async function getCoordinates(searchedCity) {

    const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=e8e4472081188c6fed6d3fafb70a83a0', {mode: 'cors'});
    
    try {
        const coordData = await response.json();
        const latitude = coordData[0].lat;
        const longitude = coordData[0].lon;
        const cityName = coordData[0].name;
        const state = coordData[0].state;
        const country = coordData[0].country;
        dom.cityDisplay(cityName, state, country);
        getWeather(latitude, longitude);
    } 

    //Handles invalid or blank city inputs
    catch {
        alert('Please enter a valid city name!')
    }
}

//Gets weather from coordinates
async function getWeather(lat, lon) {
    
    // Gets temp unit based off active temp button.
    getTempUnits();

    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=e8e4472081188c6fed6d3fafb70a83a0&units=' + tempUnit);
    const weatherData = await response.json();
    
    let currentTemp = weatherData.main.temp;
    let feelsLikeTemp = weatherData.main.feels_like;
    let humidity = weatherData.main.humidity;
    let mainDescription = weatherData.weather[0].main;

    dom.weatherDisplay(mainDescription);
    dom.tempDisplay(currentTemp, feelsLikeTemp);
    dom.indicatorDisplay(humidity);
}

function getTempUnits()    {
    const tempSelection = document.querySelectorAll(".temp-selection");
    const farenheit = document.getElementById("f-button");
    
    for(let i = 0; i < tempSelection.length; i++)    {

        //Assigns a temp unit to each temp button that changes the active status and returns a tempUnit
        tempSelection[i].addEventListener('click', () =>  {
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
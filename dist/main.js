/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsNkJBQTZCOztBQUU3Qjs7QUFFQSx3SkFBd0osYUFBYTtBQUNySztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxLQUFLLElBQUksUUFBUTtBQUNuRCxNQUFNO0FBQ04sa0NBQWtDLEtBQUssSUFBSSxNQUFNO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx3Q0FBd0MsSUFBSTtBQUM1Qzs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tQVBJIENPREUgLSBzcGxpdCBpbnRvIGFwaSBmaWxlLS0tICovXG5sZXQgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnV0dG9uXCIpO1xuXG5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAgICB7XG4gICAgbGV0IGNpdHlTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1pbnB1dFwiKTtcbiAgICBsZXQgY2l0eSA9IGNpdHlTZWFyY2gudmFsdWU7XG4gICAgZ2V0Q29vcmRpbmF0ZXMoY2l0eSk7XG59KVxuXG5sZXQgdGVtcFVuaXQgPSAnaW1wZXJpYWwnO1xuZ2V0Q29vcmRpbmF0ZXMoJ25hc2h2aWxsZScpOyAvL09uIHdpbmRvdyBsb2FkLlxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb29yZGluYXRlcyhzZWFyY2hlZENpdHkpIHtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JyArIHNlYXJjaGVkQ2l0eSArICcmbGltaXQ9MSZhcHBpZD1lOGU0NDcyMDgxMTg4YzZmZWQ2ZDNmYWZiNzBhODNhMCcsIHttb2RlOiAnY29ycyd9KTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb29yZERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnN0IGxhdGl0dWRlID0gY29vcmREYXRhWzBdLmxhdDtcbiAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gY29vcmREYXRhWzBdLmxvbjtcbiAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBjb29yZERhdGFbMF0ubmFtZTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBjb29yZERhdGFbMF0uc3RhdGU7XG4gICAgICAgIGNvbnN0IGNvdW50cnkgPSBjb29yZERhdGFbMF0uY291bnRyeTtcbiAgICAgICAgY2l0eURpc3BsYXkoY2l0eU5hbWUsIHN0YXRlLCBjb3VudHJ5KTtcbiAgICAgICAgZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGNpdHkgbmFtZSEnKVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsYXQsIGxvbikge1xuICAgIGdldFRlbXBVbml0cygpO1xuICAgIGNvbnNvbGUubG9nKHRlbXBVbml0KVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0nICsgbGF0ICsgJyZsb249JyArIGxvbiArICcmYXBwaWQ9ZThlNDQ3MjA4MTE4OGM2ZmVkNmQzZmFmYjcwYTgzYTAmdW5pdHM9JyArIHRlbXBVbml0KTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICBsZXQgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXA7XG4gICAgbGV0IGZlZWxzTGlrZVRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgbGV0IGh1bWlkaXR5ID0gd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBsZXQgbWFpbkRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5tYWluO1xuXG5cblxuICAgIHdlYXRoZXJEaXNwbGF5KG1haW5EZXNjcmlwdGlvbik7XG4gICAgdGVtcERpc3BsYXkoY3VycmVudFRlbXAsIGZlZWxzTGlrZVRlbXApO1xuICAgIGluZGljYXRvckRpc3BsYXkoaHVtaWRpdHkpO1xufVxuXG4vKiAtLS1ET00gQ09ERSAtIHNwbGl0IGludG8gZG9tIGZpbGUtLS0gKi9cbmZ1bmN0aW9uIGNpdHlEaXNwbGF5KGNpdHksIHN0YXRlLCBjb3VudHJ5KSAge1xuICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LW5hbWVcIik7XG4gICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBgJHtjaXR5fSwgJHtjb3VudHJ5fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBgJHtjaXR5fSwgJHtzdGF0ZX1gO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gd2VhdGhlckRpc3BsYXkod2VhdGhlcikgICAge1xuICAgIGNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLXRleHRcIik7XG4gICAgd2VhdGhlclRleHQudGV4dENvbnRlbnQgPSB3ZWF0aGVyO1xuICAgIFxuICAgIGNsZWFyV2VhdGhlckRpc3BsYXkoKTtcbiAgICBzZXRXZWF0aGVyRGlzcGxheSh3ZWF0aGVyKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJXZWF0aGVyRGlzcGxheSgpICB7XG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpXCIpO1xuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1vd20tODAwXCIpXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LnJlbW92ZShcIndpLWNsb3VkeVwiKVxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1yYWluXCIpXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LnJlbW92ZShcIndpLXNub3dcIilcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwid2ktZGF5LXNwcmlua2xlc1wiKVxufVxuXG5mdW5jdGlvbiBzZXRXZWF0aGVyRGlzcGxheSh3ZWF0aGVyKXtcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lcIik7XG4gICAgc3dpdGNoICh3ZWF0aGVyKSB7XG4gICAgICAgIGNhc2UgXCJDbGVhclwiOlxuICAgICAgICAgICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndpLW93bS04MDBcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkNsb3Vkc1wiOlxuICAgICAgICAgICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndpLWNsb3VkeVwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUmFpblwiOlxuICAgICAgICAgICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndpLXJhaW5cIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlNub3dcIjpcbiAgICAgICAgICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoXCJ3aS1zbm93XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJNaXN0XCI6XG4gICAgICAgICAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2ktZGF5LXNwcmlua2xlXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gXG59XG5cbmZ1bmN0aW9uIHRlbXBEaXNwbGF5KHRlbXAsIGZlZWxzTGlrZVRlbXApICAge1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcbiAgICBjb25zdCBmZWVsc0xpa2VUZW1wRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHMtbGlrZS10ZW1wLWRpc3BsYXlcIik7XG5cbiAgICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IE1hdGgucm91bmQodGVtcCk7XG4gICAgZmVlbHNMaWtlVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSAgTWF0aC5yb3VuZChmZWVsc0xpa2VUZW1wKTtcbn1cblxuXG5mdW5jdGlvbiBpbmRpY2F0b3JEaXNwbGF5KGh1bSkge1xuICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eS1wZXJjZW50XCIpO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bX0lYDtcbn1cblxuXG4vL092ZXJhbGwgZnVuY3Rpb24gb2YgIGNvZGU7XG5cbmZ1bmN0aW9uIGdldFRlbXBVbml0cygpICAgIHtcbiAgICBjb25zdCB0ZW1wU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZW1wLXNlbGVjdGlvblwiKTtcbiAgICBjb25zdCBmYXJlbmhlaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImYtYnV0dG9uXCIpO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZW1wU2VsZWN0aW9uLmxlbmd0aDsgaSsrKSAgICB7XG4gICAgICAgIHRlbXBTZWxlY3Rpb25baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ppJylcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZW1wU2VsZWN0aW9uLmxlbmd0aDsgaSsrKSAgIHtcbiAgICAgICAgICAgICAgICB0ZW1wU2VsZWN0aW9uW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wU2VsZWN0aW9uW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBpZiAoZmFyZW5oZWl0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wVW5pdCA9IFwiaW1wZXJpYWxcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBVbml0ID0gXCJtZXRyaWNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVVuaXRzKCkgICB7XG4gICAgY29uc3QgdGVtcFNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVtcC1zZWxlY3Rpb25cIik7XG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xuICAgIGNvbnN0IGZlZWxzTGlrZVRlbXBEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVscy1saWtlLXRlbXAtZGlzcGxheVwiKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGVtcFNlbGVjdGlvbi5sZW5ndGg7IGkrKykgICAge1xuICAgICAgICB0ZW1wU2VsZWN0aW9uW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gIHtcbiAgICAgICAgICAgIGlmICh0ZW1wU2VsZWN0aW9uW2ldLmlkID09PSBcImYtYnV0dG9uXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2xkVGVtcCA9IHRlbXBlcmF0dXJlLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIGxldCBuZXdUZW1wPSBNYXRoLnJvdW5kKChvbGRUZW1wICogKDkvNSkgKyAzMikpO1xuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gbmV3VGVtcDtcblxuICAgICAgICAgICAgICAgIGxldCBvbGRGZWVsc0xpa2UgPSBmZWVsc0xpa2VUZW1wRGlzcGxheS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RmVlbHNMaWtlID0gTWF0aC5yb3VuZCgob2xkRmVlbHNMaWtlICogKDkvNSkgKyAzMikpO1xuICAgICAgICAgICAgICAgIGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gbmV3RmVlbHNMaWtlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBvbGRUZW1wID0gdGVtcGVyYXR1cmUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RlbXAgPSBNYXRoLnJvdW5kKChvbGRUZW1wIC0gMzIpICogKDUvOSkpO1xuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gbmV3VGVtcDtcblxuICAgICAgICAgICAgICAgIGxldCBvbGRGZWVsc0xpa2UgPSBmZWVsc0xpa2VUZW1wRGlzcGxheS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RmVlbHNMaWtlID0gTWF0aC5yb3VuZCgob2xkRmVlbHNMaWtlICAtIDMyKSAqICg1LzkpKVxuICAgICAgICAgICAgICAgIGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gbmV3RmVlbHNMaWtlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuY2hhbmdlVW5pdHMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
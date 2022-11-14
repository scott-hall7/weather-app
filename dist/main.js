/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


//  On window load, set tempUnit to 'imperial', set city to 'nashville'
let tempUnit = 'imperial';
getCoordinates('nashville');

//Gets coordinates for inputted city
async function getCoordinates(searchedCity) {

    const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=e8e4472081188c6fed6d3fafb70a83a0', {mode: 'cors'});
    
    try {
        const coordData = await response.json();
        const latitude = coordData[0].lat;
        const longitude = coordData[0].lon;
        const cityName = coordData[0].name;
        const state = coordData[0].state;
        const country = coordData[0].country;
        _dom__WEBPACK_IMPORTED_MODULE_0__.cityDisplay(cityName, state, country);
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

    _dom__WEBPACK_IMPORTED_MODULE_0__.weatherDisplay(mainDescription);
    _dom__WEBPACK_IMPORTED_MODULE_0__.tempDisplay(currentTemp, feelsLikeTemp);
    _dom__WEBPACK_IMPORTED_MODULE_0__.indicatorDisplay(humidity);
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

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeUnits": () => (/* binding */ changeUnits),
/* harmony export */   "cityDisplay": () => (/* binding */ cityDisplay),
/* harmony export */   "indicatorDisplay": () => (/* binding */ indicatorDisplay),
/* harmony export */   "tempDisplay": () => (/* binding */ tempDisplay),
/* harmony export */   "weatherDisplay": () => (/* binding */ weatherDisplay)
/* harmony export */ });
//Handles displaying city name, with state or country name, depending on if there is a state name provided
function cityDisplay(city, state, country)  {
    
    const cityName = document.getElementById("city-name");
    
    if (state === undefined) {
        cityName.textContent = `${city}, ${country}`;
    } else {
        cityName.textContent = `${city}, ${state}`;
    }
}

//Handles displaying the weather image and name
function weatherDisplay(weather)    {

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
function tempDisplay(temp, feelsLikeTemp)   {

    const temperature = document.getElementById("temperature");
    const feelsLikeTempDisplay = document.getElementById("feels-like-temp-display");

    temperature.textContent = Math.round(temp);
    feelsLikeTempDisplay.textContent =  Math.round(feelsLikeTemp);
}

//Displays humidity received from fetch request
function indicatorDisplay(hum) {

    const humidity = document.getElementById("humidity-percent");
    humidity.textContent = `Humidity: ${hum}%`;
}

function changeUnits()   {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const searchButton = document.getElementById("search-button");
const citySearchInput = document.getElementById("search-input");

//Handles City Form Submitting
searchButton.addEventListener('click', citySearch);
citySearchInput.onkeydown = function(e){
    if  (e.keyCode == 13) {
        event.preventDefault();
        citySearch();
    }
 };

function citySearch()   {
    let city = citySearchInput.value;
    _api__WEBPACK_IMPORTED_MODULE_0__.getCoordinates(city);
    citySearchInput.value = "";
}

//Sets up temp buttons to convert value of temp when clicked.
_dom__WEBPACK_IMPORTED_MODULE_1__.changeUnits();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNkI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPOztBQUVQLHlKQUF5SixhQUFhO0FBQ3RLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQWtCO0FBQ3RCLElBQUksNkNBQWU7QUFDbkIsSUFBSSxrREFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCOztBQUU3QztBQUNBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxLQUFLLElBQUksUUFBUTtBQUNuRCxNQUFNO0FBQ04sa0NBQWtDLEtBQUssSUFBSSxNQUFNO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087O0FBRVA7QUFDQSx3Q0FBd0MsSUFBSTtBQUM1Qzs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwQkFBMEI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7VUN4R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGdEQUEyQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0EsNkNBQXdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5cbi8vICBPbiB3aW5kb3cgbG9hZCwgc2V0IHRlbXBVbml0IHRvICdpbXBlcmlhbCcsIHNldCBjaXR5IHRvICduYXNodmlsbGUnXG5sZXQgdGVtcFVuaXQgPSAnaW1wZXJpYWwnO1xuZ2V0Q29vcmRpbmF0ZXMoJ25hc2h2aWxsZScpO1xuXG4vL0dldHMgY29vcmRpbmF0ZXMgZm9yIGlucHV0dGVkIGNpdHlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb29yZGluYXRlcyhzZWFyY2hlZENpdHkpIHtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPScgKyBzZWFyY2hlZENpdHkgKyAnJmxpbWl0PTEmYXBwaWQ9ZThlNDQ3MjA4MTE4OGM2ZmVkNmQzZmFmYjcwYTgzYTAnLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29vcmREYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCBsYXRpdHVkZSA9IGNvb3JkRGF0YVswXS5sYXQ7XG4gICAgICAgIGNvbnN0IGxvbmdpdHVkZSA9IGNvb3JkRGF0YVswXS5sb247XG4gICAgICAgIGNvbnN0IGNpdHlOYW1lID0gY29vcmREYXRhWzBdLm5hbWU7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gY29vcmREYXRhWzBdLnN0YXRlO1xuICAgICAgICBjb25zdCBjb3VudHJ5ID0gY29vcmREYXRhWzBdLmNvdW50cnk7XG4gICAgICAgIGRvbS5jaXR5RGlzcGxheShjaXR5TmFtZSwgc3RhdGUsIGNvdW50cnkpO1xuICAgICAgICBnZXRXZWF0aGVyKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgIH0gXG5cbiAgICAvL0hhbmRsZXMgaW52YWxpZCBvciBibGFuayBjaXR5IGlucHV0c1xuICAgIGNhdGNoIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGNpdHkgbmFtZSEnKVxuICAgIH1cbn1cblxuLy9HZXRzIHdlYXRoZXIgZnJvbSBjb29yZGluYXRlc1xuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsYXQsIGxvbikge1xuICAgIFxuICAgIC8vIEdldHMgdGVtcCB1bml0IGJhc2VkIG9mZiBhY3RpdmUgdGVtcCBidXR0b24uXG4gICAgZ2V0VGVtcFVuaXRzKCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JyArIGxhdCArICcmbG9uPScgKyBsb24gKyAnJmFwcGlkPWU4ZTQ0NzIwODExODhjNmZlZDZkM2ZhZmI3MGE4M2EwJnVuaXRzPScgKyB0ZW1wVW5pdCk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgbGV0IGN1cnJlbnRUZW1wID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICAgIGxldCBmZWVsc0xpa2VUZW1wID0gd2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIGxldCBodW1pZGl0eSA9IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgbGV0IG1haW5EZXNjcmlwdGlvbiA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbjtcblxuICAgIGRvbS53ZWF0aGVyRGlzcGxheShtYWluRGVzY3JpcHRpb24pO1xuICAgIGRvbS50ZW1wRGlzcGxheShjdXJyZW50VGVtcCwgZmVlbHNMaWtlVGVtcCk7XG4gICAgZG9tLmluZGljYXRvckRpc3BsYXkoaHVtaWRpdHkpO1xufVxuXG5mdW5jdGlvbiBnZXRUZW1wVW5pdHMoKSAgICB7XG4gICAgY29uc3QgdGVtcFNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVtcC1zZWxlY3Rpb25cIik7XG4gICAgY29uc3QgZmFyZW5oZWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmLWJ1dHRvblwiKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGVtcFNlbGVjdGlvbi5sZW5ndGg7IGkrKykgICAge1xuXG4gICAgICAgIC8vQXNzaWducyBhIHRlbXAgdW5pdCB0byBlYWNoIHRlbXAgYnV0dG9uIHRoYXQgY2hhbmdlcyB0aGUgYWN0aXZlIHN0YXR1cyBhbmQgcmV0dXJucyBhIHRlbXBVbml0XG4gICAgICAgIHRlbXBTZWxlY3Rpb25baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRlbXBTZWxlY3Rpb24ubGVuZ3RoOyBpKyspICAge1xuICAgICAgICAgICAgICAgIHRlbXBTZWxlY3Rpb25baV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBTZWxlY3Rpb25baV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGlmIChmYXJlbmhlaXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBVbml0ID0gXCJpbXBlcmlhbFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcFVuaXQgPSBcIm1ldHJpY1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0iLCIvL0hhbmRsZXMgZGlzcGxheWluZyBjaXR5IG5hbWUsIHdpdGggc3RhdGUgb3IgY291bnRyeSBuYW1lLCBkZXBlbmRpbmcgb24gaWYgdGhlcmUgaXMgYSBzdGF0ZSBuYW1lIHByb3ZpZGVkXG5leHBvcnQgZnVuY3Rpb24gY2l0eURpc3BsYXkoY2l0eSwgc3RhdGUsIGNvdW50cnkpICB7XG4gICAgXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcbiAgICBcbiAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke3N0YXRlfWA7XG4gICAgfVxufVxuXG4vL0hhbmRsZXMgZGlzcGxheWluZyB0aGUgd2VhdGhlciBpbWFnZSBhbmQgbmFtZVxuZXhwb3J0IGZ1bmN0aW9uIHdlYXRoZXJEaXNwbGF5KHdlYXRoZXIpICAgIHtcblxuICAgIGNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLXRleHRcIik7XG4gICAgd2VhdGhlclRleHQudGV4dENvbnRlbnQgPSB3ZWF0aGVyO1xuICAgIFxuICAgIGNsZWFyV2VhdGhlckRpc3BsYXkoKTtcbiAgICBzZXRXZWF0aGVyRGlzcGxheSh3ZWF0aGVyKTtcbn1cblxuLy9DbGVhcnMgY2xhc3MgbGlzdCBvZiBhbGwgd2VhdGhlciB0eXBlcyBzbyBtdWx0aXBsZSBkbyBub3QgZ2V0IGFkZGVkIHRvIHRoZSBjbGFzcyBuYW1lXG5mdW5jdGlvbiBjbGVhcldlYXRoZXJEaXNwbGF5KCkgIHtcblxuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aVwiKTtcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwid2ktb3dtLTgwMFwiKVxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1jbG91ZHlcIilcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwid2ktcmFpblwiKVxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1zbm93XCIpXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LnJlbW92ZShcIndpLWRheS1zcHJpbmtsZXNcIilcbn1cblxuLy9TZXRzIHdlYXRoZXIgaW1hZ2UgYmFzZWQgb2ZmIHdlYXRoZXIgdHlwZVxuZnVuY3Rpb24gc2V0V2VhdGhlckRpc3BsYXkod2VhdGhlcil7XG5cbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lcIik7XG5cbiAgICBzd2l0Y2ggKHdlYXRoZXIpIHtcbiAgICAgICAgY2FzZSBcIkNsZWFyXCI6XG4gICAgICAgICAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2ktb3dtLTgwMFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQ2xvdWRzXCI6XG4gICAgICAgICAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2ktY2xvdWR5XCIpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJSYWluXCI6XG4gICAgICAgICAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2ktcmFpblwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiU25vd1wiOlxuICAgICAgICAgICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndpLXNub3dcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIk1pc3RcIjpcbiAgICAgICAgICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoXCJ3aS1kYXktc3ByaW5rbGVcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBcbn1cblxuLy9Sb3VuZHMgYW5kIGRpc3BsYXlzIHRlbXAgcmVjZWl2ZWQgZnJvbSBmZXRjaCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gdGVtcERpc3BsYXkodGVtcCwgZmVlbHNMaWtlVGVtcCkgICB7XG5cbiAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGVyYXR1cmVcIik7XG4gICAgY29uc3QgZmVlbHNMaWtlVGVtcERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2UtdGVtcC1kaXNwbGF5XCIpO1xuXG4gICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHRlbXApO1xuICAgIGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gIE1hdGgucm91bmQoZmVlbHNMaWtlVGVtcCk7XG59XG5cbi8vRGlzcGxheXMgaHVtaWRpdHkgcmVjZWl2ZWQgZnJvbSBmZXRjaCByZXF1ZXN0XG5leHBvcnQgZnVuY3Rpb24gaW5kaWNhdG9yRGlzcGxheShodW0pIHtcblxuICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eS1wZXJjZW50XCIpO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bX0lYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVVuaXRzKCkgICB7XG5cbiAgICBjb25zdCB0ZW1wU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZW1wLXNlbGVjdGlvblwiKTtcbiAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGVyYXR1cmVcIik7XG4gICAgY29uc3QgZmVlbHNMaWtlVGVtcERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2UtdGVtcC1kaXNwbGF5XCIpO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZW1wU2VsZWN0aW9uLmxlbmd0aDsgaSsrKSAgICB7XG5cbiAgICAgICAgLy9Bc2lnbnMgYSBjbGljayBmdW5jdGlvbiB0byBlYWNoIHRlbXAgYnV0dG9uIHRoYXQgY2hhbmdlcyB0aGUgdGVtcCBhbmQgZmVlbHMgbGlrZSB0ZW1wLlxuICAgICAgICB0ZW1wU2VsZWN0aW9uW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gIHtcbiAgICAgICAgICAgIGlmICh0ZW1wU2VsZWN0aW9uW2ldLmlkID09PSBcImYtYnV0dG9uXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2xkVGVtcCA9IHRlbXBlcmF0dXJlLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIGxldCBuZXdUZW1wPSBNYXRoLnJvdW5kKChvbGRUZW1wICogKDkvNSkgKyAzMikpO1xuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gbmV3VGVtcDtcblxuICAgICAgICAgICAgICAgIGxldCBvbGRGZWVsc0xpa2UgPSBmZWVsc0xpa2VUZW1wRGlzcGxheS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RmVlbHNMaWtlID0gTWF0aC5yb3VuZCgob2xkRmVlbHNMaWtlICogKDkvNSkgKyAzMikpO1xuICAgICAgICAgICAgICAgIGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gbmV3RmVlbHNMaWtlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBvbGRUZW1wID0gdGVtcGVyYXR1cmUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RlbXAgPSBNYXRoLnJvdW5kKChvbGRUZW1wIC0gMzIpICogKDUvOSkpO1xuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gbmV3VGVtcDtcblxuICAgICAgICAgICAgICAgIGxldCBvbGRGZWVsc0xpa2UgPSBmZWVsc0xpa2VUZW1wRGlzcGxheS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RmVlbHNMaWtlID0gTWF0aC5yb3VuZCgob2xkRmVlbHNMaWtlICAtIDMyKSAqICg1LzkpKVxuICAgICAgICAgICAgICAgIGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gbmV3RmVlbHNMaWtlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGFwaUZ1bmN0aW9ucyBmcm9tICcuL2FwaSc7XG5pbXBvcnQgKiBhcyBkb21GdW5jdGlvbnMgZnJvbSAnLi9kb20nO1xuXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1idXR0b25cIik7XG5jb25zdCBjaXR5U2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1pbnB1dFwiKTtcblxuLy9IYW5kbGVzIENpdHkgRm9ybSBTdWJtaXR0aW5nXG5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaXR5U2VhcmNoKTtcbmNpdHlTZWFyY2hJbnB1dC5vbmtleWRvd24gPSBmdW5jdGlvbihlKXtcbiAgICBpZiAgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjaXR5U2VhcmNoKCk7XG4gICAgfVxuIH07XG5cbmZ1bmN0aW9uIGNpdHlTZWFyY2goKSAgIHtcbiAgICBsZXQgY2l0eSA9IGNpdHlTZWFyY2hJbnB1dC52YWx1ZTtcbiAgICBhcGlGdW5jdGlvbnMuZ2V0Q29vcmRpbmF0ZXMoY2l0eSk7XG4gICAgY2l0eVNlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcbn1cblxuLy9TZXRzIHVwIHRlbXAgYnV0dG9ucyB0byBjb252ZXJ0IHZhbHVlIG9mIHRlbXAgd2hlbiBjbGlja2VkLlxuZG9tRnVuY3Rpb25zLmNoYW5nZVVuaXRzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
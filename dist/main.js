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

    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=e8e4472081188c6fed6d3fafb70a83a0', {mode: 'cors'});
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNkI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNPOztBQUVQLHdKQUF3SixhQUFhO0FBQ3JLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQWtCO0FBQ3RCLElBQUksNkNBQWU7QUFDbkIsSUFBSSxrREFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCOztBQUU3QztBQUNBO0FBQ0EsMkJBQTJCLDBCQUEwQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxLQUFLLElBQUksUUFBUTtBQUNuRCxNQUFNO0FBQ04sa0NBQWtDLEtBQUssSUFBSSxNQUFNO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087O0FBRVA7QUFDQSx3Q0FBd0MsSUFBSTtBQUM1Qzs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwQkFBMEI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7VUN4R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGdEQUEyQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0EsNkNBQXdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5cbi8vICBPbiB3aW5kb3cgbG9hZCwgc2V0IHRlbXBVbml0IHRvICdpbXBlcmlhbCcsIHNldCBjaXR5IHRvICduYXNodmlsbGUnXG5sZXQgdGVtcFVuaXQgPSAnaW1wZXJpYWwnO1xuZ2V0Q29vcmRpbmF0ZXMoJ25hc2h2aWxsZScpO1xuXG4vL0dldHMgY29vcmRpbmF0ZXMgZm9yIGlucHV0dGVkIGNpdHlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb29yZGluYXRlcyhzZWFyY2hlZENpdHkpIHtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JyArIHNlYXJjaGVkQ2l0eSArICcmbGltaXQ9MSZhcHBpZD1lOGU0NDcyMDgxMTg4YzZmZWQ2ZDNmYWZiNzBhODNhMCcsIHttb2RlOiAnY29ycyd9KTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb29yZERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnN0IGxhdGl0dWRlID0gY29vcmREYXRhWzBdLmxhdDtcbiAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gY29vcmREYXRhWzBdLmxvbjtcbiAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBjb29yZERhdGFbMF0ubmFtZTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBjb29yZERhdGFbMF0uc3RhdGU7XG4gICAgICAgIGNvbnN0IGNvdW50cnkgPSBjb29yZERhdGFbMF0uY291bnRyeTtcbiAgICAgICAgZG9tLmNpdHlEaXNwbGF5KGNpdHlOYW1lLCBzdGF0ZSwgY291bnRyeSk7XG4gICAgICAgIGdldFdlYXRoZXIobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgfSBcblxuICAgIC8vSGFuZGxlcyBpbnZhbGlkIG9yIGJsYW5rIGNpdHkgaW5wdXRzXG4gICAgY2F0Y2gge1xuICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIGEgdmFsaWQgY2l0eSBuYW1lIScpXG4gICAgfVxufVxuXG4vL0dldHMgd2VhdGhlciBmcm9tIGNvb3JkaW5hdGVzXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxhdCwgbG9uKSB7XG4gICAgXG4gICAgLy8gR2V0cyB0ZW1wIHVuaXQgYmFzZWQgb2ZmIGFjdGl2ZSB0ZW1wIGJ1dHRvbi5cbiAgICBnZXRUZW1wVW5pdHMoKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0nICsgbGF0ICsgJyZsb249JyArIGxvbiArICcmYXBwaWQ9ZThlNDQ3MjA4MTE4OGM2ZmVkNmQzZmFmYjcwYTgzYTAmdW5pdHM9JyArIHRlbXBVbml0KTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICBsZXQgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXA7XG4gICAgbGV0IGZlZWxzTGlrZVRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgbGV0IGh1bWlkaXR5ID0gd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBsZXQgbWFpbkRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5tYWluO1xuXG4gICAgZG9tLndlYXRoZXJEaXNwbGF5KG1haW5EZXNjcmlwdGlvbik7XG4gICAgZG9tLnRlbXBEaXNwbGF5KGN1cnJlbnRUZW1wLCBmZWVsc0xpa2VUZW1wKTtcbiAgICBkb20uaW5kaWNhdG9yRGlzcGxheShodW1pZGl0eSk7XG59XG5cbmZ1bmN0aW9uIGdldFRlbXBVbml0cygpICAgIHtcbiAgICBjb25zdCB0ZW1wU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZW1wLXNlbGVjdGlvblwiKTtcbiAgICBjb25zdCBmYXJlbmhlaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImYtYnV0dG9uXCIpO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZW1wU2VsZWN0aW9uLmxlbmd0aDsgaSsrKSAgICB7XG5cbiAgICAgICAgLy9Bc3NpZ25zIGEgdGVtcCB1bml0IHRvIGVhY2ggdGVtcCBidXR0b24gdGhhdCBjaGFuZ2VzIHRoZSBhY3RpdmUgc3RhdHVzIGFuZCByZXR1cm5zIGEgdGVtcFVuaXRcbiAgICAgICAgdGVtcFNlbGVjdGlvbltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGVtcFNlbGVjdGlvbi5sZW5ndGg7IGkrKykgICB7XG4gICAgICAgICAgICAgICAgdGVtcFNlbGVjdGlvbltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcFNlbGVjdGlvbltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgaWYgKGZhcmVuaGVpdC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcFVuaXQgPSBcImltcGVyaWFsXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wVW5pdCA9IFwibWV0cmljXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufSIsIi8vSGFuZGxlcyBkaXNwbGF5aW5nIGNpdHkgbmFtZSwgd2l0aCBzdGF0ZSBvciBjb3VudHJ5IG5hbWUsIGRlcGVuZGluZyBvbiBpZiB0aGVyZSBpcyBhIHN0YXRlIG5hbWUgcHJvdmlkZWRcbmV4cG9ydCBmdW5jdGlvbiBjaXR5RGlzcGxheShjaXR5LCBzdGF0ZSwgY291bnRyeSkgIHtcbiAgICBcbiAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpO1xuICAgIFxuICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gYCR7Y2l0eX0sICR7Y291bnRyeX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gYCR7Y2l0eX0sICR7c3RhdGV9YDtcbiAgICB9XG59XG5cbi8vSGFuZGxlcyBkaXNwbGF5aW5nIHRoZSB3ZWF0aGVyIGltYWdlIGFuZCBuYW1lXG5leHBvcnQgZnVuY3Rpb24gd2VhdGhlckRpc3BsYXkod2VhdGhlcikgICAge1xuXG4gICAgY29uc3Qgd2VhdGhlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItdGV4dFwiKTtcbiAgICB3ZWF0aGVyVGV4dC50ZXh0Q29udGVudCA9IHdlYXRoZXI7XG4gICAgXG4gICAgY2xlYXJXZWF0aGVyRGlzcGxheSgpO1xuICAgIHNldFdlYXRoZXJEaXNwbGF5KHdlYXRoZXIpO1xufVxuXG4vL0NsZWFycyBjbGFzcyBsaXN0IG9mIGFsbCB3ZWF0aGVyIHR5cGVzIHNvIG11bHRpcGxlIGRvIG5vdCBnZXQgYWRkZWQgdG8gdGhlIGNsYXNzIG5hbWVcbmZ1bmN0aW9uIGNsZWFyV2VhdGhlckRpc3BsYXkoKSAge1xuXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpXCIpO1xuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1vd20tODAwXCIpXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LnJlbW92ZShcIndpLWNsb3VkeVwiKVxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aS1yYWluXCIpXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LnJlbW92ZShcIndpLXNub3dcIilcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwid2ktZGF5LXNwcmlua2xlc1wiKVxufVxuXG4vL1NldHMgd2VhdGhlciBpbWFnZSBiYXNlZCBvZmYgd2VhdGhlciB0eXBlXG5mdW5jdGlvbiBzZXRXZWF0aGVyRGlzcGxheSh3ZWF0aGVyKXtcblxuICAgIGNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aVwiKTtcblxuICAgIHN3aXRjaCAod2VhdGhlcikge1xuICAgICAgICBjYXNlIFwiQ2xlYXJcIjpcbiAgICAgICAgICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoXCJ3aS1vd20tODAwXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJDbG91ZHNcIjpcbiAgICAgICAgICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoXCJ3aS1jbG91ZHlcIik7ICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlJhaW5cIjpcbiAgICAgICAgICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoXCJ3aS1yYWluXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJTbm93XCI6XG4gICAgICAgICAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2ktc25vd1wiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTWlzdFwiOlxuICAgICAgICAgICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndpLWRheS1zcHJpbmtsZVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IFxufVxuXG4vL1JvdW5kcyBhbmQgZGlzcGxheXMgdGVtcCByZWNlaXZlZCBmcm9tIGZldGNoIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiB0ZW1wRGlzcGxheSh0ZW1wLCBmZWVsc0xpa2VUZW1wKSAgIHtcblxuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcbiAgICBjb25zdCBmZWVsc0xpa2VUZW1wRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHMtbGlrZS10ZW1wLWRpc3BsYXlcIik7XG5cbiAgICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IE1hdGgucm91bmQodGVtcCk7XG4gICAgZmVlbHNMaWtlVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSAgTWF0aC5yb3VuZChmZWVsc0xpa2VUZW1wKTtcbn1cblxuLy9EaXNwbGF5cyBodW1pZGl0eSByZWNlaXZlZCBmcm9tIGZldGNoIHJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBpbmRpY2F0b3JEaXNwbGF5KGh1bSkge1xuXG4gICAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LXBlcmNlbnRcIik7XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7aHVtfSVgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVW5pdHMoKSAgIHtcblxuICAgIGNvbnN0IHRlbXBTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlbXAtc2VsZWN0aW9uXCIpO1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcbiAgICBjb25zdCBmZWVsc0xpa2VUZW1wRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHMtbGlrZS10ZW1wLWRpc3BsYXlcIik7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRlbXBTZWxlY3Rpb24ubGVuZ3RoOyBpKyspICAgIHtcblxuICAgICAgICAvL0FzaWducyBhIGNsaWNrIGZ1bmN0aW9uIHRvIGVhY2ggdGVtcCBidXR0b24gdGhhdCBjaGFuZ2VzIHRoZSB0ZW1wIGFuZCBmZWVscyBsaWtlIHRlbXAuXG4gICAgICAgIHRlbXBTZWxlY3Rpb25baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAge1xuICAgICAgICAgICAgaWYgKHRlbXBTZWxlY3Rpb25baV0uaWQgPT09IFwiZi1idXR0b25cIikge1xuICAgICAgICAgICAgICAgIGxldCBvbGRUZW1wID0gdGVtcGVyYXR1cmUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1RlbXA9IE1hdGgucm91bmQoKG9sZFRlbXAgKiAoOS81KSArIDMyKSk7XG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBuZXdUZW1wO1xuXG4gICAgICAgICAgICAgICAgbGV0IG9sZEZlZWxzTGlrZSA9IGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIGxldCBuZXdGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKChvbGRGZWVsc0xpa2UgKiAoOS81KSArIDMyKSk7XG4gICAgICAgICAgICAgICAgZmVlbHNMaWtlVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBuZXdGZWVsc0xpa2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG9sZFRlbXAgPSB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VGVtcCA9IE1hdGgucm91bmQoKG9sZFRlbXAgLSAzMikgKiAoNS85KSk7XG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBuZXdUZW1wO1xuXG4gICAgICAgICAgICAgICAgbGV0IG9sZEZlZWxzTGlrZSA9IGZlZWxzTGlrZVRlbXBEaXNwbGF5LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIGxldCBuZXdGZWVsc0xpa2UgPSBNYXRoLnJvdW5kKChvbGRGZWVsc0xpa2UgIC0gMzIpICogKDUvOSkpXG4gICAgICAgICAgICAgICAgZmVlbHNMaWtlVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBuZXdGZWVsc0xpa2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgYXBpRnVuY3Rpb25zIGZyb20gJy4vYXBpJztcbmltcG9ydCAqIGFzIGRvbUZ1bmN0aW9ucyBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ1dHRvblwiKTtcbmNvbnN0IGNpdHlTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWlucHV0XCIpO1xuXG4vL0hhbmRsZXMgQ2l0eSBGb3JtIFN1Ym1pdHRpbmdcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNpdHlTZWFyY2gpO1xuY2l0eVNlYXJjaElucHV0Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpe1xuICAgIGlmICAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNpdHlTZWFyY2goKTtcbiAgICB9XG4gfTtcblxuZnVuY3Rpb24gY2l0eVNlYXJjaCgpICAge1xuICAgIGxldCBjaXR5ID0gY2l0eVNlYXJjaElucHV0LnZhbHVlO1xuICAgIGFwaUZ1bmN0aW9ucy5nZXRDb29yZGluYXRlcyhjaXR5KTtcbiAgICBjaXR5U2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xufVxuXG4vL1NldHMgdXAgdGVtcCBidXR0b25zIHRvIGNvbnZlcnQgdmFsdWUgb2YgdGVtcCB3aGVuIGNsaWNrZWQuXG5kb21GdW5jdGlvbnMuY2hhbmdlVW5pdHMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//API Code

let citySearch = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', () =>    {
    let city = citySearch.value;
    console.log(city);
    getCoordinates(city);
    city = "";
});


async function getCoordinates(searchedCity) {
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=49e06e80c872d8f390715c3368cf15ed', {mode: 'cors'});
    const coordData = await response.json();
    console.log(coordData)
    const latitude = coordData[0].lat;
    const longitude = coordData[0].lon;
    const cityName = coordData[0].name;
    const state = coordData[0].state;
    const country = coordData[0].country;
    console.log(cityName)
    console.log(state)
    console.log(country)
    console.log(`${cityName}, ${state}, ${country}`)
    getWeather(latitude, longitude)
}


async function getWeather(lat, lon) {
    const tempUnit = 'imperial';
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=49e06e80c872d8f390715c3368cf15ed&units=' + tempUnit);
    const weatherData = await response.json();
    console.log(weatherData);
    let currentTemp = weatherData.main.temp;
    let feelsLikeTemp = weatherData.main.feels_like;
    let humidity = weatherData.main.humidity;
    let mainDescription = weatherData.weather[0].main;
    let cityName = weatherData.name;
    console.log('Current Temp: ' + currentTemp);
    console.log('Feels Like: ' + feelsLikeTemp);
    console.log('Humidity: ' + humidity);
    console.log('Description: ' + mainDescription);
    console.log(cityName);
}



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQSx3SkFBd0osYUFBYTtBQUNySztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTLElBQUksTUFBTSxJQUFJLFFBQVE7QUFDbEQ7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0FQSSBDb2RlXG5cbmxldCBjaXR5U2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtaW5wdXRcIik7XG5sZXQgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnV0dG9uXCIpO1xuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gICAge1xuICAgIGxldCBjaXR5ID0gY2l0eVNlYXJjaC52YWx1ZTtcbiAgICBjb25zb2xlLmxvZyhjaXR5KTtcbiAgICBnZXRDb29yZGluYXRlcyhjaXR5KTtcbiAgICBjaXR5ID0gXCJcIjtcbn0pO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzKHNlYXJjaGVkQ2l0eSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JyArIHNlYXJjaGVkQ2l0eSArICcmbGltaXQ9MSZhcHBpZD00OWUwNmU4MGM4NzJkOGYzOTA3MTVjMzM2OGNmMTVlZCcsIHttb2RlOiAnY29ycyd9KTtcbiAgICBjb25zdCBjb29yZERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coY29vcmREYXRhKVxuICAgIGNvbnN0IGxhdGl0dWRlID0gY29vcmREYXRhWzBdLmxhdDtcbiAgICBjb25zdCBsb25naXR1ZGUgPSBjb29yZERhdGFbMF0ubG9uO1xuICAgIGNvbnN0IGNpdHlOYW1lID0gY29vcmREYXRhWzBdLm5hbWU7XG4gICAgY29uc3Qgc3RhdGUgPSBjb29yZERhdGFbMF0uc3RhdGU7XG4gICAgY29uc3QgY291bnRyeSA9IGNvb3JkRGF0YVswXS5jb3VudHJ5O1xuICAgIGNvbnNvbGUubG9nKGNpdHlOYW1lKVxuICAgIGNvbnNvbGUubG9nKHN0YXRlKVxuICAgIGNvbnNvbGUubG9nKGNvdW50cnkpXG4gICAgY29uc29sZS5sb2coYCR7Y2l0eU5hbWV9LCAke3N0YXRlfSwgJHtjb3VudHJ5fWApXG4gICAgZ2V0V2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKVxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobGF0LCBsb24pIHtcbiAgICBjb25zdCB0ZW1wVW5pdCA9ICdpbXBlcmlhbCc7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PScgKyBsYXQgKyAnJmxvbj0nICsgbG9uICsgJyZhcHBpZD00OWUwNmU4MGM4NzJkOGYzOTA3MTVjMzM2OGNmMTVlZCZ1bml0cz0nICsgdGVtcFVuaXQpO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICBsZXQgY3VycmVudFRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXA7XG4gICAgbGV0IGZlZWxzTGlrZVRlbXAgPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgbGV0IGh1bWlkaXR5ID0gd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBsZXQgbWFpbkRlc2NyaXB0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5tYWluO1xuICAgIGxldCBjaXR5TmFtZSA9IHdlYXRoZXJEYXRhLm5hbWU7XG4gICAgY29uc29sZS5sb2coJ0N1cnJlbnQgVGVtcDogJyArIGN1cnJlbnRUZW1wKTtcbiAgICBjb25zb2xlLmxvZygnRmVlbHMgTGlrZTogJyArIGZlZWxzTGlrZVRlbXApO1xuICAgIGNvbnNvbGUubG9nKCdIdW1pZGl0eTogJyArIGh1bWlkaXR5KTtcbiAgICBjb25zb2xlLmxvZygnRGVzY3JpcHRpb246ICcgKyBtYWluRGVzY3JpcHRpb24pO1xuICAgIGNvbnNvbGUubG9nKGNpdHlOYW1lKTtcbn1cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
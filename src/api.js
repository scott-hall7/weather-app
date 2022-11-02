export async function getCoordinates(searchedCity) {
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



export async function getWeather(lat, lon) {
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

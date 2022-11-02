import * as apiFunctions from './api';

let citySearch = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', getCityData())

function getCityData()  {
    let city = citySearch.value;
    console.log(city)
    apiFunctions.getCoordinates(city);
}


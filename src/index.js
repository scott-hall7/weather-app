import * as apiFunctions from './api';
import * as domFunctions from './dom';

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
    apiFunctions.getCoordinates(city);
    citySearchInput.value = "";
}

//Sets up temp buttons to convert value of temp when clicked.
domFunctions.changeUnits();

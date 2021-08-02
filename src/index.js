import './css/styles.css';
import API from './js/fetchCountries';
import Notiflix from "notiflix";
import _ from 'lodash';
import countryCard from './templates/country.hbs';
import countriesList from './templates/countriesList.hbs'


const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', _.debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {
  event.preventDefault();

  const countryName = event.target.value.trim();

  if (countryName == '') {
    return clearCountryContainer();
  } else {
    API.fetchCountries(countryName)
      .then(response => {

        if (response.length == 1) {
          buidCountryCard(response[0]);
        }
        else if (response.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please, enter a more specific name.');
        }
        else {
          buildCountriesList(response);
        }

      })
      .catch(error => {
        console.log(error);
      }).finally(clearCountryContainer());
  }
}


function buidCountryCard(country) {
  const lang = country.languages.map(l => l.name).join(', ');
  const markup = countryCard({ country, lang });
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

function buildCountriesList(countriesItem) {
  const markup = countriesList(countriesItem);
  countryList.insertAdjacentHTML('beforeend', markup);
}

function clearCountryContainer() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
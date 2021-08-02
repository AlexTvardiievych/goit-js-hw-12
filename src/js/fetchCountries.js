import Notiflix from "notiflix";

const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=name;capital;population;flag;languages`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Notiflix.Notify.failure('No country with that name!'));
    })
}

export default { fetchCountries };




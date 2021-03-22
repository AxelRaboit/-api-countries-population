const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let countries;
let searchTerm = '';

const fetchCountries = async() => {
    countries = await fetch(
        'http://restcountries.eu/rest/v2/all?fields=name;population;flag'
    )
    .then(res => res.json());
}

const ShowCountries = async() => {
    await fetchCountries();

    results.innerHTML = (

        countries
            .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(country => (

                `
                <li class="country-item">
                    <img class="country-flag" src="${country.flag}" />
                    <h3 class="country-name">${country.name}</h3>
                    <div class="country-info">
                        <h2 class="country-population">${numberWithSpaces(country.population)}</h2>
                        <h5 class="country-population-text">Habitants</h5>
                    </div>
                </li>

                `
            )).join('')
    )
}

function numberWithSpaces(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    ShowCountries();
})
ShowCountries();
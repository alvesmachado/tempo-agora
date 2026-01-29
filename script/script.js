import { btnHeaderSearch, btnHeaderLocation, btnSearch } from './inputHTML.js';
import { searchCity } from './searchCity.js';
import { locationAtual, climaAqui } from './cidadeAtual.js';


document.addEventListener("DOMContentLoaded", locationAtual)

btnHeaderLocation.addEventListener('click', async () => {
    const { climaAqui } = await import('./cidadeAtual.js');
    climaAqui()
})


btnSearch.addEventListener('click', searchCity)

btnHeaderSearch.addEventListener('click', async () => {
    const { mostrarSearch } = await import('./mostrarSearch.js');
    mostrarSearch()
})
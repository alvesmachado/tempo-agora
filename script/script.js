import { btnHeaderSearch, btnHeaderLocation, btnSearch, btnLogin } from './inputHTML.js';

document.addEventListener("DOMContentLoaded", async () => {
    const { locationAtual } = await import('./cidadeAtual.js')
    const { isLogin } = await import('./isLogin.js')
    isLogin()
    locationAtual()
})

btnHeaderLocation.addEventListener('click', async () => {
    const { climaAqui } = await import('./cidadeAtual.js')
    climaAqui()
})

btnSearch.addEventListener('click', async () => {
    const { searchCity } = await import('./searchCity.js')
    searchCity()
})

btnHeaderSearch.addEventListener('click', async () => {
    const { mostrarSearch } = await import('./mostrarSearch.js')
    mostrarSearch()
})

btnLogin.addEventListener('click', async () => {
    const { createLogin } = await import('./createLogin.js')
    createLogin()
})

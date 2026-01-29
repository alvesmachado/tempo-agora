
import { cityName, btnHeaderLocation } from './inputHTML.js'
import { searchCity } from './searchCity.js'

let cityAtual
export const locationAtual = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then(response => response.json()).then(data => {
            console.log(data)
            if (data.address.municipality) {  
                cityAtual = data.address.municipality
                cityName.value = cityAtual
                btnHeaderLocation.insertAdjacentHTML('beforebegin', `<span id='atualStyle'>${data.address.municipality}, ${data.address.country_code.toUpperCase()}</span>`)
                searchCity()
            } else if (data.address.city) {
                alert('Cidade não encontrada. Por favor, insira o nome da cidade manualmente.')
            }
        })
    })
}

export const climaAqui = () => {
    cityName.value = cityAtual
    searchCity()
}
const btnHeaderSearch = document.querySelector('#headerTop span.material-icons')
const btnHeaderLocation = document.querySelector('#headerBottom span.material-icons')
const btnSearch = document.querySelector('#sectionSearch input.material-icons')
const sectionSearch = document.querySelector('#sectionSearch')
const sectionTime = document.querySelector('#sectionTime')
const cityName = document.querySelector('#iCidadeInput')
let cityAtual = ''

const loading = () => {
    sectionTime.style.background = 'rgba(255, 255, 255, 0)'
    sectionTime.innerHTML = `<img src="loading.png" alt="Carregando...">`
}

document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).then(response => response.json()).then(data => {
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
})

btnHeaderLocation.addEventListener('click', () => {
    cityName.value = cityAtual
    searchCity()
})
const searchCity = () => {
    if (cityName.value === '') {
        return alert('Por favor, insira o nome de uma cidade.')
    } else {
        loading()
        const ApiKey = `e80e8f039b97879406ee3b75073c01b3`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${ApiKey}&units=metric&lang=pt_br`
        fetch(url).then(response => response.json()).then(data => {
            if (data.cod === 404) {
                return alert('Cidade não encontrada. Por favor, verifique o nome e tente novamente.')
            } else if (data.cod === 400) {
                return alert('Por favor, insira o nome de uma cidade.')
            } else if (data.cod === 200) {
                const cidadeResult = data.name
                const paisResult = data.sys.country
                const tempResult = data.main.temp.toFixed(1).replace('.', ',')
                const descResult = (data.weather[0].description).charAt(0).toUpperCase() + data.weather[0].description.slice(1)
                const iconResult = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                const tempMax = data.main.temp_max.toFixed(1).replace('.', ',')
                const tempMin = data.main.temp_min.toFixed(1).replace('.', ',')
                const tempHum = data.main.humidity
                const windSpeed = data.wind.speed.toFixed(2).replace('.', ',')

                sectionTime.innerHTML = ''
                sectionTime.style.background = '#ffffff21'

                const htmlResult = `
                    <h2>${cidadeResult}, ${paisResult}</h2>
                    <div id="tempDiv">
                        <img src="${iconResult}" id="tempImg" alt="${descResult}">
                        <p id="tempResult">${tempResult} <sup>C°</sup></p>
                        <p id="tempDesc">${descResult}</p>
                    </div>
                    <div id="detailsTime">
                        <div id="tempMax">
                            <h3>Temp. Máx.</h3>
                            <p>${tempMax} <sup>C°</sup></p>
                        </div>
                        <div id="tempMin">
                            <h3>Temp. Mín.</h3>
                            <p>${tempMin} <sup>C°</sup></p>
                        </div>
                        <div id="tempHum">
                            <h3>Humidade</h3>
                            <p>${tempHum}%</p>
                        </div>
                        <div id="tempAir">
                            <h3>Vento</h3>
                            <p>${windSpeed} m/s</p>
                        </div>
                    </div>`
                sectionTime.insertAdjacentHTML('beforeend', htmlResult)
            }
        })
    }

}

btnSearch.addEventListener('click', searchCity)

btnHeaderSearch.addEventListener('click', () => {
    const displaySearch = sectionSearch.style.display == 'none' || sectionSearch.style.display == ''? 'block' : 'none'
    sectionSearch.style.display = displaySearch
})
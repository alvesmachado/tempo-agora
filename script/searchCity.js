import { cityName } from './inputHTML.js'
import { sectionTime } from './inputHTML.js'
import { loading } from './loading.js'
import { error } from './error.js'
import { historicUpdate } from './historic.js'

export const searchCity = async () => {
    let contaLogada = localStorage.getItem('ContaTempoAgoraLogada')
    const contas = JSON.parse(localStorage.getItem('user'))
    const contaAtual = contas.find( userLog => userLog.nome == contaLogada)
    const time = new Date().getTime()
    if ((contaLogada && contaLogada !== "null" && contaLogada.trim() !== "") && (contaAtual.historic[0].cidadeResult == cityName.value && (time - contaAtual.historic[0].time) < 600000)) {
        loading()
        sectionTime.innerHTML = ''
        sectionTime.style.background = '#ffffff21'
        const htmlResult = `
                    <h2>${contaAtual.historic[0].cidadeResult}, ${contaAtual.historic[0].paisResult}</h2>
                    <div class="tempDiv">
                        <img src="${contaAtual.historic[0].iconResult}" class="tempImg" alt="${contaAtual.historic[0].descResult}">
                        <p class="tempResult">${contaAtual.historic[0].tempResult} <sup>C°</sup></p>
                        <p class="tempDesc">${contaAtual.historic[0].descResult}</p>
                    </div>
                    <div class="detailsTime">
                        <div class="tempMax">
                            <h3>Temp. Máx.</h3>
                            <p>${contaAtual.historic[0].tempMax} <sup>C°</sup></p>
                        </div>
                        <div class="tempMin">
                            <h3>Temp. Mín.</h3>
                            <p>${contaAtual.historic[0].tempMin} <sup>C°</sup></p>
                        </div>
                        <div class="tempHum">
                            <h3>Humidade</h3>
                            <p>${contaAtual.historic[0].tempHum}%</p>
                        </div>
                        <div class="tempAir">
                            <h3>Vento</h3>
                            <p>${contaAtual.historic[0].windSpeed} m/s</p>
                        </div>
                    </div>`
                sectionTime.insertAdjacentHTML('beforeend', htmlResult)  
                historicUpdate()  
    } else {
        if (cityName.value === '') {
        error(400)
        return
        } else {
            try {
                loading()
                const ApiKey = `e80e8f039b97879406ee3b75073c01b3`
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${ApiKey}&units=metric&lang=pt_br`
                    const response = await fetch(url)
                    if (!response.ok) {
                        if (response.status === 404) {
                            error(404)
                            return
                        } else if (response.status === 400) {
                            error(400)
                            return
                        } else if (response.status === 401) {
                            error(401)
                            return
                        }
                    }
                    const data = await response.json()
                    const cidadeResult = data.name
                    const paisResult = data.sys.country
                    const tempResult = data.main.temp.toFixed(1).replace('.', ',')
                    const descResult = (data.weather[0].description).charAt(0).toUpperCase() + data.weather[0].description.slice(1)
                    const iconResult = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    const tempMax = data.main.temp_max.toFixed(1).replace('.', ',')
                    const tempMin = data.main.temp_min.toFixed(1).replace('.', ',')
                    const tempHum = data.main.humidity
                    const windSpeed = data.wind.speed.toFixed(2).replace('.', ',')
                    historicUpdate(cidadeResult, paisResult, tempResult, descResult, iconResult, tempMax, tempMin, tempHum, windSpeed)
                    sectionTime.innerHTML = ''
                    sectionTime.style.background = '#ffffff21'

                    const htmlResult = `
                        <h2>${cidadeResult}, ${paisResult}</h2>
                        <div class="tempDiv">
                            <img src="${iconResult}" class="tempImg" alt="${descResult}">
                            <p class="tempResult">${tempResult} <sup>C°</sup></p>
                            <p class="tempDesc">${descResult}</p>
                        </div>
                        <div class="detailsTime">
                            <div class="tempMax">
                                <h3>Temp. Máx.</h3>
                                <p>${tempMax} <sup>C°</sup></p>
                            </div>
                            <div class="tempMin">
                                <h3>Temp. Mín.</h3>
                                <p>${tempMin} <sup>C°</sup></p>
                            </div>
                            <div class="tempHum">
                                <h3>Humidade</h3>
                                <p>${tempHum}%</p>
                            </div>
                            <div class="tempAir">
                                <h3>Vento</h3>
                                <p>${windSpeed} m/s</p>
                            </div>
                        </div>`
                    sectionTime.insertAdjacentHTML('beforeend', htmlResult)                  
            } catch {
                error('breakLink')
            }
        }
    }
}
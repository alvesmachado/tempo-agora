import { sectionHis } from "./inputHTML.js";
export function historicUpdate(cidadeResult, paisResult, tempResult, descResult, iconResult, tempMax, tempMin, tempHum, windSpeed) {
        let contaLogada = localStorage.getItem('ContaTempoAgoraLogada')
        if (contaLogada && contaLogada !== "null" && contaLogada.trim() !== "") {
            const contas = JSON.parse(localStorage.getItem('user'))
            const contaAtual = contas.find( userLog => userLog.nome == contaLogada)
            const today = new Date()
            const data = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}` 
            const hora = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`
            const time = today.getTime()

            if (cidadeResult) {
                if(contaAtual.historic[0] == '') {
                    contaAtual.historic[0] = {'cidadeResult': cidadeResult, 'paisResult': paisResult, 'iconResult': iconResult, 'descResult': descResult, 'tempResult': tempResult, 'data': data, 'hora': hora, 'time': time, 'tempMax': tempMax, 'tempMin': tempMin, 'tempHum': tempHum, 'windSpeed': windSpeed}
                } else if(contaAtual.historic[1] == '') {
                    contaAtual.historic[1] = {'cidadeResult': cidadeResult, 'paisResult': paisResult, 'iconResult': iconResult, 'descResult': descResult, 'tempResult': tempResult, 'data': data, 'hora': hora, 'time': time, 'tempMax': tempMax, 'tempMin': tempMin, 'tempHum': tempHum, 'windSpeed': windSpeed}
                } else if(contaAtual.historic[2] == '') {
                    contaAtual.historic[2] = {'cidadeResult': cidadeResult, 'paisResult': paisResult, 'iconResult': iconResult, 'descResult': descResult, 'tempResult': tempResult, 'data': data, 'hora': hora, 'time': time, 'tempMax': tempMax, 'tempMin': tempMin, 'tempHum': tempHum, 'windSpeed': windSpeed}
                } else if(contaAtual.historic[3] == '') {
                    contaAtual.historic[3] = {'cidadeResult': cidadeResult, 'paisResult': paisResult, 'iconResult': iconResult, 'descResult': descResult, 'tempResult': tempResult, 'data': data, 'hora': hora, 'time': time, 'tempMax': tempMax, 'tempMin': tempMin, 'tempHum': tempHum, 'windSpeed': windSpeed}
                } else if ((contaAtual.historic[0].cidadeResult == cidadeResult && (time - contaAtual.historic[0].time) > 600000) || contaAtual.historic[0].cidadeResult !== cidadeResult) {
                    contaAtual.historic[3] = contaAtual.historic[2]
                    contaAtual.historic[2] = contaAtual.historic[1]
                    contaAtual.historic[1] = contaAtual.historic[0]
                    contaAtual.historic[0] = {'cidadeResult': cidadeResult, 'paisResult': paisResult, 'iconResult': iconResult, 'descResult': descResult, 'tempResult': tempResult, 'data': data, 'hora': hora, 'time': time, 'tempMax': tempMax, 'tempMin': tempMin, 'tempHum': tempHum, 'windSpeed': windSpeed}
                }
                contas.find( userLog => {
                    if (userLog.nome == contaAtual.nome) {
                        userLog = contaAtual
                    }
                })
                localStorage.setItem('user', JSON.stringify(contas))
            }

            sectionHis.style.display = 'block'
            sectionHis.querySelector('.content').innerHTML = ''
            contaAtual.historic.forEach(element => {
                if(element != '') {
                    const newHist = `
            <div>
                <h3>${element.cidadeResult}, ${element.paisResult}</h3>
                <h4>${element.data} | ${element.hora}</h4>
                <div class="tempDiv">
                    <img src="${element.iconResult}" class="tempImg" alt="${element.descResult}">
                    <p class="tempResult">${element.tempResult} <sup>C°</sup></p>
                    <p class="tempDesc">${element.descResult}</p>
                </div>
            </div>` 
            sectionHis.querySelector('.content').insertAdjacentHTML('beforeend', newHist)
                }
            })

            if(contaAtual.historic.find( element => element != '')) {
                const contaTam = contaAtual.historic.filter( element => element != '').length
                console.log(contaTam)
                if (contaTam !== 4) {
                    const firstHis = document.querySelector('.content > div:first-child')
                    firstHis.style.flex = '1 1 272px'
                }
            }
        }
}

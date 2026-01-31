import { sectionTime } from "./inputHTML.js"

export const error = (e) => {
    sectionTime.style.background = 'rgba(255, 255, 255, 0)'
    sectionTime.innerHTML = ``
    if (e == 404) {
        sectionTime.innerHTML = '<h2>Cidade não encontrada. Por favor, verifique o nome e tente novamente.</h2>'
    } else if (e == 400) {
        sectionTime.innerHTML = '<h2>Por favor, insira o nome de uma cidade.</h2>'
    } else if (e == 401) {
        sectionTime.innerHTML = '<h2>Chave API indisponível</h2>'
    } else if (e == 'breakLink') {
        sectionTime.innerHTML = '<h2>Site temporariamente indisponível</h2>'
    }
}
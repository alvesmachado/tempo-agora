import { sectionHis, sectionTime } from "./inputHTML.js";
export const loading = () => {
    sectionHis.style.display = 'none'
    sectionTime.style.background = 'rgba(255, 255, 255, 0)'
    sectionTime.innerHTML = `<img src="loading.png" alt="Carregando...">`
}
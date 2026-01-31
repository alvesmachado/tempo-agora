import { btnLogin } from './inputHTML.js';

export const isLogin = () => {
    let contaLogada = localStorage.getItem('ContaTempoAgoraLogada')
    if (contaLogada && contaLogada !== "null" && contaLogada.trim() !== "") {
        btnLogin.innerHTML = `Trocar de conta`
        btnLogin.insertAdjacentHTML('beforebegin', `<p>Olá, ${localStorage.getItem('ContaTempoAgoraLogada')}!</p>`)
    } else {
        if (document.querySelector('#headerTop > div > p')) {
            document.querySelector('#headerTop > div > p').remove()
        }
        btnLogin.innerHTML = `Entrar na conta`
    }
}

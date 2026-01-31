import { sectionTime } from "./inputHTML.js";

export const createLogin = async () => {
    let contaLogada = localStorage.getItem('ContaTempoAgoraLogada')
    if (contaLogada && contaLogada !== "null" && contaLogada.trim() !== "") {
        localStorage.setItem('ContaTempoAgoraLogada', null)
        const { isLogin } = await import('./isLogin.js')
        isLogin()
    } 
    const loginForm = `
            <h2>Entrar na conta Tempo Agora</h2>
            <p>Para salvar suas cidades favoritas e ter acesso rápido ao clima atual, faça login em sua conta Tempo Agora.</p>
            <form id="loginForm">
                <div class="formInput">
                    <input type="text" name="nome" id="iNome" required class="inputText" placeholder="">
                    <label for="iNome" class="inputLabel">Nome</label>
                </div>
                <input type="button" class="btnNormal" value="Entrar">
            </form>`
    sectionTime.innerHTML = ''
    sectionTime.style.background = '#ffffff21'
    sectionTime.insertAdjacentHTML('beforeend', loginForm)

    const btnLoginNormal = document.querySelector('#loginForm .btnNormal')
    btnLoginNormal.addEventListener('click', async () => {
        const { login } = await import('./login.js')
        login()
    })
} 
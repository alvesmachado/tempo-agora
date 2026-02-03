let contaLogada 

export const loginPag = async () => {
    localStorage.setItem('ContaTempoAgoraLogada', contaLogada)
    const { isLogin } = await import('./isLogin.js')
    isLogin()
}

async function returnHome() {
    const { climaAqui } = await import('./cidadeAtual.js')
    climaAqui()
}

export const login = async () => {
    const inputText = document.querySelector('#iNome')
    if (inputText.value) {
        const user = {'nome': inputText.value, 'historic': ['','','','']}
        // Se não existir nenhuma conta registrada, cria o LocalStorage para registrar contas
        if (!localStorage.getItem('user')) {
            const userList = []
            userList.push(user)
            localStorage.setItem('user', JSON.stringify(userList))
            contaLogada = user.nome
            loginPag()
            return returnHome()
        } else {
            const userList = JSON.parse(localStorage.getItem('user'))
            if (userList.find( userItem => userItem.nome == inputText.value)) {
                // Se a conta já estiver registrada ela loga
                contaLogada = userList.find( userItem => userItem.nome == inputText.value).nome
                loginPag()
                return returnHome()
            } else {
                // Se não existir a conta digitada registrada, ela registra
                userList.push(user)
                localStorage.setItem('user', JSON.stringify(userList))
                contaLogada = user.nome
                loginPag()
                return returnHome()
            } 
        } 
    } else {
        alert(`Digite um nome para continuar...`)
    }
    console.log(localStorage.getItem('user'))
}
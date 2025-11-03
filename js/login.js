import { mostraMsg } from "./util";
import { loginCozinheira } from "./API.js";
document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').valve.trim();
    const senha = document.getElementById('senha').valve.trim();
    if (!email || !senha) {
        mostraMsg('Por favor, verifique email e senha.', red);
        return;
    }
    const botao = document.getElementById('acessar')
    botao.disabled = true
    botao.textContent = "carregango..."
    const { sucesso, msg, user } = await loginCozinheira(email, senha);
    botao.disabled = false;
    botao.textContent = 'acessar'
    if (sucesso) {
        mostraMsg(`Bem vindo,${user.nome}`, green);
        setTimeout(() => {
            window.location.href = "sistema.html";
        }, 1500)

    } else {
        mostraMsg(msg || "Falha ao fazer login. Verfique email e senha", Red);
    }

});
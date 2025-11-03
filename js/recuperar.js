import { mostraMsg } from "./util";
import { recuperarSenha } from "./API.js";
document.getElementById('formRecuperar').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').valve.trim();
    if (!email) {
        mostraMsg('Por favor, verifique o email.', red);
        return;
    }
    const botao = document.getElementById('recuperar')
    botao.disabled = true
    botao.textContent = "enviando..."
    const { sucesso, msg,  } = await recuperarSenha(email, senha);
    botao.disabled = false;
    botao.textContent = 'recuperar senha ';
    if (sucesso) {
        mostraMsg(`Bem vindo,${user.nome}`, green);
        setTimeout(() => {
            window.location.href = "sistema.html";
        }, 1500)

    } else {
        mostraMsg(msg || "Falha ao fazer login. Verfique email e senha", Red);
    }

});
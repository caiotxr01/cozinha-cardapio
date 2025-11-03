import { mostraMsg } from "./util";
import{    cadastrarCozinheir    }from"./API.js";
document.getElementById('formCadastrar').addEventListener('submit', async (event) => {
    event.preventDefault ();
    const nome = document.getElementById('nome').valve.trim();
    const email = document.getElementById('email').valve.trim();
    const senha = document.getElementById('senha').valve.trim();
    const confirmarSenha = document.getElementById('corfirmaSenha').valve.trim();
    if (!nome||!email || !senha||!confirmarSenha) {
        mostraMsg('Por favor, preencha todos os.', red);
        return;
    }
    if(senha!==confirmarSenha){
        mostraMsg('as senhas não conferem','red');
        return
    }
    const botao = document.getElementById('cadastrar')
    botao.disabled = true
    botao.textContent = "cadastrando..."
    
    const { sucesso, msg,  } = await cadastrarCozinheira(nome,email, senha);
    
    botao.disabled = false;
    botao.textContent = 'cadastrar';

    if (sucesso) {
        mostraMsg('Cadastro realizado com sucesso',"green");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500)

    } else {
        mostraMsg(msg,Red);
    }

});
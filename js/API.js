const API_USUARIOS = "https://cozinha-sistem-1.onrender.com"

async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;

    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;

    } catch (error) {
        msgErro = textErro;
    }

    return { sucesso: false, msg: msgErro || msgPadrao || "Erro desconhecido na API", };
}

async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao fazer login");
        const data = await res.json();

        if (data.usuario) {
            localStorange.setItem("usuarioId:", data.usuario.id);
            localStorange.setItem("usuarioNome:", data.usuario.nome);
            localStorange.setItem("token:", data.token);
            return { sucesso: true, user: data.usuario };

        } else {
            return { sucesso: false, msg: "Usuario ou senha incorretos", }

        }

    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { sucesso: false, mensagem: "Erro de conexão a API" }
    }
}

async function cadastrarCozinheira(nome, email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuario");
        const data = await res.json();

        return { sucesso: true, user: data.usuario || null };

    } catch (error) {
        console.error("Erro ao cadastrar cozinheira", error);
        return { sucesso: false, mensagem: "Erro de conexão a API" }

    }
}

export async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuparar", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "Erro ao recuperar senha");
        const data = await res.json();
        return { sucesso: true, msg: data.msg || "Instruções enviadas ao seu email" };

    } catch (error) {
        console.error("Erro ao recuperar senha", error);
        return { sucesso: false, mensagem: "Erro de conexão a API" }

    }

}

export async function listarCardapio() {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao lista cardapio", error);
        alert("Ocorreu um erro ao carregar cadápio");
    }

}


export async function alterarCardapio(id, atualizarCardapio) {
    try {
        const res = await fetch(`API_USUARIOS/${id}`);
        const cardapios = await res.json();
        document.querySelector("#dote").value = cardapio.data.split("T")[o];
        document.querySelector("select#turnos").value = cardapio.turno;
        document.querySelector("input[name='refeicao']").value = cardapio.refeicao.titulo;
        document.querySelector("textarea[name='itens']").value = cardapio.refeicao.itens.join(",");
        document.querySelector("input[name='bebida'").value = cardapio.refeicao.bebida.join(",");
        if (cardapio.lache) {
            document.querySelector("#dote").value = cardapio.data.split("T")[o];
            document.querySelector("select#turnos").value = cardapio.turno;
            document.querySelector("input[name='refeicao']").value = cardapio.refeicao.titulo;
            document.querySelector("textarea[name='itens']").value = cardapio.refeicao.itens.join(",");
            document.querySelector("input[name='bebida'").value = cardapio.refeicao.bebida.join(",");

        }


        return cardapios;
    } catch (error) {
        console.error("Erro ao alterar cardapio", error);
        alert("Ocorreu um erro ao alterar cadápio");
    }
}

export async function excluirCardapio(id) {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao excluir cardapio", error);
        alert("Ocorreu um erro ao excluir cadápio");
    }

}
export async function buscarCardapio(id) {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao buscar cardapio", error);
        alert("Ocorreu um erro ao busacar cadápio");
    }
}

export async function exibirTabelaCardapios(cardapios) {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao exibir cardapio", error);
        alert("Ocorreu um erro ao exibir cadápio");
    }
}

export async function cadastrarCardapio(cardapio) {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao cadastrar cardapio", error);
        alert("Ocorreu um erro ao cadastrar cadápio");
    }
}

export async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS)
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao cadastrar cardapio", error);
        alert("Ocorreu um erro ao cadastrar cadápio");
    }
}

export async function cadastrasUsuario(cardapio) {
    try {
        cardapio.usuarioId = Number(localStorage.getItem("usuarioId"));
        const res = await fetch(API_USUARIOS, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardapio)
        })
        if (res.ok) {
            alert('Refeição cadastrarcom sucesso!');
            listarCardapio();
        } else {
            alert("Erro ao cadastrar refeição")
        }
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error("Erro ao cadastrar cardapio", error);
        alert("Ocorreu um erro ao cadastrar cadápio");
    }
}




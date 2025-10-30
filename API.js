const API_USUARIOS = "https://api-storage-cantina-main-omega.vercel.app/"

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

async function recuperarSenha(email) {
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
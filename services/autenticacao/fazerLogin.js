import {salvarToken, salvarUsuario} from "../usuario/usuarioStorage";

export async function fazerLogin(email, senha, setUsuario) {
    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    });

    resultado = await resultado.json();
    console.log("Resposta do login:", resultado);

    if (resultado.token) {
        await salvarToken(resultado.token);
        console.log("Token salvo:", resultado.token);
    }

    if (resultado.usuario && resultado.usuario.id) {
        await salvarUsuario(resultado.usuario.id, resultado.usuario.nome, email, senha);
    }

    setUsuario(resultado.usuario || resultado);
}
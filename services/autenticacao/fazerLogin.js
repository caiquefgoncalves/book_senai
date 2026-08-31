import {setToken} from '../token/token';

export async function fazerLogin(email, senha, setUsuario) {
    console.log("=== LOGIN ===");
    console.log("URL:", "https://apps-api-livros.ucxocw.easypanel.host/auth/login");
    console.log("Método: POST");
    console.log("Headers:", {
        "Content-Type": "application/json"
    });
    console.log("Body:", JSON.stringify({
        email: email,
        senha: senha
    }));
    console.log("Email:", email);
    console.log("Senha:", senha);

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
    console.log("=== RESPOSTA ===");
    console.log("Status:", resultado.status);
    console.log("Resposta completa:", resultado);

    // Pegar token
    const token = resultado.token || resultado.accessToken || resultado.usuario?.token;
    console.log("Token encontrado:", token);

    if (token) {
        setToken(token);
        console.log("Token salvo com sucesso!");
    } else {
        console.log("Nenhum token na resposta");
    }

    setUsuario(resultado.usuario || resultado);
}
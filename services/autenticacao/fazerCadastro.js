export async function fazerCadastro(nome, email, senha, setUsuario) {
    const endpoints = [
        "https://apps-api-livros.ucxocw.easypanel.host/usuarios",
    ];

    for (const endpoint of endpoints) {
        console.log("Tentando endpoint:", endpoint);

        try {
            var resultado = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha
                })
            });

            console.log("Status:", resultado.status);

            if (resultado.ok) {
                resultado = await resultado.json();
                console.log("Sucesso no endpoint:", endpoint);
                console.log("Resposta:", resultado);

                setUsuario(resultado.usuario || resultado);
                return resultado;
            }
        } catch (error) {
            console.log("Erro no endpoint:", endpoint, error);
        }
    }

    throw new Error("Não foi possível cadastrar");
}
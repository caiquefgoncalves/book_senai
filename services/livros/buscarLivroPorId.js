import {getToken} from '../token/token';

export async function buscarLivroPorId(id, setLivro) {
    const token = getToken();

    console.log("Token:", token);

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/livros/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    console.log("Resposta:", resultado);
    setLivro(resultado.livro || resultado);
}
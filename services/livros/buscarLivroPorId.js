// services/livros/buscarLivroPorId.js
import {getToken} from "../usuario/usuarioStorage";

export async function buscarLivroPorId(id, setLivro) {
    const token = await getToken();
    console.log("Token usado:", token);
    console.log("ID do livro:", id);

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/livros/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    console.log("Resposta livro:", resultado);
    setLivro(resultado.livro || resultado);
}
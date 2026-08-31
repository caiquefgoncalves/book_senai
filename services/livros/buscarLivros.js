import {getToken} from '../token/token';

export async function buscarLivros(setLivros) {
    const token = getToken();

    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/livros", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    console.log("Resposta livros:", resultado);
    setLivros(resultado.livros || []);
}
import {getToken} from "../usuario/usuarioStorage";

export async function editarLivro(id, imagem, titulo, categoria, descricao, autor, faixa_etaria) {
    const token = await getToken();
    console.log("Token para editar:", token);

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/livros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            imagem: imagem,
            titulo: titulo,
            categoria: categoria,
            descricao: descricao,
            autor: autor,
            faixa_etaria: faixa_etaria
        })
    });

    resultado = await resultado.json();
    console.log("Resposta da edição:", resultado);
    return resultado;
}
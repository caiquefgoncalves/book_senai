import {getToken} from "../usuario/usuarioStorage"

export async function cadastroLivro(imagem, titulo, autor, categoria, descricao, faixa_etaria) {
    const token = await getToken();

    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/livros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body : JSON.stringify({
            imagem: imagem,
            titulo: titulo,
            categoria: categoria,
            descricao: descricao,
            faixa_etaria: faixa_etaria,
            autor: autor,
        })
    })


    resultado = await resultado.json();
    console.log("Resposta cadastro", resultado)

    return resultado


}
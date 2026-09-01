import {getToken} from "../usuario/usuarioStorage";


export async function excluirLivro(id) {
    const token = getToken()

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/livros/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    resultado = await resultado.json()
    return resultado
}
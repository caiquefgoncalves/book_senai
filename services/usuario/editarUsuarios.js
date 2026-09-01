import {getToken} from "./usuarioStorage";


export async function editarUsuarios(id,nome, email, senha){
    const token = getToken();

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })

    resultado = await resultado.json();
    return resultado;
}
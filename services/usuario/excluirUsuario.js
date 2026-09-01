import {getToken} from "../usuario/usuarioStorage";

export async function excluirUsuario(id) {
    const token = await getToken();

    var resultado = await fetch(`https://apps-api-livros.ucxocw.easypanel.host/usuarios/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    return resultado;
}
import {getToken} from "../usuario/usuarioStorage";

export async function buscarUsuario(setUsuarios) {
    const token = await getToken();

    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/usuarios", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    console.log("Usuários:", resultado);
    setUsuarios(resultado.usuarios || []);
}
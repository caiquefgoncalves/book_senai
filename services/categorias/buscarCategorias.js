import {getToken} from "../usuario/usuarioStorage";

export async function buscarCategorias(setCategorias) {
    const token = await getToken();
    console.log("Token usado:", token);

    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/categorias", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    resultado = await resultado.json();
    console.log("Resposta categorias:", resultado);
    setCategorias(resultado.categorias || []);
}
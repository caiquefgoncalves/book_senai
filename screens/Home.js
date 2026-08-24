import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import CardLivro from "../components/CardLivro";
import {buscarLivros} from "../services/livros/buscarLivros";
import Header from "../components/Header";
import Pesquisa from "../components/Pesquisa";
import {buscarCategorias} from "../services/categorias/buscarCategorias";
import ListaCategorias from "../components/ListaCategorias";


export default function Home() {

    const [livros, setLivros]  = useState([])
    const [categorias, setCategorias] = useState([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)


    function tratarSelecionarCategoria(categoria) {
        if (categoriaSelecionada === categoria) {
            setCategoriaSelecionada(null);
        } else {
            setCategoriaSelecionada(categoria);
        }
    }


    const livrosExibidos = categoriaSelecionada
        ? livros.filter(livro => livro.categoria === categoriaSelecionada)
        :livros;

    useEffect(() => {
        buscarLivros(setLivros);
        buscarCategorias(setCategorias);
    }, []);

    return (
        <ScrollView style={styles.container}>
           <Header />

            <Pesquisa />

            <ScrollView
                horizontal={true}
            >
                {categorias && categorias.map(function(categoria) {
                    return (
                        <ListaCategorias
                            key={categoria}
                            categoria={categoria}
                            selecionado={categoriaSelecionada === categoria}
                            aoPressionar={() => tratarSelecionarCategoria(categoria)}/>
                    )
                })}
            </ScrollView>

            <View style={styles.lista}>
                {livrosExibidos.map(function(livro){
                    return(
                        <CardLivro key={livro.id} livro={livro} />
                    )
                })}
            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
    },

    lista: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 16
    }
})








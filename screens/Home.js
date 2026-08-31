import {ScrollView, StyleSheet, View, Text} from "react-native";
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
    const [termoBusca, setTermoBusca] = useState('')


    function tratarSelecionarCategoria(categoria) {
        if (categoriaSelecionada === categoria) {
            setCategoriaSelecionada(null);
        } else {
            setCategoriaSelecionada(categoria);
        }
    }


    const livrosExibidos = livros.filter(livro => {
        if (categoriaSelecionada && livro.categoria !== categoriaSelecionada) {
            return false;
        }

        if (termoBusca.trim() !== '') {
            const termo = termoBusca.toLowerCase();
            const titulo = (livro.titulo || '').toLowerCase();
            const autor = (livro.autor || '').toLowerCase();

            return titulo.includes(termo) || autor.includes(termo);
        }

        return true;
    });

    useEffect(() => {
        buscarLivros(setLivros);
        buscarCategorias(setCategorias);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Header />

            <Pesquisa
                termoBusca={termoBusca}
                setTermoBusca={setTermoBusca}
            />

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

            {livrosExibidos.length > 0 ? (
                <View style={styles.lista}>
                    {livrosExibidos.map(function(livro){
                        return(
                            <CardLivro key={livro.id} livro={livro} />
                        )
                    })}
                </View>
            ) : (
                <View style={styles.semResultados}>
                    <Text style={styles.textoSemResultados}>
                        Nenhum livro encontrado
                    </Text>
                </View>
            )}
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
    },

    semResultados: {
        padding: 20,
        alignItems: 'center',
    },

    textoSemResultados: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
})
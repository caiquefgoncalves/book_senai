import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import CardLivro from "../components/CardLivro";
import {buscarLivros} from "../services/livros/buscarLivros";
import Header from "../components/Header";
import Pesquisa from "../components/Pesquisa";


export default function Home() {

    const [livros, setLivros]  = useState([])

    useEffect(() => {
        buscarLivros(setLivros);
    }, []);

    return (
        <ScrollView style={styles.container}>
           <Header />

            <Pesquisa />

            <View style={styles.lista}>
                {livros.map(function(livro){
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








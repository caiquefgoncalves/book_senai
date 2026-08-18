import {Text, ScrollView} from "react-native";
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
        <ScrollView>
           <Header />

            <Pesquisa />

            {livros.map(function(livro){
                return(
                   <CardLivro livro={livro} />
                )
            })}
        </ScrollView>
    )
}




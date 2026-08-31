import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {buscarLivroPorId} from "../services/livros/buscarLivroPorId";

export default function DetalhesLivro({ route, navigation }) {
    const { livroId } = route.params;
    const [livro, setLivro] = useState(null);

    useEffect(() => {
        buscarLivroPorId(livroId, setLivro);
    }, [livroId]);

    console.log("Livro carregado:", livro);

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.textoVoltar}>← Voltar</Text>
            </TouchableOpacity>

            {livro && (
                <View style={styles.conteudo}>
                    <View style={styles.cardImagem}>
                        {livro.imagem ? (
                            <Image
                                source={{ uri: livro.imagem }}
                                style={styles.imagem}
                            />
                        ) : null}
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.titulo}>{livro.titulo || 'Sem título'}</Text>
                        <Text style={styles.autor}>por {livro.autor || 'Autor desconhecido'}</Text>

                        <View style={styles.badgeCategoria}>
                            <Text style={styles.textoCategoria}>{livro.categoria || 'Sem categoria'}</Text>
                        </View>

                        <View style={styles.divisor} />

                        <View style={styles.secao}>
                            <Text style={styles.tituloSecao}>Descrição</Text>
                            <Text style={styles.descricao}>{livro.descricao || 'Sem descrição'}</Text>
                        </View>

                        <View style={styles.divisor} />

                        {livro.ano ? (
                            <View style={styles.secao}>
                                <Text style={styles.tituloSecao}>Ano de Publicação</Text>
                                <Text style={styles.info}>{livro.ano}</Text>
                            </View>
                        ) : null}

                        {livro.editora ? (
                            <View style={styles.secao}>
                                <Text style={styles.tituloSecao}>Editora</Text>
                                <Text style={styles.info}>{livro.editora}</Text>
                            </View>
                        ) : null}

                        {livro.paginas ? (
                            <View style={styles.secao}>
                                <Text style={styles.tituloSecao}>Número de Páginas</Text>
                                <Text style={styles.info}>{livro.paginas} páginas</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    botaoVoltar: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        alignSelf: 'flex-start',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textoVoltar: {
        fontSize: 16,
        color: '#1d1d9a',
        fontWeight: '600',
    },
    conteudo: {
        flex: 1,
    },
    cardImagem: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    imagem: {
        width: 200,
        height: 300,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    infoContainer: {
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    autor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    badgeCategoria: {
        backgroundColor: '#e8e8ff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    textoCategoria: {
        fontSize: 14,
        color: '#1d1d9a',
        fontWeight: '600',
    },
    divisor: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 20,
    },
    secao: {
        marginBottom: 20,
    },
    tituloSecao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 10,
    },
    descricao: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
    },
    info: {
        fontSize: 15,
        color: '#555',
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 10,
    },
});
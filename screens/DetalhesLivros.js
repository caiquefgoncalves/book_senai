import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert} from "react-native";
import {buscarLivroPorId} from "../services/livros/buscarLivroPorId";
import {excluirLivro} from "../services/livros/excluirLivro";
import {getUsuario} from "../services/usuario/usuarioStorage";

export default function DetalhesLivro({ route, navigation }) {
    const { livroId } = route.params;
    const [livro, setLivro] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        buscarLivroPorId(livroId, setLivro);
        verificarUsuario();
    }, [livroId]);

    const verificarUsuario = async () => {
        const usuario = await getUsuario();
        setUsuarioLogado(usuario);
    };

    const handleExcluir = () => {
        Alert.alert(
            'Excluir Livro',
            'Tem certeza que deseja excluir este livro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await excluirLivro(livroId);
                            Alert.alert('Sucesso', 'Livro excluído!', [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.goBack()
                                }
                            ]);
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir o livro');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            {livro && (
                <View style={styles.conteudo}>
                    <Image source={{ uri: livro.imagem }} style={styles.imagem} />
                    <Text style={styles.titulo}>{livro.titulo}</Text>
                    <Text style={styles.autor}>{livro.autor}</Text>
                    <Text style={styles.categoria}>{livro.categoria}</Text>
                    <Text style={styles.descricao}>{livro.descricao}</Text>

                    {usuarioLogado && (
                        <View style={styles.containerBotoes}>
                            <TouchableOpacity
                                style={styles.botaoEditar}
                                onPress={() => navigation.navigate('EditarLivro', { livroId: livro.id })}
                            >
                                <Text style={styles.textoEditar}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botaoExcluir}
                                onPress={handleExcluir}
                            >
                                <Text style={styles.textoExcluir}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    voltar: {
        fontSize: 18,
        color: '#1d1d9a',
        marginBottom: 20,
    },
    conteudo: {
        flex: 1,
    },
    imagem: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    autor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    categoria: {
        fontSize: 14,
        color: '#1d1d9a',
        marginBottom: 15,
    },
    descricao: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
        marginBottom: 20,
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botaoEditar: {
        backgroundColor: '#1d1d9a',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
    },
    textoEditar: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botaoExcluir: {
        backgroundColor: '#ff4444',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
    },
    textoExcluir: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
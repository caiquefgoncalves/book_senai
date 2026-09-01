import React, {useState, useCallback} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {buscarUsuario} from "../services/usuario/buscarUsuario";
import {excluirUsuario} from "../services/usuario/excluirUsuario";

export default function ListaUsuarios({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);

    useFocusEffect(
        useCallback(() => {
            carregarUsuarios();
        }, [])
    );

    const carregarUsuarios = async () => {
        await buscarUsuario(setUsuarios);
    };

    const handleExcluir = (usuario) => {
        Alert.alert(
            'Excluir Usuário',
            `Tem certeza que deseja excluir ${usuario.nome}?`,
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
                            await excluirUsuario(usuario.id);
                            Alert.alert('Sucesso', 'Usuário excluído!');
                            carregarUsuarios();
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir o usuário');
                        }
                    }
                }
            ]
        );
    };

    const renderUsuario = ({item}) => (
        <View style={styles.cardUsuario}>
            <View style={styles.infoUsuario}>
                <Text style={styles.nomeUsuario}>{item.nome}</Text>
                <Text style={styles.emailUsuario}>{item.email}</Text>
            </View>

            <View style={styles.containerBotoes}>
                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => navigation.navigate('EditarUsuario', { usuario: item })}
                >
                    <Text style={styles.textoEditar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => handleExcluir(item)}
                >
                    <Text style={styles.textoExcluir}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Usuários</Text>

            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={renderUsuario}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.semUsuarios}>Nenhum usuário encontrado</Text>
                }
            />
        </View>
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
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    cardUsuario: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    infoUsuario: {
        marginBottom: 10,
    },
    nomeUsuario: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emailUsuario: {
        fontSize: 14,
        color: '#666',
        marginTop: 3,
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    botaoEditar: {
        backgroundColor: '#1d1d9a',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
    },
    textoEditar: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    botaoExcluir: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
    },
    textoExcluir: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    semUsuarios: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 30,
    },
});
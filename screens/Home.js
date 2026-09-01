import React, {useState, useCallback} from "react";
import {ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import CardLivro from "../components/CardLivro";
import {buscarLivros} from "../services/livros/buscarLivros";
import Header from "../components/Header";
import Pesquisa from "../components/Pesquisa";
import {buscarCategorias} from "../services/categorias/buscarCategorias";
import ListaCategorias from "../components/ListaCategorias";
import {getUsuario, limparDados} from "../services/usuario/usuarioStorage";

export default function Home({ navigation }) {
    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [usuarioLogado, setUsuarioLogado] = useState(false);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
            verificarUsuario();
        }, [])
    );

    const carregarDados = async () => {
        await buscarLivros(setLivros);
        await buscarCategorias(setCategorias);
    };

    const verificarUsuario = async () => {
        const usuario = await getUsuario();
        setUsuarioLogado(usuario);
    };

    const handleLogout = async () => {
        await limparDados();
        setUsuarioLogado(false);
        navigation.navigate('Login');
    };

    const tratarSelecionarCategoria = (categoria) => {
        setCategoriaSelecionada(prev =>
            prev === categoria ? null : categoria
        );
    };

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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Header />

                <View style={styles.containerBotoes}>
                    <TouchableOpacity
                        style={styles.botaoLogin}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textoLogin}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoCadastro}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={styles.textoCadastro}>Cadastro</Text>
                    </TouchableOpacity>

                    {usuarioLogado && (
                        <TouchableOpacity
                            style={styles.botaoSair}
                            onPress={handleLogout}
                        >
                            <Text style={styles.textoSair}>Sair</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.containerPesquisa}>
                <View style={styles.pesquisaWrapper}>
                    <Pesquisa
                        termoBusca={termoBusca}
                        setTermoBusca={setTermoBusca}
                    />
                </View>

                {usuarioLogado && (
                    <TouchableOpacity
                        style={styles.botaoCadastrarLivro}
                        onPress={() => navigation.navigate('CadastroLivro')}
                    >
                        <Text style={styles.textoCadastrarLivro}>+</Text>
                    </TouchableOpacity>
                )}
            </View>

            {usuarioLogado && (
                <TouchableOpacity
                    style={styles.botaoUsuarios}
                    onPress={() => navigation.navigate('ListaUsuarios')}
                >
                    <Text style={styles.textoUsuarios}>Usuários</Text>
                </TouchableOpacity>
            )}

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.categoriasScroll}
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
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    containerBotoes: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    botaoLogin: {
        backgroundColor: '#1d1d9a',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    textoLogin: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    botaoCadastro: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1d1d9a',
    },
    textoCadastro: {
        color: '#1d1d9a',
        fontSize: 11,
        fontWeight: 'bold',
    },
    botaoSair: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    textoSair: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    containerPesquisa: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        gap: 10,
    },
    pesquisaWrapper: {
        flex: 1,
    },
    botaoCadastrarLivro: {
        backgroundColor: '#1d1d9a',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    textoCadastrarLivro: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    botaoUsuarios: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
    },
    textoUsuarios: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    categoriasScroll: {
        marginVertical: 10,
        paddingLeft: 16,
    },
    lista: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 16
    }
});
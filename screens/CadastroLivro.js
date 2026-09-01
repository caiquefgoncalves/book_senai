import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import {cadastroLivro} from "../services/livros/cadastroLivro";

export default function CadastroLivro({ navigation }) {
    const [imagem, setImagem] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [autor, setAutor] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');

    const handleCadastrar = async () => {
        if (!imagem || !titulo || !categoria || !descricao || !autor || !faixaEtaria) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            await cadastroLivro(imagem, titulo, categoria, descricao, autor, faixaEtaria);
            Alert.alert('Sucesso', 'Livro cadastrado!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (error) {
            console.log("Erro:", error);
            Alert.alert('Erro', 'Não foi possível cadastrar o livro');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Cadastrar Livro</Text>

            <View style={styles.form}>
                <Text style={styles.label}>URL da Imagem</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://exemplo.com/capa.jpg"
                    value={imagem}
                    onChangeText={setImagem}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título do livro"
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Fantasia, Romance, etc."
                    value={categoria}
                    onChangeText={setCategoria}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.inputDescricao}
                    placeholder="Descrição do livro"
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Autor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do autor"
                    value={autor}
                    onChangeText={setAutor}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Faixa Etária</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 10+, 14+, 18+"
                    value={faixaEtaria}
                    onChangeText={setFaixaEtaria}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                    <Text style={styles.textoBotao}>Cadastrar Livro</Text>
                </TouchableOpacity>
            </View>
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
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fafafa',
    },
    inputDescricao: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#fafafa',
        height: 100,
        textAlignVertical: 'top',
    },
    botao: {
        backgroundColor: '#1d1d9a',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotao: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
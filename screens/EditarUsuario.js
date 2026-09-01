import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import {editarUsuarios} from "../services/usuario/editarUsuarios";

export default function EditarUsuario({ route, navigation }) {
    const { usuario } = route.params;
    const [nome, setNome] = useState(usuario.nome || '');
    const [email, setEmail] = useState(usuario.email || '');
    const [senha, setSenha] = useState('');

    const handleEditar = async () => {
        if (!nome || !email) {
            Alert.alert('Erro', 'Preencha nome e email');
            return;
        }

        try {
            await editarUsuarios(usuario.id, nome, email, senha);
            Alert.alert('Sucesso', 'Usuário editado!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (error) {
            console.log("Erro:", error);
            Alert.alert('Erro', 'Não foi possível editar o usuário');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.voltar}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Editar Usuário</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do usuário"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email do usuário"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Nova Senha (opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deixe em branco para manter a senha atual"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.botao} onPress={handleEditar}>
                    <Text style={styles.textoBotao}>Salvar Alterações</Text>
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
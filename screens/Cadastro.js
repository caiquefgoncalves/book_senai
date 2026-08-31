import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import {fazerCadastro} from "../services/autenticacao/fazerCadastro";

export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleCadastro = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            await fazerCadastro(nome, email, senha, setUsuario);
            Alert.alert('Sucesso', 'Cadastro realizado! Faça login.', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login')
                }
            ]);
        } catch (error) {
            console.log("Erro no cadastro:", error);
            Alert.alert('Erro', 'Não foi possível cadastrar');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Criar Conta</Text>
                <Text style={styles.subtitulo}>Preencha os dados para se cadastrar</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu nome"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Senha</Text>
                <View style={styles.containerSenha}>
                    <TextInput
                        style={styles.inputSenha}
                        placeholder="Crie uma senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!mostrarSenha}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        style={styles.botaoMostrarSenha}
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                    >
                        <Text style={styles.textoMostrarSenha}>
                            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={!mostrarSenha}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
                    <Text style={styles.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkLogin}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textoLogin}>
                        Já tem uma conta? <Text style={styles.link}>Faça login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
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
    containerSenha: {
        position: 'relative',
        marginBottom: 20,
    },
    inputSenha: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
        paddingRight: 80,
    },
    botaoMostrarSenha: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    textoMostrarSenha: {
        fontSize: 14,
        color: '#1d1d9a',
        fontWeight: '600',
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
    linkLogin: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 40,
    },
    textoLogin: {
        fontSize: 14,
        color: '#666',
    },
    link: {
        color: '#1d1d9a',
        fontWeight: 'bold',
    },
});
import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {fazerLogin} from "../services/autenticacao/fazerLogin";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            await fazerLogin(email, senha, setUsuario);
            navigation.navigate('Home');
        } catch (error) {
            console.log("Erro no login:", error);
            Alert.alert('Erro', 'Email ou senha incorretos');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitulo}>Faça login para continuar</Text>
            </View>

            <View style={styles.form}>
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
                        placeholder="Sua senha"
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

                <TouchableOpacity
                    style={styles.botao}
                    onPress={handleLogin}
                >
                    <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkCadastro}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.textoCadastro}>
                        Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    header: {
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
    linkCadastro: {
        marginTop: 20,
        alignItems: 'center',
    },
    textoCadastro: {
        fontSize: 14,
        color: '#666',
    },
    link: {
        color: '#1d1d9a',
        fontWeight: 'bold',
    },
});
import {Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";

export default function Pesquisa({ termoBusca, setTermoBusca }) {


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Encontre seu próximo livro</Text>
            <Text style={styles.subtitulo}>Conhecimento que inspira. Histórias que transformam.</Text>

            <View style={styles.containerPesquisa}>
                <TextInput
                    placeholder="Buscar Livros..."
                    style={styles.pesquisa}
                    value={termoBusca}
                    onChangeText={setTermoBusca}
                />
            </View>

            <ScrollView horizontal={true}>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 20,
        marginRight: 20,
    },

    titulo: {
        color: 'black',
        fontSize: 25,
        fontWeight: 800,
        marginTop: 15,
    },

    subtitulo: {
        flex: 1,
        color: '#958e8e',
        fontSize: 14.20,
        marginTop: 10,
    },

    containerPesquisa: {
        position: 'relative',
        marginTop: 20,
    },

    pesquisa: {
        borderRadius: 5,
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },

    botaoLimpar: {
        position: 'absolute',
        right: 15,
        top: 12,
    },

    textoLimpar: {
        fontSize: 16,
        color: '#666',
    },
})
import {Text, TextInput, View, StyleSheet} from "react-native";


export default function Pesquisa() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Encontre seu próximo livro</Text>
            <Text style={styles.subtitulo}>Conhecimento que inspira. Histórias que transformam</Text>

            <TextInput
            placeholder="Buscar Livros..."
            placeholderTextColor={"#958e8e"}
            style={styles.pesquisa}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 20,
    },

    titulo: {
        color: 'black',
        fontSize: 25,
        fontWeight: 800,
        marginTop: 30,
    },

    subtitulo: {
        flex: 1,
        color: '#958e8e',
        fontSize: 14.5,
        marginTop: 10,

    },

    pesquisa: {
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#958e8e',
        width: 355,
    }
})
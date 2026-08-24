import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default function ListaCategorias({categoria, selecionado, aoPressionar}) {

    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.containerCategoria, selecionado && styles.containerSelecionado]} onPress={aoPressionar}>
                <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>{categoria}</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 20,

    },

    texto: {
        color: "#1d1d9a",
        fontSize: 16,
    },

    containerCategoria: {
        marginTop: 15,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginRight: 3,
        borderWidth: 1,
        borderColor: '#1d1d9a',
    },

    containerSelecionado:{
        backgroundColor: '#1d1d9a',
    },

    textoSelecionado: {
        color: "white",
    }
})
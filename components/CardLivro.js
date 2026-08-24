import {Image, Text, View, StyleSheet, Button, Pressable} from "react-native";

export default function CardLivro({ livro }) {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: livro.imagem }}
                style={styles.imagem}
            />
            <Text style={styles.titulo}>{livro.titulo}</Text>
            <Text style={styles.subtitulo}>{livro.categoria} - {livro.autor}</Text>
            <Text style={styles.descricao}>{livro.descricao}</Text>
            <Pressable style={styles.botao}>
                <Text style={styles.escritaBotao}>Ver Detalhes</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        borderColor: '#bfbaba',
        borderWidth: 1,

    },
    imagem: {
        width: '100%',
        height: 150,
        borderRadius: 4,
        resizeMode: 'cover',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 8,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    descricao: {
        fontSize: 11,
        color: '#999',
        textAlign: 'left',
        marginTop: 4,
    },

    botao: {
        marginTop: 8,
        backgroundColor: 'white',
        borderColor: '#1d1d9a',
        borderWidth: 1.5,
        borderRadius: 4,
        width: '100%',
        padding: 10,
    },

    escritaBotao: {
        fontSize: 12,
        color: '#1d1d9a',
        textAlign: 'center',
        fontWeight: 800,
    }
})
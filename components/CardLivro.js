import { Image, Text, View, StyleSheet } from "react-native";

export default function CardLivro({ livro }) {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: livro.imagem }}
                style={styles.imagem}
            />
            <Text style={styles.titulo}>{livro.titulo}</Text>
            <Text style={styles.subtitulo}>{livro.categoria} - {livro.autor}</Text>
            <Text numberOfLines={2} style={styles.descricao}>{livro.descricao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        width: '45%',
        flexGrow: 1,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    imagem: {
        width: '100%',
        height: 150,
        borderRadius: 4,
        resizeMode: 'cover',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    descricao: {
        fontSize: 11,
        color: '#999',
        textAlign: 'center',
        marginTop: 4,
    }
})
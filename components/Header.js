import {Text, StyleSheet, View} from "react-native";


export default function Header() {
    return(
        <View style={styles.container}>
            <Text style={styles.senai}>SENAI <Text style={styles.texto}>Book</Text></Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 20,
        marginTop: 45,
    },

    senai: {
        color: "#1d1d9a",
        fontSize: 45,
        fontWeight: 800,
        fontStyle: 'italic',
    },

    texto : {
        fontSize: 45,
        color: 'black',
        fontStyle: 20,
    }


})
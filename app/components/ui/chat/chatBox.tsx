import { View, Text, StyleSheet } from "react-native";

export default function ChatBox() {
    return (
        <View style={styles.chatItems}>
            <View style={styles.circle}></View>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>arthurtopzera</Text>
                <Text style={styles.message}>Seguinte, voce faz aeweufbouwbc</Text>
            </View>
            <Text style={styles.options}>...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    title: {
        fontSize: 32,
        fontFamily: "Itim_400Regular",
        color: "#1E293B",
    },
    scrollContainer: {
        marginTop: 20,
        width: "100%",
    },
    chatItems: {
        width: "100%",
        height: 100,
        flexDirection: "row",
    },
    circle: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "green",
        marginLeft: 5,
        marginTop: 5,
    },
    name: {
        fontSize: 24,
        fontFamily: "Itim_400Regular",
        color: "#1a1a2d",
        marginLeft: "10%",
    },
    message: {
        fontSize: 16,
        fontFamily: "Raleway_400Regular",
        color: "#1a1a2d",
        marginLeft: "10%",
    },
    options:
    {
        fontSize: 24,
        fontFamily: "Itim_400Regular",
        color: "#1a1a2d",
        marginRight: "5%",
    },
    withBorder: {
        borderBottomWidth: 1, // Linha entre mensagens
        borderBottomColor: '#ddd', // Cor da linha
    },
}); 
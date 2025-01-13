import Layout from "@/components/Layout";
import ChatBox from "@/components/ui/chat/chatBox";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Chat() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Conversas</Text>
        <ScrollView style={styles.scrollContainer}>
          <ChatBox />
          <ChatBox />
          <ChatBox />
          <ChatBox />
        </ScrollView>
      </View>
    </Layout>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

}); 
// INCOMPLETO 

import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Postagem = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Cabeçalho fixo no topo */}
      <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        elevation: 5, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10 
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Button mode="text" textColor="black">Voltar</Button>
        </TouchableOpacity>

        <Button 
          mode="contained" 
          onPress={() => console.log("Post publicado:", text)}
          buttonColor="blue"
          textColor="white"
        >
          Publicar
        </Button>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, padding: 16, justifyContent: "center" }}
      >
        {/* Avatar e Campo de Texto */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginTop: 80 
        }}>
          <Avatar.Icon size={55} icon="account" color="white" style={{ backgroundColor: "black" }} />
          <TextInput
            placeholder="Digite aqui sua dúvida..."
            value={text}
            onChangeText={setText}
            style={{
              flex: 1,
              marginLeft: 10,
              paddingVertical: 10,
              fontSize: 16,
              color: "black",
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
              paddingHorizontal: 10
            }}
            multiline
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

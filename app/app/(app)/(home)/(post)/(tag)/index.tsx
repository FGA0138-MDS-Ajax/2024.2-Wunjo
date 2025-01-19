import React, { useState } from "react";
import { Template } from "@/app/(app)/(home)/(filter)";
import TreasureChest from "@/assets/images/Treasure-chest";
import { useRouter } from "expo-router";

export default function Screen() {

  const router = useRouter();
  const [hasError, setHasError] = useState(true);

  return (
    <Template
      title={
        "Espalhe o tesouro!\nCompartilhe a sua dúvida!"
      }
      error_message="*Preencha todos os campos para prosseguir"
      hasError={hasError}
      setHasError={setHasError}
      image={
      <TreasureChest
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />}
      button_label="Publicar"
      button_onPress={() => router.push("/(app)/(home)/(post)/(success)")}
      first_input_label="Sua dúvida pertence a qual disciplina?"
      second_input_label="Dificuldade da sua dúvida"
    />
  );
}
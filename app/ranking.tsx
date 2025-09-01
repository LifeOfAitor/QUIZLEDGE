// ranking.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

import questions from "../data/questions.json";
import { globalStyles } from "../styles/globalStyles";

type Tema = {
  tema: string;
};

export default function RankingScreen() {
  const router = useRouter();
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  // Leer las puntuaciones de AsyncStorage cuando se monta la pantalla
  useEffect(() => {
    const loadScores = async () => {
      let loadedScores: { [key: string]: number } = {};
      for (const tema of questions) {
        try {
          const storedScore = await AsyncStorage.getItem(`score_${tema.tema}`);
          loadedScores[tema.tema] = storedScore ? JSON.parse(storedScore) : 0;
        } catch (e) {
          console.error("Error leyendo puntuación", e);
          loadedScores[tema.tema] = 0;
        }
      }
      setScores(loadedScores);
    };

    loadScores();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/fondo_app.jpg")}
      style={globalStyles.container}
      resizeMode="cover"
    >
      <Text style={globalStyles.titulo}>Ranking por temas</Text>

      {questions.map((tema) => (
        <TouchableOpacity key={tema.tema} style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>
            {tema.tema}: {scores[tema.tema] ?? 0} pts
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={globalStyles.botonVolver}
        onPress={() => router.push("/")}
      >
        <Text style={globalStyles.textoBotonVolver}>Volver al inicio</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

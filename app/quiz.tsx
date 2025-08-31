import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import questions from "../data/questions.json";

// Tipos
type Pregunta = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta: string;
};

type Tema = {
  tema: string;
  preguntas: Pregunta[];
};

// ...imports y tipos siguen igual

export default function QuizScreen() {
  const router = useRouter();

  const [temaActual, setTemaActual] = useState<Tema | null>(null);
  const [preguntaActual, setPreguntaActual] = useState<number>(0);
  const [puntuacion, setPuntuacion] = useState<number>(0);
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const [correcta, setCorrecta] = useState<boolean | null>(null);

  const handleSeleccionTema = (tema: Tema) => {
    setTemaActual(tema);
    setPreguntaActual(0);
    setPuntuacion(0);
    setMostrarResultado(false);
    setSeleccionada(null);
    setCorrecta(null);
  };

  const handleSeleccionOpcion = (opcion: string) => {
    if (!temaActual) return;

    const respuestaCorrecta = temaActual.preguntas[preguntaActual].respuesta;
    const esCorrecta = opcion === respuestaCorrecta;

    setSeleccionada(opcion);
    setCorrecta(esCorrecta);

    if (esCorrecta) setPuntuacion(prev => prev + 1);
  };

  useEffect(() => {
    if (seleccionada !== null) {
      const timer = setTimeout(() => {
        if (!temaActual) return;
        const siguiente = preguntaActual + 1;
        if (siguiente < temaActual.preguntas.length) {
          setPreguntaActual(siguiente);
          setSeleccionada(null);
          setCorrecta(null);
        } else {
          setMostrarResultado(true);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [seleccionada]);

  const handleReiniciarJuego = () => {
    setTemaActual(null);
    setPreguntaActual(0);
    setPuntuacion(0);
    setMostrarResultado(false);
    setSeleccionada(null);
    setCorrecta(null);
  };

  // Pantalla selección de tema
  if (!temaActual) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_app.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.titulo}>Selecciona un tema</Text>
        {questions.map((tema) => (
          <TouchableOpacity
            key={tema.tema}
            style={styles.botonTema}
            onPress={() => handleSeleccionTema(tema)}
          >
            <Text style={styles.textoBotonTema}>{tema.tema}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.botonVolver} onPress={() => router.push("/")}>
          <Text style={styles.textoBotonVolver}>Volver al inicio</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </ImageBackground>
    );
  }

  // Pantalla de resultado
  if (mostrarResultado && temaActual) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_app.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.titulo}>¡Juego terminado!</Text>
        <Text style={styles.resultadoTexto}>
          Tu puntuación: {puntuacion} de {temaActual.preguntas.length}
        </Text>
        <TouchableOpacity style={styles.botonReiniciar} onPress={handleReiniciarJuego}>
          <Text style={styles.textoBotonReiniciar}>Volver a jugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonVolver} onPress={() => router.push("/")}>
          <Text style={styles.textoBotonVolver}>Volver al inicio</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </ImageBackground>
    );
  }

  // Pregunta actual con fondo sólido
  const pregunta = temaActual.preguntas[preguntaActual];

  return (
    <ImageBackground
      source={require('../assets/images/fondo_app.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.tituloTema}>{temaActual.tema}</Text>

      <View style={styles.fondoPregunta}>
        <View style={styles.seccionPregunta}>
          <Text style={styles.numeroPregunta}>
            Pregunta {preguntaActual + 1} de {temaActual.preguntas.length}
          </Text>
          <Text style={styles.textoPregunta}>{pregunta.pregunta}</Text>
        </View>
        <View style={styles.seccionOpciones}>
          {pregunta.opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion}
              style={[
                styles.botonOpcion,
                seleccionada === opcion && (correcta ? styles.opcionCorrecta : styles.opcionIncorrecta)
              ]}
              onPress={() => handleSeleccionOpcion(opcion)}
              disabled={!!seleccionada}
            >
              <Text style={styles.textoBotonOpcion}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.botonVolver} onPress={() => router.push("/")}>
        <Text style={styles.textoBotonVolver}>Volver al inicio</Text>
      </TouchableOpacity>

      <Text style={styles.puntuacion}>Puntuación: {puntuacion}</Text>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#fff", textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  tituloTema: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff", textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  fondoPregunta: { width: "100%", backgroundColor: "rgba(0,0,0,0.75)", padding: 20, borderRadius: 15, marginBottom: 20, alignItems: "center" },
  seccionPregunta: { alignItems: "center", marginBottom: 20 },
  numeroPregunta: { fontSize: 16, color: "#fff", marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  textoPregunta: { fontSize: 22, fontWeight: "500", textAlign: "center", color: "#fff", textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  seccionOpciones: { width: "100%" },
  botonOpcion: { backgroundColor: "rgba(0,0,0,0.6)", padding: 15, borderRadius: 10, marginBottom: 10, alignItems: "center", borderWidth: 1, borderColor: "#fff" },
  opcionCorrecta: { borderColor: "#28a745", backgroundColor: "rgba(40,167,69,0.8)" },
  opcionIncorrecta: { borderColor: "#ff3b30", backgroundColor: "rgba(255,59,48,0.8)" },
  textoBotonOpcion: { fontSize: 16, color: "#fff", fontWeight: "600" },
  botonTema: { backgroundColor: "rgba(0,0,0,0.6)", padding: 15, borderRadius: 10, marginBottom: 10, width: 250, alignItems: "center", borderWidth: 1, borderColor: "#fff" },
  textoBotonTema: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resultadoTexto: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#fff", textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  botonReiniciar: { backgroundColor: "rgba(40,167,69,0.8)", padding: 15, borderRadius: 10, marginTop: 20, alignItems: "center" },
  textoBotonReiniciar: { color: "#fff", fontSize: 18, fontWeight: "600" },
  botonVolver: { backgroundColor: "rgba(0,0,0,0.7)", padding: 12, borderRadius: 10, marginTop: 15, alignItems: "center" },
  textoBotonVolver: { color: "#fff", fontSize: 16, fontWeight: "600" },
  puntuacion: { marginTop: 15, fontSize: 16, fontWeight: "bold", color: "#fff", textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
});

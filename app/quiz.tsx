import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
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
                style={globalStyles.container}
                resizeMode="cover"
            >
                <Text style={globalStyles.titulo}>Selecciona un tema</Text>
                {questions.map((tema) => (
                    <TouchableOpacity
                        key={tema.tema}
                        style={globalStyles.button}
                        onPress={() => handleSeleccionTema(tema)}
                    >
                        <Text style={globalStyles.buttonText}>{tema.tema}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={globalStyles.botonVolver} onPress={() => router.push("/")}>
                    <Text style={globalStyles.textoBotonVolver}>Volver al inicio</Text>
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
                style={globalStyles.container}
                resizeMode="cover"
            >
                <Text style={globalStyles.titulo}>¡Juego terminado!</Text>
                <Text style={globalStyles.resultadoTexto}>
                    Tu puntuación: {puntuacion} de {temaActual.preguntas.length}
                </Text>
                <TouchableOpacity style={globalStyles.botonReiniciar} onPress={handleReiniciarJuego}>
                    <Text style={globalStyles.textoBotonReiniciar}>Volver a jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.botonVolver} onPress={() => router.push("/")}>
                    <Text style={globalStyles.textoBotonVolver}>Volver al inicio</Text>
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
            style={globalStyles.container}
            resizeMode="cover"
        >
            <Text style={globalStyles.tituloTema}>{temaActual.tema}</Text>

            <View style={globalStyles.fondoPregunta}>
                <View style={globalStyles.seccionPregunta}>
                    <Text style={globalStyles.numeroPregunta}>
                        Pregunta {preguntaActual + 1} de {temaActual.preguntas.length}
                    </Text>
                    <Text style={globalStyles.textoPregunta}>{pregunta.pregunta}</Text>
                </View>
                <View style={globalStyles.seccionOpciones}>
                    {pregunta.opciones.map((opcion) => (
                        <TouchableOpacity
                            key={opcion}
                            style={[
                                globalStyles.botonOpcion,
                                seleccionada === opcion && (correcta ? globalStyles.opcionCorrecta : globalStyles.opcionIncorrecta)
                            ]}
                            onPress={() => handleSeleccionOpcion(opcion)}
                            disabled={!!seleccionada}
                        >
                            <Text style={globalStyles.textoBotonOpcion}>{opcion}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={globalStyles.botonVolver} onPress={() => router.push("/")}>
                <Text style={globalStyles.textoBotonVolver}>Volver al inicio</Text>
            </TouchableOpacity>

            <Text style={globalStyles.puntuacion}>Puntuación: {puntuacion}</Text>
            <StatusBar style="light" />
        </ImageBackground>
    );
}
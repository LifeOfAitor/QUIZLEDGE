import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // Textos principales
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
  },
  // Preguntas y opciones
  fondoPregunta: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  seccionPregunta: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  numeroPregunta: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  textoPregunta: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  seccionOpciones: { width: "100%" },
  botonOpcion: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  opcionCorrecta: {
    borderColor: "#28a745",
    backgroundColor: "rgba(40,167,69,0.8)",
  },
  opcionIncorrecta: {
    borderColor: "#ff3b30",
    backgroundColor: "rgba(255,59,48,0.8)",
  },
  textoBotonOpcion: { fontSize: 16, color: "#fff", fontWeight: "600" },

  // Botones generales
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },

  botonTema: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 250,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  textoBotonTema: { color: "#fff", fontSize: 18, fontWeight: "600" },

  botonReiniciar: {
    backgroundColor: "rgba(40,167,69,0.8)",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  textoBotonReiniciar: { color: "#fff", fontSize: 18, fontWeight: "600" },

  botonVolver: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  textoBotonVolver: { color: "#fff", fontSize: 16, fontWeight: "600" },

  // Resultados
  resultadoTexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  puntuacion: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Para los rankings
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "rgba(0,0,0,0.6)", 
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  tema: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

});

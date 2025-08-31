import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="quiz" options={{ title: "Quiz" }} />
      <Stack.Screen name="resultados" options={{ title: "Resultados" }} />
      <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
    </Stack>
  );
}

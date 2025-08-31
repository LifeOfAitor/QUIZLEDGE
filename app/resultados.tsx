import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados del Quiz</Text>

      <Link href="/" asChild>
        <Button title="Volver al Inicio" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20 }
});

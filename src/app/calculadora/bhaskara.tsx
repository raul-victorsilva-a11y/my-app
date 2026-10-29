
import { ThemedText } from '@/components/themed-text';
import * as Device from 'expo-device';
import { useState } from 'react';
import { Button, Platform, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }

  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }

  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';

  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [a, onChangeA] = useState('');
  const [b, onChangeB] = useState('');
  const [c, onChangeC] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular() {
    let A = Number(a);
    let B = Number(b);
    let C = Number(c);

    if (a === '' || b === '' || c === '') {
      setResultado('Preencha A, B e C');
      return;
    }

    if (A === 0) {
      setResultado('A nao pode ser zero');
      return;
    }

    let delta = B ** 2 - 4 * A * C;

    if (delta < 0) {
      setResultado('Delta negativo: nao existem raizes reais');
      return;
    }

    let x1 = (-B + Math.sqrt(delta)) / (2 * A);
    let x2 = (-B - Math.sqrt(delta)) / (2 * A);

    setResultado(`Delta = ${delta}\nX1 = ${x1}\nX2 = ${x2}`);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Bhaskara</Text>
        <Text style={styles.formula}>Ax² + Bx + C = 0</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeA}
          value={a}
          placeholder="A"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeB}
          value={b}
          placeholder="B"
          keyboardType="numbers-and-punctuation"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeC}
          value={c}
          placeholder="C"
          keyboardType="numbers-and-punctuation"
        />

        <Button title="Calcular" onPress={calcular} />

        <Text style={styles.resultado}>{resultado}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,
    marginBottom: 10,
  },
  formula: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 140,
    height: 38,
    margin: 5,
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
  },
  resultado: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
  },
});

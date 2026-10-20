
import { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');

  function calcular() {
    if (a === '' || b === '') return;
    const A = Number(a);
    const B = Number(b);
    setC(Math.sqrt(A * A + B * B).toFixed(2));
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.calculadora}>
          <ThemedText type="title">Pitágoras</ThemedText>
          <TextInput style={styles.input} placeholder="A" keyboardType="numeric" value={a} onChangeText={setA} />
          <TextInput style={styles.input} placeholder="B" keyboardType="numeric" value={b} onChangeText={setB} />
          <Button title="CALCULAR" onPress={calcular} />
          {c !== '' && (
            <ThemedText type="default">C = {c}</ThemedText>
          )}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculadora: {
    alignItems: 'center',
    gap: 10,
  },
  input: {
    width: 140,
    height: 38,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    textAlign: 'center',
    color: '#000',
  },
});

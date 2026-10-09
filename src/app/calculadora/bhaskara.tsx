import * as Device from 'expo-device';
import { Platform, StyleSheet, Text, TextInput, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

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

    let delta = B ** 2 - 4 * A * C;

    let x1 = (-B + Math.sqrt(delta)) / (2 * A);
    let x2 = (-B - Math.sqrt(delta)) / (2 * A);

    setResultado(`x1 = ${x1} e x2 = ${x2}`);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <Text style={styles.titulo}>Bhaskara</Text>

        <Text style={styles.formula}>
          A x² + B x + C = 0
        </Text>

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
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeC}
          value={c}
          placeholder="C"
          keyboardType="numeric"
        />

        <Button
          title="Calcular"
          onPress={calcular}
        />

        <Text style={styles.resultado}>
          {resultado}
        </Text>

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
    marginBottom: 10,
  },

  input: {
    width: 120,
    height: 35,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    textAlign: 'center',
  },

  resultado: {
    marginTop: 15,
    fontSize: 18,
  },
});
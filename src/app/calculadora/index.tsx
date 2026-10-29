import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function HomeScreen() {
  const [visor, setVisor] = useState('0');
  const [numero1, setNumero1] = useState('');
  const [operacao, setOperacao] = useState('');
  const [novoNumero, setNovoNumero] = useState(false);

  function clicarNumero(n: string) {
    if (visor === '0' || novoNumero) {
      setVisor(n);
      setNovoNumero(false);
    } else {
      setVisor(visor + n);
    }
  }

  function clicarPonto() {
    if (novoNumero) {
      setVisor('0.');
      setNovoNumero(false);
      return;
    }

    if (visor.includes('.')) {
      return;
    }

    setVisor(visor + '.'); 
  }

  function clicarOperacao(op: string) {
    setNumero1(visor);
    setOperacao(op);
    setNovoNumero(true);
  }

  function limpar() {
    setVisor('0');
    setNumero1('');
    setOperacao('');
    setNovoNumero(false);
  }

  function calcular() {
    if (operacao === '') {
      return;
    }

    let A = Number(numero1);
    let B = Number(visor);
    let resultado = 0;

    if (operacao === '+') {
      resultado = A + B;
    }

    if (operacao === '-') {
      resultado = A - B;
    }

    if (operacao === 'x') {
      resultado = A * B;
    }

    if (operacao === '/') {
      if (B === 0) {
        setVisor('Erro');
        setNumero1('');
        setOperacao('');
        setNovoNumero(true);
        return;
      }
      resultado = A / B;
    }

    setVisor(String(resultado));
    setNumero1('');
    setOperacao('');
    setNovoNumero(true);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Calculadora</Text>

        <Text style={styles.visor}>{visor}</Text>

        <View style={styles.linha}>
          <View style={styles.botao}>
            <Button title="7" onPress={() => clicarNumero('7')} />
          </View>
          <View style={styles.botao}>
            <Button title="8" onPress={() => clicarNumero('8')} />
          </View>
          <View style={styles.botao}>
            <Button title="9" onPress={() => clicarNumero('9')} />
          </View>
          <View style={styles.botao}>
            <Button title="/" color="orange" onPress={() => clicarOperacao('/')} />
          </View>
        </View>

        <View style={styles.linha}>
          <View style={styles.botao}>
            <Button title="4" onPress={() => clicarNumero('4')} />
          </View>
          <View style={styles.botao}>
            <Button title="5" onPress={() => clicarNumero('5')} />
          </View>
          <View style={styles.botao}>
            <Button title="6" onPress={() => clicarNumero('6')} />
          </View>
          <View style={styles.botao}>
            <Button title="x" color="orange" onPress={() => clicarOperacao('x')} />
          </View>
        </View>

        <View style={styles.linha}>
          <View style={styles.botao}>
            <Button title="1" onPress={() => clicarNumero('1')} />
          </View>
          <View style={styles.botao}>
            <Button title="2" onPress={() => clicarNumero('2')} />
          </View>
          <View style={styles.botao}>
            <Button title="3" onPress={() => clicarNumero('3')} />
          </View>
          <View style={styles.botao}>
            <Button title="-" color="orange" onPress={() => clicarOperacao('-')} />
          </View>
        </View>

        <View style={styles.linha}>
          <View style={styles.botao}>
            <Button title="0" onPress={() => clicarNumero('0')} />
          </View>
          <View style={styles.botao}>
            <Button title="." onPress={clicarPonto} />
          </View>
          <View style={styles.botao}>
            <Button title="=" color="green" onPress={calcular} />
          </View>
          <View style={styles.botao}>
            <Button title="+" color="orange" onPress={() => clicarOperacao('+')} />
          </View>
        </View>

        <View style={styles.linha}>
          <View style={styles.botaoLimpar}>
            <Button title="C" color="red" onPress={limpar} />
          </View>
        </View>
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
  visor: {
    width: 260,
    fontSize: 32,
    textAlign: 'right',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botao: {
    width: 60,
    margin: 5,
  },
  botaoLimpar: {
    width: 260,
    margin: 5,
  },
});
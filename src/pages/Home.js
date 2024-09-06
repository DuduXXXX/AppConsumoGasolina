import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [quilometragem, setQuilometragem] = useState('');
  const [litros, setLitros] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("Teste de Funcionamento");
      setLoading(false);
    }, 2000);
  }, []);

  const validateInput = () => {
    const quilometragemNum = parseFloat(quilometragem);
    const litrosNum = parseFloat(litros);

    // Verificar se os campos estão vazios
    if (quilometragem.trim() === "" || litros.trim() === "") {
      setError("Por favor, preencha todos os campos.");
      return false;
    }

    // Verificar se os valores inseridos são números válidos
    if (isNaN(quilometragemNum) || isNaN(litrosNum)) {
      setError("Por favor, insira apenas números.");
      return false;
    }

    // Verificar se os valores são maiores que 0
    if (quilometragemNum <= 0 || litrosNum <= 0) {
      setError("Os números devem ser maiores que 0.");
      return false;
    }

    setError('');
    return true;
  };

  const IrParaConsumo = () => {
    if (validateInput()) {
      navigation.navigate("Consumo", {
        quilometragem: parseFloat(quilometragem),
        litros: parseFloat(litros),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.title}>Cálculo de Consumo</Text>

      <TextInput 
        value={quilometragem}
        onChangeText={setQuilometragem}
        placeholder="Quilometragem (KM)"
        style={styles.input}
      />

      <TextInput 
        value={litros}
        onChangeText={setLitros}
        placeholder="Litros de Gasolina"
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={IrParaConsumo}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <ActivityIndicator style={styles.loading} animating={loading} color={"#ffffff"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#44475a',
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    width: "85%",
    height: 50,
    borderRadius: 12,
    borderColor: '#6272a4', 
    margin: 10,
    color: "#f8f8f2",
    fontSize: 16,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 1
  },
  button: {
    paddingVertical: 15, 
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#50fa7b', 
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 2
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#282c34' 
  },
  image:{
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ff79c6', 
  },
  loading: {
    marginTop: 20,
    size: 'large',
    transform: [{ scale: 1.5 }] 
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  }
});

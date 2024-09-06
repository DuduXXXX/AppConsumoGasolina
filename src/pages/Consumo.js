import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Consumo() {
  const route = useRoute();
  const navigation = useNavigation();
  const { quilometragem, litros } = route.params;

  const [mediaConsumo, setMediaConsumo] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [cor, setCor] = useState('white');

  useEffect(() => {
    calcularConsumo();
  }, [quilometragem, litros]);

  const calcularConsumo = () => {
    if (quilometragem && litros && litros > 0) {
      const media = quilometragem / litros;
      setMediaConsumo(media.toFixed(2));
      classificarConsumo(media);
    } else {
      setMediaConsumo("0.00"); 
      setClassificacao("Sem Dados"); 
      setCor('white'); 
    }
  };

  const classificarConsumo = (media) => {
    if (media > 12) {
      setClassificacao("Excelente");
      setCor('#2E865F');
    } else if (media > 10) {
      setClassificacao("Bom");
      setCor("#8B9467");
    } else if (media > 8) {
      setClassificacao("Regular");
      setCor("#F7DC6F");
    } else if (media > 4) {
      setClassificacao("Ruim");
      setCor("#FFA07A");
    } else {
      setClassificacao("Muito Ruim");
      setCor("#FF3737");
    }
  };

  const IrParaHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.content}>
          <Text style={styles.title}>Consumo</Text>
          <Text style={[styles.tipo, { color: cor }]}>{classificacao}</Text>
          <Text style={styles.consumo}>{mediaConsumo} Km/L</Text>
        </View>
        <TouchableOpacity style={styles.buttonBox} onPress={IrParaHome}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: '#000000' 
  },
  box: {
    backgroundColor: '#F3F3FF',
    width: '80%',
    height: '50%',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#9c0000',
    shadowOffset: {
      width: 9,
      height: 9
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24, // Tamanho reduzido
    fontWeight: 'bold',
    color: '#9c0000',
    padding: 5,
  },
  tipo: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 30, // Tamanho reduzido
    fontStyle: 'italic',
    fontWeight: 'bold',
    width: '100%',
  },
  consumo: {
    textAlign: 'center',
    fontSize: 18, // Tamanho reduzido
    color: '#9c0000',
    marginBottom: 5,
    textDecorationLine: 'underline',
    padding: 5
  },
  buttonBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#9c0000',
    backgroundColor: '#9c0000',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 11,
    borderBottomLeftRadius: 11,
    padding: 15,
    height: 60,
    marginTop: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20, // Tamanho reduzido
    fontWeight: 'bold'
  }
});

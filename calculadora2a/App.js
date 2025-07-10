import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState("");

  const sumar = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResultado(num1 + num2);
    } else {
      alert("Por favor, ingrese números válidos.");
    }
  };
  const restar = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResultado(num1 - num2);
    } else {
      alert("Por favor, ingrese números válidos.");
    }
  };
  const multiplicar = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResultado(num1 * num2);
    } else {
      alert("Por favor, ingrese números válidos.");
    }
  };
  const dividir = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    if (!isNaN(num1) && !isNaN(num2)) {
      if (num2 !== 0) {
        setResultado(num1 / num2);
      } else {
        alert("No se puede dividir por cero.");
      }
    } else {
      alert("Por favor, ingrese números válidos.");
    }
  };
  //limpiar resultado y inputs
  const limpiar = () => {
    setResultado("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora 2A</Text>

      <Text style={styles.saludo}>¡Hola, bienvenido a la calculadora!</Text>
      <View>
        <Text>Ingrese numero 1:</Text>
        <TextInput
          placeholder="Ingrese el primer número"
          onChangeText={setNumero1}
        />
      </View>
      <View>
        <Text>Ingrese numero 2:</Text>
        <TextInput
          placeholder="Ingrese el segundo número"
          onChangeText={setNumero2}
        />
      </View>
      <Button title="Sumar" onPress={sumar} />
      <TouchableOpacity style={styles.boton} onPress={restar}>
        <Text style={{ color: "white" }}>Restar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={multiplicar}>
        <Text style={{ color: "white" }}>Multiplicar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={dividir}>
        <Text style={{ color: "white" }}>Dividir</Text>
      </TouchableOpacity>

      <Text style={styles.resultado}>Resultado: {resultado}</Text>
      <TouchableOpacity style={styles.boton} onPress={limpiar}>
        <Text style={{ color: "white" }}>Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  saludo: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resultado: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
});

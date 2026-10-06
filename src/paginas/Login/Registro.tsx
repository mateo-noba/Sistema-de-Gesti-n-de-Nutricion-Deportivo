import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type RegistroScreenProp = NativeStackNavigationProp<RootStackParamList, "Registro">;

const Registro = () => {
  const navigation = useNavigation<RegistroScreenProp>();

  // Estados del formulario 1
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSiguiente = () => {
    if (!nombre || !apellido || !dni || !telefono) {
      Alert.alert("Campos incompletos", "Por favor completá todos los datos.");
      return;
    }

    // Navegamos al paso 2 enviando los datos recolectados
    navigation.navigate("Registro2", {
      nombre,
      apellido,
      dni,
      telefono,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorLogin}>
        <Text style={styles.titulo}>Crear una cuenta</Text>
        <Text style={styles.subtitulo}>Paso 1 de 2: Datos Personales</Text>

        <View style={styles.contenedorFormulario}>
          <Text style={styles.textoRegistro}>Nombre</Text>
          <TextInput 
            style={styles.input} 
            value={nombre} 
            onChangeText={setNombre} 
          />

          <Text style={styles.textoRegistro}>Apellido</Text>
          <TextInput 
            style={styles.input} 
            value={apellido} 
            onChangeText={setApellido} 
          />

          <Text style={styles.textoRegistro}>DNI</Text>
          <TextInput 
            style={styles.input} 
            value={dni} 
            onChangeText={setDni} 
            keyboardType="numeric" 
          />

          <Text style={styles.textoRegistro}>Teléfono</Text>
          <TextInput 
            style={styles.input} 
            value={telefono} 
            onChangeText={setTelefono} 
            keyboardType="phone-pad" 
          />

          <TouchableOpacity style={styles.boton} onPress={handleSiguiente}>
            <Text style={styles.textoBoton}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4db6ac",
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 40,
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  contenedorLogin: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: 330,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fafafa",
    width: 250,
  },
  boton: {
    backgroundColor: "#4db6ac",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  contenedorFormulario: {
    marginTop: 0,
  },
  textoRegistro: {
    marginTop: 10,
  },
});

export default Registro;
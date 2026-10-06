import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../backend/src/config/api";

type Registro2ScreenProp = NativeStackNavigationProp<RootStackParamList, "Registro2">;
type Registro2RouteProp = RouteProp<RootStackParamList, "Registro2">;

const Registro2 = () => {
  const navigation = useNavigation<Registro2ScreenProp>();
  const route = useRoute<Registro2RouteProp>();

  // Datos provenientes del paso 1
  const { nombre, apellido, dni, telefono } = route.params || {};

  // Estados del paso 2
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCrearCuenta = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completá todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // Reemplazá con la IP local de tu servidor Node
      const response = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          telefono,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.id_usuario) {
        // Guardamos la sesión iniciada
        await AsyncStorage.setItem("userId", String(data.id_usuario));
        Alert.alert("¡Éxito!", "Cuenta creada correctamente", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      } else {
        Alert.alert("Error en el registro", data.mensaje || "No se pudo crear la cuenta");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "Ocurrió un error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorLogin}>
        <Text style={styles.titulo}>Crear una cuenta</Text>
        <Text style={styles.subtitulo}>Paso 2 de 2: Credenciales</Text>

        <View style={styles.contenedorFormulario}>
          <Text style={styles.textoRegistro}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none" 
          />

          <Text style={styles.textoRegistro}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            value={password} 
            onChangeText={setPassword} 
          />

          <Text style={styles.textoRegistro}>Repetir contraseña</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
          />

          <TouchableOpacity style={styles.boton} onPress={handleCrearCuenta} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textoBoton}>Crear cuenta</Text>
            )}
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

export default Registro2;
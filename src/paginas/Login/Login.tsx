import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../backend/src/config/api";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
  const navigation = useNavigation<LoginScreenProp>();
  
  // Estados para capturar el texto ingresado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresá tu email y contraseña");
      return;
    }

    setLoading(true);

    try {
      // Reemplazá 192.168.X.X por la IP local de tu PC donde corre Express
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Verificamos data.id_usuario (que es la clave que devuelve tu Express)
      if (response.ok && data.id_usuario) {
        // Guardamos el id_usuario en AsyncStorage
        await AsyncStorage.setItem("userId", String(data.id_usuario));

        // Navegamos a Home
        navigation.navigate("Home");
      } else {
        Alert.alert("Error de autenticación", data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "Ocurrió un problema al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorLogin}>
        <Text style={styles.titulo}>Inicio de sesión</Text>
        
        <View style={styles.contenedorFormulario}>
          <Text style={styles.textoInicioSesion}>Email</Text>
          <TextInput 
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.textoInicioSesion}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.textoChico}>
            ¿Olvidaste tu contraseña?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("Notas")}>
              Recuperar
            </Text>
          </Text>

          {/* Botón adaptado para mostrar un loader mientras consulta al servidor */}
          <TouchableOpacity 
            style={styles.boton} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textoBoton}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.textoChico}>
            ¿No tenés una cuenta?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("Registro")}>
              Registrate
            </Text>
          </Text>
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
    marginBottom: 25,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 100,
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
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  contenedorFormulario: {
    marginTop: 50,
  },
  textoInicioSesion: {
    marginTop: 10,
  },
  textoChico: {
    fontSize: 11,
    marginBottom: 20,
    marginTop: 10,
  },
  link: {
    color: "#0004d8",
  },
});

export default Login;
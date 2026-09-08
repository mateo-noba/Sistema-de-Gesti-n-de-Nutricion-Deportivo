import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const Login = () =>{

  const navigation = useNavigation<LoginScreenProp>();

  return(
    <View style={styles.container}>
      <View style={styles.contenedorLogin}>
        <Text style={styles.titulo}>Inicio de sesión</Text>
        <View style={styles.contenedorFormulario}>
          <Text style={styles.textoInicioSesion}>Email</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.textoInicioSesion}>Contraseña</Text>
          <TextInput style={styles.input} secureTextEntry={true}></TextInput>
          <Text style={styles.textoChico}>¿No tenes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("Inicio")}>Registrate</Text></Text>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Home")}><Text>Iniciar sesión</Text></TouchableOpacity>
        </View>
      </View>
    </View>


  );
}


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
  contenedor: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
  },
  card: {
    width: 230,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icono: {
    fontSize: 45,
    marginBottom: 10,
  },
  tituloCard: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descripcion: {
    textAlign: "center",
    marginTop: 5,
    color: "#333",
  },
  contenedorLogin: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: 330,
    height: 100,
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
  contenedorFormulario:{
    marginTop: 50,
  },
  textoInicioSesion:{
    marginTop: 10,
  },
  textoChico:{
    fontSize: 11,
    marginBottom: 30,
  },
  link:{
    color: "#0004d8"

  }
});

export default Login;
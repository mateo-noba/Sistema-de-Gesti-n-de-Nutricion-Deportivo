import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native"

const Login = () =>{

  return(
    <View style={styles.container}>
      <View style={styles.contenedorLogin}>
        <Text style={styles.titulo}>Inicio de sesión</Text>
        <Text>Email</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Contraseña</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Si no tenes una cuenta, toca aquí</Text>
        <TouchableOpacity style={styles.boton}>Iniciar sesión</TouchableOpacity>

      </View>


    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4db6ac",
    padding: 20,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
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
    backgroundColor: "#867777",
    width: 330,
    height: 130,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  boton: {
    backgroundColor: "#4db6ac",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Login;
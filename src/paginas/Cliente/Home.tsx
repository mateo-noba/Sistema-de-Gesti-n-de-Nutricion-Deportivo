import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;
const Home = () =>{

  const navigation = useNavigation<HomeScreenProp>();

  return(
    <View style={styles.container}>
        
        <TouchableOpacity style={styles.botonNotas}></TouchableOpacity>
        <TouchableOpacity style={styles.botonChatbot}><Image source={require("../../../assets/ensaladin.png")} style={styles.imagenChatbot}/></TouchableOpacity>
    
        <View style={styles.contenedorHome}>
            <Image source={require("../../../assets/IconoCuenta.svg")} style={styles.iconoCuenta} />
            <Text style={styles.titulo}>Nombre apellido</Text>
            <Text style={styles.titulo}>Día del turno:</Text>
            <Text style={styles.titulo}>Hora del turno:</Text>
            <View style={styles.contenedorHorizontal}>
                <TouchableOpacity style={styles.botonPlan}>Plan nutricional</TouchableOpacity>
                <TouchableOpacity style={styles.botonRutina}>Rutina de ejercicios</TouchableOpacity>
                <TouchableOpacity style={styles.botonCancelar}>Cancelar turno</TouchableOpacity>
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
    marginTop: 0,
  },
  contenedor: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
  },
  contenedorHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
    marginTop: 50,
  },
  contenedorIzquierda: {
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
  contenedorHome: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: 1000,
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
  botonPlan: {
    backgroundColor: "#00ff2a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
  },
  botonRutina: {
    backgroundColor: "#2a3de2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
  },
  botonCancelar: {
    backgroundColor: "#ff0000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
  },
  botonNotas: {
    backgroundColor: "#f6cf66",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-start",
    position: "absolute",
    height: 110,
    width: 110,
  },
   botonChatbot: {
    backgroundColor: "#444a4a",
    padding: 12,
    borderRadius: 100,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-end",
    position: "absolute",
    height: 110,
    width: 110,
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
  iconoCuenta:{
    width: 150,
    height: 150,
    color: "#040505",
    marginTop: 100,
  },
  imagenChatbot:{
    width: 90,
    height: 90,
  },
  link:{
    color: "#0004d8"

  }
});

export default Home;
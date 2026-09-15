import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type PlanNutricionalScreenProp = NativeStackNavigationProp<RootStackParamList, "PlanNutricional">;
const PlanNutricional = () =>{

  const navigation = useNavigation<PlanNutricionalScreenProp>();

  return(
    <View style={styles.container}>
        <View style={styles.contenedorBotones}>
          <View style={styles.botonesIzquierda}>
            <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}><Image source={require("../../../assets/flechaAtras.png")} style={styles.imagenFlecha}/></TouchableOpacity>
            <TouchableOpacity style={styles.botonDescarga}>Descargar en formato PDF</TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botonChatbot}><Image source={require("../../../assets/ensaladin.png")} style={styles.imagenChatbot}/></TouchableOpacity>
        </View>
    
        <View style={styles.contenedorPlanNutricional}>
            <Image source={require("../../../assets/planNutricional.jpg")}/>
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
  contenedorBotones:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  botonesIzquierda:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10
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
  contenedorPlanNutricional: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: 900,
    height: 600,
    marginBottom: 40,
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
  botonDescarga: {
    backgroundColor: "#2a9ee2",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 19,
    
    height: 50,
    width: 270,
  },
   botonChatbot: {
    backgroundColor: "#444a4a",
    padding: 12,
    borderRadius: 100,
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 20,
    
    height: 80,
    width: 80,
  },
  botonAtras:{
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    color:"#f5f5f5",
    fontWeight: "bold",
    fontSize: 19,

    height: 40,
    width: 40,
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
    width: 60,
    height: 60,
  },
  imagenFlecha:{
    width: 30,
    height: 30,
  },
  link:{
    color: "#0004d8"

  }
});

export default PlanNutricional;
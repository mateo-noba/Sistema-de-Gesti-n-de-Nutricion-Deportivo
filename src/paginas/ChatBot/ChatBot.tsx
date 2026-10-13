import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react"
import { RootStackParamList } from "../../../App";

type ChatBotScreenProp = NativeStackNavigationProp<RootStackParamList, "ChatBot">;
const ChatBot = () =>{

  const navigation = useNavigation<ChatBotScreenProp>();
  

  return(
    <View style={styles.container}>
        <View style={styles.contenedorIzquierda}>

        </View>
        <ScrollView style={styles.contenedorDerecha}>
          <View style={styles.contenedorChat}>
            <Text style={styles.textPregunta}>hola Lorem Lorem Lorem hola Lorem Lorem Lorem hola Lorem Lorem Lorem hola Lorem Lorem Lorem</Text>
            <Text style={styles.textRespuesta}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aliquam cum error! Asperiores debitis qui tempora quisquam vitae facilis rerum repellat consectetur ut. Maxime eveniet repellat soluta dignissimos quae consequatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis exercitationem vitae cum nam iure dignissimos officia, quam dolore ea nihil sed assumenda aut inventore et fugit tempore voluptate, veritatis impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus laborum exercitationem sapiente iure, sint, doloribus, distinctio quos laboriosam labore ipsa ex voluptas? Fuga earum voluptas enim magni explicabo amet id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facilis vel hic repellendus voluptatem veritatis explicabo enim, consequatur atque itaque quidem assumenda vero necessitatibus sint perspiciatis possimus at debitis voluptatibus?</Text>
          </View>
            <View style={styles.contenedorMensaje}>
              <TextInput placeholder="Escriba un mensaje..." multiline maxLength={500 } style={styles.textboxMensaje}></TextInput>
              <TouchableOpacity style={styles.botonEnviar}><Image source={require("../../../assets/flechaEnviar.svg")}/></TouchableOpacity>
            </View>
        </ScrollView>
    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232827",
    flexDirection: "row",
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
    width: "20%",
    backgroundColor: "#e7edec",
  },
  // contenedorDerecha: {
  //   width: "80%",
  //   flex: 1,
  //   alignItems: "flex-end",
  //   borderColor: "#32bea7",
  //   borderWidth: 1,
  // },
  contenedorChat: {
    height: "60%",
    width: "80%",
    marginTop: 100,
    marginBottom: 0,
    marginRight: 100,
    marginLeft: 100,
  },
  textRespuesta: {
    fontSize: 17,
    color: "#e7edec",
  },
  textPregunta: {
    fontSize: 17,
    color: "#e7edec",
    backgroundColor: "#6b7472",
    width: "auto",
    maxWidth: 400,
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  contenedorMensaje:{
    
    width: "80%",
    borderColor: "#e7edec",
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
    flexDirection: "row",
    alignSelf: "center",
  },
  textboxMensaje: {
    height: "30%",
    width: "97%",
    color: "#e7edec",
  },
  botonEnviar: {
    backgroundColor: "#e7edec",
    borderRadius: "100%",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorBotones:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  contenedorScroll:{
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 30,
    overflow: "hidden",
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
  contenedorNotas: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 20,
    padding: 20,
    paddingBottom: 30,
  },
  notas:{
    backgroundColor: "#fff79d",
    width: "13.1%",
    aspectRatio: 1,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
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
  imagenRutinaDeEjercicios:{
    width: 505,
    height: 455,
  },
  link:{
    color: "#0004d8"

  }
});

export default ChatBot;
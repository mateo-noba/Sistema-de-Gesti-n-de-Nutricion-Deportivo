import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image, ScrollView} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react"
import { RootStackParamList } from "../../../App";

type NotasScreenProp = NativeStackNavigationProp<RootStackParamList, "DetalleNotas">;
const DetalleNotas = () =>{

  const navigation = useNavigation<NotasScreenProp>();
  const [notas, setNotas] = useState([
    {
      id:1,
      titulo:"Control inicial",
      contenido: "Contenido 1",
      fecha:"16/06/2026",
      pacienteId:"p1",
    },
    {
      id:2,
      titulo:"Control inicial",
      contenido: "Contenido 2",
      fecha:"16/06/2026",
      pacienteId:"p2",
    },
  ])

  return(
    <View style={styles.container}>
        <View style={styles.contenedorBotones}>
          <View style={styles.botonesIzquierda}>
            <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}><Image source={require("../../../assets/flechaAtras.png")} style={styles.imagenFlecha}/></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botonChatbot}><Image source={require("../../../assets/ensaladin.png")} style={styles.imagenChatbot}/></TouchableOpacity>
        </View>
    
        <ScrollView showsVerticalScrollIndicator={false} style={styles.contenedorNotas}>
           <Text style={styles.titulo}>{notas[0].titulo}</Text>
           <Text style={styles.titulo}>{notas[0].fecha}</Text>
           <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque et dicta laborum enim delectus esse distinctio excepturi repellat natus saepe veniam deleniti tempora animi nisi soluta, deserunt amet. Deserunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi praesentium omnis ratione fugit minima. Aspernatur libero sunt voluptate, autem numquam reprehenderit consectetur quaerat obcaecati quo deserunt saepe excepturi, maiores perferendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero minus autem magnam voluptates expedita? Quasi mollitia cupiditate, temporibus commodi nam officia eaque assumenda saepe optio omnis necessitatibus nemo? Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus, provident velit tenetur reiciendis quam reprehenderit voluptas nemo saepe at modi laudantium, nobis unde, a incidunt perspiciatis sint commodi corporis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe blanditiis tenetur eos est iste officiis consequuntur quod ad magni? Officia amet laudantium, deserunt laboriosam culpa error nihil? Voluptatum, sunt accusantium.</Text>
           <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque et dicta laborum enim delectus esse distinctio excepturi repellat natus saepe veniam deleniti tempora animi nisi soluta, deserunt amet. Deserunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi praesentium omnis ratione fugit minima. Aspernatur libero sunt voluptate, autem numquam reprehenderit consectetur quaerat obcaecati quo deserunt saepe excepturi, maiores perferendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero minus autem magnam voluptates expedita? Quasi mollitia cupiditate, temporibus commodi nam officia eaque assumenda saepe optio omnis necessitatibus nemo? Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus, provident velit tenetur reiciendis quam reprehenderit voluptas nemo saepe at modi laudantium, nobis unde, a incidunt perspiciatis sint commodi corporis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe blanditiis tenetur eos est iste officiis consequuntur quod ad magni? Officia amet laudantium, deserunt laboriosam culpa error nihil? Voluptatum, sunt accusantium.</Text>
           <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque et dicta laborum enim delectus esse distinctio excepturi repellat natus saepe veniam deleniti tempora animi nisi soluta, deserunt amet. Deserunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi praesentium omnis ratione fugit minima. Aspernatur libero sunt voluptate, autem numquam reprehenderit consectetur quaerat obcaecati quo deserunt saepe excepturi, maiores perferendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero minus autem magnam voluptates expedita? Quasi mollitia cupiditate, temporibus commodi nam officia eaque assumenda saepe optio omnis necessitatibus nemo? Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus, provident velit tenetur reiciendis quam reprehenderit voluptas nemo saepe at modi laudantium, nobis unde, a incidunt perspiciatis sint commodi corporis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe blanditiis tenetur eos est iste officiis consequuntur quod ad magni? Officia amet laudantium, deserunt laboriosam culpa error nihil? Voluptatum, sunt accusantium.</Text>
           <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque et dicta laborum enim delectus esse distinctio excepturi repellat natus saepe veniam deleniti tempora animi nisi soluta, deserunt amet. Deserunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi praesentium omnis ratione fugit minima. Aspernatur libero sunt voluptate, autem numquam reprehenderit consectetur quaerat obcaecati quo deserunt saepe excepturi, maiores perferendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vero minus autem magnam voluptates expedita? Quasi mollitia cupiditate, temporibus commodi nam officia eaque assumenda saepe optio omnis necessitatibus nemo? Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus, provident velit tenetur reiciendis quam reprehenderit voluptas nemo saepe at modi laudantium, nobis unde, a incidunt perspiciatis sint commodi corporis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe blanditiis tenetur eos est iste officiis consequuntur quod ad magni? Officia amet laudantium, deserunt laboriosam culpa error nihil? Voluptatum, sunt accusantium.</Text>
        </ScrollView>
    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff79d",
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 0,
  },
  textoContenido: {
    fontSize: 25,
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
  contenedorNotas: {
    flex: 1,
    backgroundColor: "#fff79d",
    width: 1200,
    height: 700,
    marginBottom: 30,
    borderRadius: 10,

    padding: 20,
  },
  notas:{
    backgroundColor: "#fff79d",
    width: 200,
    height: 200,
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

export default DetalleNotas;
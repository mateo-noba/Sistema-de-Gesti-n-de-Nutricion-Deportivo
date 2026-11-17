import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react"
import { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotasScreenProp = NativeStackNavigationProp<RootStackParamList, "Notas">;
const Notas = () =>{

  const navigation = useNavigation<NotasScreenProp>();
  const GAP = 20;
  const PADDING = 20;
  
  const {width} = useWindowDimensions();
  const COLUMNAS = width > 1200 ? 6 : width > 800 ? 4 : 2;
  const anchoDisponible = width - 40 - PADDING * 2;
  const anchoNota = (anchoDisponible - GAP * (COLUMNAS - 1)) / COLUMNAS;

  interface INota {
    id: number;
    titulo: string;
    contenido: string;
    fecha: string;
    peso: number | null;
  }

  const formatearFecha = (fecha: string) => {
    const [anio, mes, dia] = fecha.slice(0, 10).split("-");
    return `${dia}/${mes}/${anio}`;
  };

  // dentro del componente:
  const [notas, setNotas] = useState<INota[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarAvances = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:3000/api/avances?id_usuario=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setNotas(data);
        }
      } catch (error) {
        console.error("Error al cargar avances:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarAvances();
  }, []);

  return(
    <View style={styles.container}>
        <View style={styles.contenedorBotones}>
          <View style={styles.botonesIzquierda}>
            <TouchableOpacity style={styles.botonAtras} onPress={() => navigation.goBack()}><Image source={require("../../../assets/flechaAtras.png")} style={styles.imagenFlecha}/></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botonChatbot} onPress={() => navigation.navigate("ChatBot")}><Image source={require("../../../assets/ensaladin.png")} style={styles.imagenChatbot} /></TouchableOpacity>
        </View>
    
        {cargando ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contenedorNotas}
          style={styles.contenedorScroll}
        >
          {notas.length === 0 ? (
            <Text>Todavía no tenés avances registrados.</Text>
          ) : (
            notas.map((nota) => (
              <TouchableOpacity
                key={nota.id}
                style={[styles.notas, { width: anchoNota }]}
                onPress={() =>
                  navigation.navigate("DetalleNotas", {
                    titulo: nota.titulo,
                    fecha: formatearFecha(nota.fecha),
                    contenido: nota.contenido,
                    peso: nota.peso,
                  })
                }
              >
                <Text>{nota.titulo}</Text>
                <Text>{formatearFecha(nota.fecha)}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
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
    width: 170,
    aspectRatio: 1,
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

export default Notas;
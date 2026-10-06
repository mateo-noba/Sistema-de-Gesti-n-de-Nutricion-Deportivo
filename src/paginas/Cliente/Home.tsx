import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// Interface para el turno que viene del Backend
interface ITurno {
  id_turno: number;
  fecha: string;
  hora: string;
  estado: string;
  profesional_nombre?: string;
  profesional_apellido?: string;
}

const Home = () => {

  const navigation = useNavigation<HomeScreenProp>();

  const [turno, setTurno] = useState<ITurno | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar los datos del turno al entrar a la pantalla
  useEffect(() => {
    const obtenerTurnoBD = async () => {
      try {
        // 1. Leemos el ID de usuario guardado en el Login
        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          Alert.alert("Sesión vencida", "Por favor iniciá sesión nuevamente.");
          navigation.navigate("Login");
          return;
        }

        // 2. Hacemos el fetch enviando el id_usuario en los query params
        // (Asegurate de poner la IP local de tu PC)
        const response = await fetch(`http://192.168.x.x:3000/api/turnos?id_usuario=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setTurno(data);
        } else {
          console.log("Mensaje API:", data.mensaje);
        }
      } catch (error) {
        console.error("Error al cargar turno:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerTurnoBD();
  }, []);

  return (
    <View style={styles.container}>
      {/* Botón Notas */}
      <TouchableOpacity 
        style={styles.botonNotas} 
        onPress={() => navigation.navigate("Notas")}
      >
        <Text style={styles.textoBotonSecundario}>Notas</Text>
      </TouchableOpacity>

      {/* Botón Chatbot */}
      <TouchableOpacity style={styles.botonChatbot}>
        <Image 
          source={require("../../../assets/ensaladin.png")} 
          style={styles.imagenChatbot} 
        />
      </TouchableOpacity>

      {/* Contenedor Principal */}
      <View style={styles.contenedorHome}>
        {/* Usar preferentemente PNG o JPG si usás Image de React Native */}
        <Image 
          source={require("../../../assets/IconoCuenta.svg")} 
          style={styles.iconoCuenta} 
        />

        {loading ? (
          <ActivityIndicator size="large" color="#4db6ac" style={{ marginTop: 20 }} />
        ) : turno ? (
          <>
            <Text style={styles.subtituloProfesor}>
              Nutricionista: {turno.profesional_nombre} {turno.profesional_apellido}
            </Text>
            <Text style={styles.titulo}>
              Día del turno: {new Date(turno.fecha).toLocaleDateString("es-AR")}
            </Text>
            <Text style={styles.titulo}>Hora del turno: {turno.hora} hs</Text>
          </>
        ) : (
          <Text style={styles.titulo}>No tenés turnos pendientes</Text>
        )}

        {/* Acciones */}
        <View style={styles.contenedorHorizontal}>
          <TouchableOpacity 
            style={styles.botonPlan} 
            onPress={() => navigation.navigate("PlanNutricional")}
          >
            <Text style={styles.textoBoton}>Plan nutricional</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botonRutina} 
            onPress={() => navigation.navigate("RutinaDeEjercicios")}
          >
            <Text style={styles.textoBoton}>Rutina de ejercicios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonCancelar}>
            <Text style={styles.textoBoton}>Cancelar turno</Text>
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
  contenedorHome: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: "100%", // Se ajustó a 100% para evitar desbordes en pantallas móviles
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  subtituloProfesor: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
    color: "#666",
  },
  contenedorHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 30,
  },
  botonPlan: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botonRutina: {
    backgroundColor: "#2a3de2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botonCancelar: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botonNotas: {
    backgroundColor: "#f6cf66",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 20,
    height: 60,
    width: 60,
    zIndex: 10,
  },
  textoBotonSecundario: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 12,
  },
  botonChatbot: {
    backgroundColor: "#444a4a",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    height: 70,
    width: 70,
    zIndex: 10,
  },
  iconoCuenta: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginBottom: 20,
  },
  imagenChatbot: {
    width: 50,
    height: 50,
  },
});

export default Home;
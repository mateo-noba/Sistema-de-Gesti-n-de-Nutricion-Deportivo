import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type MenuAgregarPacienteScreenProp = NativeStackNavigationProp<RootStackParamList, "MenuAgregarPaciente">;

const Inicio = () => {
  const navigation = useNavigation<MenuAgregarPacienteScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Que desea agregar?</Text>

      <View style={styles.contenedor}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PlanNutricional")}
        >
          <Text style={styles.icono}>🍎</Text>
          <Text style={styles.tituloCard}>Plan nutricional</Text>
          <Text style={styles.descripcion}>Editar el plan nutricional del paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PlanDeportivo")}
        >
          <Text style={styles.icono}>⚽</Text>
          <Text style={styles.tituloCard}>Plan Deportivo</Text>
          <Text style={styles.descripcion}>Editar el plan deportivo del paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Avances")}
        >
          <Text style={styles.icono}>📋</Text>
          <Text style={styles.tituloCard}>Avances</Text>
          <Text style={styles.descripcion}>Editar los avances del paciente</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("DatosDelPaciente")}
        >
          <Text style={styles.icono}>⚖️📏</Text>
          <Text style={styles.tituloCard}>Peso y altura</Text>
          <Text style={styles.descripcion}>Agregar Peso y altura del paciente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f9f9",
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
});

export default Inicio;
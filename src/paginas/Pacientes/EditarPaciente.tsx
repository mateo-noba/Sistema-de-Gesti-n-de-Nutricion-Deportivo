import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Paciente } from "../../interfaces/Paciente";
import { obtenerPaciente, editarPaciente } from "../../servicios/pacienteServicio";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type EditarPacienteProp = NativeStackNavigationProp<RootStackParamList, "EditarPaciente">;
type EditarPacienteRouteProp = RouteProp<RootStackParamList, "EditarPaciente">;

const EditarPaciente = () => {
  const navigation = useNavigation<EditarPacienteProp>();
  const route = useRoute<EditarPacienteRouteProp>();
  const { id } = route.params;

  const [formulario, setFormulario] = useState<Paciente | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const datos = await obtenerPaciente(id);
        setFormulario(datos);
      } catch (error) {
        console.log("Error al cargar el paciente", error);
      } finally {
        setCargando(false);
      }
    };
    cargarPaciente();
  }, [id]);

  const manejarCambio = (campo: keyof Paciente, valor: string | number | boolean) => {
    if (!formulario) return;
    setFormulario({ ...formulario, [campo]: valor });
  };

  const enviarFormulario = async () => {
    if (!formulario) return;

    try {
      await editarPaciente(id, formulario);
      Alert.alert("Éxito", "Paciente editado con éxito");
      navigation.navigate("ListaPacientes");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un error al editar el paciente");
    }
  };

  if (cargando || !formulario) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text>Cargando datos del paciente...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del paciente"
        value={formulario.nombre}
        onChangeText={(text) => manejarCambio("nombre", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido del paciente"
        value={formulario.apellido}
        onChangeText={(text) => manejarCambio("apellido", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI del paciente"
        value={formulario.dni}
        onChangeText={(text) => manejarCambio("dni", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email del paciente"
        value={formulario.email}
        onChangeText={(text) => manejarCambio("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono del paciente"
        value={formulario.telefono}
        onChangeText={(text) => manejarCambio("telefono", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso del paciente"
        value={String(formulario.peso)}
        keyboardType="numeric"
        onChangeText={(text) =>
        manejarCambio("peso", text === "" ? 0 : Number(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura del paciente"
        value={String(formulario.altura)}
        keyboardType="numeric"
        onChangeText={(text) =>
        manejarCambio("altura", text === "" ? 0 : Number(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="IMC del paciente"
        value={String(formulario.imc)}
        keyboardType="numeric"
        onChangeText={(text) =>
        manejarCambio("imc", text === "" ? 0 : Number(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={String(formulario.estado)}
        onChangeText={(text) => manejarCambio("estado", text)}
      />

      <TouchableOpacity style={styles.boton} onPress={enviarFormulario}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cargandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#f4f9f9",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#4db6ac",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default EditarPaciente;

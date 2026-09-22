import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Paciente } from "../../interfaces/Paciente";
import { obtenerPacientes, borrarPaciente, editarPaciente } from "../../servicios/pacienteServicio";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type ListaPacientesProp = NativeStackNavigationProp<RootStackParamList, "ListaPacientes">;

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroApellido, setFiltroApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [filtroPeso, setFiltroPeso] = useState("");
  const [filtroAltura, setFiltroAltura] = useState("");
  const [filtroImc, setFiltroImc] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const navigation = useNavigation<ListaPacientesProp>();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerPacientes();
        setPacientes(datos);
      } catch (error) {
        console.log("Error al cargar pacientes", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const manejarEliminar = (id: string) => {
    Alert.alert(
      "Confirmar",
      "¿Seguro que querés eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await borrarPaciente(id);
              setPacientes((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Paciente eliminado con éxito");
            } catch (error) {
              Alert.alert("Error eliminando el paciente");
            }
          },
        },
      ]
    );
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroApellido("");
    setFiltroDni("");
    setFiltroEmail("");
    setFiltroTelefono("");
    setFiltroPeso("");
    setFiltroAltura("");
    setFiltroImc("");
    setBusqueda("");
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const texto = busqueda.toLowerCase();
    const coincideNombre = filtroNombre === "" || p.nombre.toLowerCase().includes(filtroNombre);
    const coincideApellido = filtroApellido === "" || p.apellido.toLowerCase().includes(filtroApellido);
    const coincideDni = filtroDni === "" || p.dni.toLowerCase().includes(filtroDni);
    const coincideEmail = filtroEmail === "" || p.email.toLowerCase().includes(filtroEmail);
    const coincideTelefono = filtroTelefono === "" || p.telefono.toLowerCase().includes(filtroTelefono);
    const coincidePeso = filtroPeso === "" || p.peso === Number(filtroPeso);
    const coincideAltura = filtroAltura === "" || p.altura === Number(filtroAltura);
    const coincideImc = filtroImc === "" || p.imc === Number(filtroImc);
    const coincideEstado = filtroEstado === "" || p.estado.toLowerCase().includes(filtroEstado);
    const coincideBusquedaGlobal =
      texto === "" ||
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto) || 
      p.dni.toLowerCase().includes(texto) ||
      p.email.toLowerCase().includes(texto) ||
      p.telefono.toLowerCase().includes(texto) ||
      p.peso.toString().includes(texto) ||
      p.altura.toString().includes(texto) ||
      p.imc.toString().includes(texto) ||
      p.estado.toLowerCase().includes(texto);

    return coincideNombre && coincideApellido && coincideDni && coincideEmail && coincideTelefono && coincidePeso && coincideAltura && coincideImc && coincideEstado && coincideBusquedaGlobal;
  });

  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text>Cargando pacientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listado de Pacientes</Text>

      <TextInput
        style={styles.inputBusqueda}
        placeholder="Buscar por nombre, apellido, dni, email, telefono, peso o altura..."
        value={busqueda}
        onChangeText={(text) => setBusqueda(text.toLowerCase())}
      />

      <View style={styles.filtrosCard}>
        <Text style={styles.subtitulo}>Filtros avanzados</Text>

        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChangeText={(text) => setFiltroNombre(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por apellido"
          value={filtroApellido}
          onChangeText={(text) => setFiltroApellido(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por DNI"
          value={filtroDni}
          onChangeText={(text) => setFiltroDni(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por email"
          value={filtroEmail}
          onChangeText={(text) => setFiltroEmail(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por teléfono"
          value={filtroTelefono}
          onChangeText={(text) => setFiltroTelefono(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por teléfono"
          value={filtroTelefono}
          onChangeText={(text) => setFiltroTelefono(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por peso"
          value={filtroPeso}
          onChangeText={setFiltroPeso}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por altura"
          value={filtroAltura}
          onChangeText={setFiltroAltura}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por IMC"
          value={filtroImc}
          onChangeText={setFiltroImc}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por Estado"
          value={filtroEstado}
          onChangeText={setFiltroEstado}
        />
        <TouchableOpacity style={styles.btnLimpiar} onPress={limpiarFiltros}>
          <Text>Limpiar filtros</Text>
        </TouchableOpacity>
      </View>

      {pacientesFiltrados.length === 0 ? (
        <Text>No hay pacientes cargados.</Text>
      ) : (
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>{item.peso}kg {item.altura}m {item.imc}</Text>
              <View style={styles.botonera}>
                <TouchableOpacity
                  style={styles.botonAgregar}
                  onPress={() => navigation.navigate("AgregarPaciente")} //pendiente crear agregarPaciente.tsx dentro de la carpeta pacientes
                >
                  <Text style={{ color: "white" }}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEditar}
                  onPress={() => navigation.navigate("EditarPaciente", { id: item.id! })} //pendiente crear editarPaciente.tsx dentro de la carpeta pacientes
                >
                  <Text style={{ color: "white" }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEliminar}
                  onPress={() => manejarEliminar(item.id!)}
                >
                  <Text style={{ color: "white" }}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonConsultar}
                  onPress={() => navigation.navigate("ConsultarPaciente", { id: item.id! })} //pendiente crear consultarPaciente.tsx dentro de la carpeta pacientes
                >
                  <Text style={{ color: "white" }}>Consultar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f9f9",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  filtrosCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filtroInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  btnLimpiar: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderRadius: 10,
  },
  tarjeta: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: "#4db6ac",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  botonera: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  botonAgregar: {
    backgroundColor: "#41bd4c",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  botonEditar: {
    backgroundColor: "#4db6ac",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  botonEliminar: {
    backgroundColor: "#e57373",
    padding: 8,
    borderRadius: 8,
  },
  botonConsultar: {
    backgroundColor: "#5043b3",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListaPacientes;
//Importar react para tenerlo en caso de que sea necesario
import React from "react";
//Importar las etiquetas que se van a usar en la pantalla, actuan similar a las etiquetas de HTML
import {View, Text, StyleSheet, TouchableOpacity,TextInput } from "react-native";
//Importar el prop que le dice a typescript que funciones tiene el useNavigate y las pantallas que existen
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//El hook que permite que navegar por las pantallas sin la necesidad de tene que pasarselo como prop
import { useNavigation } from "@react-navigation/native";
//El prop o lista de pantallas que va a tener el sistema y las cosas que se esperan cuando se cambia de pantalla
import { RootStackParamList } from "../../../App";

//Variable de tipo en donde se guarda el prop de la lista de pantallas que tiene el sistema, junto de la pantalla en la que esta ubicado actualmente
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

//Funcion del componenete o pantalla login
const Login = () =>{

  //Variable que nos permitirá navegar por las diferentes pantallas del sistema
  const navigation = useNavigation<LoginScreenProp>();

  return(
    //Contenedor principal de la pantalla, es la que tiene el fondo verde
    <View style={styles.container}>
      {/*Contenedor del login, en el esta todo los titulos, texto y textbox del login, tiene el fondo blanco */}
      <View style={styles.contenedorLogin}>
        {/* El titulo principal de la pantalla de inciar sesión */}
        <Text style={styles.titulo}>Inicio de sesión</Text>
        {/* El contenedor que tiene toda la parte del formulario, o sea text, textbox y botones */}
        <View style={styles.contenedorFormulario}>
          {/* Text para indicarle al usuario que tiene que ingresar su email */}
          <Text style={styles.textoInicioSesion}>Email</Text>
          {/* Textbox en el que el usuario pondrá su mail */}
          <TextInput style={styles.input}></TextInput>
          {/* Text para indicarle al usuario que tiene que ingresar su contraseña */}
          <Text style={styles.textoInicioSesion}>Contraseña</Text>
          {/* Textbox en el que el usuario pondrá su contraseña */}
          <TextInput style={styles.input} secureTextEntry={true}></TextInput>
          {/* Text en caso de que el usuario haya olvidado su contraseña */}
          <Text style={styles.textoChico}>¿Olvidaste tu contraseña? <Text style={styles.link} onPress={() => navigation.navigate("Inicio")}>Recuperar</Text></Text>
          {/* Boton con el que el usuario podra tocar para inciar sesion en el sistema */}
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Inicio")}><Text>Iniciar sesión</Text></TouchableOpacity>
          {/* Text que el usuario podrá usar para que lo lleve a crear una cuenta*/}
          <Text style={styles.textoChico}>¿No tenes una cuenta? <Text style={styles.link} onPress={() => navigation.navigate("Registro")}>Registrate</Text></Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  //Estilo para el contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#4db6ac",
    padding: 20,
    alignItems: "center",
  },
  //Estilo para el título principal
  titulo: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 100,
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
    backgroundColor: "#f5f5f5",
    width: 330,
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
  boton: {
    backgroundColor: "#4db6ac",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
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
  link:{
    color: "#0004d8"

  }
});

export default Login;
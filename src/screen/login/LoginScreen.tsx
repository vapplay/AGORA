import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomCoors } from "../../constants/colors";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
  Auth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../constants/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/types";
import DropdownAlert from "react-native-dropdownalert";
import Logo from "../../components/util/Logo";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  let dropDownAlertRef = useRef();

  const [userMail, setUserMail] = useState("");
  const [userPoswar, setUserPoswar] = useState("");
  const [errorTraslater, seterrorTraslater] = useState("");
  const userNavigation = useNavigation<navigation>();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  /// navigation fuction
  const navigationFuction = (user: any) => {

  };

  // error tralater

  const traslater = (Error: string) => {
    if (Error.includes("auth/invalid-email-verified")) {
      seterrorTraslater("Correo no verificado");
    } else if (Error.includes("auth/wrong-password")) {
      seterrorTraslater("Contraseña incorrecta");
    } else if (Error.includes("auth/user-not-found")) {
      seterrorTraslater("Usuario no encontrado");
    } else if (Error.includes("auth/invalid-email")) {
      seterrorTraslater("Correo no válido");
    } else if (Error.includes("auth/weak-password")) {
      seterrorTraslater("Contraseña débil. Debe tener al menos 6 caracteres.");
    } else if (Error.includes("auth/auth/email-already-in-use")) {
      seterrorTraslater("El correo electrónico ya está en uso.");
    } else if (Error.includes("auth/operation-not-allowed")) {
      seterrorTraslater(
        "Operación no permitida. Por favor contacta al administrador."
      );
    } else {
      seterrorTraslater(
        "Ha ocurrido un error. Por favor intenta de nuevo más tarde."
      );
    }
  };

  ///  create user and login user
  const handleSinging = (
    authFunction: (
      auth: Auth,
      email: string,
      password: string
    ) => Promise<UserCredential>
  ) => {
    authFunction(auth, userMail.trim(), userPoswar.trim())
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          userNavigation.navigate("Privaciti", { user: { email: user?.email } });

        }
      })
      .catch((error) => {
        console.log(error.message);

        traslater(error.message);
        dropDownAlertRef.alertWithType("error", "Error", errorTraslater);
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={CustomCoors.Black} />
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />

      <View style={styles.welcome}>
        <Logo size={40} />
        <Text style={styles.welcomeText}>
          Bienvenido a la mejor app de películas ¡Gratis!
        </Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.loginTextContainer}>
          <Text style={[styles.loginTitle]}>Registrate</Text>
          <Text style={[styles.loginText]}>
            Si ya tienes una cuenta, usa el botón de iniciar para poder ingresar
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputs, { marginBottom: 30 }]}
            placeholderTextColor="#ffffffbb"
            placeholder="Email"
            onChangeText={(Text) => setUserMail(Text)}
          />

          <TextInput
            style={styles.inputs}
            placeholderTextColor="#ffffffbb"
            placeholder="Password"
            secureTextEntry
            onChangeText={(Text) => setUserPoswar(Text)}
          />
        </View>

        <View style={[styles.bottoms]}>
          <Button
            color={CustomCoors.BLue}
            onPress={() => handleSinging(createUserWithEmailAndPassword)}
            title="registrar"
          />

          <Button
            color={CustomCoors.BLue}
            onPress={() => handleSinging(signInWithEmailAndPassword)}
            title="iniciar"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: CustomCoors.Black,
  },

  welcome: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    zIndex: -2
  },

  welcomeText: {
    color: "white",
  },

  loginContainer: {
    backgroundColor: "#1e1f1e",
    width: "90%",
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: "auto",
    paddingVertical: 30,
    zIndex: -1,
  },
  loginTextContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  loginTitle: {
    fontSize: 20,
    color: CustomCoors.BLue,
    fontWeight: "500",
    paddingBottom: 4,
  },

  loginText: {
    color: "#ffffffbb",
    textAlign: "center",
  },

  inputContainer: {
    width: "90%",
    alignItems: "flex-start",
    gap: 20,
    marginVertical: 30,
  },

  inputs: {
    color: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: CustomCoors.BLue,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  bottoms: {
    width: "60%",
    flexDirection: "row",
    paddingTop: 30,
    justifyContent: 'space-evenly'
  },
});

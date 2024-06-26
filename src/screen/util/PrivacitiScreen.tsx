import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CustomCoors } from "../../constants/colors";
import { authState } from "../../storage/State.Zustend";

export default function PrivacitiPoliticas({ route }: any) {
  const { setPolitical, setUser } = authState((state) => state);

  const goHomeScreen = () => {
    setUser({ ...route.params.user });
    setPolitical();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>politicas de privacidad </Text>
      <View style={styles.textConted}>
        <ScrollView showsVerticalScrollIndicator style={{ flex: 1 }}>
          <Text style={styles.text}>
            Gracias por utilizar nuestra aplicación ("zuko play"). Esta política
            de privacidad explica cómo recopilamos, utilizamos y compartimos su
            información personal cuando utiliza la app. Recopilación de
            información La app recopila películas de diferentes sitios web con
            el fin de proporcionar contenido relevante y personalizado a
            nuestros usuarios. Tenga en cuenta que no alojamos ninguna película
            en nuestros servidores y no somos responsables del contenido que se
            muestra en la app. Uso de la información Utilizamos la información
            recopilada para mejorar y personalizar la experiencia del usuario en
            la app. La información también puede utilizarse para fines
            publicitarios, aunque no compartimos su información personal con
            terceros para fines publicitarios sin su consentimiento explícito.
            Divulgación de información No vendemos, alquilamos ni divulgamos su
            información personal a terceros, excepto en los casos en que sea
            necesario para proporcionarle los servicios de la app, cumplir con
            una obligación legal o proteger nuestros derechos. Responsabilidad
            Tenga en cuenta que no somos responsables del uso que nuestros
            usuarios hagan del contenido que se muestra en la app. Si bien
            hacemos todo lo posible por garantizar la exactitud y la integridad
            del contenido, no podemos garantizar que todas las películas sean
            precisas o actualizadas. El usuario es el único responsable del uso
            que haga del contenido que se muestra en la app. Derechos de
            propiedad intelectual Las películas que se muestran en la app son
            propiedad de sus respectivos propietarios y están protegidas por las
            leyes de propiedad intelectual. El usuario no está autorizado a
            descargar, distribuir o utilizar de cualquier otra manera el
            contenido de la aplicación para fines comerciales sin autorización
            previa.
          </Text>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={goHomeScreen} style={styles.bottom}>
        <Text style={styles.bottomText}> aceptar </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomCoors.Black,
  },
  title: {
    color: CustomCoors.BLue,
    fontWeight: "700",
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  textConted: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: "70%",
    marginVertical: 20,
    backgroundColor: "#1e1f1e",
    paddingVertical: 20,
    borderRadius: 6,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },

  bottom: {
    borderRadius: 6,
    backgroundColor: CustomCoors.BLue,
    padding: 10,
  },
  bottomText: {
    color: "white",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
});

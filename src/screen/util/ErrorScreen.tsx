import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomScreen from "../../components/custom/CustomScreen";
import { CustomCoors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {
  refetch?: () => void;
};

const ErrorScreen = ({ refetch }: Props) => {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.ups]}>!Ups</Text>
      <Text style={styles.text}>
        Hubo un error inesperado por favor reintente
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigate?.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>reintentar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomCoors.Black,
  },
  text: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  ups: {
    fontSize: 40,
    fontWeight: "bold",
  },
});

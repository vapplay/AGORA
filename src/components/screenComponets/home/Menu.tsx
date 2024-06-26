import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import constans from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { CustomCoors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";
import Logo from "../../util/Logo";

export default function HomeMenu() {
  const navigation = useNavigation<navigation>();

  const routes = useCallback((nombre: string) => {
    navigation.navigate("Categorias", { id: 0, nombre, info: 0 });
  }, []);

  const navigate = useCallback(() => {
    navigation.navigate("allType", { nombre: "series" });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.ccontent}>
        <Logo />
        <Feather
          onPress={() => navigation.navigate("Search")}
          style={styles.SearchIcons}
          name="search"
          size={25}
          color={CustomCoors.White}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.text, styles.activeMenu]}>Inicio</Text>
        <Text onPress={() => routes("peliculas")} style={styles.text}>
          Peliculas
        </Text>
        <TouchableOpacity onPress={navigate}>
          <Text style={styles.text}> Series </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ccontent: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: constans.statusBarHeight + 20,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  SearchIcons: { backgroundColor: "#041d31", padding: 4, borderRadius: 7 },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: CustomCoors.White,
    textTransform: "capitalize",
  },

  activeMenu: {
    color: CustomCoors.BLue,
    borderBottomColor: CustomCoors.BLue,
    borderBottomWidth: 1,
  },
  logo: {
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
  },
});

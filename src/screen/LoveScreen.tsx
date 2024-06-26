import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Subtext from "../components/custom/Subtext";
import Constants from "expo-constants";
import { CustomCoors } from "../constants/colors";
import SliderGrid from "../components/custom/slider/SliderGrid";
import { clearFavoritesSQLite, getFavorites } from "../db/db";
import { Feather } from "@expo/vector-icons";

import { Storage } from "../storage/State.Zustend";
import { useIsFocused } from "@react-navigation/native";

export default function LoveScreen() {
  const [item, setItem] = useState([]);
  const [deleteFavorite, setDeleteFavorite] = useState(false);

  let isfocus = useIsFocused();

  useEffect(() => {
    if (isfocus) {
      getFavorites().then((item) => setItem(item as any));
    }
  }, [isfocus, deleteFavorite ]);

  const deleteFavorites = () => {
    clearFavoritesSQLite();
    setDeleteFavorite((prev) => !prev);
  };

  return (
    <View style={styles.contaoner}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.areaConted}>
          <View style={styles.headerConted}>
            <Subtext text="Favoritas" TextStyle={styles.subtextStiles} />
            <Feather
              onPress={deleteFavorites}
              name="trash-2"
              size={24}
              color="white"
            />
          </View>
          {item?.length === 0 ? (
            <Text style={styles.notFavoriteText}>
              ¡Ups! Parece que aún no has agregado nada a tus favoritos.
            </Text>
          ) : (
            <SliderGrid data={item} loading={false} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  contaoner: {
    flex: 1,
    backgroundColor: CustomCoors.Black,
    paddingHorizontal: 10,
  },
  areaConted: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  subtextStiles: {
    color: CustomCoors.White,
    fontSize: 30,
    marginBottom: 20,
  },
  headerConted: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notFavoriteText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    marginTop: "70%",
  },
});

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { CustomCoors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { navigation } from "../../../types/types";
import { useAnuncios } from "../../../hooks/adds/useAds";

const GET_RANDOM_MOVIE = gql`
  query {
    randomMoviesAndSeries {
      id
      title
      genres
      poster
    }
  }
`;

const RamdomButtom = () => {
  const { data, loading, refetch } = useQuery(GET_RANDOM_MOVIE);
  const navigation = useNavigation<navigation>();

  let { interstitial, interstitialLoaded } = useAnuncios();

  const [loading2, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
    if (data) {
      navigation.navigate("PreviScren", {
        id: data?.randomMoviesAndSeries?.id,
        title: data?.randomMoviesAndSeries?.title,
        poster: data?.randomMoviesAndSeries?.poster,
        genres: data?.randomMoviesAndSeries?.genres,
      });

      if (interstitialLoaded) {
        interstitial.show();
      }
    }

    return;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.5}
      style={styles.container}
    >
      {loading2 ? (
        <ActivityIndicator size={24} color={CustomCoors.BLue} />
      ) : (
        <FontAwesome name="random" size={23} color={CustomCoors?.BLue} />
      )}

      <Text style={styles.textRamdom}>aleatorio</Text>
    </TouchableOpacity>
  );
};

export default RamdomButtom;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 170,
    height: 50,
    backgroundColor: "#ececece1",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  textRamdom: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    textTransform: "capitalize",
  },
});

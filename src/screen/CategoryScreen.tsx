import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import LoadScreen from "./util/LoadScreen";
import SliderGrid from "../components/custom/slider/SliderGrid";
import { Storage } from "../storage/State.Zustend";
import { CustomCoors } from "../constants/colors";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { ALL_SERIE, MOVIES_BY_GENERES } from "../gql/Query";

type Props = {
  route: any;
  navigation: any;
};


export default function CategoryScreen({ route, navigation }: Props) {
  const { id, nombre, info } = route.params;

  const [movies, setMovies] = useState([]); // Lista de películas
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [loading, setLoading] = useState(true); // Estado de carga

  const {
    error,
    loading: Loading,
    refetch,
  } = useQuery(MOVIES_BY_GENERES, {
    variables: {
      type: id,
      page: currentPage,
      detall: info,
    },
    onCompleted: (data) => {
      if (data?.AllPeliculas) {
        // Si hay nuevas películas en la respuesta, agregamos a la lista existente
        const newMovies = [...movies, ...data?.AllPeliculas];
        const uniqueMovies = newMovies.filter(
          (movie, index, self) => index === self.indexOf(movie)
        );
        setMovies(uniqueMovies as any);
      }

      setLoading(false);
    },
  });

 

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (Loading && currentPage === 1) {
    return <LoadScreen />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.2, 1]}
        colors={[CustomCoors.BlackColor, "#ffffff00"]}
        style={styles.gradient}
      />
      <View style={styles.headerConted}>
        <Octicons
          onPress={goBack}
          name="chevron-left"
          size={24}
          color="white"
        />
        <Text style={styles.headerText}>{nombre}</Text>
      </View>

      <View style={styles.sliderStiles}>
        <SliderGrid
          refreshing={refetch}
          data={movies}
          onLoadMore={handleLoadMore}
          loading={Loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomCoors.Black,
    position: "relative",
  },

  gradient: {
    flexDirection: "row",
    width: "100%",
    height: "60%",
    marginBottom: 20,
    top: 0,
    position: "absolute",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: CustomCoors.White,
  },
  headerConted: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Constants.statusBarHeight * 1.4,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  sliderStiles: {
    flex: 1,
  },
});

import { useQuery } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native-animatable";
import SliderGrid from "../components/custom/slider/SliderGrid";
import { CustomCoors } from "../constants/colors";
import { ALL_SERIE } from "../gql/Query";
import LoadScreen from "./util/LoadScreen";
import { Octicons } from "@expo/vector-icons";
import Constants from "expo-constants";

type Props = {
  route: any;
  navigation: any;
};

export default function SeriesPeliculasAnimeScrenn({
  route,
  navigation,
}: Props) {
  const { nombre } = route.params;

  const [movies, setMovies] = useState([]); // Lista de películas
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [loading, setLoading] = useState(true); // Estado de carga

  const {
    error,
    loading: Loading,
    refetch,
  } = useQuery(ALL_SERIE, {
    variables: {
      page: currentPage,
    },
    onCompleted: (data) => {
      if (data?.AllSeries) {
        const newMovies = [...movies, ...data?.AllSeries];
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
    textTransform: "capitalize",
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

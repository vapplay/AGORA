import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomScreen from "../components/custom/CustomScreen";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationHeader } from "../components/screenComponets/PreviwScreen/Header/navigationHeader";
import { useQuery } from "@apollo/client";
import LoadScreen from "./util/LoadScreen";
import MetaInfoPreviw from "../components/screenComponets/PreviwScreen/Meta/MetaInfoPreviw";
import MoviesCompont from "../components/screenComponets/PreviwScreen/Movies/MoviesCompont";
import { TMDB_BASE_URL } from "../constants/url";
import SeriesPreviw from "../components/screenComponets/PreviwScreen/Tv/SeriesPreviw";
import { Storage } from "../storage/State.Zustend";
import { INFO_Peliculas, INFO_SERIES } from "../gql/Query";
import { getSeasons } from "../fuctios/GetSeason";
import { useGetVideoLinks } from "../types/getVideoLinks";
import { BannerAds } from "../hooks/adds/BannerAds";
import FastImage from "react-native-fast-image";

type Props = {
  route?: any;
  navigation?: any;
};

const maxWidth = 200;

const gradientCoors = ["transparent", "#01030a"];

export default function PreviwScreen({ route, navigation }: Props) {
  const { id, genres, title, poster } = route.params;

  ///  get info from the server
  const isSeries = id?.includes("serie");
  const queryType = isSeries ? INFO_SERIES : INFO_Peliculas;
  const {
    loading,
    data: info,
    refetch,
    error,
  } = useQuery(queryType, {
    variables: { infoMoviesId: id },
  });

  /// store
  const {
    setSeasons,
    setVideoUrl,
    setAddFavorito,
    setFavoriteId,
    setItemInfo,
  } = Storage((state) => state);

  // load ads

  // states
  const { link, load } = useGetVideoLinks(id);

  const data = isSeries
    ? info?.infoSeries[0]?.info1[0]
    : info?.infoMovies[0]?.info1[0] ?? [];

  // get dowload link
  useEffect(() => {
    setVideoUrl(link);
    setFavoriteId(id);
    setItemInfo(data);
  }, [link, id, info]);

  useEffect(() => {
    const seasons = getSeasons(
      isSeries ? info?.infoSeries[0]?.episodes : []
    ) ?? [1];
    setSeasons(seasons as any);
  }, [info]);

  const urlDefoult =
    data?.backdrop_path === undefined
      ? poster
      : `${TMDB_BASE_URL}${data?.backdrop_path}`;

  const reparto = info?.infoMovies?.[0]?.reparto ?? [
    {
      name: "No hay reparto",
      profile_path: "",
    },
  ];

  useEffect(() => {
    setAddFavorito(
      {
        poster,
        id,
        title,
      } || null
    );
  }, [id]);

  const [videoFinished, setVideoFinished] = useState(false);
  ///  is loading and error  screen
  if (loading) {
    return <LoadScreen />;
  } else {
  }

  return (
    <CustomScreen loading={loading} refetch={() => refetch()}>
      <View style={styles.BannerContainer}>
        <View style={styles.imgContainer}>
          <FastImage
            style={styles.img}
            source={{
              uri: urlDefoult,
            }}
          />
        </View>

        <LinearGradient style={styles.BannerGradient} colors={gradientCoors} />
        <TouchableOpacity delayLongPress={100} style={styles.play} />
        <NavigationHeader goBack={() => navigation.goBack()} />
        <View style={styles.containerText}>
          <Text numberOfLines={2} style={styles.text}>
            {title}
          </Text>
        </View>
      </View>
      <MetaInfoPreviw
        genres={genres?.slice(0, 3)}
        synopsis={data?.overview}
        year={data?.release_date ?? ""}
        rating={data?.popularity ?? "0.0"}
      />

      {isSeries ? (
        <SeriesPreviw
          genres={genres?.slice(0, 3)}
          name={isSeries ? title : data?.title}
          tmdbId={data?.id}
          overView={data?.overview}
          id={id}
        />
      ) : (
        <MoviesCompont
          genres={genres?.slice(0, 3)}
          name={isSeries ? title : data?.title}
          id={id}
          reparto={reparto}
          recomed={info?.infoMovies[0]?.recomendado}
          overView={data?.overview}
          poster={urlDefoult}
        />
      )}

      <BannerAds />
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  play: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  img: {
    width: "100%",
    height: "100%",
  },

  BannerContainer: {
    width: "100%",
    height: 300,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  BannerGradient: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
  },
  imgContainer: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 0,
    color: "white",
    paddingHorizontal: 20,
    fontFamily: "Magic",
  },
  containerText: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    resizeMode: "cover",
    width: "100%",
    height: 310,
  },

  progressBar: {
    width: maxWidth, // Ancho inicial de la barra de progreso
    height: 2,
    borderRadius: 10,
    backgroundColor: "#cccc", // Color de fondo predeterminado
  },

  containerProgress: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  ProgreDuration: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 10,
  },

  tiketTrailer: {
    position: "absolute",
    top: "25%",
    left: "3%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  textTrailer: {
    color: "white",
    fontSize: 14,
    paddingVertical: 5,
    fontWeight: "bold",
    textTransform: "capitalize",
    letterSpacing: 1,
  },
});

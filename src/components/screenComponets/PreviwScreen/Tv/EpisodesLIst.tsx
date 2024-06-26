import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useCallback, useEffect, useState, memo } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { EPISODES_URL } from "../../../../constants/url";
import { Octicons } from "@expo/vector-icons";
import { CustomCoors } from "../../../../constants/colors";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { navigation } from "../../../../types/types";
import { Storage, videoStorage } from "../../../../storage/State.Zustend";
import { EPISODES_TMDB } from "../../../../gql/Query";
import { useAnuncios } from "../../../../hooks/adds/useAds";
import {
  createTableForSeries,
  getSeriesTable,
  saveEpisodeDb,
} from "../../../../db/db";

type Props = {
  idTmd: number;
  id: string;
  name?: string;
  genres?: [string];
  containerEpisodesStiles?: ViewStyle;
  isHorizontal?: boolean;
};

const EpisodesLIst = ({
  idTmd,
  id,
  name,
  genres,
  containerEpisodesStiles,
  isHorizontal = false,
}: Props) => {
  const { season, setSeason } = Storage((state) => state);
  const { setNextEpisode, nexEpisod } = videoStorage((state) => state);

  const [exitItem, setExitItem] = useState([
    {
      id: "",
    },
  ]);

  const { interstitial, interstitialLoaded } = useAnuncios();

  const getSerie = async () => {
    const episodes = await getSeriesTable(
      id?.replace(/[\/\.-]/g, "tttt") || ""
    );
    setExitItem(episodes);
  };

  useEffect(() => {
    if (!isHorizontal) {
      setSeason(1);
      createTableForSeries(id?.replace(/[\/\.-]/g, "tttt") ?? "");
    }
  }, []);

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      getSerie();
    }
  }, [focus]);

  const { data, loading } = useQuery(EPISODES_TMDB, {
    variables: {
      episodesTmdbId: idTmd,
      season: season ?? 1,
      infoSeriesId: id,
    },
  });

  const naigate = useNavigation<navigation>();

  const openDrawDown = useCallback(() => {
    naigate.navigate(isHorizontal ? "miniDrawDown" : "drawDown");
  }, []);

  const episodes = data?.infoSeries?.[0]?.episodes?.find(
    (x: any) => x?.season === season
  );

  const epsodesNumber = episodes?.episodes?.length;

  //   useAnuncios()

  const playEpisodes = async (
    result: { id: string },
    name?: string,
    genres?: [string],
    poster?: string | "",
    tableid?: string
  ) => {
    setNextEpisode({
      id: result?.id,
      poster: poster || "",
    });

    if (interstitialLoaded) {
      interstitial.show();
    }

    if (!isHorizontal) {
      naigate.navigate("videoScreen", {
        id: result?.id,
        name,
        genres,
        isSeries: true,
        poster: poster || "",
        tableid,
      });
    } else {
      naigate?.goBack();
    }
  };

  const getEpisode = async (item: {
    air_date?: string;
    episode_number?: string;
    id: string;
    name: string;
    still_path: string;
  }) => {
    const result = episodes?.episodes?.find(
      (episode: any) =>
        episode?.release === item?.air_date ||
        episode?.episode == item?.episode_number
    );

    const tableid = id?.replace(/[\/\.-]/g, "tttt") || "";

    saveEpisodeDb(tableid, item?.still_path, item?.name, season, 0, 0);

    result
      ? playEpisodes(result, name, genres, item?.still_path, tableid)
      : console.log("Episodio no disponible");

    return result;
  };

  const progres = (item: any, size: number) => {
    const getItem: any = exitItem?.find((x) => x?.id === item?.still_path);

    const time = getItem?.time || 0;
    const duration = getItem?.duration || 1;
    const width = Math.round((time / duration) * size);

    return width;
  };

  return (
    <View style={isHorizontal ? styles.conted : {}}>
      <View
        style={
          isHorizontal
            ? {
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
              }
            : {}
        }
      >
        {isHorizontal && (
          <AntDesign
            style={{ padding: 10 }}
            onPress={() => naigate.goBack()}
            name="arrowleft"
            size={24}
            color="white"
          />
        )}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={openDrawDown}
          style={styles.contendSeason}
        >
          <Entypo name="chevron-small-down" size={24} color="white" />
          <Text style={styles.contendSeasonText}>
            Temporada {data?.episodesTmdb?.season_number}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          color={CustomCoors.BLue}
          size={30}
        />
      )}

      <FlatList
        horizontal={isHorizontal}
        data={data?.episodesTmdb?.episodes?.slice(0, epsodesNumber)}
        keyExtractor={(item) => item?.episode_number}
        renderItem={({ item }) => {
          return !isHorizontal ? (
            <TouchableOpacity
              onPress={() => getEpisode(item)}
              activeOpacity={0.6}
              style={[styles.container, containerEpisodesStiles]}
            >
              <View style={styles.imgAnNameConted}>
                <View style={styles.imgConted}>
                  <Image
                    style={styles.img}
                    source={{ uri: EPISODES_URL + item?.still_path }}
                  />
                  <Octicons
                    style={styles.playItem}
                    name="play"
                    size={33}
                    color="white"
                  />

                  {exitItem?.some((x: any) => x?.id === item?.still_path) && (
                    <View
                      style={[styles.Progrese, { width: progres(item, 140) }]}
                    />
                  )}
                </View>
                <View style={styles.nameConted}>
                  <Text numberOfLines={2} style={styles.name}>
                    {item?.episode_number + "." + item?.name}
                  </Text>
                  <Text style={styles.Duration}>{item?.runtime + "m"}</Text>
                </View>
              </View>

              <View style={styles.overVIewConted}>
                <Text style={styles.overview}>
                  {item?.overview?.substring(0, 200) + ".."}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => getEpisode(item)}
              activeOpacity={0.6}
              style={{ marginHorizontal: 10, width: 200 }}
            >
              <View style={[styles.imgConted, { width: 200, height: 120 }]}>
                <Image
                  style={styles.img}
                  source={{ uri: EPISODES_URL + item?.still_path }}
                />
                <Octicons
                  style={styles.playItem}
                  name="play"
                  size={33}
                  color={
                    nexEpisod?.poster === item?.still_path
                      ? CustomCoors.BLue
                      : "white"
                  }
                />
                {exitItem?.some((x: any) => x?.id === item?.still_path) && (
                  <View
                    style={[styles.Progrese, { width: progres(item, 200) }]}
                  />
                )}
              </View>
              <View style={[styles.nameConted, { width: "95%", height: 50 }]}>
                <Text numberOfLines={2} style={styles.name}>
                  {item?.episode_number + "." + item?.name}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "rgba(122, 122, 122, 0.52)",
                  marginVertical: 5,
                }}
              />

              <View style={styles.overVIewConted}>
                <Text style={[styles.Duration, { marginBottom: 5 }]}>
                  {item?.runtime + "m"}
                </Text>
                <Text style={styles.overview}>
                  {item?.overview?.substring(0, 200) + ".."}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default memo(EpisodesLIst);

const styles = StyleSheet.create({
  conted: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 20,
  },

  contendSeason: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 0.2,
    borderRadius: 2,
    borderColor: "white",
    marginVertical: 10,
  },

  contendSeasonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  imgAnNameConted: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgConted: {
    width: 140,
    height: 90,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  playItem: {
    position: "absolute",
    top: "35%",
    left: "40%",
    backgroundColor: "#181818a1",
    borderRadius: 100,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  nameConted: {
    paddingLeft: 10,
    width: "60%",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  Duration: {
    fontSize: 12,
    color: "grey",
    fontWeight: "500",
  },
  overVIewConted: {
    marginTop: 8,
  },
  overview: {
    fontSize: 12,
    color: "#cccccc",
  },
  Progrese: {
    position: "absolute",
    bottom: 0,
    height: 2,
    left: 0,
    backgroundColor: CustomCoors.BLue,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
});

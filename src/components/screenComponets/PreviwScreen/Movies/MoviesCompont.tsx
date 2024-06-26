import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { CustomCoors } from "../../../../constants/colors";
import Maxoctios from "../Maxoctios";
import RepartoScreen from "../RepartoScreen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { navigation } from "../../../../types/types";
import { useAnuncios } from "../../../../hooks/adds/useAds";
import {
  createTableForSeries,
  getSeriesTable,
  saveEpisodeDb,
} from "../../../../db/db";

type Props = {
  overView: string;
  recomed: [];
  reparto: [];
  id: string;
  name: string;
  genres: [string];
  poster: string;
};

const { width } = Dimensions.get("window");

const MoviesCompont = memo(
  ({ overView, recomed = [], reparto, id, name, genres, poster }: Props) => {
    const [overviw, setoverviw] = useState(false);

    const naigate = useNavigation<navigation>();

    const [progresItem, setProgresItem] = useState(0);

    //  useAnuncios()
    const { interstitialLoaded, interstitial } = useAnuncios();

    const tableid = id?.replace(/[\/\.-]/g, "tttt") || "";

    const focus = useIsFocused();

    useEffect(() => {
      createTableForSeries(tableid);

      (async () => {
        const res = await getSeriesTable(tableid);

        const elemet = res?.find((item: any) => item?.id === tableid);

        const time = elemet?.time;
        const duratin = elemet?.duration;

        const results = Math.round((time / duratin) * width) * 0.9;

        const whidth = results > 0 ? results : 0;

        setProgresItem(whidth);
      })();
    }, [focus]);

    const payFuction = () => {
      saveEpisodeDb(tableid, tableid, name, 0, 0, 0);

      naigate.navigate("videoScreen", {
        id,
        name,
        genres,
        isSeries: false,
        poster: tableid,
        tableid,
      });

      if (interstitialLoaded) {
        interstitial.show();
      }
    };

    const playText = progresItem > 0 ? "Continuar" : "Play";

    return (
      <View style={styles.container}>
        <Maxoctios />
        <TouchableOpacity onPress={payFuction} style={styles.playContainer}>
          <Entypo name="controller-play" size={23} color="black" />
          <Text style={styles.playText}>{playText}</Text>
        </TouchableOpacity>

        <View style={styles.progreseContainer}>
          <View style={[styles.progrese, { width: progresItem }]} />
        </View>

        <View style={styles.sinopsys}>
          <Text style={styles.sinopsysText}>
            {overviw ? overView : overView?.substring(0, 200) + "..."}
            <Text
              onPress={() => setoverviw(!overviw)}
              style={[
                styles.sinopsysText,
                { marginLeft: 10, color: "#cccccc" },
              ]}
            >
              {overviw ? "Ver menos" : "Ver más"}
            </Text>
          </Text>
        </View>

        <View style={styles.subtextContainer}>
          <Text style={styles.subtest}>reparto</Text>
          <RepartoScreen data={reparto as any} />
        </View>
      </View>
    );
  }
);

export default MoviesCompont;

const styles = StyleSheet.create({
  progrese: {
    height: 5,
    backgroundColor: CustomCoors.BLue,
    marginTop: 5,
    left: 0,
  },
  progreseContainer: {
    width: "90%",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  playContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    backgroundColor: CustomCoors.White,
    borderRadius: 3,
    flexDirection: "row",
    paddingVertical: 7,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  playText: {
    fontSize: 20,
    color: CustomCoors.Black,
    fontWeight: "500",
  },
  sinopsys: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginTop: 10,
    paddingHorizontal: 13,
  },
  sinopsysText: {
    color: "white",
    fontWeight: "400",
  },
  viewContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  subtextContainer: {
    width: "90%",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  subtest: {
    textTransform: "capitalize",
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import Maxoctios from "../Maxoctios";
import { CustomCoors } from "../../../../constants/colors";
import EpisodesLIst from "./EpisodesLIst";

type Props = {
  overView: string;
  tmdbId: number;
  id: string;
  name: string;
  genres: [string];
};

export const SeriesPreviw = ({ overView, tmdbId, id, name, genres }: Props) => {
  const [overviw, setoverviw] = useState(false);
  return (
    <View style={styles.container}>
      <Maxoctios serie={true} />

      <View style={styles.sinopsys}>
        <Text style={styles.sinopsysText}>
          {overviw ? overView : overView?.substring(0, 200) + "..."}
          <Text
            onPress={() => setoverviw(!overviw)}
            style={[styles.sinopsysText, { marginLeft: 10, color: "#cccccc" }]}
          >
            {overviw ? "Ver menos" : "Ver más"}
          </Text>
        </Text>
      </View>

      <View style={styles.subtextContainer}>
        <EpisodesLIst genres={genres} idTmd={tmdbId} id={id} name={name} />
      </View>
    </View>
  );
};

export default memo(SeriesPreviw);

const styles = StyleSheet.create({
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

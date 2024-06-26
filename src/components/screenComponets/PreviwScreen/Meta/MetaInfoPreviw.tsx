import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { CustomCoors } from "../../../../constants/colors";

type Props = {
  year: string;
  rating: String;
  synopsis: string;
  genres: [string];
};

export default function MetaInfoPreviw({
  year,
  rating,
  synopsis,
  genres,
}: Props) {
  const renderGeneres = genres?.map((genre) => (
    <Text key={genre} style={styles.textGeneres}>
      {genre}
    </Text>
  ));
  return (
    <View style={styles.metaInfoContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../../../../../assets/img/tmdbImag.png")}
          />
        </View>
        <Text style={styles.year}>{year}</Text>
        <View style={styles.ratingContent}>
          <AntDesign
            style={styles.starIconStyle}
            name="star"
            size={14}
            color="white"
          />
          <Text style={styles.rating}>{rating}</Text>
        </View>
      </View>
      <View style={styles.generesContent}>{renderGeneres}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  year: {
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 5,
  },
  rating: {
    fontWeight: "bold",
    color: "white",
  },

  ratingContent: {
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  metaInfoContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  synopsisContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  synopsis: {
    color: "white",
  },
  starIconStyle: {
    backgroundColor: CustomCoors.BLue,
    borderRadius: 100,
    marginRight: 4,
    padding: 2,
  },
  generesContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textGeneres: {
    fontWeight: "bold",
    color: '#dfdfdfe1',
    paddingHorizontal: 5,
  },
  imgContainer: {
    width: "30%",
    height: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

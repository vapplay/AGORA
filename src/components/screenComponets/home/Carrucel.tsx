import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { CustomCoors } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";
import { useAnuncios } from "../../../hooks/adds/useAds";
import FastImage from "react-native-fast-image";


const colors = ["tomato", "thistle", "skyblue", "teal"];

const gradientCoors = ["transparent", "#01030a"];

let getPupulariti = gql`
  query {
    popularMovies {
      poster
      id
      title
    }
  }
`;



const Carrucel = memo(() => {
  let { data, loading } = useQuery(getPupulariti);

  const { interstitialLoaded, interstitial } = useAnuncios();

  const navigation = useNavigation<navigation>();
  const navigatePreviwScreen = (item: any) => {
    navigation.navigate("PreviScren", { id: item?.id, title: item?.title });
    if (interstitialLoaded) {
      interstitial.show();
    }
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        paginationDefaultColor={CustomCoors.GreyCoor}
        paginationActiveColor={CustomCoors.BLue}
        paginationStyle={styles.paginationsContainer}
        paginationStyleItem={styles.paginationItem}
        showPagination
        autoplayLoopKeepAnimation={true}
        data={data?.popularMovies ?? colors}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigatePreviwScreen(item)}
              style={[styles.child]}
            >
              <View style={styles.swiperconted}>
                <View style={styles.textContainer}>
                  <View style={styles.subtextConted}>
                    <Text numberOfLines={1} style={styles.textItem}>
                      {item?.title}
                    </Text>
                  </View>
                  <View style={styles.subtextConted}>
                    <Text style={styles.hd}>HD</Text>
                    <Text style={styles.subtext}>Agora</Text>
                  </View>
                </View>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: "https://www6.cuevana3.ch" + item?.poster,
                  }}
                />
                <LinearGradient
                  colors={gradientCoors}
                  style={styles.shadowContainer}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

export default Carrucel;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  subtext: {
    fontSize: 13,
    color: CustomCoors.GreyCoor,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingLeft: 4,
  },
  subtextConted: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },

  hd: {
    color: CustomCoors.White,
    backgroundColor: CustomCoors.Black,
    borderRadius: 5,
    padding: 2,
    fontWeight: "bold",
    marginLeft: 7,
  },
  child: {
    width,
    alignItems: "center",
    justifyContent: "center",
    height: 220,
    backgroundColor: "#00040f",
  },

  swiperconted: {
    justifyContent: "center",
    borderRadius: 6,
    width: "96%",
    backgroundColor: "#00040f",
    position: "relative",
  },
  paginationsContainer: {
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 15,
    marginBottom: -3,
  },
  shadowContainer: {
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  textItem: {
    fontSize: 15,
    fontWeight: "500",
    color: CustomCoors.White,
    textAlign: "center",
    marginLeft: 7,
    fontFamily: "Magic",
    letterSpacing: 1,
  },

  textContainer: {
    position: "absolute",
    zIndex: 100,
    marginLeft: 7,
    bottom: 0,
    marginBottom: 30,
    width: "58%",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  paginationItem: {
    width: 5,
    height: 5,
    margin: -10,
    marginRight: -4.9,
  },
});

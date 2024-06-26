import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EPISODES_URL } from "../../../../constants/url";
import { LinearGradient } from "expo-linear-gradient";
import { navigation } from "../../../../types/types";
import { useNavigation } from "@react-navigation/native";
import { CustomCoors } from "../../../../constants/colors";
import { FlatList } from "react-native-gesture-handler";
import { useAnuncios } from "../../../../hooks/adds/useAds";
const gradientCoors = ["transparent", "#01030a"];

type Props = {
  data: [
    {
      id: string;
      title: string;
      poster: string;
      time: number;
      duration: number;
    }
  ];
};

const RenderLongSlider = ({ data }: Props) => {
  const navigation = useNavigation<navigation>();

  // adds config
  const { interstitial, interstitialLoaded } = useAnuncios();

  const episodeoNavigation = (id: string, title: string, poster: string) => {
    navigation.navigate("videoScreen", { id, name: title, poster });

    if (interstitialLoaded) {
      interstitial.show();
    }
  };

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => {
          const time = item?.time || 0;
          const duration = item?.duration || 1;
          const width = Math.round((time / duration) * 210);

          return (
            <TouchableOpacity
              onPress={() =>
                episodeoNavigation(item?.id, item?.title, item?.poster)
              }
              style={[styles.container]}
            >
              <View style={[styles.idicator, { width }]} />
              <View
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
              >
                <Image
                  style={styles.img}
                  source={{ uri: `${EPISODES_URL}${item?.poster}` }}
                />
              </View>
              <Text numberOfLines={2} style={styles.text}>
                {item?.title}
              </Text>
              <LinearGradient colors={gradientCoors} style={styles.gradient} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RenderLongSlider;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 3,
    position: "relative",
    width: 210,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    overflow: "hidden",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    zIndex: 2,
    paddingHorizontal: 4,
    textAlign: "center",
    bottom: 10,
  },

  img: {
    width: "100%",
    height: "100%",
    backgroundColor: CustomCoors.GreyCoor,
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    marginBottom: -2,
    height: "85%",
    width: "100%",
  },

  idicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    zIndex: 2,
    backgroundColor: CustomCoors.BLue,
    left: 0,
  },
});

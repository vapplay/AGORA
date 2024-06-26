import React, { memo, useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { CustomCoors } from "../../../../constants/colors";
import { useAnuncios } from "../../../../hooks/adds/useAds";
import { navigation } from "../../../../types/types";
import FastImage from "react-native-fast-image";

interface Props {
  Item: { title: string; poster: string; id: string; genres: string[] };
  itemStylesConted?: ViewStyle;
}

const gradientColors = ["transparent", "#01030a"];

const RenderSlider = memo(({ Item, itemStylesConted }: Props) => {
  const navigation = useNavigation<navigation>();
  const { interstitialLoaded, interstitial } = useAnuncios();

  const handleNavigation = useCallback(() => {
    navigation.navigate("PreviScren", {
      id: Item.id,
      genres: Item.genres,
      title: Item.title,
      poster: Item.poster,
    });

    if (interstitialLoaded) {
      interstitial.show();
    }
  }, [navigation, interstitialLoaded, interstitial, Item]);

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[styles.container, itemStylesConted]}
    >
      <View style={styles.imageContainer}>
        <FastImage style={styles.img} source={{ uri: Item.poster }} />
      </View>
      <Text numberOfLines={2} style={styles.text}>
        {Item.title}
      </Text>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
    </TouchableOpacity>
  );
});

export default RenderSlider;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 3,
    position: "relative",
    width: 110,
    height: 165,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    overflow: "hidden",
  },
  imageContainer: {
    width: 110,
    height: 165,
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
});

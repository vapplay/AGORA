import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Constan from "expo-constants";
import { CustomCoors } from "../constants/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import { gql, useQuery } from "@apollo/client";
import { useAnuncios } from "../hooks/adds/useAds";

const gradienColor = ["#00223a", "#ffffff00"];

const QUERY_SEARCH = gql`
  query ($query: String!) {
    search(query: $query) {
      id
      genres
      sypnosis
      poster
      title
      year
    }
  }
`;

export default function SearchScree({ navigation }: any) {
  const [Query, setQuery] = useState("");

  const { data, loading } = useQuery(QUERY_SEARCH, {
    variables: {
      query: Query,
    },
  });

  // adds config

  const { interstitialLoaded, interstitial } = useAnuncios();

  const navigate = async (item: any) => {
    navigation.navigate("PreviScren", {
      id: item?.id,
      genres: item?.genres,
      title: item?.title,
      poster: item?.poster,
    });

    if (interstitialLoaded) {
        interstitial.show();
    }

  };

  const clearQuery = () => {
    setQuery("");
  };

  let conditionales;
  if (loading) {
    conditionales = <ActivityIndicator color={CustomCoors.BLue} size={30} />;
  } else {
    if (Query === "") {
      conditionales = <Text style={styles.nadaText}>¿Qué busca?</Text>;
    } else if (data?.search.length === 0) {
      conditionales = (
        <Text style={styles.nadaText}>¿Seguro que así sella?</Text>
      );
    } else {
      conditionales = (
        <FlashList
          contentContainerStyle={{ paddingVertical: 20 }}
          estimatedItemSize={200}
          data={data?.search}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigate(item)}
              style={styles.itemConted}
            >
              <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: item?.poster }} />
              </View>
              <View style={styles.TextConted}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text numberOfLines={4} style={styles.sypnosis}>
                  {item?.sypnosis}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.serachContainer}>
        <Entypo
          onPress={() => navigation.goBack()}
          style={styles.incos}
          name="chevron-left"
          size={26}
          color="white"
        />
        <TextInput
          value={Query}
          onChangeText={setQuery}
          style={styles.textInput}
          placeholder="¿Qué buscas?"
          autoFocus
          placeholderTextColor={CustomCoors.GreyCoor}
        />
        <Ionicons
          onPress={clearQuery}
          style={styles.incos}
          name="close"
          size={24}
          color="white"
        />
      </View>

      {conditionales}

      <LinearGradient colors={gradienColor} style={styles.gradint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomCoors.Black,
  },
  serachContainer: {
    marginTop: Constan.statusBarHeight,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 70,
  },
  textInput: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 4,
    width: "75%",
    fontWeight: "500",
    fontSize: 16,
    color: "white",
    paddingLeft: 10,
  },
  incos: {
    color: CustomCoors.White,
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
  },
  gradint: {
    width: "100%",
    height: "60%",
    top: 0,
    position: "absolute",
    zIndex: -1,
  },
  itemConted: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 6,
    backgroundColor: CustomCoors.BlackColor,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  imgContainer: {
    width: 100,
    height: 100,
    paddingVertical: 4,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  TextConted: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: "80%",
    paddingHorizontal: 3,
    paddingVertical: 5,
    paddingLeft: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: CustomCoors.White,
  },
  sypnosis: {
    fontSize: 10,
    color: CustomCoors.GreyCoor,
  },

  nadaText: {
    color: CustomCoors.White,
    fontWeight: "600",
    alignItems: "center",
    fontSize: 30,
    textAlign: "center",
  },
});

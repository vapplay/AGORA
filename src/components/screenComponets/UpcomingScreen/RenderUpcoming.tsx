import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import ConverteDate from "../../../fuctios/converterDate";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { TMDB_BASE_URL } from "../../../constants/url";
import constants from "expo-constants";
import ModalComponent from "../../custom/modal/Modal";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";

const { width } = Dimensions.get("window");

interface keywords {
  name: string;
  id: number;
}

const RenderUpcoming = ({ item }: any) => {
  const navigation = useNavigation<navigation>();

  const navigateInfo = useCallback(() => {
    navigation?.navigate("modal", { item });
  }, []);

  return (
    <View style={styles.containeritem}>
      <View style={styles.containerImage}>
        <View style={styles.date}>
          <Text
            style={{
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {ConverteDate(item?.release_date ?? "", "DD mesAbr").slice(-3)}
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            {ConverteDate(item?.release_date ?? "", "DD mesAbr").slice(0, 2)}
          </Text>
        </View>

        <View style={styles.videoAnimagenCOntainer}>
          <Image
            style={styles.img}
            source={{ uri: TMDB_BASE_URL + item.backdrop_path }}
          />
        </View>
      </View>

      <View style={styles.metadata}>
        <View style={styles.containerText}>
          <Text numberOfLines={3} style={styles.textName}>
            {item.title}
          </Text>

          <View style={styles.MetaTitleInfo}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="white"
            />
            <Text style={{ color: "#cccc", fontSize: 12 }}>avisame</Text>
          </View>

          <TouchableOpacity
            onPress={navigateInfo}
            activeOpacity={0.4}
            style={styles.MetaTitleInfo}
          >
            <Feather name="info" size={24} color="white" />
            <Text style={{ color: "#cccc", fontSize: 12 }}>informacion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.overview}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
              marginBottom: 5,
            }}
          >
            {`Estreno el ${ConverteDate(item.release_date, "DD de mes")}`}
          </Text>

          <Text style={{ color: "#cccc", fontFamily: "Poppins" }}>
            {item?.overview?.slice(0, 200)}
          </Text>
          <View style={styles.keywords}>
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              {item?.keywords
                ?.slice(0, 4)
                ?.map((item: keywords) => item.name)
                .join(" . ")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keywords: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatListContainer: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },

  containeritem: {
    width,
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingRight: 40,
    marginBottom: 20,
  },

  videoAnimagenCOntainer: {
    width: "85%",
    height: 170,
    overflow: "hidden",
  },

  containerImage: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  metadata: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  overview: {
    width: "85%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginTop: 10,
  },

  video: {
    width: "100%",
    height: 170,
  },

  date: {
    alignItems: "center",
  },

  containerText: {
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },

  MetaTitleInfo: {
    alignItems: "center",
    justifyContent: "center",
  },

  textName: {
    fontFamily: "Leaner",
    width: "50%",
    color: "white",
    fontSize: 17,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginVertical: constants.statusBarHeight + 10,
  },

  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
});

export default RenderUpcoming;

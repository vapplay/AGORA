import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";
import { LinearGradient } from "expo-linear-gradient";
import { CustomCoors } from "../../../constants/colors";
import { useQuery } from "@apollo/client";
import { GET_LAST_EPISODES } from "../../../gql/Query";
import { EPISODES_URL } from "../../../constants/url";
import Subtext from "../../custom/Subtext";
const gradientCoors = ["transparent", "#01030a"];

type Props = {
  title: string;
};

export default function LastEpisodes({ title }: Props) {
  const navigation = useNavigation<navigation>();

  const { data, loading, error } = useQuery(GET_LAST_EPISODES);

  const episodeoNavigation = (id: string, title: string) => {
    navigation.navigate("videoScreen", { id, name: title });
  };

  
  return (
    <>
      <Subtext
        isSubtitle
        text={title}
        containerStyle={{ marginVertical: 15 }}
      />
      <FlatList
        horizontal
        data={data?.lastEpisodes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              episodeoNavigation(item?.id, item?.title)
            }
            style={[styles.container]}
          >
            <View style={{ width: "100%", height: "100%", overflow: "hidden" }}>
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
        )}
      />
    </>
  );
}

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
});

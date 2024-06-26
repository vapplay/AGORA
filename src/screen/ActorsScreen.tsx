import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomScreen from "../components/custom/CustomScreen";
import { TMDB_BASE_URL } from "../constants/url";
import { LinearGradient } from "expo-linear-gradient";
import {NavigationHeader} from "../components/screenComponets/PreviwScreen/Header/navigationHeader";
import { AntDesign } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import LoadScreen from "./util/LoadScreen";
import FastImage from "react-native-fast-image";

type Props = {
  route: any;
  navigation: any;
};

const gradientCoors: String[] = ["transparent", "#01030a"];

const getPersonInfo = gql`
  query ($getPersonId: Int!) {
    getPerson(id: $getPersonId) {
      id
      biography
      birthday
      known_for_department
    }
  }
`;

export default function ActorsScreen({ route, navigation }: Props) {
  const { id, profile_path, name, popularity } = route.params;

  const { data, loading } = useQuery(getPersonInfo, {
    variables: {
      getPersonId: id,
    },
  });

  console.log(data);
  

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <View style={styles.actorContainer}>
        <NavigationHeader goBack={() => navigation.goBack()} />
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{ uri: TMDB_BASE_URL + profile_path }}
          />
        </View>
        <LinearGradient colors={gradientCoors as []} style={styles.gradient} />
        <View style={styles.actorNmaeConted}>
          <Text style={[styles.actorName]}>
            {name}
          </Text>

          <View style={styles.metadataActors}>
            <Text style={styles.lcear}>{data?.getPerson?.birthday ?? ""}</Text>
            <View style={styles.metadatai}>
              <AntDesign
                style={styles.ratingIcont}
                name="star"
                size={20}
                color="black"
              />
              <Text style={[styles.lcear, { color: "#ffc400" }]}>
                {popularity}
              </Text>
            </View>
            <Text style={styles.lcear}>
              {data?.getPerson?.known_for_department ?? ""}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.biografiConted}>
        <Text style={styles.subtest}>Biografia</Text>
        <Text style={styles.biografi}>
          {data?.getPerson?.biography?.split(".")[0] ?? ""}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={[styles.subtest, { paddingLeft: 20 }]}>Peliculas</Text>
        {/* <SliderHorizonta data2={data?.moviesActor} isText={false} /> */}
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  actorContainer: {
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actorNmaeConted: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actorName: {
    fontSize: 30,
    fontFamily:"LibreBaskerville",
    color: "white",
    marginBottom: 20,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    height: "25%",
    width: "100%",
  },
  metadataActors: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  metadatai: {
    flexDirection: "row",
    alignItems: "center",
  },
  lcear: {
    fontSize: 20,
    color: "white",
  },
  ratingIcont: {
    backgroundColor: "#ffc400",
    borderRadius: 100,
    padding: 2,
    marginRight: 10,
  },
  biografiConted: {
    marginTop: 10,
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 7,
    paddingLeft: 20,
  },
  biografi: {
    fontSize: 15,
    color: "white",
  },
  subtest: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  sliderContainer: {
    marginVertical: 20,
  },
});

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import VideoPlayer from "./video/code/VideoPlayer";
import { useGetVideoLinks } from "../types/getVideoLinks";
import { CustomCoors } from "../constants/colors";
import { useKeepAwake } from "expo-keep-awake";
import { videoStorage } from "../storage/State.Zustend";
type Props = {
  navigation: any;
  route: any;
};
export default function VideoScreen({ route }: Props) {
  useKeepAwake();
  const { id, name, genres, isSeries, poster, tableid } = route?.params;
  const { nexEpisod } = videoStorage((state) => state);

  const { link, load } = useGetVideoLinks(
   id
  );

  ///  replase id

  const tvId = isSeries ? id?.split("-")[0]?.replace("episodio", "serie") : id;

  
  if (load) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar hidden animated />
        <ActivityIndicator color={CustomCoors.BLue} size={50} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar hidden animated />
      <VideoPlayer
        poster={poster}
        id={tvId}
        epiId={id}
        uri={link}
        videoName={name}
        isSeries={isSeries}
        genres={genres}
        tableid={tableid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "white",
    marginTop: 300,
  },
});

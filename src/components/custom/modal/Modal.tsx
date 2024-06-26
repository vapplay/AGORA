import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { CustomCoors } from "../../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const ModalComponent = ({ route, navigation }: any) => {
  const { item } = route.params;

  const [videoState, setVideoState] = useState<any>(null);

  const video = useRef(null as any );

  const goBack = () => {
    navigation.goBack();
  };

  const gradientCoors = ["transparent", "black"];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goBack}
        activeOpacity={0.8}
        style={styles.conted}
      />

      <Animatable.View
        animation="slideInUp"
        duration={800}
        style={styles.badyContainer}
      >
        <Text numberOfLines={2} style={styles.subtests}>
          {item?.title}
        </Text>

      

        <View style={styles.videoContainer}>
          <Video
            useNativeControls
            isLooping={false}
            progressUpdateIntervalMillis={3000}
            ref={video}
            posterSource={{ uri: item?.backdrop_path ?? "" }}
            onPlaybackStatusUpdate={(status) =>
              setVideoState(() => status as any)
            }
            onLoadStart={async () => await video?.current?.playAsync()}
            resizeMode={"cover" as any}
            source={{ uri: item?.trailer?.url ?? "" }}
            style={styles.video}
          />
        </View>

        <LinearGradient style={styles.BannerGradient} colors={gradientCoors} />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  conted: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000093",
  },

  badyContainer: {
    width: "100%",
    backgroundColor: CustomCoors?.BlackColor,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "50%",
  },

  subtests: {
    marginHorizontal: 10,
    color: "white",
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Leaner",
    textAlign: "center",
  },

  videoContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    zIndex: 1,
  },
  video: {
    width: "95%",
    height: "100%",
  },

  BannerGradient: {
    width: "100%",
    height: "90%",
    position: "absolute",
    bottom: 0,
  },
});

export default ModalComponent;

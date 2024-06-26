import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { CustomCoors } from "../../../constants/colors";
import { convertMsToTime } from "./actions/ComverterTyme";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { navigation } from "../../../types/types";
import { FlatList } from "react-native-gesture-handler";

type Prosp = {
  videoName: string;
  generes: [string];
  video: any;
  status: any;
  uri: string;
  loadTime: boolean;
  bloquerControlls: boolean;
  setPositioSatodo: React.Dispatch<React.SetStateAction<number>>;
  StylesVideo: any;
  setBloquerControlls: React.Dispatch<React.SetStateAction<boolean>>;
  controllsActive: boolean;
  isSeries: boolean;
};

const iconStyles = {
  fontSize: 21,
  color: "white",
};

const buttonList = (
  navigation: (routing: string) => void,
  uri: string,
  setBloquerControlls: React.Dispatch<React.SetStateAction<boolean>>,
  bloquerControlls: boolean,
  isSeries: boolean
) => [
/*   isSeries && {
    id: "Episodios",
    icon: <AntDesign name="switcher" size={20} color="white" />,
    text: "Episodios",
    onPress: () => navigation("slectEpisode"),
  }, */
  /*   {
    id: "Audio y Subtitulos",
    icon: (
      <MaterialCommunityIcons
        name="message-reply-text-outline"
        size={24}
        color="white"
      />
    ),
    text: "Audio y Subtitulos",
    onPress: () => navigation("selectLeguaje"),
  }, */
  {
    id: "lock-open",
    icon: (
      <MaterialIcons
        name="lock-open"
        size={iconStyles.fontSize}
        color={iconStyles.color}
      />
    ),
    text: "Bloquear",
    onPress: () => setBloquerControlls(!bloquerControlls),
  },
  {
    id: "vlc",
    icon: <MaterialCommunityIcons name="movie-play" size={24} color="white" />,
    text: "vlc",
    onPress: () => Linking.openURL("vlc://" + uri),
  },

  {
    id: "Trasmitir",
    icon: <MaterialIcons name="cast" size={24} color="white" />,
    text: "Trasmitir",
    onPress: () => Linking.openURL("wvc-x-callback://open?url=" + uri),
  },
];

export default function VideoControll({
  videoName,
  generes,
  video,
  status,
  StylesVideo,
  controllsActive,
  bloquerControlls,
  uri,
  isSeries,
  loadTime,
  setBloquerControlls,
  setPositioSatodo,
}: Prosp) {
  const iconsProps = {
    color: !status?.isLoaded ? "#b3b3b3" : "white",
    size: 40,
  };

  const navigation = useNavigation();

  const HanddlePlay = async () => {
    (await status.isPlaying)
      ? video.current.pauseAsync()
      : video.current.playAsync();
  };

  const backTyme = (type: boolean) => {
    if (status?.isLoaded && status?.durationMillis !== undefined) {
      setPositioSatodo(
        status.positionMillis === undefined
          ? null
          : type
          ? status.positionMillis + 10000
          : status.positionMillis - 10000
      );
    } else {
      null;
    }
    return;
  };

  const timeTracurrent = convertMsToTime(status.positionMillis);
  const duration = convertMsToTime(status.durationMillis);

  const navigationelect = useNavigation<navigation>();

  ///   selectLeguaje

  const LenguajeNavigate = useCallback((routing: string) => {
    navigationelect.navigate(routing, { isSeries });
  }, []);

  const data = buttonList(
    LenguajeNavigate,
    uri,
    setBloquerControlls,
    bloquerControlls,
    isSeries
  );

  return (
    <View
      style={[
        StylesVideo.ContainerControls,
        {
          width: "100%",
          height: "100%",
        },
      ]}
    >
      <Animatable.View
        animation={"fadeInDown"}
        duration={400}
        style={StylesVideo.headerControllContainer}
      >
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={25}
          color="white"
        />
        <View style={StylesVideo.titleVideoConted}>
          <View style={StylesVideo.titleBlueSeparator} />
          <View style={StylesVideo.textConted}>
            <Text numberOfLines={1} style={StylesVideo.headerControllText}>
              {videoName}
            </Text>
            <View style={StylesVideo.generosConted}>
              {generes?.map((gene: string) => (
                <Text key={gene} style={StylesVideo.generes}>
                  {gene}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Animatable.View>

      <View style={StylesVideo.VideoControlllerConted}>
        <MaterialIcons
          onPress={() => backTyme(false)}
          name="replay-10"
          size={iconsProps.size}
          color={iconsProps.color}
        />

        <View style={StylesVideo.load}>
          {status.isBuffering && status.isLoaded && !status.isPlaying ? (
            <ActivityIndicator
              style={StylesVideo.ActivitiIndicator}
              color={CustomCoors.BLue}
              size={70}
            />
          ) : null}
        </View>

        <Entypo
          onPress={HanddlePlay}
          name={status.isPlaying ? "controller-paus" : "controller-play"}
          size={iconsProps.size}
          color={"white"}
          style={{ marginHorizontal: 50 }}
        />

        <MaterialIcons
          onPress={() => backTyme(true)}
          name="forward-10"
          size={iconsProps.size}
          color={iconsProps.color}
        />
      </View>

      <Animatable.View
        animation={"fadeInUp"}
        duration={400}
        style={StylesVideo.sliderAnIconst}
      >
        <View style={StylesVideo.sliderConted}>
          <Text style={StylesVideo.time}>{timeTracurrent}</Text>
          <Slider
            onSlidingStart={() => {}}
            onSlidingComplete={(position) => {
              const duration = position * status.durationMillis;
              setPositioSatodo(duration);
              if (!status.isPlaying) {
              }
            }}
            style={{ width: "80%" }}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor={CustomCoors.BLue}
            minimumTrackTintColor={CustomCoors.BLue}
            maximumTrackTintColor="white"
            value={
              status.playableDurationMillis
                ? status.playableDurationMillis / status.durationMillis
                : 0
            }
          />

          <Text style={StylesVideo.time}>{duration}</Text>
        </View>

        <View style={StylesVideo.footerControllContainer}>
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{
              width: "100%",
              justifyContent: "center",
              marginLeft: isSeries ? 0 : -50,
            }}
            keyExtractor={(item: any) => item?.id ?? ""}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={item?.onPress}
                style={StylesVideo.foterItemConted}
                key={item?.id}
              >
                <View style={StylesVideo.footerControllButtonIcon}>
                  {item?.icon}
                </View>
                <Text style={StylesVideo.footerControllButtonText}>
                  {item?.text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Animatable.View>
      <LinearGradient
        colors={["transparent", "black"]}
        style={StylesVideo.gradient}
      />
      <LinearGradient
        colors={["black", "transparent"]}
        style={[StylesVideo.gradient, { top: 0, height: "30%" }]}
      />
    </View>
  );
}

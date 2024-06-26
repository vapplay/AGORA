import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VideoControll from "./Controlls";
import { _statusTYpe } from "../types/Types";
import { CustomCoors } from "../../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { getEpisodeInfo, updateEpisodeDb } from "../../../db/db";

type Props = {
  videoName: string;
  genres: [string];
  uri: string;
  isSeries?: boolean;
  id: string;
  poster: string;
  epiId: string;
  tableid: string;
};

const { width, height } = Dimensions.get("window");

export default function VideoPlayer({
  videoName,
  genres,
  uri,
  isSeries = false,
  id = "",
  poster = "",
  epiId = "",
  tableid,
}: Props) {
  const video = useRef(null as any);
  const focus = useIsFocused();

  const [activeControlls, setActiveControlls] = useState(false);
  const [bloquerControlls, setBloquerControlls] = useState(false);

  const [status, setStatus] = useState<_statusTYpe>({} as any);
  const { width, height } = Dimensions.get("window");
  const [positioSatodo, setPositioSatodo] = useState(
    status?.positionMillis ?? 0
  );
  const [loadTime, setLoadTime] = useState(true);

  ///  get time from database

  useEffect(() => {
    (async () => {
      setLoadTime(true);
      const result: any = await getEpisodeInfo(tableid, poster);
      if (result && loadTime) {
        setPositioSatodo(result?.time);
      }
      setLoadTime(false);
    })();
  }, [id]);

  //  uppdate time in the database
    useEffect(() => {
    const intervalId = setInterval(() => {
      updateEpisodeDb(
        tableid,
        poster,
        status?.positionMillis,
        status?.durationMillis
      );
    }, 10000); // 10000 milisegundos = 10 segundos

    // Limpia el intervalo cuando el componente se desmonte o cambien las dependencias
    return () => clearInterval(intervalId);
  }, [tableid, poster, status]); 

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (status?.isPlaying) {
        if (!activeControlls) {
          setActiveControlls(true);
        }
      } else {
        setActiveControlls(false);
      }
    }, 8000);

    return () => {
      clearTimeout(timerId);
    };
  }, [activeControlls, status?.isPlaying]);

  useEffect(() => {
    if (focus) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
    }
  }, [focus]);

  return (
    <View style={StylesVideo.Container}>
      <TouchableOpacity
        onPress={() => setActiveControlls(!activeControlls)}
        activeOpacity={1}
        style={{ width, height, backgroundColor: "black" }}
      >
        <Video
          positionMillis={positioSatodo}
          resizeMode={"cover" as any}
          ref={video}
          source={{
            uri,
            headers: {
              Referer: "https://streamwish.com",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // User-Agent de Chrome
            },
          }}
          style={[
            {
              width,
              height: height,
              backgroundColor: "black",
            },
          ]}
          onPlaybackStatusUpdate={(status) => setStatus(() => status as any)}
          onLoadStart={async () => await video.current.playAsync()}
        />
        {!bloquerControlls && !activeControlls && (
          <VideoControll
            loadTime={loadTime}
            uri={uri}
            isSeries={isSeries}
            bloquerControlls={bloquerControlls}
            setBloquerControlls={setBloquerControlls}
            controllsActive={activeControlls}
            StylesVideo={StylesVideo}
            setPositioSatodo={setPositioSatodo}
            status={status}
            video={video}
            generes={genres}
            videoName={videoName}
          />
        )}

        {bloquerControlls && !activeControlls && (
          <TouchableOpacity
            onPress={() => setBloquerControlls(!bloquerControlls)}
            activeOpacity={0.7}
            style={StylesVideo.deblockControlls}
          >
            <View style={StylesVideo.desblockIcont}>
              <MaterialIcons name="lock" size={24} color="black" />
            </View>
            <Text style={StylesVideo.deblockTest}> Pantalla Bloqueada </Text>
            <Text
              style={[
                StylesVideo.deblockTest,
                { fontWeight: "300", fontSize: 14 },
              ]}
            >
              Toca Para Desbloquear
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

const StylesVideo = StyleSheet.create({
  deblockControlls: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    marginBottom: 10,
    marginLeft: "30%",
    borderRadius: 50,
  },
  deblockTest: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  desblockIcont: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 13,
  },
  Container: {
    height: "100%",
    backgroundColor: "black",
    position: "relative",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerControllContainer: {
    position: "absolute",
    marginTop: 10,
    top: 0,
    left: 0,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    zIndex: 5,
  },
  headerControllText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    width: "100%",
  },
  titleVideoConted: {
    flexDirection: "row",
    height: "100%",
  },
  titleBlueSeparator: {
    height: "110%",
    width: 3.4,
    backgroundColor: CustomCoors.BLue,
    marginHorizontal: 10,
  },
  textConted: {
    width: "80%",
  },
  generes: { color: "white", fontWeight: "500", fontSize: 16, marginRight: 10 },
  ContainerControls: {
    position: "absolute",
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  generosConted: {
    flexDirection: "row",
  },
  VideoControlllerConted: {
    flexDirection: "row",
    zIndex: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderConted: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  gradient: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  time: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  sliderAnIconst: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
    gap: 10,
    zIndex: 4,
  },
  footerControllContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  foterItemConted: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
  },
  footerControllButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
    textTransform: "capitalize",
    marginLeft: 10,
  },
  load: {
    position: "absolute",
    justifyContent: "center",
  },
});

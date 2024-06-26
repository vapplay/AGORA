import {
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useShare } from "../../../hooks/usechare";
import { Storage } from "../../../storage/State.Zustend";
import { addFavorite, getFavorites, remoFavorite } from "../../../db/db";
import { useFocusEffect } from "@react-navigation/native";
import { dowloadFile } from "../../../types/dowloadFile";

const iconSize = 19;
const iconColor = "white";

const buttonList = (
  isSerie: boolean,
  vieoUrl: string,
  addAnRemoveToFavorite: () => void,
  isFavorite: boolean = false
) =>
  [
    {
      id: "add",
      icon: !isFavorite ? (
        <AntDesign name="plus" size={iconSize} color={iconColor} />
      ) : (
        <Feather name="check" size={iconSize} color={iconColor} />
      ),
      text: "Agregar",
      onPress: () => addAnRemoveToFavorite(),
    },
    !isSerie
      ? {
          id: "cast",
          icon: (
            <MaterialIcons
              name="cast-connected"
              size={iconSize}
              color={iconColor}
            />
          ),
          text: "Trasmitir",
          onPress: () =>
            Linking.openURL(
              "wvc-x-callback://open?url=" + vieoUrl + "&secure_uri=verdadero"
            ),
        }
      : null,
  /*   !isSerie
      ? {
          id: "download",
          icon: <Octicons name="download" size={iconSize} color={iconColor} />,
          text: "Descargar",
          onPress: () => dowloadFile('elpepe.m3u' , vieoUrl  ),
        }
      : null, */
    {
      id: "share",
      icon: (
        <MaterialCommunityIcons
          name="share"
          size={iconSize}
          color={iconColor}
        />
      ),
      text: "Compartir",
      onPress: () =>
        useShare(
          "Ven a Suko Play,Donde ver películas es gratis,Sin necesidad de pagar,Sólo tienes que entrar y disfrutar. =>  "
        ),
    },
  ].filter(Boolean);

type Props = {
  serie?: boolean;
};

export default function Maxoctios({ serie }: Props) {
  const { videoURL, addFavorito, favoriteId } = Storage((state) => state);
  const [isSerie, setIsSerie] = useState<boolean>(serie as any);
  const [vieoUrl, setVieoUrl] = useState<string>(videoURL);
  const [isFavorite, setIsFavorite] = useState(false);

  const loveFavorite = useCallback(() => {
    getFavorites().then((favorites: any) => {
      setIsFavorite(favorites.some((f: any) => f.id === favoriteId));
    });
  }, []);

  const addAnRemoveToFavorite = () => {
    setIsFavorite((prev) => !prev);
    !isFavorite ? addFavorite(addFavorito as any) : remoFavorite(favoriteId);
  };

  ///  efectos
  useEffect(loveFavorite, [addFavorito]);

  useEffect(() => {
    setIsSerie(serie as any);
  }, [serie]);

  useEffect(() => {
    setVieoUrl(videoURL);
  }, [videoURL]);

  return (
    <View style={styles.container}>
      {buttonList(isSerie, vieoUrl, addAnRemoveToFavorite, isFavorite).map(
        (item) =>
          item && (
            <TouchableOpacity
              key={item.id}
              style={styles.ContedItem}
              onPress={item.onPress}
            >
              {item.icon}
              <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
          )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    color: "white",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  ContedItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});

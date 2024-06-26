import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EpisodesLIst from "../../../components/screenComponets/PreviwScreen/Tv/EpisodesLIst";
import { Storage } from "../../../storage/State.Zustend";

const EpiodesRender = ({ route, navigation }: any) => {
  //slectEpisode

  const { favoriteId, getItemInfo } = Storage((state) => state);

  console.log(favoriteId);

  const { id, title } = getItemInfo;

  return (
    <View style={styles.selectContainer}>
      <EpisodesLIst
        idTmd={id}
        id={favoriteId}
        name={title}
        isHorizontal={true}
        />
        
    </View>
  );
};

export default EpiodesRender;

const styles = StyleSheet.create({
  selectContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(3, 14, 24, 0.899)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },

    epiodesCOnted: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

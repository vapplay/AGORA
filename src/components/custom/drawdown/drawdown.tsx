import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Storage } from "../../../storage/State.Zustend";

type Props = {
  route?: any;
  navigation?: any;
  isHorizontal?: boolean;
};

export default function Drawdown({
  route,
  navigation,
  isHorizontal = false,
}: Props) {
  const { setSeason, seasons, season } = Storage((state) => state);

  const SeletSeason = (number: number) => {
    navigation.goBack();
    setSeason(number);
  };

  return (
    <View style={[styles.container, isHorizontal && { paddingVertical: 20 }]}>
      <View
        style={[
          styles.flatLitContainer,
          { height: "80%" },
          isHorizontal && { height: "87%" },
        ]}
      >
        <FlatList
          contentContainerStyle={[
            styles.flatLit,
            !isHorizontal && { height: "100%" },
          ]}
          data={seasons ?? []}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => SeletSeason(item)}>
              <Text
                style={[
                  styles.temporadas,
                  isHorizontal && { paddingBottom: 20 },
                  item === season && styles.active,
                ]}
              >
                Temporada {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <AntDesign
        onPress={() => navigation.goBack()}
        style={styles.icon}
        name="closecircle"
        size={54}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010d18c2",
  },
  flatLitContainer: {},
  temporadas: {
    fontSize: 20,
    fontWeight: "600",
    color: "#b9b9b9e8",
    textAlign: "center",
    paddingBottom: 30,
  },
  flatLit: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    paddingTop: 20,
  },
  icon: {
    paddingTop: 30,
  },

  active: {
    color: "white",
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { videoStorage } from "../../../storage/State.Zustend";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const SelectLenguage = ({ navigation }: any) => {
  const { leguages, lenguage, setLenguage } = videoStorage((state) => state);

  const [select, setSelect] = useState(lenguage);

  const slecteLenguage = () => {
    setLenguage(select);
    navigation.goBack();
  };


  return (
    <View style={styles.selectContainer}>
      <View style={styles.selectContainerItem}>
        <View style={styles.selectItems}>
          <Text style={styles.selectText}>Audio</Text>
          <View style={styles.selectItemConted}>
            <FlatList
              data={leguages}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => setSelect(item?.url)}
                  style={{ flexDirection: "row" }}
                >
                  {item?.url === select ? (
                    <AntDesign
                      style={{ marginRight: 10 }}
                      name="check"
                      size={20}
                      color="white"
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.SelectItem,
                      item?.url === select ? styles.activeItem : null,
                    ]}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>

      <View style={styles.saveSelectConted}>
        <View style={styles.obtios}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.saveSelect, { backgroundColor: "#292929e5" }]}
          >
            <Text style={styles.saveSelectText}>cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveSelect, { backgroundColor: "#ffffffef" }]}
            onPress={() => slecteLenguage()}
          >
            <Text style={[styles.saveSelectText, { color: "black" }]}>
              aplicar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /// save select
  saveSelectConted: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },

  obtios: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 50,
  },

  saveSelect: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginHorizontal: 10,
  },

  saveSelectText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  /// idiomas selct

  activeItem: {
    color: "white",
    fontWeight: "bold",
  },

  SelectItem: {
    color: "#e7e7e7c0",
    fontSize: 17,
    fontWeight: "400",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  selectItemConted: {
    height: "100%",
    marginTop: "10%",
  },

  selectContainerItem: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "20%",
    flexDirection: "row",
  },
  selectItems: {
    height: "100%",
    marginTop: "30%",
  },
  selectText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  selectContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(3, 14, 24, 0.899)",
    position: "absolute",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectLenguage;

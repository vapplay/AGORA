import { Linking, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomScreen from "../components/custom/CustomScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo, Feather } from "@expo/vector-icons";

export default function SetingScreen() {

  const AjustesItems = [
    {
      id: 7,
      icon:  "moon",
      title:"modo obscuro",
    },
    { id: 2, icon: "layers", title: "todas  las novelas " },
    { id: 4, icon: "share", title: "Comparte la aplicación" },
    { id: 5, icon: "star", title: "valora la aplicación " },
    { id: 6, icon: "alert-triangle", title: "Reportar un error" },
    { id: 8, icon: "trash", title: "borrar  favoritos" },
  ];

  const AjustesExtras = [
    { id: 1, icon: "coffee", title: "Apoya a los desarrolladores" },
    { id: 2, icon: "info", title: "Sobre la app" },
    { id: 3, icon: "help-circle", title: "Terminos y condiciones" },
  ];


  //// seting fuctinos
  const routes = (id: number) => {
    switch (id) {
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      default:
        null;
        break;
    }
  };

  //// hellow
  /// extrax seting
  const setingStrast = (id: number) => {
    switch (id) {
      case 1:
        Linking.openURL('');
        break;
      case 2:
        Linking.openURL('data.app_url');
        break;
      case 3:
        break;
    }
  };

  return (
    <CustomScreen>
      <View style={styles.container}>
        <SafeAreaView style={styles.areViw}>
          <View style={[styles.box, { backgroundColor:'white' }]}>
            {AjustesItems.map((e) => (
              <TouchableOpacity
                onPress={() => routes(e.id) as any}
                key={e.id}
                style={styles.boxitem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                    name={e?.icon as any}
                    size={24}
                    color={ "black"}
                  />

                  <Text
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 10,
                      color:  "black",
                    }}
                  >
                    {e.title}
                  </Text>
                </View>
                {e.id === 7 ? (
                  <Switch
                    trackColor={{ false: "#767577", true: "white" }}
                    thumbColor={"red"}
                    value={false}
                    onChange={() => {
                    }}
                  />
                ) : (
                  <Entypo name="chevron-right" size={24} color={"black"} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.box, { backgroundColor: 'red' }]}>
            {AjustesExtras.map((e) => (
              <TouchableOpacity
                onPress={() => setingStrast(e.id)}
                key={e.id}
                style={styles.boxitem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                    name={e?.icon as any}
                    size={24}
                    color={ "black"}
                  />
                  <Text
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 10,
                      color:  "black",
                    }}
                  >
                    {e.title}
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color={"black"} />
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={[
              styles.box,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "red",
              },
            ]}
          >
            <MaterialIcons name="system-update" size={24} color={"black"} />
            <Text style={{ color:  "black" }}>
              App version 2.0.2
            </Text>
          </View>

          <View
            style={[
              styles.box,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "black",
              },
            ]}
          >
            <MaterialIcons name="exit-to-app" size={24} color={"black"} />
            <Text style={{ color:  "black" }}>salir</Text>
          </View>
        </SafeAreaView>
      </View>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  boxitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    width: "95%",
    padding: 10,
    borderRadius: 10,

    marginVertical: 9,
    shadowColor: "rgba(0, 0, 0, 0.488);",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  areViw: {
    overflow: "hidden",
    paddingBottom: 80,
    marginTop: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons, AntDesign, Feather , MaterialCommunityIcons  } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CustomCoors } from "../../constants/colors";

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isActions = route.name === "Actions";
        const itemColor = focused ? CustomCoors.White : CustomCoors.GreyCoor;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          if (isActions) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };
        let iconName;
        switch (route.name) {
          case "Home":
            iconName = <Ionicons name={"home"} size={23} color={itemColor} />;
            break;
          case "Seting":
            iconName = (
              <Ionicons name={"settings-outline"} size={23} color={itemColor} />
            );

            break;
          case "Love":
            iconName = <AntDesign name="star" size={24} color={itemColor} />;
            break;
          case "upcoming":
            iconName = <MaterialCommunityIcons name="play-box-multiple-outline" size={25} color={itemColor} />;
            break;
          default:
            iconName = <Feather name="search" size={24} color={itemColor} />;
            break;
        }

        return (
          <Animated.View style={[styles.tabItem]} key={route.name}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: "center" }}
              onPress={onPress}
            >
              <View style={{ alignItems: "center" }}>{iconName}</View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: CustomCoors.Black,
    flexDirection: "row",
    height: 55,
    justifyContent: "space-evenly",
  },
  tabItem: {
    width: 60,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: "700",
  },
  actionsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;

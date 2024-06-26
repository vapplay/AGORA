import { Dimensions, StyleSheet } from "react-native";
import { CustomCoors } from "../../../../constants/colors";

const { width, height } = Dimensions.get("window");

export const StylesVideo = StyleSheet.create({
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
  generes: { color: "white", fontWeight: "500", fontSize: 16 },
  ContainerControls: {
    position: "absolute",
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  generosConted: {
    flexDirection: "row",
    gap: 10,
  },
  VideoControlllerConted: {
    flexDirection: "row",
    gap: 60,
  },
  sliderConted: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    gap: 5,
  },
  gradient: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
  time: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
});

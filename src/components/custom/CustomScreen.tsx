import {
  Dimensions,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CustomCoors } from "../../constants/colors";
import { FlatList } from "react-native-gesture-handler";

const { Black, BlackColor } = CustomCoors;

interface props {
  children: JSX.Element | JSX.Element[];
  refetch?: () => void;
  loading?: boolean;
  onScrilling?: () => void;
}

const { height, width } = Dimensions.get("window");

///colors={[BlackColor, Black]}

const CustomScreen = memo(
  ({ children, refetch, loading, onScrilling }: props) => {
    return (
      <View style={styles.gradient}>
        <LinearGradient
          colors={[BlackColor, "#5bb1f700"]}
          style={styles.linearGradient1}
        />
        <LinearGradient
          colors={[BlackColor, "#5bb1f700"]}
          style={styles.linearGradient1}
        />
        <LinearGradient
          colors={[BlackColor, "#5bb1f700"]}
          style={styles.linearGradient1}
        />

        <LinearGradient
          colors={["#ffffff00", Black]}
          style={styles.linearGradient2}
        />

        <FlatList
          onScroll={onScrilling}
          refreshControl={
            refetch ? (
              <RefreshControl
                refreshing={loading as any}
                colors={[CustomCoors.BLue]}
                onRefresh={refetch}
              />
            ) : (
              <></>
            )
          }
          data={[]}
          renderItem={({ item }) => null}
          ListEmptyComponent={<View style={styles.conted}>{children}</View>}
        />
      </View>
    );
  }
);

export default CustomScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: BlackColor,
  },
  conted: { width: "100%" },
  gradient: {
    width,
    height: "100%",
    position: "relative",
    backgroundColor: BlackColor,
  },

  linearGradient: {
    width,
    height,
    position: "absolute",
    top: 0,
  },
  linearGradient1: {
    width,
    height: "950%",
    position: "absolute",
    top: 0,
  },

  linearGradient2: {
    width,
    height: height + height,
    position: "absolute",
    bottom: 0,
  },
});

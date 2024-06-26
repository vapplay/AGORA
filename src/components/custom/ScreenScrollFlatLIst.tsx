import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";

interface props {
  childrem?: JSX.Element | JSX.Element[];
}

export default function ScreenScrollFlatLIst({ childrem }: props) {
  return (
    <FlashList
      data={[]}
      style={styles.container}
      renderItem={({ item }) => null}
      ListEmptyComponent={<>{childrem}</>}
    />
  );
}


const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
    }
});





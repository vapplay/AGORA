import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import Subtext from "../custom/Subtext";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/types";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

const GENERES = gql`
  query {
    generes {
      id
      nombre
    }
  }
`;

interface prosp {
  isText?: boolean;
}

export default function GeneroSList({ isText = false }: prosp) {
  const navigation = useNavigation<navigation>();

  const { data, loading, error } = useQuery(GENERES);

  const navigate = useCallback((id: number, nombre: string) => {
    navigation.navigate("Categorias", { id, nombre , info:1 });
  }, []);

  return (
    <View>
      {isText ? <Subtext text="explora por generos" /> : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data?.generes}
        renderItem={({ item }) => (
          <Text
            onPress={() => navigate(item?.id, item?.nombre)}
            style={styles.text}
          >
            {item?.nombre}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15.5,
    fontWeight: "400",
    color: "white",
    backgroundColor: "#5bb1f718",
    borderColor: "#5bb1f74d",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    textTransform: "capitalize",
  },
});

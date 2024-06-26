import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import RenderSlider from "./render/RenderSlider";
import { gql, useQuery } from "@apollo/client";
import Subtext from "../Subtext";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/types";
import { ALL_SERIE, MOVIES_BY_GENERES } from "../../../gql/Query";
import { useAnuncios } from "../../../hooks/adds/useAds";

interface Props {
  id?: number;
  page?: number;
  data2?: [{}];
  isText?: boolean;
  detall?: number;
  title?: string;
  isSeries?: boolean;
}

const SliderHorizonta = memo(
  ({
    id,
    page,
    data2,
    isText = true,
    detall = 1,
    title = "",
    isSeries = false,
  }: Props) => {
    const { loading, error, data, refetch } = useQuery(
      isSeries ? ALL_SERIE : MOVIES_BY_GENERES,
      {
        variables: {
          type: id,
          page: page,
          detall: detall,
        },
      }
    );

    const navigation = useNavigation<navigation>();

    let { interstitial, interstitialLoaded } = useAnuncios();

    const isOter = detall === 0 ? 0 : 1;

    const SeeMore = useCallback(() => {
      navigation.navigate(isSeries ? "allType" : "Categorias", {
        id,
        nombre: title,
        info: isOter,
      });

      if (interstitialLoaded) {
        interstitial.show();
      }
    }, [interstitialLoaded]);

    return (
      <>
        {isText ? (
          <Subtext
            isSubtitle
            subText="ver mas"
            text={title}
            containerStyle={{ marginVertical: 15 }}
            action={SeeMore}
          />
        ) : null}
        <View style={{ marginHorizontal: 7 }}>
          <FlashList
            horizontal
            showsHorizontalScrollIndicator={true}
            estimatedItemSize={130}
            estimatedListSize={{
              width: 110,
              height: 165,
            }}
            data={
              data2 ? data2 : isSeries ? data?.AllSeries : data?.AllPeliculas
            }
            renderItem={({ item, index }) => (
              <RenderSlider Item={item as any} />
            )}
          />
        </View>
      </>
    );
  }
);

export default SliderHorizonta;

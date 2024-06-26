import { Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomScreen from "../components/custom/CustomScreen";
import HomeMenu from "../components/screenComponets/home/Menu";
import GeneroSList from "../components/util/GeneroSList";
import SliderHorizonta from "../components/custom/slider/SliderHorizonta";
import RamdomButtom from "../components/screenComponets/home/RamdomButtom";
import { BannerAds } from "../hooks/adds/BannerAds";
import Carrucel from "../components/screenComponets/home/Carrucel";

export default function HomeScreen() {
  return (
    <View>
      <CustomScreen>
        <HomeMenu />
        <Carrucel />
        <GeneroSList isText />
        <BannerAds />
        <SliderHorizonta
          title="Películas mas recientes"
          detall={0}
          id={0}
          page={1}
        />
        <SliderHorizonta isSeries title="series mas recientes" page={1} />
        <SliderHorizonta title="Películas animadas" id={2} page={1} />
        <BannerAds />
        <SliderHorizonta title="Películas de acción" id={1} page={1} />
        <SliderHorizonta title="Películas de romance" id={15} page={1} />
        <SliderHorizonta title="Películas de comedia" id={7} page={2} />
      </CustomScreen>

      <RamdomButtom />
    </View>
  );
}

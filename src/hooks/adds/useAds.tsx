import { useState, useEffect } from "react";
import {
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { INTERSTITIAL_ID } from "../../constants/ads";

//// initialize    adds
const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
  requestNonPersonalizedAdsOnly: true,
});



export const useAnuncios = () => {
  /// configuere ads
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  /// interstisisal ads
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  useEffect(() => {
    const InterstitialAds = loadInterstitial();

    return () => {
      InterstitialAds();
    };
  }, []);

  /// export fcutiones

  return {
    interstitial,
    interstitialLoaded,
  };
};

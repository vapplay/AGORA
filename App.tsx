import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { RoutesNavigation } from "./src/routes/routes";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/gql/client";
import { creaTeble } from "./src/db/db";
import { useCallback, useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { authState } from "./src/storage/State.Zustend";
import PacmanGame from "./src/screen/util/ParaGoogle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native-animatable";
import { Image } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    creaTeble();
  }, []);

  const { user } = authState();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  useEffect(() => {
    async function requestPermission() {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log("Authorization status:", authStatus);
          const token = await messaging().getToken();
          console.log("Token:", token);
        } else {
          console.log("Failed to request permission");
        }
      } catch (error) {
        console.log(error);
      }
    }

    requestPermission();
  }, []);

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        messaging()
          .getToken()
          .then((token) => console.log(token));
      } else {
        console.log("Failed to request permission");
      }
    }

    requestUserPermission();

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Received foreground message:", remoteMessage);
    });

    return unsubscribe;
  }, []);

  const [loadFont] = useFonts({
    Righteous: require("./assets/font/Righteous-Regular.ttf"),
    Cursive: require("./assets/font/curcive.ttf"),
    Magic: require("./assets/font/Magic-Dreams.ttf"),
    Poppins: require("./assets/font/Poppins-MediumItalic.ttf"),
    LibreBaskerville: require("./assets/font/LibreBaskerville-Italic.ttf"),
    AbrilFatface: require("./assets/font/AbrilFatface-Regular.ttf"),
    Leaner: require("./assets/font/Leaner-Bold.ttf"),
  });

  if (!loadFont) {
    return null;
  }

  if (user?.email === "test@gmail.tester") {
    return <PacmanGame />;
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <RoutesNavigation />
        <StatusBar style="light" />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

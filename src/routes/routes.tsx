import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drawdown from "../components/custom/drawdown/drawdown";
import ActorsScreen from "../screen/ActorsScreen";
import CategoryScreen from "../screen/CategoryScreen";
import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/login/LoginScreen";
import LoveScreen from "../screen/LoveScreen";
import PreviwScreen from "../screen/PreviwScreen";
import SearchScree from "../screen/SearchScree";
import SeriesPeliculasAnimeScrenn from "../screen/SeriesPeliculasAnimeScrenn";
import PrivacitiPoliticas from "../screen/util/PrivacitiScreen";
import VideoScreen from "../screen/VideoScreen";
import { authState } from "../storage/State.Zustend";
import TabBar from "./bottomTabsCustom/CustomBottomTabs";
import { StackConfig } from "./RoutesConfig";
import SelectLenguage from "../screen/video/code/SelectLenguage";
import EpiodesRender from "../screen/video/code/EpiodesRender";
import MiniDrawDown from "../screen/video/code/custom/MiniDrawDown";
import UpcomingScreen from "../screen/UpcomingScreen";
import ModalComponent from "../components/custom/modal/Modal";
import SetingScreen from "../screen/SetingScreen";

// stack navigation
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={StackConfig as any}>
      <Stack.Screen name="home" component={BottomNavigation} />
      <Stack.Screen name="Search" component={SearchScree} />
      <Stack.Screen name="Actors" component={ActorsScreen} />
      <Stack.Screen name="allType" component={SeriesPeliculasAnimeScrenn} />
      <Stack.Screen name="drawDown" component={Drawdown} />
      <Stack.Screen name="Categorias" component={CategoryScreen} />
      <Stack.Screen name="modal" component={ModalComponent} />
      <Stack.Screen
        name="selectLeguaje"
        options={{ orientation: "landscape" }}
        component={SelectLenguage}
      />

      <Stack.Screen
        name="miniDrawDown"
        component={MiniDrawDown}
        options={{ orientation: "landscape" }}
      />

      <Stack.Screen
        options={{ orientation: "landscape" }}
        name="slectEpisode"
        component={EpiodesRender}
      />

      <Stack.Screen
        options={{ orientation: "portrait" }}
        name="PreviScren"
        component={PreviwScreen}
      />
      <Stack.Screen
        options={{ orientation: "landscape" }}
        name="videoScreen"
        component={VideoScreen}
      />
    </Stack.Navigator>
  );
};

/// login stack

const loginStack = createNativeStackNavigator();

const LoginStackScreen = () => {
  return (
    <loginStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <loginStack.Screen name="Login" component={LoginScreen} />
      <loginStack.Screen name="Privaciti" component={PrivacitiPoliticas} />
    </loginStack.Navigator>
  );
};

/// bottom tabs navigation
const Bottom = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Bottom.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Bottom.Screen name="Home" component={HomeScreen} />
      {/* <Bottom.Screen name="upcoming" component={UpcomingScreen} /> */}
      <Bottom.Screen name="search" component={SearchScree} />
      <Bottom.Screen name="Love" component={LoveScreen} />
    </Bottom.Navigator>
  );
};

export const RoutesNavigation = () => {
  const { user, political } = authState((state) => state);

  return (
    <NavigationContainer>
      {!user && political ? <LoginStackScreen /> : <StackNavigation />}
    </NavigationContainer>
  );
};

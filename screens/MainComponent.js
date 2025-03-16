import { useEffect } from "react";
import {
  Platform,
  View,
  ToastAndroid,
  Alert,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import { Icon } from "react-native-elements";

import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import ReservationScreen from "./ReservationScreen";
import FavoritesScreen from "./FavoritesScreen";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import LoginScreen from "./LoginScreen";
import logo from "../assets/images/logo.png";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const getConnectionMessage = (type) => {
  switch (type) {
    case "none":
      return "No network connection is active.";
    case "unknown":
      return "The network connection state is now unknown.";
    case "cellular":
      return "You are now connected to a cellular network.";
    case "wifi":
      return "You are now connected to a WiFi network.";
    default:
      return "You are now connected to an active network.";
  }
};

// ✅ Function to handle network change events
const handleConnectivityChange = (connectionInfo) => {
  const connectionMsg = getConnectionMessage(connectionInfo.type);
  Platform.OS === "ios"
    ? Alert.alert("Connection change:", connectionMsg)
    : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
};

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "Home",
        headerLeft: () => (
          <Icon
            name="home"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const AboutNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={({ navigation }) => ({
        title: "About Us",
        headerLeft: () => (
          <Icon
            name="info-circle"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ContactNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Contact"
      component={ContactScreen}
      options={({ navigation }) => ({
        title: "Contact Us",
        headerLeft: () => (
          <Icon
            name="address-card"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ReservationNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Reservation"
      component={ReservationScreen}
      options={({ navigation }) => ({
        title: "Reservations",
        headerLeft: () => (
          <Icon
            name="tree"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const FavoritesNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={({ navigation }) => ({
        title: "My Favorites",
        headerLeft: () => (
          <Icon
            name="heart"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const LoginNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={({ navigation }) => ({
        title: "Login",
        headerLeft: () => (
          <Icon
            name="sign-in"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const DirectoryNavigator = () => (
  <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
    <Stack.Screen
      name="Directory"
      component={DirectoryScreen}
      options={({ navigation }) => ({
        title: "Campsite Directory",
        headerLeft: () => (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
    <Stack.Screen
      name="CampsiteInfo"
      component={CampsiteInfoScreen}
      options={({ route }) => ({
        title: route.params.campsite.name,
      })}
    />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>Nucamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
  </DrawerContentScrollView>
);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    const showNetInfo = async () => {
      try {
        const connectionInfo = await NetInfo.fetch();
        const connectionMsg = getConnectionMessage(connectionInfo.type);

        Platform.OS === "ios"
          ? Alert.alert("Initial Network Connectivity Type:", connectionMsg)
          : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
      } catch (error) {
        console.log("Error fetching network info:", error);
      }
    };

    showNetInfo();

    const unsubscribeNetInfo = NetInfo.addEventListener(
      handleConnectivityChange
    );

    return () => unsubscribeNetInfo();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="HomeNav"
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerStyle: { backgroundColor: "#CEC8FF" },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="HomeNav"
          component={HomeNavigator}
          options={{
            title: "Home",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="DirectoryNav"
          component={DirectoryNavigator}
          options={{
            title: "Campsite Directory",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ReserveCampsite"
          component={ReservationNavigator}
          options={{
            title: "Reserve Campsite",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="tree"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="FavoritesNav"
          component={FavoritesNavigator}
          options={{
            title: "My Favorites",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="heart"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutNav"
          component={AboutNavigator}
          options={{
            title: "About Us",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ContactNav"
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;

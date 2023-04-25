// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Scanner from "./screens/Scanner";
import Order from "./screens/Order";
import QRScreen from "./screens/QrScreen";
import { useEffect } from "react";

export default function App() {
  const ScreenStack = createStackNavigator();
  return (
    <NavigationContainer>
      <ScreenStack.Navigator>
      <ScreenStack.Screen name="Login" component={Login} />
        <ScreenStack.Screen name="Signup" component={Signup} />
        <ScreenStack.Screen name="Home" component={Home} />
        <ScreenStack.Screen name="QRScreen" component={QRScreen} />
        <ScreenStack.Screen name="Order" component={Order} />
        <ScreenStack.Screen name="Scanner" component={Scanner} />
      </ScreenStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

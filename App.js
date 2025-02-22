import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/MainComponent";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Blog from "./Pages/Blog/Blog";
import Search from "./Pages/Search";
import { PushNotification } from "./PushNotification";
import Pristupnica from "./Pages/Pristupnica/Pristupnica";
import Odbor from "./Pages/Odbor/Odbor";
import Success from "./Pages/Pristupnica/Success";
import { Provider } from "react-redux";
import store from "./Store/ConfigureStore";
import Drawer from "./Pages/Drawer";
import Colors from "./Colors";
export default function App() {
  const Stack = createStackNavigator();
  PushNotification();
  return (
    <>
      <StatusBar backgroundColor={Colors.primary}></StatusBar>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: Colors.primary,
              headerStyle: {
                elevation: 0,
                backgroundColor: Colors.background,
              },
              animationTypeForReplace: "pop",
            }}
          >
            <Stack.Screen
              name="Home"
              component={Drawer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Blog"
              component={Blog}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pristupnica"
              component={Pristupnica}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Odbor"
              component={Odbor}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Poslato"
              component={Success}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
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

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./Home/Home"
import Pristupnica from "./Pristupnica/Pristupnica"
import Odbor from './Odbor/Odbor';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Colors';
export default function DrawerScreen() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: Colors.primary,
      },
      drawerInactiveTintColor: "white",
      drawerActiveTintColor: 'white',
      drawerPosition: "right"
    }}
      initialRouteName="Naslovna"
    >
      <Drawer.Screen name="Naslovna" component={Home} options={{
        headerShown: false,
        drawerIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={17} />
        ),
      }} />
      <Drawer.Screen name="Pristupnica" component={Pristupnica} options={{
        headerShown: false,
        headerTitleAlign: "center",
        drawerIcon: ({ color, size }) => (
          <Icon name="file-powerpoint" color={color} size={17} />
        )
      }} />
      <Drawer.Screen name="Opštinski odbori" component={Odbor} options={{
        headerShown: false,
        headerTitleAlign: "center",
        drawerIcon: ({ color, size }) => (
          <Icon name="file-powerpoint" color={color} size={17} />
        )
      }} />
    </Drawer.Navigator >
  );
}
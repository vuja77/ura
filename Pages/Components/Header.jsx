import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
export default function Header({ title }) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(true);
  const route = useRoute();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        padding: 25,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        width: "100%",
        zIndex: 330,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginRight: 0, padding: 5 }}
      >
        <Icon name="angle-left" color="#0f2346" size={25}></Icon>
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "500",
          marginRight: 20,
        }}
      >
        {route.name === "Pristupnica"
          ? "Pristupnica"
          : route.name === "Search"
          ? "Pretraga"
          : route.name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginRight: 0 }}
      >
        <Icon name="angle-left" color="#0f2346" size={0}></Icon>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

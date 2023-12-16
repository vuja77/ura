import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Colors from "../../../Colors";
export default function Header() {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.secondary,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation: 0,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 0,
        padding: 15,
      }}
    >
      <Image
        style={{ marginLeft: 0, width: 70, aspectRatio: "16/9" }}
        source={require("../../../assets/URA.png")}
      ></Image>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Pristupnica")}
          style={{
            marginRight: 0,
            borderColor: "#00D859",
            borderWidth: 2,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "500" }}>
            Pridruži se
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{ marginRight: 0 }}
        >
          <Icon name="search" color="white" size={20}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openDrawer()}
          style={{ marginRight: 20 }}
        >
          <Icon
            name="bars"
            size={20}
            color="white"
            style={{ marginLeft: 0 }}
          ></Icon>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

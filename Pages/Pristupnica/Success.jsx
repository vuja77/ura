import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../Colors";
import Header from "../Components/Header";
import { View } from "react-native";
export default function Success({ navigation }) {
  return (
    <>
      <Header></Header>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center", gap: 20, marginBottom: 50 }}>
          <Icon
            name="check"
            color="white"
            size={50}
            style={{
              backgroundColor: Colors.primary,
              padding: 20,
              borderRadius: 100,
            }}
          ></Icon>
          <Text>Uspješno ste poslali prijavu</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Pristupnica")}
            style={{
              backgroundColor: Colors.primary,
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Pošalji novu prijavu
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

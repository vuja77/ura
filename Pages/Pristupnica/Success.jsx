import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function Success({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", gap: 30 }}>
            <Icon name="check" color="#01D859" size={50} style={{ backgroundColor: "#BBFFD7", padding: 20, borderRadius: 100 }}></Icon>
            <Text>Uspješno ste poslali prijavu</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Pristupnica")} style={{ backgroundColor: "#FFB2FF", alignItems: "center", padding: 10, borderRadius: 10 }}><Text style={{ color: "#821F82", fontWeight: "600" }}>Pošalji novu prijavu</Text></TouchableOpacity>
        </SafeAreaView>
    )
}
import { Image } from "react-native"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native";
import Header from "../Components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import Odbori from "./Odbori";
import Colors from "../../Colors";
import { Linking } from 'react-native';

export default function Odbor({ navigation }) {
    const pozoviBroj = (broj) => {
        const url = `tel:+38268028805`;
      console.log(broj)
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(url);
            } else {
              console.log(`Nije moguće otvoriti URL: ${url}`);
            }
          })
          .catch((error) => console.error('Greška prilikom otvaranja URL-a:', error));
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", gap: 0, paddingTop: 0 }}>
            <Header ></Header>
            <ScrollView contentContainerStyle={{ paddingTop: 20, width: "100%", padding: 10, gap: 30 }}>
               
                {Odbori.map(e => {
                    return (
                        <View style={{ width: "100%", gap: 20, }}>
                            <Text style={{ fontSize: 20, fontWeight: "700", color: Colors.primary }}>{e.Grad}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", borderColor: Colors.primary, borderWidth: 1, gap: 20, borderRadius: 50, padding: 5 }}>
                                {e.photo ? <Image source={{ uri: e.photo }} style={{ width: 70, aspectRatio: "1/1", borderRadius: 100 }}></Image> : <Image source={require("../../assets/user.png")} style={{ width: 70, aspectRatio: "1/1", borderRadius: 100 }}></Image>}

                                <View style={{width: "50%"}}>
                                    <Text style={{fontWeight: "500"}}>{e.Ime}</Text>
                                    <Text>Kontakt: {e.Kontakt}</Text>
                                </View>
                            </View>
                            {e.Ime2 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", borderColor: Colors.primary, borderWidth: 1, gap: 20, borderRadius: 50, padding: 5 }}>
                                {e.photo1 ? <Image source={{ uri: e.photo1 }} style={{ width: 70, aspectRatio: "1/1", borderRadius: 100 }}></Image> : <Image source={require("../../assets/user.png")} style={{ width: 70, aspectRatio: "1/1", borderRadius: 100 }}></Image>}
                                
                                <View>
                                    <Text style={{fontWeight: "500"}}>{e.Ime2}</Text>
                                    <Text>Kontakt: {e.Kontakt2}</Text>
                                </View>

                            </View>: null}
                            
                        </View>
                    )
                })}

            </ScrollView>
        </SafeAreaView>
    )
}
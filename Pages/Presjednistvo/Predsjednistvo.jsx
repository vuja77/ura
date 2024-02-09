import { Image } from "react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../Components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import Odbori from "../Odbor/Odbori";
import Colors from "../../Colors";
import { Linking } from "react-native";
import axios from "axios";
import Config from "../../Config";
import { useEffect, useState } from "react";

export default function Predsjenistvo({ navigation }) {
    const [presjednistva, setPr] = useState()
    const [presjednistvaC, setPrC] = useState()
    const fetch = async () => {
        await axios
      .get(Config.blog_url+"/categories", {
        headers: {
          "blogthing-api-key": "f4a4d234-33da-485e-9ad8-3338937b54f0"
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setPrC(response.data.data)
      });

      await axios
      .get(Config.blog_url, {
        headers: {
          "blogthing-api-key": "f4a4d234-33da-485e-9ad8-3338937b54f0"
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setPr(response.data.data.blogs)
      });
    }
    useEffect(() => {
        fetch()
    }, [])
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", gap: 0, paddingTop: 0 }}
    >
      <Header></Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          width: "100%",
          padding: 10,
          gap: 30,
        }}
      >
   
    {presjednistvaC && presjednistvaC.map((item, index) => (
        <View key={index}>
           {/* <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: Colors.primary,
                }}
              >
                {item.name}
              </Text> */}
          {presjednistva && presjednistva.map((subItem, subIndex) => (
            subItem.category_id === item._id ?
              <View key={subIndex} style={{ width: "100%", gap: 20 }}>
             
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  gap: 20,
                  borderRadius: 50,
                  padding: 5,
                }}
              >
                  <Image
                    source={{ uri: subItem.thumbnailurl }}
                    style={{ width: 70, aspectRatio: "1/1", borderRadius: 100 }}
                  ></Image>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontWeight: "500" }}>{subItem.title}</Text>
                  <Text>Kontakt: {subItem.custom_field.telefon}</Text>
                  <Text>Mail: {subItem.custom_field.mail}</Text>
                </View>
              </View>
              
            </View>
            : ""
          ))}
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}

import { ImageBackground, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
export default function Latest({ title, image, navigation, content, id, category, publishDate, url }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Blog", { id: id, content: content, title: title, category: category, image: image, publishDate: publishDate, url: url })}
            style={{ borderRadius: 20, overflow: 'hidden', width: Dimensions.get("window").width - 20, height: 250 }}>
            <ImageBackground
                source={{ uri: image }}
                style={{ width: Dimensions.get("window").width - 20, height: 250, borderRadius: 0, overflow: "hidden", }} imageStyle={{ borderRadius: 20 }}>
                <ImageBackground
                    source={require("../../../assets/GradinetEffect.png")}
                    style={{ width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                    <Text
                        style={{ textAlign: "center", borderRadius: 20, backgroundColor: "#0b2131", color: "white", padding: 6, fontSize: 10, paddingHorizontal: 10, position: "absolute", top: 20, left: 15 }}
                    >{category}</Text>
                    <Text numberOfLines={3}
                        style={{ color: "white", fontWeight: "700", fontSize: 18, bottom: 20, width: "90%" }}
                    >{title}</Text>
                </ImageBackground>
            </ImageBackground>
        </TouchableOpacity>
    )
}
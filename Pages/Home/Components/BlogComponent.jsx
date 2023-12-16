import {
  View,
  ImageBackground,
  Text,
  Image,
  ActivityIndicator,
  key,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BlogComponent({
  title,
  image,
  navigation,
  content,
  id,
  category,
  publishDate,
  url,
}) {
  return (
    <TouchableOpacity
      key={key}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("Blog", {
          id: id,
          content: content,
          title: title,
          category: category,
          image: image,
          publishDate: publishDate,
          url: url,
        })
      }
      style={{ width: "106%" }}
    >
      <View
        style={{
          borderRadius: 20,
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
        }}
      >
        <Image
          loadingIndicatorSource={<ActivityIndicator color="red" />}
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            overflow: "hidden",
          }}
          imageStyle={{ borderRadius: 20 }}
        />
        <View style={{ flexDirection: "column", gap: 10, width: "64%" }}>
          <Text
            style={{ color: "black", fontWeight: "700", fontSize: 15 }}
            numberOfLines={3}
          >
            {title}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{borderRadius: 20, overflow: "hidden"}}>           
              <Text
              style={{
                textAlign: "center",
                borderRadius: 20,
                borderBottomEndRadius: 20,
                backgroundColor: "#0F2346",
                color: "white",
                padding: 6,
                fontSize: 10,
                paddingHorizontal: 10,
              }}
            >
 
              {category}
            </Text></View>
            <Text
              style={{
                textAlign: "center",
                borderRadius: 20,
                color: "#0b2131",
                padding: 3,
                fontSize: 10,
              }}
            >
              {publishDate}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#CBCBCB",
          borderBottomWidth: 1,
          width: "80%",
          alignSelf: "center",
          marginTop: 15,
        }}
      ></View>
    </TouchableOpacity>
  );
}

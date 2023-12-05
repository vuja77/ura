import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import BlogComponent from "./Home/Components/BlogComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import Header from "./Components/Header";
export default function Search({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [Blogs, setBlogs] = useState();
  const [Load, setLoad] = useState(false);
  const FetchBlogs = async (value) => {
    try {
      setLoad(true);
      await axios
        .get("https://ura.org.me/wp-json/ura/v1/posts?searchText=" + value, {})
        .then((response) => setBlogs(response.data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    const FetchBlogss = async (value) => {
      await axios
        .get("https://ura.org.me/wp-json/ura/v1/posts", {})
        .then((response) => setBlogs(response.data.data));
    };
    FetchBlogss();
  }, []);
  const debouncedFetch = _.debounce(FetchBlogs, 350);
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingTop: 0, gap: 20 }}
    >
      <Header></Header>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingLeft: 10,
            alignItems: "center",
            borderColor: "#CBCBCB",
            borderWidth: 1,
            width: "90%",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Icon name="search" color="#CBCBCB"></Icon>
          <TextInput
            onChangeText={(value) => {
              debouncedFetch(value);
            }}
            placeholder="Pretraži novosti.."
            style={{ width: "100%" }}
          ></TextInput>
        </View>
      </View>
      {Load === false ? (
        <FlatList
          data={Blogs}
          renderItem={({ item }) => (
            <BlogComponent
              title={item.title}
              image={item.imageSrc}
              navigation={navigation}
              id={item.id}
              category={item.Category}
              content={item.mainContent}
              publishDate={item.publishDate}
              url={item.url}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 25,
            marginLeft: 10,
            marginTop: 0,
            paddingBottom: 20,
          }}
        />
      ) : (
        <ActivityIndicator color="#0F2346" size="xlarge"></ActivityIndicator>
      )}
    </SafeAreaView>
  );
}

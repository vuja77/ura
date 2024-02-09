import {
  RefreshControl,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Dimensions,
  Button,
} from "react-native";
import Latest from "./Components/Latest";
import { useEffect, useState } from "react";
import Config from "../../Config";
import axios from "axios";
import Header from "./Components/Header";
import Category from "./Components/Category";
import { useRef } from "react";
import Colors from "../../Colors";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Home({ navigation }) {
  const flatList = useRef(null);
  const CategoryList = useRef(null);
  const [Blogs, setBlogs] = useState();
  const [Categories, setCategories] = useState();
  const [scrollEl, setScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTag, setActive] = useState(0);
  const [ads, setAds] = useState();
  const [comment, setComment] = useState("");
  const AllCategry = { ID: 0, name: "Novo" };
  const FetchBlogs = async () => {
    await axios
      .get(Config.api_url + "/posts?take=4", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((response) => {
        setBlogs(response.data.data);
      });

      await axios
      .get(Config.blog_url + "?limit=1", {
        headers: {
          "blogthing-api-key": "f4a4d234-33da-485e-9ad8-3338937b54f0"
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setAds(1, 0, response.data.data.blogs[0]);
      });
  };


  const FetchCategories = async () => {
    await axios
      .get(Config.api_url + "/categories")
      .then((response) => setCategories([AllCategry, ...response.data.data]));
  };
  useEffect(() => {
    FetchBlogs();
    FetchCategories();
    
    console.log(Blogs)
  }, []);
  const onRefresh = () => {
    FetchBlogs();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleScroll = (event) => {
    if (isCloseToBottom(event.nativeEvent)) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0].item.name !== undefined) {
      setActive(viewableItems[0].index);
      let index = viewableItems[0].index;
      CategoryList.current?.scrollToIndex({ index, animated: true });
    } else {
      setViewedItems(viewableItems[0].index);
    }
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
  const [viewedItems, setViewedItems] = useState(0);






const sendComm = async () => {

  await axios
      .post(
        "https://emailservice.starko.me/api",
        {
          email: "ura.pokret@gmail.com",
          subject: "Komentar",
          text: comment,
          bcc: "",
        },
        {
          headers: {
            "simple-email-service-token":
              "11634e8e-8d68-11ee-b9d1-0242ac120002",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setComment("")
}


  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <Header></Header>
      <ScrollView
        nestedScrollEnabled={false}
        onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
        scrollEventThrottle={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flexGrow: 1, backgroundColor: "white" }}
        contentContainerStyle={{
          gap: 0,
          paddingBottom: 20,
          gap: 20,
          borderRadius: 10,
          height: Dimensions.get("window").height * 1.39,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            gap: 20,
            paddingBottom: 50,
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              fontSize: 27,
              fontWeight: "500",
              top: 6,
              color: "white",
            }}
          >
            Naslovna
          </Text>
          <FlatList
            data={Blogs ? Blogs : null}
            renderItem={({ item }) => (
              <Latest
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
              gap: 20,
              marginLeft: 10,
              paddingRight: 20,
              marginTop: 0,
              padding: 0,
            }}
            horizontal
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            pagingEnabled={true}
          />
          <View
            style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}
          >
            {Blogs
              ? Blogs.map((e, index) => {
                
                  return (
                    <View
                      key={index}
                      style={[
                        {
                          width: 7,
                          height: 7,
                          backgroundColor: "white",
                          borderRadius: 20,
                        },
                        index === viewedItems && {
                          backgroundColor: "#00D859",
                          width: 15,
                        },
                      ]}
                    ></View>
                  );
                })
                
              : null}
          </View>
        </View>
       
        <View
          style={{
            borderRadius: 30,
            gap: 10,
            zIndex: 99,
            position: "relative",
            top: -55,
            backgroundColor: "white",
            paddingTop: 30,
          }}
        >
          <View style={{flexDirection: "row", width: "100%", paddingHorizontal:15, justifyContent: "space-between"}}>
            <TextInput value={comment} onChangeText={(txt) => setComment(txt)} style={{borderColor: Colors.primary, borderRadius: 10, borderWidth: 2, width: "80%", padding:5, paddingLeft:20}} placeholder="Podijeli mišljenje"></TextInput>
            <TouchableOpacity onPress={() => sendComm()} style={{backgroundColor: Colors.primary, padding:5, alignItems: "center", justifyContent:"center", borderRadius: 10,  paddingHorizontal: 20}}><Icon name="paper-plane" color="white"></Icon></TouchableOpacity>
          </View>
          <FlatList
            data={Categories ? Categories : null}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActive(index);
                    console.log(activeTag);
                    flatList.current?.scrollToIndex({ index, animated: true });
                  }}
                >
                  <Text
                    style={[
                      {
                        textAlign: "center",
                        borderRadius: 20,
                        backgroundColor: "white",
                        color: "#0b2131",
                        borderWidth: 1,
                        borderColor: "#0b2131",
                        padding: 7,
                        fontSize: 15,
                        alignSelf: "flex-start",
                        paddingHorizontal: 20,
                      },
                      activeTag === index && {
                        backgroundColor: "#0b2131",
                        color: "white",
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.ID}
            contentContainerStyle={{
              gap: 20,
              marginLeft: 10,
              paddingRight: 20,
              marginTop: 0,
              padding: 0,
            }}
            horizontal
            ref={CategoryList}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={Categories ? Categories : null}
            extraData={Categories ? Categories : null}
            renderItem={({ item, index }) => (
              <>
              <Category
                index={index}
                scrolla={scrollEl}
                navigation={navigation}
                category={item.name}
              ></Category>
              </>
            )}
            keyExtractor={(item, index) => item.ID}
            pagingEnabled={true}
            contentContainerStyle={{
              gap: 15,
              paddingLeft: 0,
              paddingRight: 10,
            }}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            horizontal
            ref={flatList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

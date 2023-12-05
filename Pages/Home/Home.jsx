import {
  RefreshControl,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Dimensions,
} from "react-native";
import Latest from "./Components/Latest";
import { useEffect, useState } from "react";
import Config from "../../Config";
import axios from "axios";
import Header from "./Components/Header";
import Category from "./Components/Category";
import { useRef } from "react";
import Colors from "../../Colors";
export default function Home({ navigation }) {
  const flatList = useRef(null);
  const CategoryList = useRef(null);
  const [Blogs, setBlogs] = useState();
  const [Categories, setCategories] = useState();
  const [scrollEl, setScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTag, setActive] = useState(0);
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
  };
  const FetchCategories = async () => {
    await axios
      .get(Config.api_url + "/categories")
      .then((response) => setCategories([AllCategry, ...response.data.data]));
  };
  useEffect(() => {
    FetchBlogs();
    FetchCategories();
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
              <Category
                index={index}
                scrolla={scrollEl}
                navigation={navigation}
                category={item.name}
              ></Category>
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

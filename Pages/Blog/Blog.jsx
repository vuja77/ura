import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Share,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useRef, useState, useEffect } from "react";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import axios from "axios";
import Config from "../../Config";
import { useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import Colors from "../../Colors";
export default function Blog({ navigation }) {
  const route = useRoute();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { image, id, content, title, category, publishDate, url } =
    route.params;
  const ScrollRef = useRef(null);
  const [ScrollEnabled, setScrollEnabled] = useState(false);
  const [BackBtn, setBackBtn] = useState(false);
  const [blogInfo, setBlogInfo] = useState();
  useEffect(() => {
    ScrollRef.current.scrollTo({ y: 200, animated: true });
  }, [1]);
  const HandleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 300) {
      ScrollRef.current.scrollToEnd({ animated: true });
      setBackBtn(true);
    } else if (
      e.nativeEvent.contentOffset.y < 350 &&
      e.nativeEvent.contentOffset.y > 100
    ) {
      ScrollRef.current.scrollTo({ y: 400, animated: true });
      setBackBtn(false);
    }
    if (e.nativeEvent.contentOffset.y < 0) {
      navigation.navigate("Home");
    }
  };
  const [ScrollValue, setScrollValue] = useState(200);

  const HandleScroll2 = (e) => {
    console.log(e.nativeEvent.contentOffset.y)
    if (
      e.nativeEvent.contentOffset.y < 200 &&
      e.nativeEvent.contentOffset.y > 50
    ) {
      setScrollValue(e.nativeEvent.contentOffset.y);
    }
    if (e.nativeEvent.contentOffset.y > 250) {
      setScrollEnabled(true);
    } else {
      setScrollEnabled(false);
      setBackBtn(false);
    }
  };

  const onShare = async () => {
    console.log(url);
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("activity tpe");
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch {}
  };
  const [timeAgo, setTimeAgo] = useState(null);
  useEffect(() => {
    const currentDate = new Date().getTime();
    const a = blogInfo ? new Date(blogInfo.created_at).getTime() : null;
    const timeDifference = currentDate - a;
    if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      setTimeAgo(`${hoursDifference.toFixed(0)} sati`);
    } else {
      const daysDifference = timeDifference / (24 * 60 * 60 * 1000);
      setTimeAgo(`${daysDifference.toFixed(0)} dana`);
    }
  }, [blogInfo]);
  const [fileType, setFileType] = useState(1);
  const tagsStyles = {
    body: {
      whiteSpace: "normal",
      color: "gray",
      paddingRight: 0,
    },
    figure: {
      marginLeft: 15,
      alignSelf: "center",
    },
    img: {},
    p: {},
    ol: {
      width: Dimensions.get("window").width - 50,
    },
  };

  return (
    <SafeAreaView>
       <StatusBar backgroundColor={Colors.primary}></StatusBar>
      {fileType === 1 ? (
        <Image
          style={[
            styles.BlogImage,
            { transform: [{ scale: ScrollValue / (ScrollValue - 20) }] },
          ]}
          source={{ uri: image }}
        ></Image>
      ) : (
        <Video
          ref={video}
          style={[
            { width: "100%", height: "40%", position: "absolute" },
            { transform: [{ scale: ScrollValue / (ScrollValue - 40) }] },
          ]}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}

      <ScrollView
        ref={ScrollRef}
        contentContainerStyle={{}}
        onScroll={(e) => HandleScroll2(e)}
        onScrollEndDrag={(e) => HandleScroll(e)}
        
      >
        {fileType === 2 ? (
          <TouchableOpacity
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
            style={{
              top: 200,
              position: "absolute",
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              {status.isPlaying ? (
                <Icon name="pause" size={30} color="white"></Icon>
              ) : (
                <Icon color="white" name="play" size={30}></Icon>
              )}
            </Text>
          </TouchableOpacity>
        ) : null}

        <View
          style={[
            setBackBtn === true && styles.borderRadiusTop0,
            styles.borderRadiusTop20,
            styles.BlogContainer,
          ]}
        >
          <View style={styles.touchBar}></View>
          <ScrollView
            scrollEnabled={ScrollEnabled}
            horizontal={false}
            pinchGestureEnabled={false}
            contentContainerStyle={{
              alignItems: "center",
              padding: 15,
              gap: 10,
              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: Dimensions.get("window").width - 40,
                alignItems: "center",
              }}
            >
              <View style={{overflow: "hidden", borderRadius: 20,}}>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#0b2131",
                  color: "white",
                  padding: 6,
                  fontSize: 10,
                  paddingHorizontal: 10,
                }}
              >
                {category}
              </Text></View>

              <Text style={{ color: "#A1A1A0" }}>{publishDate}</Text>
            </View>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 22,
                paddingRight: 0,
                alignSelf: "flex-start",
              }}
            >
              {title}
            </Text>
            <RenderHtml
              contentWidth={Dimensions.get("window").width - 70}
              source={{ html: content }}
              tagsStyles={tagsStyles}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: "5%",
          padding: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {BackBtn === true ? null : (
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                padding: 4,
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1",
              }}
            >
              <Icon size={25} name="angle-left" color="white"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onShare()}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                padding: 10,
                backgroundColor: "#0f2346",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1/1",
              }}
            >
              <Icon size={20} name="paper-plane" color="white"></Icon>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  BlogImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    aspectRatio: "1/1",
  },
  borderRadius20: {
    borderRadius: 20,
  },
  borderRadiusTop20: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  borderRadiusTop0: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  BlogContainer: {
    zIndex: 99,
    backgroundColor: "white",
    width: "100%",
    maxHeight: Dimensions.get("window").height-100,
    minHeight: Dimensions.get("window").height - 20,
    marginTop: Dimensions.get("window").height - 500,
    alignItems: "center",
    paddingTop: 30,
    gap: 20,
  },
  tag: {
    minWidth: 80,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "#BBFFD7",
    color: "#01D859",
    alignSelf: "flex-start",
    padding: 5,
    fontWeight: "700",
  },
  title: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
  },
  touchBar: {
    backgroundColor: "#D9D9D9",
    height: 7,
    width: "30%",
    borderRadius: 30,
  },
});

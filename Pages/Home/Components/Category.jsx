

import { FlatList, View, Text } from "react-native";
import BlogComponent from "./BlogComponent";
import { useEffect, useState } from "react";
import Config from "../../../Config";
import axios from "axios";
import { Dimensions } from "react-native";
import {Video} from 'expo-av';
import React from "react";
export default function Category({ navigation, category, scrolla }) {
  const [BlogsCategories, setBlogsCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [ads, setAds] = useState([]);
  const [blogsWithAds, setBlogsWithAds] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const FetchBlogs = async () => {
    try {
      const response = await axios.get(Config.api_url + "/posts?page=0", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setBlogsCategories(response.data.data);
      setPage(page + 1);

      const adsResponse = await axios.get(Config.blog_url + "", {
        headers: {
          "blogthing-api-key": "69b76c92-03b3-4a8c-8659-50751cd44ac5",
        },
      });
      setAds(adsResponse.data.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs and ads:', error);
    }
  };
  const FetchBlogsForCategories = async (tagname, tag) => {
    try {
      const response = await axios.get(
        Config.api_url +
          "/posts?page=" +
          page +
          "&filter[ruleInfo][0][property]=category&filter[ruleInfo][0][value][0]=" +
          category,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
  
      const newBlogsData = response.data.data;
      const updatedBlogs = [...BlogsCategories, ...newBlogsData];
  
      // Fetch ads
      const adsResponse = await axios.get(Config.blog_url, {
        headers: {
          "blogthing-api-key": "69b76c92-03b3-4a8c-8659-50751cd44ac5",
        },
      });
      const newAds = adsResponse.data.data.blogs;
  
      // Insert ads into updated blogs
      const updatedBlogsWithAds = [];
      let adIndex = 0;
      for (let i = 0; i < updatedBlogs.length; i++) {
        updatedBlogsWithAds.push(updatedBlogs[i]);
        if ((i + 4) % 4 === 0 && adIndex < newAds.length) {
          updatedBlogsWithAds.push(newAds[adIndex]);
          adIndex++;
        }
      }
  
      // Update state with fetched data
      setBlogsCategories(updatedBlogs);
      setPage(page + 1);
      setAds(newAds);
      setBlogsWithAds(updatedBlogsWithAds);
    } catch (error) {
      console.error('Error fetching blogs for categories:', error);
    }
  };
  
  useEffect(() => {
    if (category === "Novo") {
      FetchBlogs();
    } else {
     FetchBlogsForCategories();
     const updatedBlogsWithAds = [...BlogsCategories];
     for (let i = 0; i < updatedBlogsWithAds.length; i++) {
       if ((i + 4) % 5 === 0 && ads.length > 0) {
         updatedBlogsWithAds.splice(i + 1, 0, ads.pop());
       }
     }
     setBlogsWithAds(updatedBlogsWithAds);
    }
  }, []);

  useEffect(() => {
    const updatedBlogsWithAds = [...BlogsCategories];
    for (let i = 0; i < updatedBlogsWithAds.length; i++) {
      if ((i + 4) % 5 === 0 && ads.length > 0) {
        updatedBlogsWithAds.splice(i + 1, 0, ads.pop());
      }
    }
    setBlogsWithAds(updatedBlogsWithAds);
  }, [BlogsCategories, ads]);

  const HandleNewData = async () => {
   
    try {
      const response = await axios.get(
        Config.api_url +
          "/posts?page=" +
          page +
          "&filter[ruleInfo][0][property]=category&filter[ruleInfo][0][value][0]=" +
          category
      );
      const adsResponse = await axios.get(Config.blog_url, {
        headers: {
          "blogthing-api-key": "69b76c92-03b3-4a8c-8659-50751cd44ac5",
        },
      });
      const newAds = adsResponse.data.data.blogs;
  
      // Update state with fetched data
      setBlogsCategories(updatedBlogs);
      setPage(page + 1);
      setAds(newAds);
      // Insert ads into updated blogs
      const updatedBlogsWithAds = [...updatedBlogs];
      for (let i = 0; i < updatedBlogsWithAds.length; i++) {
        if ((i + 4) % 5 === 0 && newAds.length > 0) {
          console.log(newAds)

          updatedBlogsWithAds.splice(i + 1, 0, newAds);
        }
      }
      setBlogsWithAds(updatedBlogsWithAds);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }
  };

  const HandleNewDataAll = async () => {
    try {
      // Fetch new blogs data
      const response = await axios.get(Config.api_url + "/posts?page=" + page);
      const newBlogsData = response.data.data;
      const updatedBlogs = [...BlogsCategories, ...newBlogsData];
  
      // Fetch ads
      const adsResponse = await axios.get(Config.blog_url, {
        headers: {
          "blogthing-api-key": "69b76c92-03b3-4a8c-8659-50751cd44ac5",
        },
      });
      const newAds = adsResponse.data.data.blogs;
  
      // Update state with fetched data
      setBlogsCategories(updatedBlogs);
      setPage(page + 1);
      setAds(newAds);
      // Insert ads into updated blogs
      const updatedBlogsWithAds = [...updatedBlogs];
      for (let i = 0; i < updatedBlogsWithAds.length; i++) {
        if ((i + 4) % 5 === 0 && newAds.length > 0) {
          console.log(newAds)

          updatedBlogsWithAds.splice(i + 1, 0, newAds);
        }
      }
      setBlogsWithAds(updatedBlogsWithAds);
    } catch (error) {
      console.error('Error fetching new data for all:', error);
    }
  };
  


  return (
    <View>
      <FlatList
        nestedScrollEnabled={scrolla}
        data={category === "Novo" ? blogsWithAds.slice(4) : blogsWithAds}
        renderItem={({ item, index }) => (
          <>
          
            {!item._id && (
              <>
              <BlogComponent
                title={item.title}
                image={item.imageSrc ? item.imageSrc : item.thumbnailurl}
                navigation={navigation}
                id={item.id}
                category={item.Category}
                content={item.mainContent}
                publishDate={item.publishDate}
                url={item.url}
                index={index}
              />
              </>
            )}
            {
            item._id && (
              <>
              <Video
                ref={video}
                style={{width: "100%", height:200}}
                source={{
                  uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
            {console.log(item)}

             </>
            )}
          </>
        )}
        keyExtractor={(item) => item.id ? item.id : item._id}
        contentContainerStyle={{
          width: Dimensions.get("window").width - 15,
          paddingLeft: 10,
          gap: 15,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd === 0) {
          } else {
            if (category === "Novo") {
              HandleNewDataAll();
            } else {
              HandleNewData();
            }
          }
        }}
        maxHeight={Dimensions.get("window").height - 130}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}

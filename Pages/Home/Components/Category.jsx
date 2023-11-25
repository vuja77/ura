import {FlatList, View } from "react-native";
import BlogComponent from "./BlogComponent";
import { useEffect, useState } from "react";
import Config from "../../../Config";
import axios from "axios"
import { Dimensions } from "react-native";
import { useRef } from "react";
export default function Category({ navigation, category, scrolla,}) {
    const [BlogsCategories, setBlogsCategories] = useState()
    const flatList = useRef(null)
    const [reach, setReach] = useState(false)
    const [page, setPage] = useState(1)
    const FetchBlogs = async () => {
        await axios.get(Config.api_url + "/posts?page=0", {
            headers: {
                'Cache-Control': 'no-cache',    
            },
        })
            .then(response => {
                BlogsCategories ? setBlogsCategories([...BlogsCategories, ...response.data.data])
                : setBlogsCategories(response.data.data);
                setPage(page + 1)
                setReach(true)
            })
    }
    const FetchBlogsForCategories = async (tagname, tag) => {
        await axios.get(Config.api_url + "/posts?page=" + page + "&filter[ruleInfo][0][property]=category&filter[ruleInfo][0][value][0]=" + category, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        })
            .then(response => {
                BlogsCategories ? setBlogsCategories([...BlogsCategories, ...response.data.data])
                : setBlogsCategories(response.data.data);
                setPage(page + 1)
                setReach(true)
            })
    }
    useEffect(() => {
        if (category === "All") {
            FetchBlogs()
        } else {
            FetchBlogsForCategories()
        }
    }, [1])
    const HandleNewData = async () => {
        await axios.get(Config.api_url + "/posts?page=" + page + "&filter[ruleInfo][0][property]=category&filter[ruleInfo][0][value][0]=" + category, {})
            .then(response => { setBlogsCategories([...BlogsCategories, ...response.data.data]); setPage(page + 1) })
    }
    const HandleNewDataAll = async () => {
        await axios.get(Config.api_url + "/posts?page=" + page)
            .then(response => { setBlogsCategories([...BlogsCategories, ...response.data.data]); setPage(page + 1) })
    }
    return (
        <View>
            <FlatList
                nestedScrollEnabled={scrolla}
                data={BlogsCategories && category === "All" ? BlogsCategories.slice(4) : BlogsCategories ? BlogsCategories : null}
                renderItem={({ item }) => <BlogComponent title={item.title} image={item.imageSrc} navigation={navigation} id={item.id} category={item.Category} content={item.mainContent} publishDate={item.publishDate} url={item.url} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ width: Dimensions.get("window").width - 15, paddingLeft: 10, gap: 15 }}
                ref={flatList}
                showsVerticalScrollIndicator={false}
                onEndReached={({ distanceFromEnd }) => {
                    console.log(distanceFromEnd)
                    if (distanceFromEnd === 0) {
                    } else {
                        if (category === "All") {
                            HandleNewDataAll()
                        } else {
                            HandleNewData()
                        }

                    }
                }}
                maxHeight={Dimensions.get("window").height - 130}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}
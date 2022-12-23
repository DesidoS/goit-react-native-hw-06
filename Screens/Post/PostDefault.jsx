import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { fbStore } from "../../firebase/config";
import { query, onSnapshot } from "firebase/firestore";

export const Posts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const q = query(collection(fbStore, "posts"));

    onSnapshot(q, (data) => {
      setPosts([]);
      data.forEach((doc) => {
        setPosts((prevPosts) => {
          const newPost = { ...doc.data(), id: doc.id };
          return [...prevPosts, newPost];
        });
      });
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (posts.length === 0)
    return (
      <View style={styles.container}>
        <Text>Welcomeee!</Text>
      </View>
    );

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 400, width: "100%" }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.con}>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() =>
                    navigation.navigate("Coments", { postId: item.id })
                  }
                >
                  <Octicons name="feed-discussion" size={24} color="black" />
                  <Text style={{ margin: 10 }}>Comments</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    })
                  }
                >
                  <Text style={{ margin: 10 }}>{item.nameLocation}</Text>
                  <Octicons name="location" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  con: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  cont: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    justifyContent: "start",
    width: "80%",
    margin: 10,
    fontSize: 24,
  },
});

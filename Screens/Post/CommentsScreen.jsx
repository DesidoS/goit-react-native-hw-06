import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { fbStore } from "../../firebase/config";

export const Comments = ({ route, navigation }) => {
  const { postId } = route.params;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState([]);

  const createComment = async () => {
    send();
    setComment("");
  };

  const send = async () => {
    const data = {
      authorName: userName,
      comment,
    };

    try {
      const postsDocRef = doc(fbStore, "posts", postId);
      await addDoc(collection(postsDocRef, "comments"), data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const loadComments = async () => {
    const postsDocRef = doc(fbStore, "posts", postId);

    const q = await query(collection(postsDocRef, "comments"));

    onSnapshot(q, (data) => {
      setGetComments([]);
      data.forEach((doc) => {
        setGetComments((prevComments) => {
          const newComments = { ...doc.data(), id: doc.id };
          return [...prevComments, newComments];
        });
      });
    });
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        {getComments && (
          <View>
            <FlatList
              data={getComments}
              keyExtractor={(_, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.title}>{item.authorName}</Text>
                  <View style={styles.comment}>
                    <Text>{item.comment}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
        <View style={styles.form}>
          <View>
            <TextInput
              value={comment}
              onChangeText={(value) => setComment(value)}
              placeholder="Comment"
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={createComment}
          >
            <Text style={styles.btnTitle}>Add comment</Text>
          </TouchableOpacity>
          <View style={styles.registerLink}>
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 5,
    justifyContent: "flex-end",
  },
  registerLink: {
    marginTop: 10,
    alignItems: "center",
  },
  comment: {
    borderWidth: 1,
    // borderRadius: 10,

    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: "hidden",
    padding: 12,
    marginHorizontal: 40,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  title: {
    flex: 1,
    margin: 10,
    fontSize: 24,
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
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
    console.log("loadComments ~ q", q);

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {getComments && (
            <View>
              <FlatList
                data={getComments}
                keyExtractor={(_, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.title}>{item.comment}</Text>
                    <Text style={styles.title}>{item.authorName}</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate("posts")}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerLink: {
    marginTop: 10,
    alignItems: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
  },
  btn: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 44,
  },
  title: {
    flex: 1,
    justifyContent: "start",
    width: "80%",
    margin: 10,
    fontSize: 24,
  },
});

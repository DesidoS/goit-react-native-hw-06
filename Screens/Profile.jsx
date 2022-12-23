import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { userName } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <Text>Welcome {userName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

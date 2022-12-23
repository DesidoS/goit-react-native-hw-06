import React from "react";

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
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
};

export const Login = ({ navigation }) => {
  const [state, setState] = React.useState(initialState);

  const dispatch = useDispatch();

  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onLogin = () => {
    Keyboard.dismiss();

    dispatch(authSignInUser(state));

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.form}>
            <View style={styles}>
              <TextInput
                value={state.email}
                onChangeText={(value) => emailHandler(value)}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={styles}>
              <TextInput
                value={state.password}
                onChangeText={(value) => passwordHandler(value)}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={onLogin}
            >
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>
            <View style={styles.registerLink}>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "tomato",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 44,
  },
});

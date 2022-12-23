import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Register } from "../Screens/Register";
import { Login } from "../Screens/Login";
import { Home } from "./Home";

import { authStateChangeUser } from "../redux/auth/authOperation";

const MainStack = createNativeStackNavigator();

export const Navigation = () => {
  dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  if (!stateChange) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <MainStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: "Register",
          }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

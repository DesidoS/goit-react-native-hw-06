import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";

import { Post } from "../Screens/Post";
import { Create } from "../Screens/Create";
import { Profile } from "../Screens/Profile";

const MainTab = createBottomTabNavigator();

export const Home = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="image" size={size} color={color} />
          ),
        }}
        name="Post"
        component={Post}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="plus-circle" size={size} color={color} />
          ),
        }}
        name="Create"
        component={Create}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </MainTab.Navigator>
  );
};

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";

import { Octicons } from "@expo/vector-icons";

import { Posts } from "../Screens/Post/PostDefault";
import { Map } from "../Screens/Post/MapScreen";
import { Comments } from "../Screens/Post/CommentsScreen";

import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperation";

const PostStack = createNativeStackNavigator();

export const Post = ({ navigation }) => {
  const dispatch = useDispatch();

  const handlOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Posts"
        component={Posts}
        options={{
          title: "Posts",
          headerRight: () => (
            <TouchableOpacity onPress={handlOut}>
              <Octicons name="sign-out" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <PostStack.Screen
        name="MapScreen"
        component={Map}
        options={{
          title: "Map",
        }}
      />
      <PostStack.Screen
        name="Coments"
        component={Comments}
        options={{
          title: "Comments",
        }}
      />
    </PostStack.Navigator>
  );
};

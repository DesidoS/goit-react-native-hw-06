import { authSlice } from "./authReduser";

import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

export const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch) => {
    try {
      const auth = getAuth();

      await createUserWithEmailAndPassword(auth, email, password);

      const user = await getAuth().currentUser;

      await updateProfile(user, { displayName: userName });

      const { uid, displayName } = await getAuth().currentUser;

      dispatch(
        authSlice.actions.updateUser({
          userId: uid,
          userName: displayName,
        })
      );
    } catch (error) {
      Alert.alert("Error", error.message);

      console.log("message", error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const { uid, displayName } = await getAuth().currentUser;

      dispatch(
        authSlice.actions.updateUser({
          userId: uid,
          userName: displayName,
        })
      );
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
    } catch (error) {
      Alert.alert("Error", error.message);

      console.log("message", error);
    }
  };
export const authSignOutUser = () => async (dispatch) => {
  const auth = getAuth();

  try {
    await signOut(auth);

    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    Alert.alert("Error", error.message);

    console.log("authSignUpUser ~ error", error);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    dispatch(
      authSlice.actions.updateUser({
        userId: user.uid,
        userName: user.displayName,
      })
    );
    dispatch(
      authSlice.actions.authStateChange({
        stateChange: true,
      })
    );
  });
  try {
    await signOut(auth);
  } catch (error) {
    Alert.alert("Error", error.message);

    console.log("authSignUpUser ~ error", error);
  }
};

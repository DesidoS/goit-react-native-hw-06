import React from "react";
import { Navigation } from "./Components/Navigation";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./firebase/config";

export default function App() {
  const useRoute = () => {
    return <Navigation />;
  };

  const routing = useRoute();
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

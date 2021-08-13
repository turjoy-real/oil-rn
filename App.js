import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";
import userReducer from "./store/reducers/users";
import authReducer from "./store/reducers/auth";
import formReducer from "./store/reducers/form";
import clientReducer from "./store/reducers/clients";

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  form: formReducer,
  clients: clientReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

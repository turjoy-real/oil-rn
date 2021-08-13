import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

// import * as accountsActions from '../../store/actions/accounts';
// import Input from '../../components/UI/Input';
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditUserProfileScreen = (props) => {
  return (
    // stuff to Add
    <Text>Edit Profile Screen</Text>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "User Profile",
    headerLeft: () => (
      <Ionicons.Button
        name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        backgroundColor={Colors.primary}
        color={Platform.OS === "android" ? "white" : Colors.primary}
        size={28}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditUserProfileScreen;

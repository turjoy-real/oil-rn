import React from "react";
import { View, Button, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as authActions from "../store/actions/auth";
// import { DrawerActions } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/HomeScreen";

import AuthScreen from "../screens/AuthScreen";
// import EditUserScreen from '../screens/EditUserScreen';
import EditUserProfileScreen, {
  screenOptions as editUserProfileOptions,
} from "../screens/ProfileScreen";

import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    paddingLeft: 30,
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ClientsStackNavigator = createStackNavigator();

export const ClientsNavigator = () => {
  return (
    <ClientsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ClientsStackNavigator.Screen
        name="Clients"
        component={HomeScreen}
        options={homeScreenOptions}
      />
    </ClientsStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name="Profile/Dashboard"
        component={EditUserProfileScreen}
        options={editUserProfileOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const Drawer = () => {
  const dispatch = useDispatch();

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <DrawerItemList {...props} />

            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <DrawerNavigator.Screen
        name="Dashboard"
        component={ProfileNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />

      <DrawerNavigator.Screen
        name="Clients"
        component={ClientsNavigator}
        options={{
          drawerIcon: (props) => (
            <Entypo name="home" size={23} color={props.color} />
          ),
        }}
      />

      <DrawerNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialIcons
              name="account-circle"
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

// Login/Signup Navigator
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};

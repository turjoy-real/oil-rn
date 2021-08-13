import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  TouchableHighlight,
  StatusBar,
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

// import * as usersActions from "../store/actions/users";
import * as clientActions from "../store/actions/clients";

// import Users from "../components/Users";
import Clients from "../components/Clients";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import filter from "lodash.filter";
import { Picker } from "@react-native-picker/picker";

const HomeScreen = (props) => {
  const users = useSelector((state) => state.clients.currentClients);
  // const users = useSelector((state) => state.users.currentUsers);

  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const [fullData, setFullData] = useState([]);
  const [AZ, setAZ] = useState(true);
  const [dateSort, setDateSort] = useState(true);

  // const [person, setPerson] = useState({
  //   userName: "",
  //   age: 0,
  //   address: "",
  //   activity: "Yoga",
  // });

  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [age, setAge] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [dateJoined, setDateJoined] = useState(null);

  const [address, setAddress] = useState(null);
  const [activity, setActivity] = useState(null);

  const [newUser, setNewUser] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(clientActions.fetchClients()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setData(users);
    setFullData(users);
  }, [users]);

  // Submit function
  const submitHandler = useCallback(async () => {
    try {
      if (newUser) {
        await dispatch(
          usersActions.createUser(userName, age, address, activity)
        );
      } else {
        await dispatch(
          usersActions.updateUser(id, userName, age, address, activity)
        );
      }

      setModalVisible(!modalVisible);
    } catch (err) {
      throw err;
    }
  }, [dispatch, userName, age, address, activity, newUser, id]);

  //Sort Alphabetically
  useEffect(() => {
    if (AZ) {
      setData(users.sort((a, b) => a.clientName.localeCompare(b.clientName)));
    } else {
      setData(users.sort((b, a) => a.clientName.localeCompare(b.clientName)));
    }
  }, [AZ]);

  //Sort by Date
  useEffect(() => {
    if (dateSort) {
      data.sort(function (a, b) {
        return new Date(b.dateJoined) - new Date(a.dateJoined);
      });
    } else {
      data.sort(function (a, b) {
        return new Date(a.dateJoined) - new Date(b.dateJoined);
      });
    }
  }, [dateSort]);

  // Add user
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Ionicons.Button
          name="person-add-outline"
          backgroundColor={Colors.primary}
          color={Platform.OS === "android" ? "white" : Colors.primary}
          size={28}
          onPress={() => {
            setNewUser(true);
            setModalVisible(true);
            setUserName(null);
            setAge(null);
            setAddress(null);
            setActivity(null);
          }}
        />
      ),
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ marginTop: 100 }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Modal display(edit client)

  if (modalVisible) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          {/* Details */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>{person.userName}</Text>
              <Text style={styles.modalText}>{person.age}</Text>
              <Text style={styles.modalText}>{person.address}</Text>
              <Text style={styles.modalText}>{person.activity}</Text> */}

              <View style={styles.form}>
                <Text>User Name</Text>
                <TextInput
                  placeholder="User Name"
                  style={styles.input}
                  errorText="Please enter a valid name!"
                  keyboardType="default"
                  returnKeyType="next"
                  defaultValue={userName}
                  onChangeText={(e) => {
                    setUserName(e);
                  }}
                  required
                />
                <Text>Age</Text>

                <TextInput
                  placeholder="Age"
                  style={styles.input}
                  errorText="Please enter a valid address!"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  defaultValue={age}
                  onChangeText={(e) => {
                    setAge(e);
                  }}
                  required
                />

                <Text>Address</Text>

                <TextInput
                  placeholder="Address"
                  style={styles.input}
                  errorText="Please enter a valid address!"
                  keyboardType="default"
                  returnKeyType="next"
                  defaultValue={address}
                  onChangeText={(e) => {
                    setAddress(e);
                  }}
                  required
                />
                <Text>Fitness Activity</Text>

                <Picker
                  style={styles.picker}
                  selectedValue={activity}
                  onValueChange={(itemValue, itemIndex) => {
                    setActivity(itemValue);
                  }}
                >
                  <Picker.Item label="Yoga" value="Yoga" />
                  <Picker.Item label="Aerobics" value="Aerobics" />
                </Picker>

                <Button title="Submit" onPress={submitHandler} color="green" />
              </View>

              <View style={{ flexDirection: "row" }}>
                {/* Cancel Button */}
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "green" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Search
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (users) => {
      return contains(users, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ clientName, address }, query) => {
    if (
      clientName.toLowerCase().includes(query) ||
      address.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 30,
        }}
      >
        <Button
          color={Colors.primary}
          title="Sort Alphabetically"
          onPress={() => setAZ(!AZ)}
        />

        <Button
          color={Colors.primary}
          title="Sort by Date"
          onPress={() => {
            setDateSort(!dateSort);
            // console.log(
            //   users.sort((a, b) => a.dateJoined.localeCompare(b.dateJoined))
            // );
            // dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      </View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Search Clients"
        style={{
          backgroundColor: Colors.input,
          textAlign: "center",
          marginHorizontal: 50,
          marginTop: 20,
          borderRadius: 5,
        }}
      />
      <FlatList
        data={data}
        // horizontal
        renderItem={(itemData) => (
          <Clients
            clientName={itemData.item.clientName}
            phoneNumber={itemData.item.phoneNumber}
            companyName={itemData.item.companyName}
            address={itemData.item.address}
            dateJoined={itemData.item.readableDate}
            onSelect={() => {
              console.log("ok");
              // setModalVisible(true);
              // setNewUser(false);
              // setId(itemData.item.id);
              // setUserName(itemData.item.userName);
              // setAge(itemData.item.age);
              // setAddress(itemData.item.address);
              // setActivity(itemData.item.activity);

              // setPerson({
              //   userName: itemData.item.userName,
              //   age: itemData.item.age,
              //   address: itemData.item.address,
              //   activity: itemData.item.activity,
              // });
            }}
          ></Clients>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Clients",
    headerLeft: () => (
      <Ionicons.Button
        name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        backgroundColor={Colors.primary}
        color={Platform.OS === "android" ? "white" : Colors.primary}
        size={28}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
    // headerRight: () => (
    //   <Ionicons.Button
    //     name="person-add-outline"
    //     backgroundColor={Colors.primary}
    //     color={Platform.OS === "android" ? "white" : Colors.primary}
    //     size={28}
    //     onPress={() => {
    //       setNewUser(true);
    //       setModalVisible(true);
    //       setUserName(null);
    //       setAge(null);
    //       setAddress(null);
    //       setActivity(null);
    //     }}
    //   />
    // ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  form: {
    margin: 20,
    flex: 1,
    // alignItems: 'center',
    marginTop: 40,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#e0e0e0",
    // textAlign: 'center',
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  picker: {
    width: 180,
    height: 50,
    marginBottom: 30,
  },
});

export default HomeScreen;

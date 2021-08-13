import axios from "axios";
import User from "../../models/User";

export const SET_USERS = "SET_USERS";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/turjoy-real/data/users"
      );

      const resData = await response.data;
      // console.log(resData);
      console.log(Date());

      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            key,
            resData[key].userName,
            resData[key].age,
            resData[key].address,
            resData[key].activity
          )
        );
      }

      dispatch({
        type: SET_USERS,
        users: loadedUsers,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createUser = (userName, age, address, activity) => {
  return async (dispatch) => {
    const response = await axios.post(
      "https://my-json-server.typicode.com/turjoy-real/data/users",
      {
        userName: userName,
        age: age,
        address: address,
        activity: activity,
      }
    );

    console.log("create", response.data.id);

    // if (!response.request._sent) {
    //     throw new Error('Something went wrong!');
    //   };

    dispatch({
      type: CREATE_USER,
      // eid: response.data.name ,
      eid: response.data.id,
      userData: {
        userName,
        age,
        address,
        activity,
      },
    });
  };
};

export const updateUser = (id, userName, age, address, activity) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `https://my-json-server.typicode.com/turjoy-real/data/users/${id}`,
      {
        userName: userName,
        age: age,
        address: address,
        activity: activity,
      }
    );
    console.log(response);

    console.log("update", response.data.id);

    // if (!response.request._sent) {
    //     throw new Error('Something went wrong!');
    //   };

    dispatch({
      type: UPDATE_USER,
      // eid: response.data.name ,
      eid: id,
      userData: {
        userName,
        age,
        address,
        activity,
      },
    });
  };
};

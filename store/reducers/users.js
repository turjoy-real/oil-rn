import { SET_USERS, CREATE_USER, UPDATE_USER } from "../actions/users";
import User from "../../models/User";

const initialState = {
  currentUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        currentUsers: action.users,
      };

    case CREATE_USER:
      const newUser = new User(
        action.eid,
        action.userData.userName,
        action.userData.age,
        action.userData.address,
        action.userData.activity
      );

      return {
        ...state,
        currentUsers: state.currentUsers.concat(newUser),
      };

    case UPDATE_USER:
      const userIndex = state.currentUsers.findIndex(
        (emp) => emp.id === action.eid
      );

      const updatedUser = new User(
        action.eid,
        action.userData.userName,
        action.userData.age,
        action.userData.address,
        action.userData.activity
      );

      const updatedCurrentUsers = [...state.currentUsers];
      updatedCurrentUsers[userIndex] = updatedUser;

      return {
        ...state,
        currentUsers: updatedCurrentUsers,
      };
  }
  return state;
};

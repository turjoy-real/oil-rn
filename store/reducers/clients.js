import { SET_CLIENTS, CREATE_CLIENT, UPDATE_CLIENT } from "../actions/clients";
import Client from "../../models/Client";

const initialState = {
  currentClients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENTS:
      return {
        currentClients: action.clients,
      };

    case CREATE_CLIENT:
      const newClient = new Client(
        action.eid,
        action.clientData.clientName,
        action.clientData.phoneNumber,
        action.clientData.companyName,
        action.clientData.address,
        action.clientData.dateJoined
      );

      return {
        ...state,
        currentClients: state.currentClients.concat(newClient),
      };

    case UPDATE_CLIENT:
      const clientIndex = state.currentClients.findIndex(
        (emp) => emp.id === action.eid
      );

      const updatedClient = new Client(
        action.eid,
        action.clientData.clientName,
        action.clientData.phoneNumber,
        action.clientData.companyName,
        action.clientData.address,
        action.clientData.dateJoined
      );

      const updatedCurrentClients = [...state.currentClients];
      updatedCurrentClients[clientIndex] = updatedClient;

      return {
        ...state,
        currentClients: updatedCurrentClients,
      };
  }
  return state;
};

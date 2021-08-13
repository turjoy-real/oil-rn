import axios from "axios";
import Clients from "../../models/Client";

export const SET_CLIENTS = "SET_CLIENTS";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const UPDATE_CLIENT = "UPDATE_CLIENT";

export const fetchClients = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/turjoy-real/data/clients"
      );

      const resData = await response.data;

      console.log(resData);
      console.log(Date());

      const loadedClients = [];

      for (const key in resData) {
        loadedClients.push(
          new Clients(
            key,
            resData[key].userName,
            resData[key].phoneNumber,
            resData[key].companyName,
            resData[key].address,
            resData[key].dateJoined
          )
        );
      }

      dispatch({
        type: SET_CLIENTS,
        clients: loadedClients,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createClient = (
  clientName,
  phoneNumber,
  companyName,
  address,
  dateJoined
) => {
  return async (dispatch) => {
    const response = await axios.post(
      "https://my-json-server.typicode.com/turjoy-real/data/clients",
      {
        userName: clientName,
        phoneNumber: phoneNumber,
        companyName: companyName,
        address: address,
        dateJoined: dateJoined,
      }
    );

    // console.log("create", response.data.id);

    // if (!response.request._sent) {
    //     throw new Error('Something went wrong!');
    //   };

    dispatch({
      type: CREATE_CLIENT,
      // eid: response.data.name ,
      eid: response.data.id,
      clientData: {
        clientName,
        phoneNumber,
        companyName,
        address,
        dateJoined,
      },
    });
  };
};

export const updateClient = (
  id,
  clientName,
  phoneNumber,
  companyName,
  address,
  dateJoined
) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `https://my-json-server.typicode.com/turjoy-real/data/clients/${id}`,
      {
        clientName: clientName,
        phoneNumber: phoneNumber,
        companyName: companyName,
        address: address,
        dateJoined: dateJoined,
      }
    );
    // console.log(response);

    // console.log("update", response.data.id);

    // if (!response.request._sent) {
    //     throw new Error('Something went wrong!');
    //   };

    dispatch({
      type: UPDATE_CLIENT,
      // eid: response.data.name ,
      eid: id,
      clientData: {
        clientName,
        phoneNumber,
        companyName,
        address,
        dateJoined,
      },
    });
  };
};

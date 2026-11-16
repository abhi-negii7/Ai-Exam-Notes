import axios from "axios";
import { serverUrl } from "../src/App.jsx";
import { setUserData } from "../src/redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentuser", {
      withCredentials: true,
    });
    // console.log(result.data);
    dispatch(setUserData(result.data.user));
  } catch (error) {
    console.log("Error:", error.response?.status, error.response?.data);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      {
        withCredentials: true,
      }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("Error:", error.response?.status, error.response?.data);
    throw error;
  }
};

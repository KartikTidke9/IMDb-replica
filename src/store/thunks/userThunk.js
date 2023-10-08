import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//add new user to db
const addUser = createAsyncThunk("user/add", async (user) => {
  const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, {
    user,
  });
  return response.data;
});

//get the matched/loggedIn user
const findUser = createAsyncThunk("user/find", async ({ email, password }) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);

  //finding the matched user
  // eslint-disable-next-line
  return response.data.find((user) => {
    if (user.user.email === email && user.user.password === password) {
      return user;
    }
  });
});

export { addUser, findUser };

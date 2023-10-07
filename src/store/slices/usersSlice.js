import { createSlice } from "@reduxjs/toolkit";
import { addUser, findUser } from "../thunks/userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },
  reducers: {
    //function to logout a user
    logoutUser(state, action) {
      state.user = {};
    },
  },
  extraReducers(builder) {
    //adding/creating user
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    //finding matched from db user and adding to user state
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.user = action.payload || {};
    });

  },
});

export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

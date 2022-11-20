import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userName: null,
    userPassword: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn: {
      reducer: (state, action) => {
        state.user.userName = action.payload.userName;
        state.user.userPassword = action.payload.userPassword;
      },
      prepare: ({ userName, userPassword }) => ({ payload: { userName, userPassword } }),
    },
    userLogOut(state) {
      state.user.userName = null;
      state.user.userPassword = null;
    },
  },
});

export const selectUserName = (state) => state.user.user.userName;
export const selectUserPassword = (state) => state.user.user.userPassword;

export const { userLogIn, userLogOut } = userSlice.actions;
export default userSlice.reducer;

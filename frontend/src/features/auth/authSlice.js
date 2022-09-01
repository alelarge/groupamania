import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/user';

const initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
    firstname: null,
    lastname: null,
    email: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => state = initialState, // déconnexion
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);

        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
      })
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions
export default userSlice.reducer

export const selectIsAuthenticated = (state) =>
  state.user.isAuthenticated
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/user';

const getInitialSate = () => {
  let initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
    firstname: null,
    lastname: null,
    email: null,
    isAdmin: false,
  };
  const authJson = localStorage.getItem('auth');

  if (authJson) {
    const auth  = JSON.parse(authJson);
    initialState.isAuthenticated = true;
    initialState.token = auth.token;
    initialState.userId = auth.userId;
    initialState.isAdmin = auth.isAdmin;
  }

  return initialState;
}

const initialState = getInitialSate();

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('auth');
      state = getInitialSate();
    }, // déconnexion
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAdmin = action.payload.isAdmin;
        state.isAuthenticated = true;

        localStorage.setItem('auth', JSON.stringify({
          token: action.payload.token,
          userId: action.payload.userId,
          isAdmin: action.payload.isAdmin,
        }));
      })
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions
export default userSlice.reducer

export const selectIsAuthenticated = (state) =>
  state.user.isAuthenticated
import { createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../services/post';

const initialState = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clear: (state, action) => state = initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postApi.endpoints.getPosts.matchFulfilled, (state, action) => {
        state = action.payload;
      })
  },
});

// Action creators are generated for each case reducer function
export const { logout } = postsSlice.actions
export default postsSlice.reducer

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
      .addMatcher(postApi.endpoints.getPosts.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(postApi.endpoints.getPosts.matchFulfilled, (state, action) => {
        console.log('fulfilled getPosts', action.payload);
        state = action.payload;
      })
      .addMatcher(postApi.endpoints.getPosts.matchRejected, (state, action) => {
        console.log('rejected', action);
      })
  },
});

// Action creators are generated for each case reducer function
export const { logout } = postsSlice.actions
export default postsSlice.reducer

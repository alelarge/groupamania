import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { api } from './services/api';
import auth from './features/auth/authSlice';
import posts from './features/posts/postsSlice';

export const createStore = () =>
    configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        posts,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    })
  
  export const store = createStore()
  
  export const useAppDispatch = useDispatch
  export const useTypedSelector = useSelector

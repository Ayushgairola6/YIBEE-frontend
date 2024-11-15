import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import MusicReducer from "./musicSlice";
import postReducer from './posSlice';
import authReducer from './AuthSlice'
import ThemeReducer from './ThemeSlice'
export const Appstore = configureStore({
   reducer: {
      user: userReducer,
      music: MusicReducer,
      posts: postReducer,
      auth:authReducer,
      theme:ThemeReducer,
   }
})
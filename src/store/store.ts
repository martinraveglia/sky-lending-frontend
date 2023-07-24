import {
  type Action,
  combineReducers,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { userReducer } from "./user/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

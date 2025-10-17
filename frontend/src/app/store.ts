// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import profileReducer from '../features/profile/profileSlice';
import doctorReducer from '../features/doctor/doctorSlice';

// Step 1: Combine reducers
const rootReducer = combineReducers({
  profile: profileReducer,  // normal slice
  doctor: doctorReducer,    // normal slice
});

// Step 2: Configure persist for the rootReducer, or optionally only persist profile
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile','doctor'] // ✅ only persist profile
};

// Step 3: Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// Step 5: Create persistor
export const persistor = persistStore(store);

// Step 6: Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

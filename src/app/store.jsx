import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

//todo store persistedReducer i takip edecek. auth: karsisinda
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

//todo bu persistoru APP.js de <PersistGate icersiine import et..
export let persistor = persistStore(store);
export default store;




// todo redux-persist isleminden önce store syntax yapisi...
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });
// export default store;
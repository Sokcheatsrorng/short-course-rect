// create store
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { ecommerceApi } from "./services/ecommerce/ecommerceApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { uploadApi } from "./services/upload/upload";

export const store = configureStore({
    // add reducer 
    reducer:{
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        counter: counterSlice
    },
    middleware: (getDefautlMiddleware)=> getDefautlMiddleware().concat(ecommerceApi.middleware, uploadApi.middleware)
    
})

setupListeners(store.dispatch)

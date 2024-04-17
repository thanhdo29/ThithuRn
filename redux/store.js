import { configureStore } from "@reduxjs/toolkit";
import xeMayReduce from "./xeMayReduce";

const store=configureStore({
    reducer:{
        xemay:xeMayReduce
    }
})

export default store;
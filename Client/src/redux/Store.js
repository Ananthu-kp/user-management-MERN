import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./User/userSlice"
import adminSlice from "./Admin/adminSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice
    }
})

export default store;
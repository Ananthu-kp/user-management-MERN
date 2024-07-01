import { createSlice } from '@reduxjs/toolkit'

const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isAuthenticated: false,
        userData: userData,
        token: token
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData = null;
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
        },
    },
})


export default userSlice.reducer;
export const { logout } = userSlice.actions;
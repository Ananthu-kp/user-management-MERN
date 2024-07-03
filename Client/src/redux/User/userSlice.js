import { createSlice } from '@reduxjs/toolkit'
import { editProfile, userVerify } from './userThunk';

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

    extraReducers: (builder) => {
        builder.addCase(userVerify.fulfilled, (state, action) => {
            const { userData, token } = action.payload;
            state.userData = userData;
            state.token = token;
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("token", JSON.stringify(token));
        })
            .addCase(userVerify.rejected, (state) => {
                state.userData = null;
                state.token = null;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                const { username, profileURL } = action.payload;
                state.userData.username = username;
                if (profileURL) {
                    state.userData.profileURL = profileURL;
                }
                state.editConfirm = true;
                localStorage.setItem("userData", JSON.stringify(state.userData));
            });
    }
})


export default userSlice.reducer;
export const { logout } = userSlice.actions;
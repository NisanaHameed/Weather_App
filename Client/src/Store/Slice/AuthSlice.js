import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userToken: localStorage.getItem('userToken') || null
}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUserCredential: (state, action) => {
            state.userToken = action.payload;
            localStorage.setItem('userToken', action.payload);
        },
        logout: (state) => {
            state.userToken = null;
            localStorage.removeItem('userToken');
        }
    }
})

export const { setUserCredential, logout } = authSlice.actions;
export default authSlice.reducer;
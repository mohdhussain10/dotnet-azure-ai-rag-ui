import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type { AuthSuccessData} from '../types/auth';

interface AuthState{
    user: AuthSuccessData | null;
    token: string | null;
    isAuthenticated: boolean;
}
const savedToken = localStorage.getItem('rag_token');
const savedUserString = localStorage.getItem('rag_user');
let savedUser: AuthSuccessData | null = null;

if (savedUserString) {
  try {
    savedUser = JSON.parse(savedUserString);
  } catch {
    localStorage.removeItem('rag_token');
    localStorage.removeItem('rag_user');
  }
}

//starting state when the app launches
const initialState: AuthState = {
    user: savedUser,
    token: savedToken,
    isAuthenticated: Boolean(savedToken && savedUser),
}

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers:{
        //Action 1: called when login or signup succeeds
        setCredentials:(

            state,
            action: PayloadAction<{user: AuthSuccessData; token: string}>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('rag_token', action.payload.token);
            localStorage.setItem('rag_user', JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("rag_token");
            localStorage.removeItem("rag_user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
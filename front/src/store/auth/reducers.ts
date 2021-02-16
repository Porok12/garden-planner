import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AppAuthState = {
    user: null,
    isLoggedIn: false
}

export const fetchAuth = createAsyncThunk('auth/fetchTodos', async () => {
    const response = await axios
        .post("/auth/signin", {
            username: '',
            password: ''
        })
        .then((response: any) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response;
        });

    return response.data;
})

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register(state, action) {

        },
        login(state, action) {

        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAuth.pending, (state) => {

            })
            .addCase(fetchAuth.fulfilled, (state, action) => {

            })
    }
})

export const { actions } = slice;

export default slice.reducer;

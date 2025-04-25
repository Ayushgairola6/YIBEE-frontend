import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// verifying the token for presistence
export const verifyToken = createAsyncThunk(
    'verify/token', async (thunkAPI) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get('http://localhost:8080/api/auth/authenticate', {
                withCredentials:true,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            return response.data;

        } catch (error) {
            // alert(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


// SIGNUP REQUEST TO THE SERVER
export const Signup = createAsyncThunk(
    'post/signupRqst',
    async (SignupData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', SignupData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

// LOGIN RQST BASED ON THE TOKEN STORED
export const LoginRqst = createAsyncThunk(
    'post/loginRqst',
    async (LoginData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', LoginData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',

                }
            });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        signedUp: false,
        condition: 'idle',
        loginStatus: 'Idle',
        error: null,
        userId: null,
        isAdmin: false,
        sessionState: false,
    },
    reducers: {
        logout: (state, action) => {
            state.loggedIn = false;
            state.user = null;
            localStorage.removeItem('token')
        }
        , KeepLoggedIn: (state, action) => {
            state.loggedIn = true;
            state.sessionState = true;
        }
        // SIGNUP CASES
    }, extraReducers: (builder) => {
        builder.addCase(Signup.fulfilled, (state, action) => {
            state.signedUp = true;
            state.user = action.payload.user; // Assuming user data is returned
            state.error = null;
            state.condition = 'You can login now'
        }).addCase(Signup.pending, (state, action) => {
            state.condition = 'Creating your account'
            state.error = action.payload
        }).addCase(Signup.rejected, (state, action) => {
            state.condition = 'Please use a valid email'
            state.error = action.payload

        })
        // LOGIN CASES
        builder
            .addCase(LoginRqst.pending, (state) => {
                state.loginStatus = ' please wait...';
                state.error = null;
            })
            .addCase(LoginRqst.fulfilled, (state, action) => {
                state.loggedIn = true;
                const status = sessionStorage.setItem("loginState", JSON.stringify(state.loggedIn));
                state.loginStatus = 'succeed';
                // state.isAdmin = action.payload.user.isAdmin
                // state.userId = action.payload.user.id;
                state.error = null;
            })
            .addCase(LoginRqst.rejected, (state, action) => {
                state.loginStatus = 'server problem';
                state.error = action.payload || 'Login failed';
            })
            // token verification
            .addCase(verifyToken.rejected, (state) => {
                state.loggedIn = false;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                if (action.payload.message === "Authorized") {
                    state.loggedIn = true;

                }
            })
    }
})
export const { signup, log, logout, KeepLoggedIn } = AuthSlice.actions
export default AuthSlice.reducer;
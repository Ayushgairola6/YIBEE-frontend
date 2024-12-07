import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
"https://yibee.vercel.app/signup"
// SIGNUP REQUEST TO THE SERVER
export const Signup = createAsyncThunk(
    'post/signupRqst',
    async (SignupData, thunkAPI) => {
        try {
            const response = await axios.post('https://yibee.onrender.com/api/auth/signup',  SignupData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
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
            const response = await axios.post('https://yibee.onrender.com/api/auth/login', LoginData, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });
            localStorage.setItem('token', response.data.token);

           
            return response.data;
        } catch (err) {
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
        isAdmin: false
    },
    reducers: {
        logout: (state, action) => {
            state.loggedIn = false;
            state.user = null;
            localStorage.removeItem('token')
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
                state.loginStatus = 'succeed';
                state.isAdmin = action.payload.user.isAdmin
                console.log(action.payload)
                state.userId = action.payload.user.id; // Assuming user data is returned
                console.log(state.userId)
                state.error = null;
            })
            .addCase(LoginRqst.rejected, (state, action) => {
                state.loginStatus = 'server problem';
                state.error = action.payload || 'Login failed';
            });

    }
})
export const { signup, log,logout } = AuthSlice.actions
export default AuthSlice.reducer;
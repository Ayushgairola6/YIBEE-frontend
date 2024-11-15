import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const token = localStorage.getItem('token')
export const getUser = createAsyncThunk(
    'users/getUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://yibeebackend.vercel.app/account/data", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const AddToPlaylist = createAsyncThunk(
    'user/AddSong',
    async (currSong, thunkAPI) => {
        try {
            const response = await axios.patch("https://yibeebackend.vercel.app/api/song", currSong, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })

export const AddProfilePicture = createAsyncThunk(
    'user/AddProfilePic',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.patch(`https://yibeebackend.vercel.app/account/update`,formData ,{
                headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });
        
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const AddCoverPicture = createAsyncThunk(
    'user/AddProfilePic',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.patch(`https://yibeebackend.vercel.app/account/cover`,formData ,{
                headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });
           
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        error: null,
        Situation: 'idle',
        isAdmin: false,
        playlist: null,
        isAdded: 'not added'
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }, extraReducers: (builder) => {
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
            state.Situation = 'Rejected';
        }).addCase(getUser.pending, (state, action) => {
            state.error = action.payload;
            state.Situation = 'Pending';
        }).addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAdmin = action.payload
            state.playlist = action.payload.playlist;
            state.Situation = 'Suceeded';
        })
            .addCase(AddToPlaylist.rejected, (state, action) => {
                state.error = action.payload;
                state.Situation = 'Rejected';

            }).addCase(AddToPlaylist.pending, (state, action) => {
                state.error = action.payload;
                state.Situation = 'Pending';
            }).addCase(AddToPlaylist.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAdmin = action.payload
                state.playlist = action.payload.playlist;
                state.isAdded = action.payload.res
                console.log(action.payload.res, 'success')
                state.Situation = 'Suceeded';
            })
    }
})
export const { setUser, AddComment, LikPost, NextPost, PrevPost } = userSlice.actions
export default userSlice.reducer;
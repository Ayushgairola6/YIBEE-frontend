import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const getUser = createAsyncThunk(
    'users/getUser',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')

            const response = await axios.get("http://localhost:8080/api/account/data", {
                withCredentials: true, headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            // (response)
            return response.data;
        } catch (error) {
            (error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const AddToPlaylist = createAsyncThunk(
    'user/AddSong',
    async (currSong, thunkAPI) => {
        try {
            const response = await axios.patch("http://localhost:8080/api/music/song", currSong, {
                withCredentials: true, headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            (error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })

export const AddProfilePicture = createAsyncThunk(
    'user/AddProfilePic',
    async (formData, thunkAPI) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.patch(`http://localhost:8080/api/account/update`, formData, {
                withCredentials: true, headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.message === "done") {
                const userData = await thunkAPI.dispatch(getUser()).unwrap();
                return userData; 
            }

            return thunkAPI.rejectWithValue("Upload failed");
        } catch (error) {
            (error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const AddCoverPicture = createAsyncThunk(
    'user/CoverPic',
    async (formData, thunkAPI) => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.patch(`http://localhost:8080/api/account/cover`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.message === "done") {
                const userData = await thunkAPI.dispatch(getUser()).unwrap();
                return userData;
            }

            return thunkAPI.rejectWithValue("Upload failed");
        } catch (error) {
            (error);
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
        isAdded: 'not added',
        banner: "idle",
        profile: "idle"
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

    },
    // getUserDetails 
    extraReducers: (builder) => {
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
            // AddToPlaylist
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
                    (action.payload.res, 'success')
                state.Situation = 'Suceeded';
            })
            // coverphoto

            .addCase(AddCoverPicture.pending, (state, action) => {
                state.banner = "isLoading"
            }).addCase(AddCoverPicture.fulfilled, (state, action) => {
                state.user = action.payload
                state.banner = "idle"
            })
            .addCase(AddCoverPicture.rejected, (state, action) => {
                state.banner = 'idle';
            })
            // forProfilePicture
            .addCase(AddProfilePicture.pending, (state, action) => {
                state.profile = "loading"
            })
            .addCase(AddProfilePicture.rejected, (state, action) => {
                state.profile = 'idle';
            })
            .addCase(AddProfilePicture.fulfilled, (state, action) => {
                state.profile = null
                state.user = action.payload
                state.profile = "idle"
            })

    }
})
export const { setUser, AddComment, LikPost, NextPost, PrevPost } = userSlice.actions
export default userSlice.reducer;
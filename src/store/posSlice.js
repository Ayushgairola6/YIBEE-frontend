import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://yibeebackend.vercel.app/feed/posts'
export const fetchPosts = createAsyncThunk(
    'post/getPost',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(url);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
// A FUNCTION TO CREATE A POST AND THEN SEND IT TO THE DATABASE
const userToken = localStorage.getItem('token');
export const createPost = createAsyncThunk('post/createPost',
    async (formData, thunkAPI) => {
        try {
            // console.log(userToken)
            const response = await axios.post(('https://yibeebackend.vercel.app/feed/newpost'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
// LIKE POST
export const Likepost = createAsyncThunk('post/createPost',
    async (p, thunkAPI) => {
        try {
            console.log(userToken);
            const id = p._id;
            const response = await axios.patch((`https://yibeebackend.vercel.app/feed/update/${id}`), userToken,{
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
// DELETE POSt
export const DeletePost = createAsyncThunk('post/createPost',
    async (p, thunkAPI) => {
        try {
            const response = await axios.delete((`https://yibeebackend.vercel.app/feed/post/${p._id}`) , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
const createPostSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isFetched: false,
        status: 'idle',
        error: null,
        isPosted: "not yet",
        isAdmin:false,
    },
    reducers: {
    //      updateLikeCount: (state, action) => {
    //     const updatedPost = action.payload;
    //     const postIndex = state.posts.findIndex(post => post._id === updatedPost._id);
    //     if (postIndex !== -1) {
    //         state.posts[postIndex] = updatedPost; 
    //     }
    // },
    }, 
   
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed",
                state.error = action.error.message
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'suceeded'
            state.isFetched = !state.isFetched;
            state.posts = action.payload
        }).addCase(createPost.pending, (state) => {
            state.isPosted = "Please wait.."
        }).addCase(createPost.rejected, (state) => {
            state.isPosted = "Server Error!"
        }).addCase(createPost.fulfilled, (state) => {
            state.isPosted = 'Posted'
        })
    }

})
export const { setPosts } = createPostSlice.actions
export default createPostSlice.reducer;



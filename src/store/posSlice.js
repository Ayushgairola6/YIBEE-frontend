import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userToken = localStorage.getItem('token');
const url = 'https://yibee.vercel.app/api/feed/posts?page={}'
export const fetchPosts = createAsyncThunk(
    'posts/getPost',
    async (_, thunkAPI,page) => {
        try {
            const response = await axios.get(`https://yibee.onrender.com/api/feed/posts`,{
                headers:{
                    'Authorization': `Bearer ${userToken}`
                }
            })
            console.log(response.data)
           
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
// A FUNCTION TO CREATE A POST AND THEN SEND IT TO THE DATABASE
export const createPost = createAsyncThunk('posts/createPost',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post('https://yibee.onrender.com/api/feed/newpost' , formData, {
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
export const Likepost = createAsyncThunk('posts/LikePost',
    async (p, thunkAPI) => {
        try {
            const id = p._id;
            const response = await axios.patch(`https://yibee.onrender.com/api/feed/update/${id}`, userToken, {
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
export const DeletePost = createAsyncThunk('posts/DeletePost',
    async (p, thunkAPI) => {
        try {
            const response = await axios.delete(`https://yibee.onrender.com/api/feed/post/${p._id}`, {
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
        isPosted: "Waiting....",
        isAdmin: false,
        likedPosts: JSON.parse(localStorage.getItem("likedPosts")) || [],
        isCreated: false,
        likedCalled: null,
    }, reducers: {
        unlike: (p, state) => {
            console.log()

        }
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
        })
            // createPost
            .addCase(createPost.pending, (state) => {
                state.isPosted = "Please wait.."
            }).addCase(createPost.rejected, (state) => {
                state.isPosted = "Server Error!"
            }).addCase(createPost.fulfilled, (state, action) => {
                state.isPosted = 'Posted'
                state.posts.push(action.payload);

            })
            //likePosts
            .addCase(Likepost.pending, (state) => {
                console.log('')
                state.likedCalled = "wait"

            })
            .addCase(Likepost.fulfilled, (state, action) => {
                // console.log(state.posts)
                state.likedCalled = null
                const likedPostId = action.payload._id;
                // console.log(action.payload) 
                const isAlreadyLike = state.likedPosts.includes(likedPostId)
                if (isAlreadyLike) {
                    state.likedPosts = state.likedPosts.filter((id) => id !== likedPostId)
                } else {
                    state.likedPosts.push(likedPostId);
                }
                localStorage.setItem('likedPosts', JSON.stringify(state.likedPosts))
                // Update the post in the `posts` array with the new like count
                const index = state.posts.findIndex((post) => post._id=== likedPostId);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            }).addCase(DeletePost.fulfilled, (state, action) => {
                const deletedPost = action.payload._id;
                state.posts.splice(deletedPost, 1)
            })

    }

})
export const { setPosts, unlike } = createPostSlice.actions
export default createPostSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token')
export const fetchSongs = createAsyncThunk(
    'songs/fetchSongs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://yibee.onrender.com/api/music/songs", {
                  withCredentials: true,
                  headers: {
                    
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// fetch a specific genre
export const fetchGenre = createAsyncThunk(
    'songs/fetchCategory',
    async (genre, thunkAPI) => {
        try {
            const response = await axios.get(`https://yibee.onrender.com/api/music/genre/${genre}`, {
                withCredentials: true,
                  headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
// fetch a specific genre
export const SearchSongs = createAsyncThunk(
    'songs/SearchSongs',
    async (query, thunkAPI) => {
        try {
            const response = await axios.get(`https://yibee.onrender.com/api/music/search/${query}`, {
                withCredentials: true,  headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);




const initialState = {
    fetchedSongs: [],
    currSong: null,
    isPlaying: false,
    status: 'idle',
    error: null,
    songfetched: false,
    GenreFetched: null,
    SearchResults: [],
    searchState:"IDLE"
};

const MusicSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        setCurrSong: (state, action) => {
            ('called');
            state.currSong = state.fetchedSongs[0];
            state.isPlaying = !state.isPlaying;
        },
        togglePlayPause: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        nextSong: (state) => {
            state.currSong = null;
        },
        prevSong: (state) => {
            state.currSong = null;
        },
        setSong:(state,action)=>{
            state.currSong = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.status = 'loading..';
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.songfetched = !state.songfetched;
                state.fetchedSongs = action.payload;
                state.currSong = state.fetchedSongs[0];
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            }).addCase(fetchGenre.pending, (state, action) => {
                state.GenreFetched = action.payload;

            }).addCase(fetchGenre.rejected, (state, action) => {
                state.GenreFetched = action.payload;
            }).addCase(fetchGenre.fulfilled, (state, action) => {
                state.GenreFetched = action.payload
            })
            // search sonsg query
            .addCase(SearchSongs.fulfilled, (state, action) => {
                state.SearchResults = action.payload;
                state.searchState = "Success"
            })
            .addCase(SearchSongs.pending, (state, action) => {
                state.searchState = "loading...."
            })
            .addCase(SearchSongs.rejected, (state, action) => {
                 state.searchState = "could not find any songs"
                 
            })
    },
});

export const { setCurrSong, togglePlayPause, nextSong, prevSong ,setSong} = MusicSlice.actions;

export default MusicSlice.reducer;

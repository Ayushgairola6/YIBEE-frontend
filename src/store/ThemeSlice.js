import { createSlice } from '@reduxjs/toolkit'

const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDefault: true,
        isDark: false,
        isLight: false
    },
    reducers: {
        DarkMode: (state, action) => {
            state.isDark = true;
            state.isLight = false;
            state.isDefault = false;
            // console.log(state.isDark, "darkMode")
            // console.log(state.isDefault, "defaultMode")
            // console.log(state.isLight, "lightMode")

        },
        LightMode: (state) => {
            state.isLight = true;
            state.isDark = false;
            state.isDefault = false;

        },
        defaultMode: (state) => {
            state.isDefault = true;
            state.isDark = false;
            state.isLight = false;
        }
    }
})

export const { DarkMode, LightMode, defaultMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { fetchProfile } from '../../../services/profile';
import { Profile } from '../../../types';

const getProfile = createAsyncThunk('profile/getProfile', async (accessToken: string, thunkapi) => {
    try {
        const data = await fetchProfile(accessToken);
        return data;
    } catch (error) {
        return thunkapi.rejectWithValue(error);
    }
});

interface ProfileState {
    data: Profile | null;
    loading: boolean;
    error: string | null;
}

const initialState = {
    data: null,
    loading: false,
    error: null,
} as ProfileState;

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export { profileSlice, getProfile };

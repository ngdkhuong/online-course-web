/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { fetchProfile } from '../../../services/profile';
import { Profile } from '../../../types';

const getProfile = createAsyncThunk<Profile, string>('profile/getProfile', async (accessToken: string, thunkAPI) => {
    const response = (await fetchProfile(accessToken)) as Response;
    if (!response.ok) { 
        return thunkAPI.rejectWithValue(await response.json());
    }
    return (await response.json()) as Profile;
});

interface ProfileState {
    data: null | Profile; // TODO: Add other user types
    loading: boolean;
    error: null | any;
}
const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(getProfile.fulfilled, (state = initialState, action: PayloadAction<Profile>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export { profileSlice, getProfile };

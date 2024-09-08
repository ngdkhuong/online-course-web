import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from '../../../services/profile';
import { Profile } from '../../../types';

const getProfile = createAsyncThunk<Profile, string>('profile/getProfile', async (accessToken, thunkapi) => {
    try {
        const data = await fetchProfile(accessToken);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface ProfileState {
    data: null | Profile;
    loading: boolean;
    error: null | { message: string; code?: string; status?: number };
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
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload; // Đây là một đối tượng tuần tự hóa được
            });
    },
});

export { profileSlice, getProfile };

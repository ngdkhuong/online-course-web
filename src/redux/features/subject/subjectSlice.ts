/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { fetchSubjects } from '../../../services';

const getSubjects = createAsyncThunk('subject/getSubjects', async (_, thunkAPI) => {
    try {
        const data = await fetchSubjects();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

interface SubjectsState {
    data: null | string[];
    loading: boolean;
    error: null | any;
}

const initialState = {
    data: null,
    loading: false,
    error: null,
} as SubjectsState;

const subjectsSlice = createSlice({
    name: 'subjectsList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubjects.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSubjects.fulfilled, (state, action: PayloadAction<string[]>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getSubjects.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export { subjectsSlice, getSubjects };

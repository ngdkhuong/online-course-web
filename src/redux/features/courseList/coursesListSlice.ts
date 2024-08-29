/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ICourseProps from '../../../types/Course';

import { fetchAllCourses, fetchMyCourses } from '../../../services';

const getCourseList = createAsyncThunk('course/getCourses', async (searchParameters: URLSearchParams, thunkAPI) => {
    try {
        const data = await fetchAllCourses(searchParameters);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const getMyCourses = createAsyncThunk('course/getCourses', async (searchParameters: URLSearchParams, thunkAPI) => {
    try {
        const data = await fetchMyCourses(searchParameters);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

interface CourseListState {
    data: null | ICourseProps[];
    loading: boolean;
    error: null | any;
}
const initialState = {
    data: [],
    loading: false,
    error: null,
} as CourseListState;

const coursesListSlice = createSlice({
    name: 'coursesList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCourseList.fulfilled, (state, action: PayloadAction<ICourseProps[]>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getCourseList.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export { coursesListSlice, getCourseList, getMyCourses };

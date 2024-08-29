import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { profileSlice } from './features/profile/profileSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>; // Return type of the store's getState function

type AppDispatch = typeof store.dispatch; // Type of the store's dispatch function

const useAppDispatch = () => useDispatch<AppDispatch>(); // Typed useDispatch hook

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Typed useSelector hook

export { store, useAppDispatch, useAppSelector };

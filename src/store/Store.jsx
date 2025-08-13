import { configureStore } from '@reduxjs/toolkit'
import  MovieReducer  from './reducers/MovieSlice'
import  PersonReducer  from './reducers/PersonSlice'
import  TvReducer from './reducers/TvSlice'



export const store = configureStore({
    reducer: {
    movie:MovieReducer,
    person:PersonReducer,
    tv:TvReducer
    },
})
import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/api/createApi'
import { filterReducer } from './filterSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  reducer: {
    [api.reducerPath]: api.reducer,
    filtering: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
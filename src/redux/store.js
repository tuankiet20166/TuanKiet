import { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {indexApi} from './slices'

export const store = configureStore({
  reducer: {
    [ indexApi.reducerPath ] : indexApi.reducer,
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(indexApi.middleware),
})

setupListeners(store.dispatch)
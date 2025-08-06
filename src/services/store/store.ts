import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import type { PersistConfig } from 'redux-persist/es/types'

import appReducer from './slices/app'

const rootReducer = combineReducers({
  app: appReducer
})

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  blacklist: []
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer as typeof rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

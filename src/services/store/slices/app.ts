import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameDataFragment } from '@typings/graphql'

type AppState = {
  rentalCart: GameDataFragment[]
  notShowAgain: string[]
}

const slice = createSlice({
  name: 'app',
  initialState: {
    rentalCart: [],
    notShowAgain: []
  } as AppState,
  reducers: {
    addToRentalCart: (state, { payload }: PayloadAction<GameDataFragment>) => {
      if (!state.rentalCart) {
        state.rentalCart = []
      }

      if (!state.rentalCart.find((game) => game.id === payload.id)) {
        state.rentalCart.push(payload)
      }
    },
    removeFromRentalCart: (state, { payload }: PayloadAction<string>) => {
      if (!state.rentalCart) {
        state.rentalCart = []
      }

      state.rentalCart = state.rentalCart?.filter((game) => game.id !== payload)
    },
    clearRentalCart: (state) => {
      state.rentalCart = []
    },
    addNotShowAgain: (state, { payload }: PayloadAction<string>) => {
      if (!state.notShowAgain) {
        state.notShowAgain = []
      }

      if (!state.notShowAgain.includes(payload)) {
        state.notShowAgain.push(payload)
      }
    },
    removeNotShowAgain: (state, { payload }: PayloadAction<string>) => {
      if (!state.notShowAgain) {
        state.notShowAgain = []
      }

      state.notShowAgain = state.notShowAgain.filter((id) => id !== payload)
    },
    clearNotShowAgain: (state) => {
      state.notShowAgain = []
    }
  }
})

export const {
  addToRentalCart,
  removeFromRentalCart,
  clearRentalCart,
  addNotShowAgain,
  removeNotShowAgain,
  clearNotShowAgain
} = slice.actions

export default slice.reducer

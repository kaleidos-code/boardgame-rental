import React from 'react'
import { useAppSelector } from '@services/store/store'

export const useIsInCart = (gameId?: string): boolean => {
  const { rentalCart } = useAppSelector((state) => state.app)

  return React.useMemo(() => !gameId ? false : !!rentalCart?.find((game) => game.id === gameId), [rentalCart, gameId])
}

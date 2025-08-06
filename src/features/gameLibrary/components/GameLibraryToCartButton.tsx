import { Tooltip, Button, Box } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { GameDataFragment } from '@typings/graphql'
import { useIsInCart } from '@hooks/useIsInCart'
import { useResponsive } from '@hooks/useResponsive'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'

type Props = {
  data: GameDataFragment | null
  onAddToCart?: (game: GameDataFragment) => void
}

export const GameLibraryToCartButton: React.FC<Props> = ({ data, onAddToCart }) => {
  const { t } = useTranslation()

  const { xs } = useResponsive()

  const gameInCart = useIsInCart(data?.id)

  return (
    <Box>
      <Tooltip
        label={gameInCart ? t('gameLibrary.alreadyInCart') : t('gameLibrary.notAvailable')}
        disabled={data?.available && !gameInCart}
      >
        <Button
          disabled={!data?.available || gameInCart}
          onClick={() => data && onAddToCart?.(data)}
        >
          {xs ? <MaterialIcon icon='add_shopping_cart' /> : t('action.addToCart')}
        </Button>
      </Tooltip>
    </Box>
  )
}

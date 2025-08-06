'use client'

import { Box, Flex, Grid, Pagination, Stack, Title } from '@mantine/core'
import { GameDataFragment, GamesPaginatedQuery } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCanRent } from '@hooks/useCanRent'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { useAppDispatch } from '@services/store/store'
import { addToRentalCart } from '@services/store/slices/app'
import { useResponsive } from '@hooks/useResponsive'

import { GameLibraryGameCard } from './GameLibraryGameCard'
import { GameLibraryInfoModal } from './GameLibraryInfoModal'

type Props = {
  data?: GamesPaginatedQuery['gamesPaginated']
  onPageChange: (page: number) => void
  loading?: boolean
}

export const GameLibraryList: React.FC<Props> = ({ data, loading, onPageChange }) => {
  const { t } = useTranslation()

  const { xs } = useResponsive()

  const canRent = useCanRent()
  const dispatch = useAppDispatch()

  const [selectedGame, setSelectedGame] = React.useState<GameDataFragment | null>(null)
  const [showGameModal, setShowGameModal] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)
  const stackRef = React.useRef<HTMLDivElement>(null)

  const gameData = React.useMemo(() => {
    return loading ? new Array(3).fill(null).map((_) => undefined) : data?.nodes || []
  }, [data, loading])

  const handleAddtoCart = (reservedGame: GameDataFragment) => {
    try {
      dispatch(addToRentalCart(reservedGame))
      snackbBarRef.current?.handleSuccessMessage(t('gameLibrary.addRentalCartSuccess', { title: reservedGame.title }))
    } catch (e: any) {
      snackbBarRef.current?.handleErrorMessage(e)
    }
  }

  const handleShowGameModal = (game: GameDataFragment) => {
    setSelectedGame(game)
    setShowGameModal(true)
  }

  const handleOnPageChange = (page: number) => {
    onPageChange(page)
    stackRef.current?.scrollTo(0, 0)

    if (xs) {
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      <Stack
        ref={stackRef}
        gap={16}
        pr="24px"
        pl={{
          base: 24,
          md: 0
        }}
        pb="24px"
        style={{
          ...(!xs && { overflow: 'auto' })
        }}
      >
        <Box>
          {!data?.nodes?.length && !loading
            ? (
              <Title order={4}>{t('gameLibrary.noGamesFound')}</Title>
              )
            : (
              <Grid>
                {
                  gameData?.map((game, index) => (
                    <Grid.Col
                      key={game ? game?.id : `game_card_${index}`}
                      span={{
                        base: 12,
                        sm: 6,
                        lg: 4
                      }}
                    >
                      <GameLibraryGameCard
                        data={game}
                        onAddToCart={handleAddtoCart}
                        hideReserveButton={!canRent}
                        onGameInfo={handleShowGameModal}
                      />
                    </Grid.Col>
                  ))
                }
              </Grid>
              )
          }
        </Box>
        <Flex
          justify={{
            base: 'center',
            md: 'flex-end'
          }}
        >
          {data?.pageInfo && (data?.pageInfo?.totalPages || 0) > 1 && !loading && (
            <Pagination
              value={data.pageInfo.currentPage}
              onChange={(value) => handleOnPageChange(value)}
              total={data.pageInfo.totalPages}
              getItemProps={(page) => ({
                'aria-label': t('pagination.goToPage', { page })
              })}
              getControlProps={(control) => {
                switch (control) {
                  case 'previous':
                    return { 'aria-label': t('pagination.previousPage') }
                  case 'next':
                    return { 'aria-label': t('pagination.nextPage') }
                  case 'first':
                    return { 'aria-label': t('pagination.firstPage') }
                  case 'last':
                    return { 'aria-label': t('pagination.lastPage') }
                  default:
                    return {}
                }
              }}
            />
          )}
        </Flex>
      </Stack>

      <Snackbar ref={snackbBarRef} />

      <GameLibraryInfoModal
        opened={showGameModal}
        onClose={() => setShowGameModal(false)}
        onAddToCart={handleAddtoCart}
        hideReserveButton={!canRent}
        game={selectedGame}
      />

    </>
  )
}

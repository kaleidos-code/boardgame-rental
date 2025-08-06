'use client'

import React from 'react'
import { BaseDataTable } from '@shared/components/dataTable/BaseDataTable'
import { GameDataFragment, useGamesPaginatedQuery, useSoftDeleteGameMutation } from '@typings/graphql'
import { Text, Flex, Stack, Box, Title, Button } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { Trans, useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { ActionsRenderCell } from '@shared/components/dataTable/components/ActionsRenderCell'
import { actionsColumn } from '@shared/components/dataTable/columns/actionsColumn'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PaginationVariables } from '@typings/pagination'
import { usePermissions } from '@hooks/usePermissions'

import { gameColumns } from '../components/dataTable/gameColumns'
import { GameColumn } from '../types/types'
import { TableRowExpansion } from '../components/dataTable/TableRowExpansion'
import { GameImportModal } from '../components/GameImportModal'
import { GameListTableHeaderExtension } from '../components/GameListTableHeaderExtension'

export const GameListView: React.FC = () => {
  const { t } = useTranslation()

  const pathName = usePathname()

  const [isExporting, setIsExporting] = React.useState<boolean>(false)
  const [loadMore, setLoadMore] = React.useState<boolean>(false)
  const [showImportModal, setShowImportModal] = React.useState<boolean>(false)

  const { data, loading, refetch } = useGamesPaginatedQuery({
    variables: {
      offset: 0,
      limit: 10
    }
  })

  const isLoading = React.useMemo(() => loading || loadMore, [loading, loadMore])

  const { modalManagerRef } = useModalContext()
  const { can } = usePermissions()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const handleRefetch = async (variables?: PaginationVariables) => {
    try {
      setLoadMore(true)

      await refetch(variables)
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    } finally {
      setLoadMore(false)
    }
  }

  const [deleteGame] = useSoftDeleteGameMutation({
    update: (cache, { data: deleted }) => {
      cache.evict({
        id: cache.identify({
          __typename: 'Game',
          id: deleted?.softDeleteGame.id
        })
      })

      cache.gc()
    }
  })

  const confirmDelete = async (row: GameDataFragment) => {
    try {
      await deleteGame({
        variables: {
          id: row.id
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey='gameList.deleteSuccess'
          values={{ title: row.title }}
          components={{
            b: <b />
          }}
        />
      )

      await handleRefetch()
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }
  }

  const handleOnDelete = (row: GameDataFragment) => {
    const rentedUnits = row.units.filter((unit) => !unit.available).map((unit) => unit.prefixedShortId)

    modalManagerRef.current?.showModal(GlobalModalType.DELETE_ENTRY, {
      confirmCallback: async () => confirmDelete(row),
      modalProps: {
        title: t('modal.deleteGame.title'),
        children: (
          <Box>
            <Trans
              i18nKey="modal.deleteGame.message"
              values={{
                title: row.title
              }}
              components={{
                b: <b />
              }}
            />
            {rentedUnits.length > 0 && (
              <Text
                c='red.6'
              >
                <Trans
                  i18nKey="modal.deleteGame.annotation"
                  values={{
                    units: rentedUnits.join(', ')
                  }}
                  components={{
                    b: <b />
                  }}
                />
              </Text>
            )}
          </Box>
        )
      }
    })
  }

  const columns = React.useMemo(() => {
    return [...gameColumns, {
      ...actionsColumn,
      render: (row) => (
        <ActionsRenderCell
          {...(can('user:update') && {
            editLink: `${pathName}/${row.id}`
          })}
          {...(can('game:delete') && {
            onDelete: () => handleOnDelete(row)
          })}
        />
      )
    } as GameColumn]
  }, [])

  const handleOnImportSuccess = () => {
    snackbBarRef.current?.handleSuccessMessage(t('gameList.importSuccess'))

    refetch()
  }

  const handleOnImportError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const handleOnExport = async () => {
    setIsExporting(true)

    snackbBarRef.current?.handleLoadingMessage(t('gameList.isExporting'))

    try {
      const response = await fetch('/api/export/unit-short-ids', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        snackbBarRef.current?.handleErrorMessage(new Error(t('error.gameList.exportError')))
      }
      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `spiele-exemplare-${new Date().toLocaleDateString().replace(/\./g, '-')}.xlsx`

      a.click()

      snackbBarRef.current?.handleSuccessMessage(t('gameList.exportSuccess'))
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }

    setIsExporting(false)
  }

  return (
    <Stack
      style={{
        height: '100%'
      }}
      px='24px'
    >
      <Flex
        justify="space-between"

      >
        <Title order={3}>
          {t('gameList.gameOverview')}
        </Title>
        <Flex gap={8}>
          {can('game:create') && (
          <Button
            onClick={() => setShowImportModal(true)}
            leftSection={(
              <MaterialIcon
                size="small"
                icon="upload"
              />
            )}
          >
            {t('action.importGames')}
          </Button>
          )}
          {can('game:create') && (
          <Button
            component='a'
            href={`${pathName}/create`}
            leftSection={(
              <MaterialIcon
                size="small"
                icon="add"
              />
            )}
          >
            {t('action.createGame')}
          </Button>
          )}
        </Flex>
      </Flex>

      <BaseDataTable
        fetching={isLoading}
        columns={columns}
        records={data?.gamesPaginated.nodes || []}
        totalRecords={data?.gamesPaginated.totalCount || 0}
        pageInfo={data?.gamesPaginated.pageInfo}
        refetch={handleRefetch}
        {...(can('game:update') && {
          actionHeaderExtenstion: () => (
            <GameListTableHeaderExtension
              disabled={isExporting}
              onExport={handleOnExport}
            />
          )
        })}
        tabelKey="game-list"
        expansionContent={(row) =>
          <TableRowExpansion
            data={row}
          />
        }
      />

      <GameImportModal
        opened={showImportModal}
        onSuccess={handleOnImportSuccess}
        onError={handleOnImportError}
        onClose={() => setShowImportModal(false)}
      />

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}

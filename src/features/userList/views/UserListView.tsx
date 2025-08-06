'use client'

import React from 'react'
import { BaseDataTable } from '@shared/components/dataTable/BaseDataTable'
import { UserDataFragment, useSendDoubleOptInMailMutation, useSoftDeleteUserMutation, useUsersPaginatedQuery } from '@typings/graphql'
import { Flex, Stack, Box, Button, Title } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { Trans, useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { ActionsRenderCell } from '@shared/components/dataTable/components/ActionsRenderCell'
import { actionsColumn } from '@shared/components/dataTable/columns/actionsColumn'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PaginationVariables } from '@typings/pagination'
import { usePermissions } from '@hooks/usePermissions'

import { UserColumn } from '../types/types'
import { userColumns } from '../components/dataTable/userColumns'
import { UserRowAdditionalActions } from '../components/UserRowAdditionalActions'

export const UserListView: React.FC = () => {
  const { t } = useTranslation()

  const pathName = usePathname()

  const [loadMore, setLoadMore] = React.useState<boolean>(false)

  const { data, loading, refetch } = useUsersPaginatedQuery({
    variables: {
      offset: 0,
      limit: 10
    }
  })

  const isLoading = React.useMemo(() => loading || loadMore, [loading, loadMore])

  const { modalManagerRef } = useModalContext()
  const { can } = usePermissions()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const [deletedUser] = useSoftDeleteUserMutation({
    update: (cache, { data: deleted }) => {
      cache.evict({
        id: cache.identify({
          __typename: 'User',
          id: deleted?.softDeleteUser.id
        })
      })

      cache.gc()
    }
  })
  const [sendDoubleOptInMail] = useSendDoubleOptInMailMutation()

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

  const confirmDelete = async (user: UserDataFragment) => {
    try {
      await deletedUser({
        variables: {
          id: user.id
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey='userList.deleteSuccess'
          values={{ email: user?.email }}
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

  const handleOnDelete = (row: UserDataFragment) => {
    modalManagerRef.current?.showModal(GlobalModalType.DELETE_ENTRY, {
      confirmCallback: async () => confirmDelete(row),
      modalProps: {
        title: t('modal.deleteUser.title'),
        children: (
          <Box>
            <Trans
              i18nKey="modal.deleteUser.message"
              values={{
                title: row.email
              }}
              components={{
                b: <b />
              }}
            />
          </Box>
        )
      }
    })
  }

  const handleDoubleOptIn = async (user: UserDataFragment) => {
    try {
      snackbBarRef.current?.handleLoadingMessage(t('userList.doubleOptInLoading'))

      await sendDoubleOptInMail({
        variables: {
          email: user.email
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey="userList.doubleOptInSuccess"
          values={{
            email: user.email
          }}
          components={{
            b: <b />
          }}
        />)
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    }
  }

  const columns = React.useMemo(() => {
    return [...userColumns, {
      ...actionsColumn,
      render: (row) => (
        <ActionsRenderCell
          {...(can('user:update') && {
            editLink: `${pathName}/${row.id}`,
            additionalActions: (
              <UserRowAdditionalActions
                invited={row.emailVerified}
                onInvite={() => handleDoubleOptIn(row)}
              />
            )
          })}
          {...can('user:delete') && ({
            onDelete: () => handleOnDelete(row)
          })}
        />
      )
    } as UserColumn]
  }, [])

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
          {t('routes.userList.title')}
        </Title>
        {can('user:create') && (
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
            {t('action.createUser')}
          </Button>
        )}
      </Flex>

      <BaseDataTable
        fetching={isLoading}
        columns={columns}
        records={data?.usersPaginated.nodes || []}
        totalRecords={data?.usersPaginated.totalCount || 0}
        pageInfo={data?.usersPaginated.pageInfo}
        refetch={handleRefetch}
        tabelKey="user-list"
      />

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}

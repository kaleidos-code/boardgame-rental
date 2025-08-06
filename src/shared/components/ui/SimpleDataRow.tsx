import { Box, Divider, Flex, Grid, Text } from '@mantine/core'
import React from 'react'

type Props = React.PropsWithChildren & {
  label: string
  value?: string | React.ReactNode
  noDivider?: boolean
  actions?: React.ReactNode
  actionWidth?: number
  actionTop?: boolean
}

export const SimpleDataRow: React.FC<Props> = ({ label, value, children, noDivider, actions, actionWidth, actionTop }) => {
  return (
    <Box>
      <Grid
        gutter={{
          base: 4,
          sm: 16
        }}
      >
        <Grid.Col
          span={{
            xs: 12,
            sm: 4,
            xl: 3
          }}
        >
          <Text
            fw={700}
          >
            {label}
          </Text>
        </Grid.Col>
        <Grid.Col
          span={{
            xs: 10,
            sm: 7,
            xl: 8
          }}
        >
          {children || (
            <Text>
              {value}
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={{
          xs: 2,
          sm: 1,
          md: actionWidth || 1
        }}
        >
          <Flex
            direction='row'
            justify='flex-end'
            align={actionTop ? 'flex-start' : 'center'}
          >
            {actions}
          </Flex>
        </Grid.Col>
      </Grid>
      {!noDivider && (
        <Divider
          my={8}
          orientation='horizontal'
        />
      )}
    </Box>
  )
}

import React from 'react'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { ActionIcon, Box, Text, Button, Flex, Input, Stack, Checkbox, NumberInput } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { Trans, useTranslation } from 'react-i18next'
import { UNIT_ID_LENGTH } from '@shared/constants/input'

import { useGameFormContext } from '../provider/GameFormProvider'

export const GameUnitInput = () => {
  const { t } = useTranslation()

  const { getInputProps, getValues, setFieldValue } = useGameFormContext()

  const addGameUnit = () => {
    setFieldValue('gameUnits', [...getValues().gameUnits, {
      unitShortId: '',
      notInStock: false,
      incomplete: false,
      weight: null,
      texts: {
        missingParts: ''
      },
      available: true
    }])
  }

  const removeGameUnit = (index: number) => {
    const newUnits = getValues().gameUnits.filter((_, i) => i !== index)
    setFieldValue('gameUnits', newUnits)
  }

  return (
    <Stack
      gap="8px"
    >
      <Flex
        direction="row"
        mt={8}
        align="flex-end"
        justify="space-between"
      >
        <Box>
          <Input.Label>
            {t('common.gameUnits')}
          </Input.Label>

          <Input.Description>
            {t('common.gameUnitsDescription')}
          </Input.Description>
        </Box>

        <ActionIcon
          onClick={addGameUnit}
        >
          <MaterialIcon
            icon='add'
          />
        </ActionIcon>
      </Flex>

      {getValues().gameUnits.map((unit, index) => (
        <Box
          key={'unit_' + index}
          style={{
            position: 'relative',
            border: '1px solid #E0E0E0',
            padding: '8px',
            opacity: unit.available ? 1 : 0.5,
            cursor: unit.available ? 'auto' : 'not-allowed'
          }}
        >
          <Box
            style={{
              pointerEvents: unit.available ? 'auto' : 'none'
            }}
          >

            <BaseTextInput
              maxLength={UNIT_ID_LENGTH}
              label={t('common.gameUnitId')}
              showMaxLength
              {...getInputProps(`gameUnits.${index}.unitShortId`)}
            />

            <NumberInput
              allowDecimal
              decimalSeparator=","
              decimalScale={2}
              label={t('common.weight')}
              {...getInputProps(`gameUnits.${index}.weight`)}
            />

            <Checkbox
              mt={8}
              styles={{
                labelWrapper: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}
              checked={getValues().gameUnits[index].incomplete}
              {...getInputProps(`gameUnits.${index}.incomplete`, { type: 'checkbox' })}
              label={
                <Text
                  fz='12px'
                  fw={700}
                  lh={1}
                >{t('common.incomplete')}</Text>}
            />

            <Checkbox
              mt={8}
              styles={{
                labelWrapper: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}
              checked={getValues().gameUnits[index].notInStock}
              {...getInputProps(`gameUnits.${index}.notInStock`, { type: 'checkbox' })}
              label={
                <Text
                  fz='12px'
                  fw={700}
                  lh={1}
                >{t('common.notInStock')}</Text>}
            />

            {getValues().gameUnits[index].incomplete && (
              <BaseTextInput
                label={t('common.missingParts')}
                {...getInputProps(`gameUnits.${index}.texts.missingParts`)}
              />
            )}
            <Flex
              mt={8}
              justify="space-between"
              align={'center'}
            >
              <Button
                variant='transparent'
                onClick={() => removeGameUnit(index)}
                style={{
                  padding: '0'
                }}
                leftSection={(
                  <MaterialIcon
                    icon='delete'
                  />
                  )}
              >
                {t('action.delete')}
              </Button>
              {!unit.available && (
                <Text
                  c='red.5'
                  size='sm'
                >
                  <Trans
                    i18nKey="gameList.gameUnitRented"
                    values={{ unit: unit.unitShortId }}
                    components={{
                      b: <b />
                    }}
                  />
                </Text>
              )}
            </Flex>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

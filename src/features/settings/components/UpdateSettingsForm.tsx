import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActionIcon, Box, Button, Checkbox, Flex, Input, Stack } from '@mantine/core'
import { CreateUpdatePickUpDayInput, PickUpDayDataFragment, useCreateUpdatePickUpDayMutation, WeekDay } from '@typings/graphql'
import { useForm } from '@mantine/form'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { timePattern } from '@utils/pattern'
import { WEEKDAYS_ORDERERD } from '@shared/constants/days'

import { SettingsEditForm, SettingsFormProps, SettingsFormRefHandler, SettingsTransformedInput } from '../types/types'

type Props = SettingsFormProps & {
  data: PickUpDayDataFragment[]
}

type UpdateSettingsFormRenderFn = React.ForwardRefRenderFunction<SettingsFormRefHandler, Props>

const UpdateSettingsForm: UpdateSettingsFormRenderFn = ({ active, data, onSuccess, onError }, ref) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)

  const [createUpdatePickUpDay] = useCreateUpdatePickUpDayMutation()

  const { modalManagerRef } = useModalContext()

  const form = useForm<SettingsEditForm, SettingsTransformedInput>({
    validateInputOnChange: true,
    initialValues: {
      days: []
    },
    validate: {
      days: (value) => {
        const enabledDays = value.filter((day) => day.enabled)

        let error: string | null = null

        if (enabledDays.length === 0) {
          error = t('error.input.required')
        }

        const invalidDays = enabledDays.filter((day) => day.pickUpTimes.length === 0 ||
         day.pickUpTimes.some((time) => !new RegExp(timePattern).test(time.from) || !new RegExp(timePattern).test(time.to)))

        if (invalidDays.length > 0) {
          error = t('error.input.dayInvalid', { days: invalidDays.map((day) => t(`days.${day.dayOfWeek.toLowerCase()}`)).join(', ') })
        }

        if (error) {
          form.setFieldError('days', error)
          return error
        }

        form.clearFieldError('days')

        return null
      }
    },
    transformValues: (values) => values.days.filter((day) => day.enabled).map((day) => ({
      dayOfWeek: day.dayOfWeek,
      pickUpTimes: day.pickUpTimes
    })) || []
  })

  const resetForm = () => {
    form.resetDirty()

    form.initialize({
      days: WEEKDAYS_ORDERERD.map((day) => {
        const existingDay = data.find((d) => d.dayOfWeek.toLowerCase() === day.toLowerCase() as WeekDay)

        return {
          dayOfWeek: day as WeekDay,
          enabled: !!existingDay,
          pickUpTimes: existingDay?.pickUpTimes
            ? existingDay?.pickUpTimes.map((time) => ({
              from: time.from,
              to: time.to
            }))
            : [{
              from: '',
              to: ''
            }] as CreateUpdatePickUpDayInput['pickUpTimes']
        }
      })
    })
  }

  React.useImperativeHandle(ref, () => ({
    resetForm: () => form.resetDirty(),
    closeWithCallback: (callback) => {
      if (form.isDirty()) {
        modalManagerRef.current?.showModal(GlobalModalType.UNSAVED_CHANGES, {
          confirmCallback: () => {
            form.resetDirty()
            callback()
          }
        })
      } else {
        callback()
      }
    }
  }))

  useUnsavedChanges({ when: active && form.isDirty() })

  React.useEffect(() => {
    resetForm()
  }, [data])

  const handleSubmitData = async (values: CreateUpdatePickUpDayInput[]) => {
    setLoading(true)
    try {
      await createUpdatePickUpDay({
        variables: {
          data: values
        }
      })

      onSuccess?.(t('settings.updateSuccess'))
    } catch (error: any) {
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const changePickUpDay = (index: number) => {
    const { days } = form.getValues()

    form.setValues({
      days: [
        ...days.slice(0, index),
        {
          ...days[index],
          enabled: !days[index].enabled
        },
        ...days.slice(index + 1)
      ]
    })
  }

  const addPickUpTime = (index: number) => {
    const { days } = form.getValues()

    form.setValues({
      days: [
        ...days.slice(0, index),
        {
          ...days[index],
          pickUpTimes: [
            ...days[index].pickUpTimes,
            {
              from: '',
              to: ''
            }
          ]
        },
        ...days.slice(index + 1)
      ]
    })
  }

  const removePickUpTime = (dayIndex: number, timeIndex: number) => {
    const { days } = form.getValues()

    const isLastTime = days[dayIndex].pickUpTimes.length === 1

    form.setValues({
      days: [
        ...days.slice(0, dayIndex),
        {
          ...days[dayIndex],
          pickUpTimes: isLastTime
            ? [{
                from: '',
                to: ''
              }]
            : days[dayIndex].pickUpTimes.filter((_, i) => i !== timeIndex)
        },
        ...days.slice(dayIndex + 1)
      ]
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmitData)}>
      <Stack
        gap={18}
      >
        <Stack gap={4}>
          <Input.Label
            required={true}
          >
            {t('settings.pickUpReturnDays')}
          </Input.Label>

          {form.getValues().days.map((day, index) => (
            <Box
              key={day.dayOfWeek}
              p={8}
              bg="gray.0"
              bd="1px solid gray.1"

            >
              <Flex
                justify="space-between"
              >
                <Box>
                  <Checkbox
                    label={t(`days.${day.dayOfWeek.toLowerCase()}`)}
                    checked={form.getValues().days[index]?.enabled}
                    onChange={() => changePickUpDay(index)}
                  />
                </Box>
                <Flex
                  gap={8}
                >
                  <Stack
                    gap={4}
                    align="flex-end"
                  >
                    {form.getValues().days[index]?.pickUpTimes?.map((time, timeIndex) => (
                      <Flex
                        gap={8}
                        key={timeIndex}
                        align="center"

                      >
                        <BaseTextInput
                          w={100}
                          placeholder={t('common.from')}
                          {...form.getInputProps(`days.${index}.pickUpTimes.${timeIndex}.from`)}
                        />
                        <BaseTextInput
                          w={100}
                          placeholder={t('common.to')}
                          {...form.getInputProps(`days.${index}.pickUpTimes.${timeIndex}.to`)}
                        />
                        <ActionIcon
                          variant='outline'
                          onClick={() => removePickUpTime(index, timeIndex)}
                        >
                          <MaterialIcon icon="delete" />
                        </ActionIcon>
                      </Flex>
                    ))}

                    <ActionIcon
                      disabled={form.getValues().days[index]?.pickUpTimes.length > 2}
                      onClick={() => addPickUpTime(index)}
                    >
                      <MaterialIcon icon="add" />
                    </ActionIcon>
                  </Stack>
                </Flex>
              </Flex>
            </Box>
          ))}

          {form.errors.days && (
            <Input.Error>
              {form.errors.days}
            </Input.Error>
          )}
        </Stack>

        <Flex
          justify='flex-end'
        >
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isDirty()}
            loading={loading}
          >
            {t('action.submit')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default React.forwardRef(UpdateSettingsForm)

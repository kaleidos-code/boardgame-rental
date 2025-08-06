import React from 'react'
import { Combobox, Input, useCombobox, Pill, PillsInput, Box, InputBase, Group, BoxProps } from '@mantine/core'

import { MaterialIcon } from '../ui/MaterialIcon'

export type BaseSelectOption = {
  id: string
  label: string
}

export type BaseSelectInputProps = {
  labelAbsolute?: boolean;
  boxProps?: BoxProps
  options: BaseSelectOption[]
  label?: string
  description?: string
  required?: boolean
  placeholder?: string
  multiple?: boolean
  hideRequireSymbol?: boolean
  value?: string[] | string;
  defaultValue?: string;
  onChange?: (value: string[] | string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const BaseSelectInput: React.FC<BaseSelectInputProps> = ({
  options,
  placeholder,
  required,
  hideRequireSymbol,
  label,
  multiple = false,
  description,
  labelAbsolute,
  boxProps,
  value,
  onFocus,
  onBlur,
  onChange
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active')
  })

  const handleValueSelect = (val: string) => {
    const mappedValue = Array.isArray(value) ? value : value ? [value] : []

    if (!multiple) {
      onChange?.(!required && mappedValue?.[0] === val ? '' : val)
    } else {
      onChange?.(mappedValue?.includes(val) ? mappedValue?.filter((v) => v !== val) : [...(mappedValue || []), val])
    }
  }

  const handleValueRemove = (val: string) => {
    const isArr = Array.isArray(value)

    if (!isArr) {
      onChange?.('')
    } else {
      onChange?.(value?.filter((v) => v !== val) || [])
    }
  }

  const values = React.useMemo(() => {
    if (!Array.isArray(value)) return []
    return value.map((item) => (
      <Pill
        key={`pill_${item}`}
        withRemoveButton
        onRemove={() => handleValueRemove(item)}
      >
        {options.find((option) => option.id === item)?.label}
      </Pill>
    ))
  }, [value, options])

  const availableOptions = React.useMemo(() => {
    if (multiple) {
      return options.filter((option) => !value?.includes(option.id))
    } else {
      return options
    }
  }, [options, value])

  return (
    <Box
      style={{ position: 'relative' }}
      {...boxProps}
    >
      {label && (
      <Input.Label
        required={required && !hideRequireSymbol}
        {...(labelAbsolute && {
          style: {
            position: 'absolute',
            top: '-4px',
            transform: 'translateY(-100%)'
          }
        })}
      >
        {label}
      </Input.Label>
      )}
      {description && (
        <Input.Description>
          {description}
        </Input.Description>
      )}
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
      >
        {!multiple
          ? (
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                onClick={() => combobox.toggleDropdown()}
                rightSectionPointerEvents="none"
              >
                {options.find((option) => option.id === value)?.label || placeholder}
              </InputBase>
            </Combobox.Target>
            )
          : (
            <Combobox.DropdownTarget>
              <PillsInput
                pointer
                onClick={() => combobox.toggleDropdown()}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <Pill.Group>
                  {(values?.length || 0) > 0
                    ? (
                        values
                      )
                    : (
                      <Input.Placeholder>{placeholder}</Input.Placeholder>
                      )}

                  <Combobox.EventsTarget>
                    <PillsInput.Field
                      type="hidden"
                      onBlur={() => combobox.closeDropdown()}
                      onKeyDown={(event) => {
                        if (event.key === 'Backspace' && value) {
                          event.preventDefault()
                          handleValueRemove(value[value.length - 1])
                        }
                      }}
                    />
                  </Combobox.EventsTarget>
                </Pill.Group>
              </PillsInput>
            </Combobox.DropdownTarget>
            )}

        <Combobox.Dropdown>
          <Combobox.Options>
            {availableOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option.id}
                active={value?.includes(option.id) || value === option.id}
              >
                <Group gap="xs">
                  {option.id === value && <MaterialIcon icon="check" iconProps={{ fz: '18px' }} />}
                  {option.label}
                </Group>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

    </Box>
  )
}

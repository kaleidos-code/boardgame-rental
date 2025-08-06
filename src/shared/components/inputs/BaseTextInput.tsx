import React from 'react'
import { Box, BoxProps, Input, TextInput, TextInputProps } from '@mantine/core'

import { MAX_INPUT_LENGTH } from '../../constants/input'

export type BaseTextInputProps = TextInputProps & {
  boxProps?: BoxProps
  disableMaxLength?: boolean;
  showMaxLength?: boolean;
  labelAbsolute?: boolean;
};

export const BaseTextInput: React.FC<BaseTextInputProps> = ({
  showMaxLength = false,
  labelAbsolute = false,
  disableMaxLength = false,
  boxProps,
  ...props
}) => {
  const { maxLength, value, rightSection, ...restProps } = props

  const defaultMaxLength = React.useMemo(() => maxLength || MAX_INPUT_LENGTH, [maxLength])

  return (
    <Box
      style={{
        position: 'relative'
      }}
      {...boxProps}
    >
      <TextInput
        styles={{
          root: {
            position: 'relative'
          },
          ...(labelAbsolute && {
            label: {
              position: 'absolute',
              top: '-4px',
              transform: 'translateY(-100%)'
            }
          })
        }}
        rightSection={showMaxLength && !disableMaxLength && (
          <>
            {rightSection}
            <Input.Description
              style={{
                position: 'absolute',
                right: 0,
                top: '-4px',
                transform: 'translateY(-100%)'
              }}
            >
              {`${value?.toString().length || 0}/${defaultMaxLength}`}
            </Input.Description>
          </>
        )}
        value={value}
        {...restProps}
        {...(!disableMaxLength && { maxLength: defaultMaxLength })}
      />
    </Box>
  )
}

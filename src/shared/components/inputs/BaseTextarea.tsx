import React from 'react'
import { Box, Input, Textarea, TextareaProps } from '@mantine/core'

import { MAX_TEXT_AREA_LENGTH } from '../../constants/input'

export type BaseTextareaProps = TextareaProps & {
  disableMaxLength?: boolean;
  showMaxLength?: boolean;
};

export const BaseTextarea: React.FC<BaseTextareaProps> = ({ showMaxLength = true, disableMaxLength = false, ...props }) => {
  const { maxLength, value, rightSection, ...restProps } = props

  const defaultMaxLength = React.useMemo(() => maxLength || MAX_TEXT_AREA_LENGTH, [maxLength])

  return (
    <Box
      style={{
        position: 'relative'
      }}
    >
      <Textarea
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
        {...(!disableMaxLength && { maxLength: defaultMaxLength })}
        {...restProps}
      />
    </Box>
  )
}

import { Box, Text, Flex, Input } from '@mantine/core'
import { EditableFile } from '@typings/file'
import { convertBytesToHumanReadable } from '@utils/format'
import { toCamelCase } from '@utils/string'
import React, {
  ForwardRefRenderFunction,
  useImperativeHandle
} from 'react'
import { Accept, FileRejection, useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { BaseFileInputPreview } from './BaseFileInputPreview'

export type BaseFileInputProps = React.PropsWithChildren & {
  fileKey: string
  label?: string
  required?: boolean
  description?: string
  acceptedFileTypes?: Accept
  multiple?: boolean
  maxSize?: number
  value?: EditableFile[]
  onChange: (files: EditableFile[]) => void
  onError?: (error: Error) => void
};

export type BaseFileInputHandler = {
  open: () => void,
  reset: () => void
}

type BaseFileInputRenderFn = ForwardRefRenderFunction<BaseFileInputHandler, BaseFileInputProps>

const BaseFileInput: BaseFileInputRenderFn = ({
  label,
  description,
  required,
  value = [],
  onChange,
  onError,
  multiple,
  maxSize,
  acceptedFileTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.webp']
  },
  fileKey,
  children
}, ref) => {
  const { t } = useTranslation()

  const getHighestKey = () => {
    const keys = [0, ...value.map(file => parseInt(file.key.split('_')[1], 10))]
    const highestKey = Math.max(...keys)

    return fileKey + '_' + (highestKey + 1)
  }

  const onDrop = (acceptedFiles: File[], rejectedFiles?: FileRejection[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const mappedError = toCamelCase(rejectedFiles[0].errors[0].code as string)

      onError && onError(new Error(`error.files.${mappedError}`))

      return
    }

    const files: EditableFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      key: multiple ? getHighestKey() : fileKey,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
      url: URL.createObjectURL(file),
      upload: file
    }))

    onChange(multiple
      ? [
          ...value,
          ...files
        ]
      : files)
  }

  const {
    getRootProps, getInputProps, open, isDragActive
  } = useDropzone({
    maxSize,
    accept: acceptedFileTypes,
    multiple,
    onDrop
  })

  useImperativeHandle(ref, () => ({
    open,
    reset: () => null
  }))

  const joinedAcceptedFileTypes = React.useMemo(() => {
    return Object.values(acceptedFileTypes).reduce((acc, curr) => [...acc, ...curr], [] as string[]).join(', ')
  }, [acceptedFileTypes])

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <Flex
      direction="column"
    >
      {label && (
      <Input.Label
        required={required}
      >
        {label}
      </Input.Label>
      )}
      {description && (
        <Input.Description>
          {description}
        </Input.Description>
      )}
      {value.map((file, index) => (
        <Box
          key={file.id}
          mb={4}
        >
          <BaseFileInputPreview
            data={file}
            onDelete={() => removeFile(index)}
          />
        </Box>
      ))}
      <Box
        {...getRootProps()}
        style={{
          pointerEvents: 'all',
          cursor: 'pointer',
          border: '1px dashed',
          height: '100%',
          width: '100%',
          borderColor: 'grey.500',
          p: 2,
          backgroundColor: isDragActive ? 'grey.50' : 'transparent'
        }}
      >
        <input {...getInputProps()} />

        {children || (
          <Flex
            direction="column"
            align="center"
            p={8}
          >
            <Text>
              {multiple ? t('action.dropFiles') : t('action.dropFile')}
            </Text>

            <Text
              size='sm'
              c='gray.6'
            >
              {t('files.acceptedFileTypes', { types: joinedAcceptedFileTypes })}
            </Text>
            {maxSize && (
              <Text
                size='sm'
                c='gray.6'
              >
                {t('files.acceptedFileSize', {
                  size: convertBytesToHumanReadable(maxSize)
                })}
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default React.forwardRef(BaseFileInput)

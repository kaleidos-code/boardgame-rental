import { Box } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

export type RatioImageProps = {
  src: string
  alt: string
  blurDataURL?: string
  height?: number
  width?: number
  ratio?: number
}

export const RatioImage = ({
  src,
  alt,
  blurDataURL,
  height = 100,
  width = 16 / 9 * 100,
  ratio = 16 / 9
}: RatioImageProps) => {
  const imageSize = React.useMemo(() => {
    if (height && width) {
      return { height, width }
    }

    if (height) {
      return { height, width: height * ratio }
    }

    if (width) {
      return { height: width / ratio, width }
    }
  }, [height, width, ratio])

  return (
    <Box
      style={{
        position: 'relative',
        ...imageSize
      }}
    >
      <Image
        src={src}
        {...(blurDataURL && {
          blurDataURL,
          placeholder: 'blur'
        })}
        fill
        style={{ objectFit: 'cover' }}
        alt={alt}
      />
    </Box>
  )
}

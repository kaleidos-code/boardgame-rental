'use client'

import { Image, Flex } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import React from 'react'
import { FileDataFragment } from '@typings/graphql'

export type ImageCarouselProps = {
  images: FileDataFragment[]
  fallback?: string
  height?: number | string
  indicatorOffset?: number
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, indicatorOffset, height, fallback }) => {
  return (
    <Carousel
      height={height || 200}
      withIndicators={(images?.length || 0) > 1}
      withControls={(images?.length || 0) > 1}
      loop
      styles={{
        indicators: {
          bottom: indicatorOffset || 0
        }
      }}
    >
      {!images.length && fallback && (
        <Image
          h="100%"
          w="auto"
          fit='contain'
          src={fallback}
        />
      )}
      {images.map((image) => (
        <Carousel.Slide
          key={image.id}
        >
          <Flex
            h="100%"
            w="100%"
            align="center"
            justify="center"
          >
            <Image
              h="100%"
              w="auto"
              src={image.url || ''}
            />
          </Flex>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

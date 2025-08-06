import { useEffect, useRef } from 'react'

export type UseDebounceProps = {
  callback: (...args: any[]) => void
  delay: number
}

export const useDebounce = ({ callback, delay }: UseDebounceProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedCallback
}

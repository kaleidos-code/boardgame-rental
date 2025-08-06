import React from 'react'
import { Button, ButtonProps } from '@mantine/core'

function AppleIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      width="20"
      height="20"
      {...props}
    >
      <g clipPath="url(#clip0_22_1302)">
        <path d="M17.0545 6.86314C16.9548 6.94054 15.1936 7.93292 15.1936 10.1396C15.1936 12.6919 17.4346 13.5948 17.5017 13.6172C17.4914 13.6722 17.1457 14.8538 16.3201 16.0577C15.584 17.1172 14.8152 18.1749 13.6457 18.1749C12.4762 18.1749 12.1752 17.4956 10.8251 17.4956C9.50934 17.4956 9.04152 18.1973 7.97175 18.1973C6.90197 18.1973 6.15553 17.217 5.2973 16.013C4.30319 14.5993 3.5 12.4029 3.5 10.3184C3.5 6.97494 5.67396 5.20172 7.81351 5.20172C8.95037 5.20172 9.89804 5.94816 10.6118 5.94816C11.2912 5.94816 12.3506 5.157 13.644 5.157C14.1342 5.157 15.8953 5.20172 17.0545 6.86314ZM13.03 3.74152C13.5649 3.10688 13.9432 2.22629 13.9432 1.3457C13.9432 1.22359 13.9329 1.09975 13.9106 1C13.0403 1.03268 12.0049 1.57961 11.3806 2.30369C10.8904 2.86093 10.4329 3.74152 10.4329 4.63415C10.4329 4.7683 10.4553 4.90246 10.4656 4.94545C10.5206 4.95577 10.6101 4.96781 10.6995 4.96781C11.4803 4.96781 12.4624 4.44496 13.03 3.74152Z" fill="black"/>
      </g>
      <defs>
        <clipPath id="clip0_22_1302">
          <rect width="14" height="17.199" fill="white" transform="translate(3.5 1)"/>
        </clipPath>
      </defs>
    </svg>

  )
}

export function AppleButton (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button
    leftSection={<AppleIcon />}
    variant="default"
    styles={{
      root: {
        borderColor: 'blue.5'
      }
    }}
    {...props}
  />
}

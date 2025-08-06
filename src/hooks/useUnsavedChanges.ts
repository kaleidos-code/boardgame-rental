'use client'

import React from 'react'

type UseUnsavedChangesProps = {
  when: boolean;
};

export const useUnsavedChanges = ({ when }: UseUnsavedChangesProps) => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (when) {
      e.preventDefault()
      e.returnValue = true
    }
  }

  React.useEffect(() => {
    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [when])
}

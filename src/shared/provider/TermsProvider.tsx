'use client'

import React from 'react'
import { useAuthSession } from '@hooks/useAuthSession'
import { useAppSelector } from '@services/store/store'
import { RoleTypes } from '@typings/roles'
import { useUnacceptedTerms } from '@hooks/useUnacceptedTerms'

import { TermsAcceptModal } from '../components/ui/TermsAcceptModal'
import Snackbar, { SnackbarHandler } from '../components/ui/Snackbar'

export type TermsManagerHandler = {
  showTerms: () => void
}

type TermsManagerRenderFn = React.ForwardRefRenderFunction<TermsManagerHandler, {}>

const IGNORE_ROUTES = ['privacy', 'terms']

const TermsManagerContent:TermsManagerRenderFn = (props, ref) => {
  const session = useAuthSession()
  const unacceptableTerms = useUnacceptedTerms()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { notShowAgain } = useAppSelector(({ app }) => app)

  const [showTerms, setShowTerms] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    showTerms: () => {
      setShowTerms(true)
    }
  }), [])

  React.useEffect(() => {
    if (!session?.user || notShowAgain?.includes('terms')) {
      return
    }

    if (session?.user.role?.key !== RoleTypes.User) {
      return
    }

    if (unacceptableTerms.length > 0 && !IGNORE_ROUTES.includes(window.location.pathname.split('/')[1])) {
      setShowTerms(true)
    }
  }, [session, unacceptableTerms, notShowAgain])

  const handleOnClose = () => {
    setShowTerms(false)
  }

  const handleOnSuccess = (msg: string) => {
    snackbBarRef.current?.handleSuccessMessage(msg)

    if (window.location.pathname === '/rental-cart') {
      window.location.reload()
    }
  }

  return <>
    <TermsAcceptModal
      opened={showTerms}
      onSuccess={handleOnSuccess}
      onError={(error) => snackbBarRef.current?.handleErrorMessage(error)}
      onClose={handleOnClose}
    />

    <Snackbar ref={snackbBarRef} />
  </>
}

const TermsManager = React.forwardRef(TermsManagerContent)

export type TermsProviderContextType = {
  termsManagerRef: React.RefObject<TermsManagerHandler>
}

const TermsProviderContext = React.createContext<TermsProviderContextType>(
  {} as any
)

export const TermsProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
  const termsManagerRef = React.useRef<TermsManagerHandler>(null)

  return (
    <TermsProviderContext.Provider value={{ termsManagerRef }}>
      <TermsManager ref={termsManagerRef} />
      {children}
    </TermsProviderContext.Provider>
  )
}

export const useTermsContext = () => React.useContext(TermsProviderContext)

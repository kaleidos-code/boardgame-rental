'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmModal, ConfirmModalProps } from '@shared/components/ui/ConfirmModal'

export type GlobalModalProps = React.PropsWithChildren & {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  modalProps?: Partial<ConfirmModalProps>
};

export enum GlobalModalType {
  UNSAVED_CHANGES = 'unsavedChanges',
  DELETE_ENTRY = 'deleteEntry',
  DEFAULT = 'default'
}

export type ModalManagerHandler = {
  showModal: (type: GlobalModalType, properties?: GlobalModalProps) => void
}

type ModalManagerRenderFn = React.ForwardRefRenderFunction<ModalManagerHandler, {}>

const ModalManagerContent:ModalManagerRenderFn = (props, ref) => {
  const { t } = useTranslation()

  const [modalType, setModalType] = React.useState<GlobalModalType>()
  const [globalProps, setGlobalProps] = React.useState<GlobalModalProps>()
  const [showModal, setShowModal] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    showModal: (type: GlobalModalType, properties?: GlobalModalProps) => {
      setModalType(type)
      setGlobalProps(properties)
      setShowModal(true)
    }
  }), [])

  const handleOnClose = () => {
    globalProps?.cancelCallback?.()
    setShowModal(false)
  }

  const handleOnConfirm = async () => {
    await globalProps?.confirmCallback?.()
    setShowModal(false)
  }

  return modalType
    ? <ConfirmModal
        opened={showModal}
        onClose={handleOnClose}
        onConfirm={handleOnConfirm}
        {...{
          ...globalProps?.modalProps,
          title: globalProps?.modalProps?.title || t(`modal.${modalType}.title`)
        }}
    >
      {globalProps?.modalProps?.children || (
        t(`modal.${modalType}.message`)
      )}
    </ConfirmModal>
    : null
}

const ModalManager = React.forwardRef(ModalManagerContent)

export type ModalProviderContextType = {
  modalManagerRef: React.RefObject<ModalManagerHandler>
}

const ModalProviderContext = React.createContext<ModalProviderContextType>(
  {} as any
)

export const ModalProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
  const modalManagerRef = React.useRef<ModalManagerHandler>(null)

  return (
    <ModalProviderContext.Provider value={{ modalManagerRef }}>
      <ModalManager ref={modalManagerRef} />
      {children}
    </ModalProviderContext.Provider>
  )
}

export const useModalContext = () => React.useContext(ModalProviderContext)

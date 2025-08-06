'use client'

import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Resource, createInstance } from 'i18next'
import initTranslations from '@services/i18n/i18n'

export type TranslationsProviderProps = {
  children: React.ReactNode;
  locale: string;
  resources?: Resource;
};

export default function TranslationsProvider ({
  children,
  locale,
  resources
}: TranslationsProviderProps) {
  const i18n = createInstance()

  initTranslations(locale, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

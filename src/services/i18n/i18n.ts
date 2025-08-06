import { Resource, createInstance, i18n } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'

import i18nConfig from '../../../i18nconfig.mjs'

export default async function initTranslations (
  locale: string,
  i18nInstance?: i18n,
  resources?: Resource
) {
  const newI18nInstance = i18nInstance || createInstance()

  newI18nInstance.use(initReactI18next)

  if (!resources) {
    newI18nInstance.use(
      resourcesToBackend(
        (language: string) => {
          return import(`../../locales/${language}/translation.json`)
        }
      )
    )
  }

  await newI18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    preload: resources ? [] : i18nConfig.locales
  })

  return {
    i18n: newI18nInstance,
    resources: newI18nInstance.services.resourceStore.data,
    t: newI18nInstance.t
  }
}

// This file enables TypeScript autocompletion for translation keys
// It's automatically generated based on your English translation file

type Messages = typeof import('../../messages/en.json')

export {}

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

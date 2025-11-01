import HeaderClient from './header-client'

// Server wrapper that injects server-rendered auth links into the interactive header.
export default async function FontendHeader() {
  return <HeaderClient />
}

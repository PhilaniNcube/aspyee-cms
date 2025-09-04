import React from 'react'
import HeaderClient from './header-client'
import AuthLinks from './auth-links'

// Server wrapper that injects server-rendered auth links into the interactive header.
export default async function FontendHeader() {
  return <HeaderClient auth={<AuthLinks />} />
}

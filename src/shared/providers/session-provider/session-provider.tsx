"use client";

import { SessionProvider as SessionProviderMain} from "next-auth/react"

import React from 'react'

export function SessionProvider({children}: {children: React.ReactNode}){
  return (
    <SessionProviderMain>{children}</SessionProviderMain>
  )
}
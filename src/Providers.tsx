// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './chakra/themes'
import { RecoilRoot } from 'recoil'

export default function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  )
}
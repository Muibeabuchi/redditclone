'use client'

import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const OAuthButtons:React.FC = () => {
  return (
    <Flex direction='column' mb={2} width='100%'>
      <Button leftIcon={<FcGoogle />} variant={'oauth'} mb={2}>Sign In With Google</Button>
    </Flex>
  )
}

export default OAuthButtons

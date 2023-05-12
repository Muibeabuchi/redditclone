'use client'

import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/errors'

const OAuthButtons:React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
    <Flex direction='column' mb={2} width='100%'>
      <Button leftIcon={<FcGoogle />} isLoading={loading} onClick={()=>signInWithGoogle()} variant={'oauth'} mb={2}>Sign In With Google</Button>
      {error && <Text>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
    </Flex>
  )
}

export default OAuthButtons

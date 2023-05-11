'use client'

import { authModalState } from "@/atoms/AuthModalAtom";
import {useRecoilValue} from 'recoil';
import { Flex } from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthInputs() {
    const modalState = useRecoilValue(authModalState)
  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
        {
            modalState.view == 'login' &&
             <Login /> 
            // ):(
            // <SignUp />
            // )
        }
        {
            modalState.view === 'signup'  && <SignUp /> 
        }
    </Flex>
  )
} 

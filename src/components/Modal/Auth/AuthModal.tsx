'use client'

import { authModalState } from "@/atoms/AuthModalAtom";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";



const AuthModal:React.FC=()=>{
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, loading, error] = useAuthState(auth);
    const [modalState,setModalState] = useRecoilState(authModalState)
    const handleClose =()=>{
        setModalState(prevState=>({
            ...prevState,
            open: false
    }))
    };

    useEffect(()=>{
      if(user) handleClose()
    },[user])

    return (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
  
        <Modal  isOpen={modalState.open} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent >
            <ModalHeader textAlign='center'>
                {modalState.view === 'login' && 'Login'}
                {modalState.view === 'signup' && 'Sign Up'}
                {modalState.view === 'resetpassword' && 'Reset Password'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display='flex' alignItems='center' justifyContent='center' flexDirection='column' pb={6} >
                <Flex direction='column' align='center' justify='center' width='70%' >
                    <OAuthButtons />
                    <Text fontWeight={700} color='gray.500'>OR</Text>
                    <AuthInputs />
                    {/* <ResetPassword /> */}
                </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default AuthModal;
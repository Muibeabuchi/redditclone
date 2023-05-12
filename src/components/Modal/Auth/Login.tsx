'use client'

import { authModalState } from '@/atoms/AuthModalAtom'
import {useSetRecoilState} from 'recoil'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import {useState} from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/errors'



const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const setAuthModal = useSetRecoilState(authModalState)
    const [loginForm,setLoginForm] = useState({
        email:'',
        password:'',
    })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        // update form state
        setLoginForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        signInWithEmailAndPassword(loginForm.email,loginForm.password)
    }
  return (
    <form onSubmit={onSubmit}>
        <Input onChange={onChange}required name='email' type='email' placeholder='Email' fontSize='10pt' _placeholder={{color:'gray.500'}} _hover={{
            border:'1px solid',
            bg:'white',
            borderColor:'blue.500'
        }}
        _focus={{
            outline:'none',
            border:'1px solid',
            background:'white',
            borderColor:'blue.500'
        }}
        background='gray.100'
        mb={2}
        />
        <Input required onChange={onChange} type='password' name='password' placeholder='Password'fontSize='10pt'
        _hover={{
            border:'1px solid',
            bg:'white',
            borderColor:'blue.500'
        }}
        _focus={{
            outline:'none',
            border:'1px solid',
            background:'white',
            borderColor:'blue.500'
        }}
        background='gray.100'
        mb={2}
        />
        <Button type='submit' height='36px' width='100%' mb={2} mt={2} isLoading={loading}>Log In</Button>
        {error && <Text textAlign={'center'} color={'red'} fontSize={'10pt'}>{FIREBASE_ERRORS[error?.message  as  keyof  typeof FIREBASE_ERRORS]}</Text>}
        <Flex fontSize='9pt' justify='center'>
            <Text mr={1}>New Here?</Text>
            <Text onClick={()=>setAuthModal(prev=>({...prev,view:'signup'}))} color='blue.500' fontWeight={700} cursor='pointer' >Sign Up?</Text>
        </Flex>
    </form>
  )
}

export default Login
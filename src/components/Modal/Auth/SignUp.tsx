'use client'

import { authModalState } from "@/atoms/AuthModalAtom"
import { Input, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useSetRecoilState } from "recoil"


const SignUp:React.FC= () => {
    const setAuthModal = useSetRecoilState(authModalState)
    const [signup,setSignupForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        // update form state
        setSignupForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    // const onSubmit=(e:React.ChangeEvent<HTMLInputElement>)=>{
    //     e.preventDefault()
        
    // }
  return (
    <form>
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
        <Input required onChange={onChange} type='password' name='confirmPassword' placeholder='Confirm Password'fontSize='10pt'
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
        <Button type='submit' height='36px' width='100%' mb={2} mt={2   }>Sign Up</Button>
        <Flex fontSize='9pt' justify='center'>
            <Text mr={1}>Already a Redditor?</Text>
            <Text onClick={()=>setAuthModal(prev=>({...prev,view:'login'}))} color='blue.500' fontWeight={700} cursor='pointer' >Login</Text>
        </Flex>
    </form>
  )
}

export default SignUp
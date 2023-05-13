'use client'

import { Flex } from "@chakra-ui/react"
import AuthButtons from "./AuthButtons"
import AuthModal from "@/components/Modal/Auth/AuthModal"
import { User } from "firebase/auth"
import Icons from "../Icons"
import UserMenu from './UserMenu'


type RightContentProps ={
  user?:User | null ;
}

const RightContent:React.FC<RightContentProps>= ({user}) => {
  console.log(user)
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        {user ?  <Icons />:<AuthButtons /> }
        <UserMenu user={user}/>
      </Flex>
    </>
  )
}

export default RightContent
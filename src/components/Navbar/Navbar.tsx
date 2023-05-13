'use client'

import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/clientApp"



export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg='white' height='44px' padding='6px 12px'>
      <Flex align='center' mr={1}>
        <Image src='/images/redditFace.svg' height='30px'   alt='navbar logo image'/>
        <Image src='/images/redditText.svg'display={['none','uset']} height='46px' alt='navbar logo text'/>
      </Flex>
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  )
}

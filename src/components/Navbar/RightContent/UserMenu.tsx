import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button,MenuDivider, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
// import React from 'react'
import { User, signOut } from "firebase/auth"
import {FaRedditSquare} from 'react-icons/fa'
import {BiChevronDown} from 'react-icons/bi'
import {VscAccount} from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineLogin} from 'react-icons/md'
import { auth } from '@/firebase/clientApp'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/AuthModalAtom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { IoSparkles } from 'react-icons/io5'



type UserMenuProps ={
    user?:User | null;
 }

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
  const setAuthModalState = useSetRecoilState(authModalState)
  // const [user,loading,error] = useAuthState(auth)
  return (
    <Menu>
  {/* {({ isOpen }) => ( */}
      <MenuButton cursor={'pointer'} padding={'0px 6px'} borderRadius={4} _hover={{outline:'1px solid ' ,outlineColor:'gray.200'}}>
        <Flex align={'center'}>
          <Flex align={'center'}>
            {!user?.uid ?
                (<>
                  <Icon as={VscAccount} fontSize={24} mr={1}color={'gray.300'} />
                </>)
                :(
                  <Flex align={'center'}>
                    <Icon as={FaRedditSquare} fontSize={24} color='gray.400' mr={1}/>
                    <Flex direction={'column'} display={{base:'none',lg:'flex'}} fontSize={'8pt'} align='flex-start' mr={5} >
                      <Text fontWeight={700}>{user?.displayName || user?.email?.split('@')[0]}</Text>
                      <Flex align='center'>
                        <Icon as={IoSparkles} mr={1} color={'brand.100'} />
                        <Text color='gray.400' >1 karma</Text>
                      </Flex>
                    </Flex>
                  </Flex>)
              }
          </Flex>
          <BiChevronDown />
         </Flex>
      </MenuButton>
      <MenuList>
        {
          user ? (
            <>
              <MenuItem fontSize={'10pt'} fontWeight={700} _hover={{bg:'blue.500',color:'white'}}>
          <Flex align={'center'}>
            <Icon fontSize={20} mr={2} as={CgProfile}/>
            Profile
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={()=>signOut(auth)} fontSize={'10pt'} fontWeight={700} _hover={{bg:'blue.500',color:'white'}}>
          <Flex align={'center'}>
            <Icon fontSize={20} mr={2} as={MdOutlineLogin}/>
            Log Out
          </Flex>
        </MenuItem>
            </>
          ):(
            
              <MenuItem onClick={()=>setAuthModalState({open:true,view:'login'})} fontSize={'10pt'} fontWeight={700} _hover={{bg:'blue.500',color:'white'}}>
              <Flex align={'center'}>
                <Icon fontSize={20} mr={2} as={MdOutlineLogin}/>
                Log In / Sign Up
              </Flex>
            </MenuItem>
          )
        }
        
      </MenuList>
  
  {/* // )} */}
</Menu>
  )
}

export default UserMenu
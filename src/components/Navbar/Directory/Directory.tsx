"use client";
// import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
// import React from 'react'
// import { User, signOut } from "firebase/auth"
// import {FaRedditSquare} from 'react-icons/fa'
import { BiChevronDown } from "react-icons/bi";
// import {VscAccount} from 'react-icons/vsc'
// import {CgProfile} from 'react-icons/cg'
// import {MdOutlineLogin} from 'react-icons/md'
// import { auth } from '@/firebase/clientApp'
// import { useSetRecoilState } from 'recoil'
// import { authModalState } from '@/atoms/AuthModalAtom'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { IoSparkles } from 'react-icons/io5'
import { TiHome } from "react-icons/ti";
// import Communities from "./Communities";
type DirectoryPropTypes = {
  children: ReactNode;
};

const Directory: React.FC<DirectoryPropTypes> = ({ children }) => {
  // const [user,loading,error] = useAuthState(auth)
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        mr={2}
        ml={{ base: 0, md: 2 }}
        padding={"0px 6px"}
        borderRadius={4}
        _hover={{ outline: "1px solid ", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon as={TiHome} fontSize={22} mr={{ base: 1, lg: 2 }} />
            <Flex display={{ base: "none", lg: "flex" }} align="center">
              <Text fontWeight={600} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          <BiChevronDown />
        </Flex>
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default Directory;

"use client";

import { authModalState } from "@/atoms/AuthModalAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const CommunityCreatePostLink = () => {
  const [user] = useAuthState(auth);
  const { communitypage } = useParams();
  const router = useRouter();
  const setAuthModal = useSetRecoilState(authModalState);
  // console.log(params);

  const onClick = () => {
    if (!user) {
      setAuthModal({ view: "login", open: true });
      return;
    }
    router.push(`r/${communitypage}/submit`);
  };

  return (
    <Flex
      align="center"
      justify="space-evenly"
      padding={2}
      mb={4}
      borderRadius={4}
      bg="white"
      height="56px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon
        as={BsLink45Deg}
        fontSize={24}
        color={"gray.400"}
        cursor="pointer"
      />
    </Flex>
  );
};

export default CommunityCreatePostLink;

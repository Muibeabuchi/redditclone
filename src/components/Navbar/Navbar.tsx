"use client";

import { Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";
import Communities from "./Directory/Communities";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        mr={{ base: 0, md: 2 }}
        width={{ base: "40px", md: "auto" }}
      >
        <Image
          src="/images/redditFace.svg"
          height="30px"
          alt="navbar logo image"
        />
        <Image
          src="/images/redditText.svg"
          display={["none", "uset"]}
          height="46px"
          alt="navbar logo text"
        />
      </Flex>
      {user && <Directory>{<Communities />}</Directory>}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
}

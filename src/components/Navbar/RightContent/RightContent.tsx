"use client";

import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User } from "firebase/auth";
import Icons from "../Icons";
import UserMenu from "./UserMenu";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

// type RightContentProps = {
//   user?: User | null;
// };

const RightContent: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;

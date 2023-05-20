"use client";

import { authModalState } from "@/atoms/AuthModalAtom";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  //   useEffect(()=>{
  //     if
  //   },[])
  return (
    <>
      <Button
        variant="outline"
        display={{ base: "none", sm: "flex" }}
        height="28px"
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        height="28px"
        mr={2}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;

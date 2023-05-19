"use client";

import { useEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const handleCreateUser = async (user: User) => {
    const userDocRef = doc(db, "users", user?.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userCred) {
      handleCreateUser(userCred.user);
    }
  }, [userCred]);
  return (
    <Flex direction="column" mb={2} width="100%">
      <Button
        leftIcon={<FcGoogle />}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
        variant={"oauth"}
        mb={2}
      >
        Sign In With Google
      </Button>
      {error && (
        <Text>
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;

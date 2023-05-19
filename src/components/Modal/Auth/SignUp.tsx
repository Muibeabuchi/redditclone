"use client";

import { authModalState } from "@/atoms/AuthModalAtom";
import { Input, Button, Flex, Text, FormErrorMessage } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { auth, db } from "@/firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const setAuthModal = useSetRecoilState(authModalState);
  const [createUserWithEmailAndPassword, userCred, loading, formError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update form state
    setSignupForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (error) setError("");
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      // throw new Error('Passwords ')
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };
  const createUserDocument = async (user: User) => {
    await addDoc(collection(db, "users"), JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred?.user);
    }
  }, [userCred]);
  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        required
        name="email"
        type="email"
        placeholder="Email"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          background: "white",
          borderColor: "blue.500",
        }}
        background="gray.100"
        mb={2}
      />
      <Input
        required
        onChange={onChange}
        type="password"
        name="password"
        placeholder="Password"
        fontSize="10pt"
        _hover={{
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          background: "white",
          borderColor: "blue.500",
        }}
        background="gray.100"
        mb={2}
      />
      <Input
        required
        onChange={onChange}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        fontSize="10pt"
        _hover={{
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          background: "white",
          borderColor: "blue.500",
        }}
        background="gray.100"
        mb={2}
      />
      {(error || formError) && (
        <Text textAlign="center" color="red" fontSize={"10pt"}>
          {error ||
            FIREBASE_ERRORS[formError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      {/* <FormErrorMessage></FormErrorMessage> */}
      <Button
        type="submit"
        height="36px"
        width="100%"
        mb={2}
        mt={2}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>Already a Redditor?</Text>
        <Text
          onClick={() => setAuthModal((prev) => ({ ...prev, view: "login" }))}
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          Login
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;

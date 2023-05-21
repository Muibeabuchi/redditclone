"use client";

import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function PostErrorAlert({}: Props) {
  return (
    <Alert status="error">
      <AlertIcon />
      <Text>Error creating post</Text>
    </Alert>
  );
}

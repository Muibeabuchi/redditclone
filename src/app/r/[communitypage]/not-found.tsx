"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Community404() {
  return (
    <Flex justify="center" align="center" minHeight="60vh" direction="column">
      <Text>Sorry that community does not exist or has been banned</Text>
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
}

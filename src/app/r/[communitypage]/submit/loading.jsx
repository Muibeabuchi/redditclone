"use client";

import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const SubmitPageLoading = () => {
  return (
    <Flex minH="90vh" align="center" justify="center" width="100%">
      <Spinner size="xl" color="blue.400" emptyColor="white" />
    </Flex>
  );
};

export default SubmitPageLoading;

"use client";

import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

// type Props = {}

const PostLoader = () => {
  return (
    <Stack spacing={6}>
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText noOfLines={1} mt="4" width={"40%"} spacing={"4"} />
        <SkeletonText noOfLines={4} mt="4" spacing={"4"} />
        <Skeleton mt="4" height="200px" />
      </Box>
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText noOfLines={1} mt="4" width={"40%"} spacing={"4"} />
        <SkeletonText noOfLines={4} mt="4" spacing={"4"} />
        <Skeleton mt="4" height="200px" />
      </Box>
    </Stack>
  );
};

export default PostLoader;

"use client";

import { Community } from "@/atoms/communitiesAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";

type CommunityHeaderProps = {
  communityData: Community;
};
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  return (
    <Flex direction={"column"} width={"100%"} height="146px">
      Header
    </Flex>
  );
};

export default CommunityHeader;

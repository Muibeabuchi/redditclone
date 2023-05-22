"use client";

import { Community } from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

// import { useDocument } from "react-firebase-hooks/firestore";
// import { doc } from "firebase/firestore";
// import { db } from "@/firebase/clientApp";
// import { useParams } from "next/navigation";

type CommunityHeaderProps = {
  communityData: Community;
};
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  // const { communitypage } = useParams();
  // const [snapshotValue, snapshotLoading, snapshotError] = useDocument(
  //   doc(db, "community", communitypage)
  // {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // }
  // );
  // const communitySnapshotData = snapshotValue?.data();
  // ?.docs?.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));
  // console.log(communitySnapshotData);

  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  // console.log(isJoined);
  return (
    <Flex direction={"column"} width={"100%"} height="146px">
      <Box height="50%" width="100%" bg="blue.400"></Box>
      <Flex flexGrow={1} bg="white" justify="center">
        <Flex width={"95%"} maxW={"860px"}>
          {communityData.imageUrl ? (
            <Image src={communityData.imageUrl} alt="community image" />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              border="4px solid white"
              borderRadius="50%"
              position="relative"
              top="-5px"
              color="blue.400"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize={"10t"} color={"gray.400"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height={"30px"}
              pr={6}
              pl={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;

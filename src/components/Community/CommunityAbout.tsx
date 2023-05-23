"use client";

import { Community } from "@/atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  communityData: Community;
};

const CommunityAbout = ({ communityData }: Props) => {
  const { communitypage } = useParams();
  //   console.log(communitypage);
  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        color="white"
        bg="blue.400"
        borderRadius={"4px 4px 0px 0px"}
        p={3}
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex width={"100%"} p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            p={1}
            align="center"
            width="100%"
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData?.createdAt?.seconds * 1000)
                ).format("MMM DD,YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communitypage}/submit`}>
            <Button mt={3} height="30px" width="100%">
              Create Post
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default CommunityAbout;

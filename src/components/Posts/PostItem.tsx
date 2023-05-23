"use client";
import { Post } from "@/atoms/PostsAtom";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowBackCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoArrowDownCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type Props = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

function PostItem({
  post,
  userIsCreator,
  onDeletePost,
  onSelectPost,
  onVote,
  userVoteValue,
}: Props) {
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete the post");
      }
      // console.log("post was successfully deleted");
      setLoadingDelete(false);
    } catch (error: any) {
      setError(error.message);
      // console.log("failed to delete the post");
      setLoadingDelete(false);
    }
  };
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={onVote}
          cursor={"pointer"}
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={onVote}
          cursor={"pointer"}
        />
      </Flex>
      <Flex direction={"column"} width="100%">
        <Stack spacing={1} p="10px">
          <Stack
            direction={"row"}
            spacing={0.6}
            align={"center"}
            fontSize={"9pt"}
          >
            {/* home page check */}
            <Text mr={3}>
              Posted by u/{post.creatorDisplayName}
              {""}
            </Text>
            <Text>
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageURL && (
            <Flex justify={"center"} align="center" p={2}>
              <Skeleton isLoaded={!loadingImage}>
                <Image
                  src={post.imageURL}
                  alt="post image"
                  maxH="460px"
                  onLoad={() => setLoadingImage(false)}
                />
              </Skeleton>
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={"9pt"}>Share</Text>
          </Flex>
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={"9pt"}>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={"9pt"}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostItem;

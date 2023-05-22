"use client";

import { Post } from "@/atoms/PostsAtom";
import { Community } from "@/atoms/communitiesAtom";
// import
import { auth, db } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";

type Props = {
  communityData: Community;
  // userId?:string
};

const Posts = ({ communityData }: Props) => {
  const { postStateValue, setPostValue, onDeletePost, onSelectPost, onVote } =
    usePosts();
  // useauthstate hook here
  const [user] = useAuthState(auth);
  const [loading, setLoading] = React.useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      // get posts for thsi community
      const postsQuery = query(
        collection(db, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(posts);
      setPostValue((post) => ({
        ...post,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("posts error", error.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getPosts();
  }, []);
  return (
    <Stack spacing={2}>
      {postStateValue.posts.map((post) => (
        <PostItem
          key={post.id}
          onDeletePost={onDeletePost}
          onSelectPost={onSelectPost}
          onVote={onVote}
          post={post}
          userIsCreator={user?.uid === post.creatorId}
          userVoteValue={undefined}
        />
      ))}
    </Stack>
  );
};

export default Posts;

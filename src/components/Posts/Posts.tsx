"use client";

import { Post } from "@/atoms/PostsAtom";
import { Community } from "@/atoms/communitiesAtom";
// import
import { db } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React from "react";

type Props = {
  communityData: Community;
  // userId?:string
};

const Posts = ({ communityData }: Props) => {
  const { postStateValue, setPostValue } = usePosts();
  // useauthstate hook here
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
  return <div>Posts</div>;
};

export default Posts;

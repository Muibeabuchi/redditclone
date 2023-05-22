import { postState } from "@/atoms/PostsAtom";
import React from "react";
import { useRecoilState } from "recoil";

// type Props = {};

const usePosts = () => {
  const [postStateValue, setPostValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostValue,
  };
};

export default usePosts;

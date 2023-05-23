import { Post, postState } from "@/atoms/PostsAtom";
import { db, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

// type Props = {};

const usePosts = () => {
  const [postStateValue, setPostValue] = useRecoilState(postState);
  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // check if image exists,delete it if it exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      // delete post document from firestore
      const postDocRef = doc(db, `posts/${post.id!}`);
      await deleteDoc(postDocRef);

      // update recoil state
      setPostValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error: any) {
      return false;
    }
  };

  return {
    postStateValue,
    setPostValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;

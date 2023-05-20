"use client";

import { authModalState } from "@/atoms/AuthModalAtom";
import {
  Community,
  CommunitySnippet,
  communitiesState,
} from "@/atoms/communitiesAtom";
import { auth, db } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const setModalState = useSetRecoilState(authModalState);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communitiesState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // function that decides whether to leave or join a community or open he auth modal
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    if (!user) {
      setModalState({ open: true, view: "login" });
      return;
    }
    // if not => open the auth modal and prompt them to sign in

    // checking if user is joined in order to leave or join the community
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }

    // if user is not a member of this commuity=>then...
    joinCommunity(communityData);
  };

  // function for fetching snippets from user
  const getMySnippets = async () => {
    setLoading(true);
    try {
      // create reference to snippets in user subcolletion
      const userCommunitySnipetsRef = collection(
        db,
        `users/${user?.uid}/communitySnippets`
      );
      // get user snippet
      const userSnippetDocs = await getDocs(userCommunitySnipetsRef);
      //   iterate over the snippets and return only data
      const snippets = userSnippetDocs.docs.map((doc) => ({ ...doc.data() }));

      // set snippet to state value
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
  };
  // function for leaving or joining community
  const leaveCommunity = async (communityId: string) => {
    try {
      // create a batch
      const batch = writeBatch(db);
      // delete the community snippet fro the user collection
      const snippetDocRef = doc(
        db,
        `users/${user?.uid}/communitySnippets/${communityId}`
      );
      batch.delete(snippetDocRef);
      // update community field in community collection
      batch.update(doc(db, `community/${communityId}`), {
        numberOfMembers: increment(-1),
      });
      //   execute the batch write
      await batch.commit();
      // update the communitySnippet in the communityState
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("delete community error" + error.message);
      setError(error.message);
    }
  };
  const joinCommunity = async (communitydata: Community) => {
    try {
      // batch write
      const batch = writeBatch(db);
      // creating a new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communitydata.id,
        imageUrl: communitydata.imageUrl || "",
      };
      // write newsnippet to database
      batch.set(
        doc(db, `users/${user?.uid}/communitySnippets`, communitydata.id),
        newSnippet
      );
      // update community field in community collection
      batch.update(doc(db, `community/${communitydata.id}`), {
        numberOfMembers: increment(1),
      });

      // execute the batch write
      await batch.commit();

      // update recoil state on client to reflectbthese changes
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("join community error" + error.message);
      setError(error.message);
    }
  };

  //   useEffect that runs upon initial render and whenever user changes
  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    // returning state and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;

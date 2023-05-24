import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { useParams } from "next/navigation";

// type Props = { communityPage: string };

const useLiveCommunityData = (communityPage: string) => {
  //   const { communitypage } = useParams();
  const [snapshotValue, snapshotLoading, snapshotError] = useDocument(
    doc(db, "community", communityPage)
  );
  const communitySnapshotData = snapshotValue?.data();

  //   console.log(communitySnapshotData);
  return { communitySnapshotData, snapshotLoading };
};

export default useLiveCommunityData;

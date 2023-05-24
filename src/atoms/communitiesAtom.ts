import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "private" | "public" | "restricted";
  createdAt?: Timestamp;
  imageUrl?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageUrl: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  // visited commuities
  // currentCommunity:Community;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  // currentCommunity:{}
};

export const communitiesState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});

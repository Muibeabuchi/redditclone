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

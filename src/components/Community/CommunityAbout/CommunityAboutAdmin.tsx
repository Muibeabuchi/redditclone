"use client";

import { Community, communitiesState } from "@/atoms/communitiesAtom";
import { auth, db, storage } from "@/firebase/clientApp";
import useLiveCommunityData from "@/hooks/useLiveCommunityData";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

type Props = {
  communityData: Community;
};

const CommunityAboutAdmin = ({ communityData }: Props) => {
  const [user] = useAuthState(auth);
  const { communitypage } = useParams();
  const { selectedFile, setSelectedFile, onSelectImage } = useSelectFile();
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const selectedFileRef = React.useRef<HTMLInputElement>(null);
  const { communitySnapshotData, snapshotLoading } =
    useLiveCommunityData(communitypage);
  // const setCommunityStateValue = useSetRecoilState(communitiesState);
  // create function for updating the community imageUrl
  async function onUpdateImage() {
    console.log("startr uploading");
    if (!selectedFile) return;
    console.log("there is a selected file");
    setUploadingImage(true);
    try {
      // create a reference to the image you wana create
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      // upload the image to the cloud storage
      await uploadString(imageRef, selectedFile, "data_url");
      // get the download url
      const downloadUrl = await getDownloadURL(imageRef);
      // update the image url in the community document
      await updateDoc(doc(db, "community", communityData.id), {
        imageUrl: downloadUrl,
      });
      setSelectedFile("");

      // Do i really need to update my recoil state?
      // setCommunityStateValue(prev=>({
      //   ...prev,
      //   currentCommunity:{...prev.currentCommunity,imageUrl:downloadUrl} as Community
      // }))

      setUploadingImage(false);
    } catch (error: any) {
      console.log("update community image url " + error.mesage);
      setUploadingImage(false);
    }
  }
  console.log(communityData);
  return (
    <>
      {user?.uid === communityData.creatorId && (
        <>
          <Divider />
          <Stack spacing={1} fontSize="10pt">
            <Text fontWeight={700}>Admin</Text>
            <Flex align="center" justify="space-between">
              <Text
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => selectedFileRef?.current?.click()}
              >
                Change Image
              </Text>
              <input
                hidden
                ref={selectedFileRef}
                type="file"
                onChange={onSelectImage}
              />
              {communitySnapshotData ||
              communityData?.imageUrl ||
              selectedFile ? (
                <Image
                  src={
                    selectedFile ||
                    communityData?.imageUrl ||
                    communitySnapshotData?.imageUrl
                  }
                  alt="community image url"
                  borderRadius={4}
                  boxSize="40px"
                />
              ) : (
                <Icon as={FaReddit} fontSize={40} color="brand.100" mr={2} />
              )}
            </Flex>
            {selectedFile &&
              (uploadingImage ? (
                <Spinner />
              ) : (
                <Flex
                  fontWeight={600}
                  padding="4px 6px"
                  bg="gray.300"
                  _hover={{ bg: "blue.400" }}
                  cursor="pointer"
                  borderRadius={5}
                  onClick={onUpdateImage}
                  width={"50%"}
                >
                  Save Changes
                </Flex>
              ))}
          </Stack>
        </>
      )}
    </>
  );
};

export default CommunityAboutAdmin;

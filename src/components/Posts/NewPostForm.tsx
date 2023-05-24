"use client";

import { Flex, Icon } from "@chakra-ui/react";
import * as React from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase/clientApp";
import { Post } from "@/atoms/PostsAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import PostErrorAlert from "./PostErrorAlert";
import useSelectFile from "@/hooks/useSelectFile";

interface IAppProps {}

const formTabs: tabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
];

export type tabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FunctionComponent<IAppProps> = (props) => {
  const [user] = useAuthState(auth);
  const { communitypage } = useParams();
  const router = useRouter();
  // console.log(communitypage);
  const [selectedTab, setSelectedTab] = React.useState(formTabs[0].title);
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });
  const { setSelectedFile, selectedFile, onSelectImage } = useSelectFile();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  function onTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTextInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  // function onSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
  //   const reader = new FileReader();
  //   if (e.target.files?.[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // }

  async function handleCreatePost() {
    if (!textInputs.title) return;
    // create new post object
    const newPost: Post = {
      communityId: communitypage as string,
      creatorId: user!?.uid,
      creatorDisplayName: user!?.email!.split("@")[0],
      body: textInputs.body,
      title: textInputs.title,
      numberOfComments: 0,
      communityImageURL: "",
      createdAt: serverTimestamp() as Timestamp,
      voteStatus: 0,
    };
    // store the post in db

    try {
      setLoading(true);
      const postDocRef = collection(db, `posts`);
      if (textInputs.title) {
        const postDoc = await addDoc(postDocRef, newPost);
        // check for selectedFile
        if (selectedFile) {
          // store in storage =>getDownloadUrl (return imageurl)
          const imageRef = ref(storage, `posts/${postDoc.id}/image`);
          await uploadString(imageRef, selectedFile, "data_url");
          const downloadURL = await getDownloadURL(imageRef);
          // update postdoc by adding imageurl
          await updateDoc(doc(db, `posts/${postDoc.id}`), {
            imageURL: downloadURL,
          });
        }
        // redirect user back to the community page
        router.back();
      }
      setLoading(false);
    } catch (error: any) {
      console.log(`handlecreatepost error : ${error.message}`);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Flex direction="column" bg="white" mt={2} borderRadius={4}>
      {/* <> */}
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {/* <NewPostForm /> */}
      {error && <PostErrorAlert />}
    </Flex>
  );
};

export default NewPostForm;

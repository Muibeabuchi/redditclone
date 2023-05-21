"use client";

import { Flex, Icon } from "@chakra-ui/react";
import * as React from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";

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
  const [selectedTab, setSelectedTab] = React.useState(formTabs[0].title);
  const [textInputs, setTextInputs] = React.useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  function onTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTextInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function onSelectImage() {}

  async function handleCreatePost() {}
  return (
    <Flex direction="column" bg="white" mt={2} borderRadius={4}>
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
      </Flex>
    </Flex>
  );
};

export default NewPostForm;

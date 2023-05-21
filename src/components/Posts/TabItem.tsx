"use client";

import * as React from "react";
import { tabItem } from "./NewPostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";

interface IAppProps {
  item: tabItem;
  selected: boolean;
  //   setSelectedTab: React.Dispatch<React.SetStateAction<string>>
  setSelectedTab: (value: string) => void;
}

const TabItem: React.FunctionComponent<IAppProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.400" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" mr={2} height="20px">
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItem;

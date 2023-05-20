"use client";
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Flex justify="center" padding="16px 0px">
      <Flex width="95%" maxW="860px">
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageLayout;

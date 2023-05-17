// import * as React from 'react';
"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
  Stack,
  VStack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { HiLockClosed } from "react-icons/hi";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";

export interface CreateCommunityModal {
  open: boolean;
  handleClose: () => void;
}

export default function CreateCommunityModal({
  open,
  handleClose,
}: CreateCommunityModal) {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [commuityType, setCommunityType] = useState("public");
  function onCommuityTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.name);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  }
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            fontSize={15}
            flexDirection="column"
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <ModalCloseButton />
          <Box pl={3} pr={3}>
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="27px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                value={communityName}
                position="relative"
                size={"sm"}
                pl="22px"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                onChange={handleChange}
              />
              <Text
                color={charsRemaining === 0 ? "red" : "gray.500"}
                fontSize={"9pt"}
              >
                {charsRemaining} characters remaining
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                {/* Checkbox */}
                <VStack spacing={2} align={"start"}>
                  <Checkbox
                    name="private"
                    isChecked={commuityType === "private"}
                    onChange={onCommuityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillPersonFill} color="gray.500" pt={1} />
                      <Text fontSize="10pt" mr={2}>
                        Private
                      </Text>
                      <Text
                        fontSize={["6pt", "8pt", "9pt"]}
                        pt={1}
                        color="gray.500"
                      >
                        Anyone can view, post and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="public"
                    isChecked={commuityType === "public"}
                    onChange={onCommuityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} color="gray.500" pt={1} />
                      <Text fontSize="10pt" mr={2}>
                        Public
                      </Text>
                      <Text
                        fontSize={["6pt", "8pt", "9pt"]}
                        pt={1}
                        color="gray.500"
                      >
                        Anyone can view this community but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={commuityType === "restricted"}
                    onChange={onCommuityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} color="gray.500" pt={1} />
                      <Text fontSize="10pt" mr={2}>
                        Restricted
                      </Text>
                      <Text
                        fontSize={["6pt", "8pt", "9pt"]}
                        pt={1}
                        color="gray.500"
                      >
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>{" "}
                  </Checkbox>
                </VStack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button height="30px">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

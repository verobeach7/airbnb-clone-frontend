import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogPositioner,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser, FaUserEdit } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

export default function SignUpModal() {
  return (
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Sign up</Dialog.Title>
          </Dialog.Header>
          <DialogBody>
            <VStack>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaUserEdit />
                  </Box>
                }
              >
                <Input variant={"subtle"} placeholder="Name" />
              </InputGroup>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              >
                <Input variant={"subtle"} placeholder="Email" />
              </InputGroup>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaUser />
                  </Box>
                }
              >
                <Input variant={"subtle"} placeholder="Username" />
              </InputGroup>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              >
                <Input variant={"subtle"} placeholder="Password" />
              </InputGroup>
            </VStack>
            <Button mt={4} colorPalette={"red"} w={"100%"}>
              Log in
            </Button>
            <SocialLogin />
          </DialogBody>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </DialogPositioner>
    </Portal>
  );
}

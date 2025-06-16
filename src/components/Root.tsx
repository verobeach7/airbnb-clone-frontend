import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogPositioner,
  DialogTrigger,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FaAirbnb, FaLock, FaMoon, FaUser } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box>
      {/* px, py는 css에는 없는 단축어 */}
      <HStack
        justifyContent={"space-between"}
        px={10}
        py={5}
        borderBottomWidth={1}
      >
        <Box color="red.500">
          {/* 만약 FaAirbnb에서 color 속성을 변경하려고 하면 red.500같은 자동완성이 지원되지 않음. 대신 Chakra UI의 Box 컴포넌트로 감싸고 여기에 Chakra의 자동완성을 사용하면 Child Component에 상속되어짐 */}
          <FaAirbnb size={"48"} />
        </Box>
        {/* spacing이 v3에서는 gap으로 변경됨 */}
        <HStack gap={2}>
          <IconButton variant={"ghost"} aria-label="Toggle dark mode">
            <FaMoon />
          </IconButton>
          <Dialog.Root size={"lg"} motionPreset={"scale"}>
            <DialogTrigger>
              <Button>Log in</Button>
            </DialogTrigger>
            <Portal>
              <DialogBackdrop />
              <DialogPositioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <DialogBody>
                    <VStack>
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
                  </DialogBody>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </DialogPositioner>
            </Portal>
          </Dialog.Root>
          <Button colorPalette={"red"}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}

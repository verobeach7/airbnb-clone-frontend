import {
  Box,
  Button,
  Dialog,
  DialogTrigger,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  return (
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
          <LoginModal />
        </Dialog.Root>
        <Dialog.Root size={"lg"} motionPreset={"scale"}>
          <DialogTrigger>
            <Button colorPalette={"red"}>Sign up</Button>
          </DialogTrigger>
          <SignUpModal />
        </Dialog.Root>
      </HStack>
    </HStack>
  );
}

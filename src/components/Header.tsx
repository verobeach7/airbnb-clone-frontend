import {
  Box,
  Button,
  Dialog,
  DialogTrigger,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "./ui/color-mode";

export default function Header() {
  // ColorModeButton을 사용하지 않고 useColorMode 훅을 사용할 수도 있음
  // 더 자유도 높게 다크모드를 설정 가능하게 코딩할 수 있음
  const { colorMode, toggleColorMode } = useColorMode();

  // LightMode와 DarkMode에 따라 값을 설정할 수 있음
  // const bg = useColorModeValue("red.500", "red.200");
  // const color = useColorModeValue("white", "gray.800");

  const logoColor = useColorModeValue("red.500", "red.200");

  // Icon은 컴포넌트로써 사용될 것이기 때문에 반드시 대문자로 시작해야 함!!!
  const Icon = useColorModeValue(FaSun, FaMoon);

  return (
    <HStack
      justifyContent={"space-between"}
      px={10}
      py={5}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        {/* 만약 FaAirbnb에서 color 속성을 변경하려고 하면 red.500같은 자동완성이 지원되지 않음. 대신 Chakra UI의 Box 컴포넌트로 감싸고 여기에 Chakra의 자동완성을 사용하면 Child Component에 상속되어짐 */}
        <FaAirbnb size={"48"} />
      </Box>
      {/* spacing이 v3에서는 gap으로 변경됨 */}
      <HStack gap={2}>
        <ColorModeButton />
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
        >
          {/* {colorMode === "light" ? <FaSun /> : <FaMoon />} */}
          {/* useColorModeValue를 이용하여 Icon 컴포넌트를 만들어 줌으로써 더이상 if-else를 이용할 필요가 없음 */}
          <Icon />
        </IconButton>
        <Dialog.Root size={"lg"} motionPreset={"scale"}>
          <DialogTrigger>
            {/* DarkMode 안에 넣어주면 DarkMode를 강제함 */}
            <DarkMode>
              <Button>Log in</Button>
            </DarkMode>
          </DialogTrigger>
          <LoginModal />
        </Dialog.Root>
        <Dialog.Root size={"lg"} motionPreset={"scale"}>
          <DialogTrigger>
            {/* LightMode나 DarkMode 안에 넣어줘도 Button 컴포넌트의 속성이 나중에 반영되기 때문에 강제되지 않음 */}
            {/* <Button bg={bg} color={color} colorPalette={"red"}>
              Sign up
            </Button> */}
            <LightMode>
              <Button colorPalette={"red"}>Sign up</Button>
            </LightMode>
          </DialogTrigger>
          <SignUpModal />
        </Dialog.Root>
      </HStack>
    </HStack>
  );
}

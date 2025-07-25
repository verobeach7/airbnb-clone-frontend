import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTrigger,
  HStack,
  IconButton,
  Menu,
  Portal,
  Stack,
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
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { Toaster, toaster } from "./ui/toaster";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  // ColorModeButton을 사용하지 않고 useColorMode 훅을 사용할 수도 있음
  // 더 자유도 높게 다크모드를 설정 가능하게 코딩할 수 있음
  const { toggleColorMode } = useColorMode();

  // LightMode와 DarkMode에 따라 값을 설정할 수 있음
  // const bg = useColorModeValue("red.500", "red.200");
  // const color = useColorModeValue("white", "gray.800");

  const logoColor = useColorModeValue("red.500", "red.200");

  // Icon은 컴포넌트로써 사용될 것이기 때문에 반드시 대문자로 시작해야 함!!!
  const Icon = useColorModeValue(FaSun, FaMoon);

  // main.tsx에서 호출하여 현재 사용 중에 있는 QueryClient를 가져옴
  const queryClient = useQueryClient();

  const onLogOut = async () => {
    const promise = async () => {
      await logOut();
      // Re-fetch가 필요한 Query의 key를 넣어주면 해당 Query를 Re-fetch함
      // "me" query를 re-fetch하면 useUser()의 값이 바뀌게 되고 이에 따라 보여줘야 할 컴포넌트도 바뀌게 됨
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
    };
    toaster.promise(promise, {
      success: {
        title: "Good bye!",
        description: "See you later!",
        duration: 3000,
      },
      error: {
        title: "Log out failed",
        description: "Something wrong with the log out",
      },
      loading: {
        title: "Loging out...",
        description: "Sad to see you go...",
      },
    });
  };

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      px={10}
      py={5}
      // gap은 sm 사이즈 화면일 때만 column 배치이기 때문에 이 때만 작동함
      // 즉, md 이상 사이즈일 때는 row 배치이므로 gap을 줄 컴포넌트가 없음
      gap={5}
      borderBottomWidth={1}
      // direction에 column을 줘도 작동하지 않음. 이 컴포넌트가 HStack이기 때문에 무조건 Horizontal로 작동. 항상 가로 방향으로 배치
      // {} object를 이용하여 설정 가능. 화면 사이즈에 따라 설정
      direction={{
        sm: "column",
        md: "row",
        // md까지만 해주면 lg, xl, 2xl에서는 md가 row임을 인식하고 자동으로 row 적용시킴
      }}
    >
      <Box color={logoColor}>
        {/* 만약 FaAirbnb에서 color 속성을 변경하려고 하면 red.500같은 자동완성이 지원되지 않음. 대신 Chakra UI의 Box 컴포넌트로 감싸고 여기에 Chakra의 자동완성을 사용하면 Child Component에 상속되어짐 */}
        <Link to={"/"}>
          <FaAirbnb size={"48"} />
        </Link>
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
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Dialog.Root size={"lg"} motionPreset={"scale"}>
                <DialogTrigger asChild>
                  {/* DarkMode 안에 넣어주면 DarkMode를 강제함 */}
                  <DarkMode>
                    <Button>Log in</Button>
                  </DarkMode>
                </DialogTrigger>
                <LoginModal />
              </Dialog.Root>
              <Dialog.Root size={"lg"} motionPreset={"scale"}>
                <DialogTrigger asChild>
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
            </>
          ) : (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Box>
                  <Avatar.Root size={"md"}>
                    <Avatar.Fallback name={user?.name} />
                    <Avatar.Image src={user?.avatar} />
                  </Avatar.Root>
                </Box>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {/* host 유저인 경우 Upload room이 보이도록 함 */}
                    {user?.is_host ? (
                      <Link to={"/rooms/upload"} style={{ outline: "none" }}>
                        <Menu.Item value="upload-room">Upload room</Menu.Item>
                      </Link>
                    ) : null}
                    <Link to="my-bookings">
                      <Menu.Item value="my-bookins">My bookings</Menu.Item>
                    </Link>
                    <Menu.Item onClick={onLogOut} value="log-out">
                      Log out
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        ) : null}
      </HStack>
      <Toaster />
    </Stack>
  );
}

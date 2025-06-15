import { Box, Button, HStack } from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
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
          <Button>Log in</Button>
          <Button colorPalette={"red"}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}

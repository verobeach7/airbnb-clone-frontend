import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    // VStack은 일종의 Flex 컨테이너이므로 Flex Container에서 사용할 수 있는 Prop을 그대로 사용할 수 있음
    // Chakra는 자동완성과 줄여쓰기가 잘 되어있음
    <VStack bg="gray.100" justifyContent={"center"} minH={"100vh"}>
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost.</Text>
      <Link to="/">
        <Button colorPalette={"red"} variant={"subtle"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}

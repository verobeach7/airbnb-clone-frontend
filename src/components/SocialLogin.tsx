import { Box, Button, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box>
      <HStack my={8}>
        <Separator flex="1" />
        {/* as property를 사용하면 html Tag를 사용한 것으로 변경됨 */}
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          flexShrink="0"
          fontSize="xs"
          as="b"
        >
          Or
        </Text>
        <Separator flex="1" />
      </HStack>
      <VStack>
        <Button w={"100%"} colorPalette={"blue"}>
          <FaGithub />
          Continue with Github
        </Button>
        <Button w={"100%"} colorPalette={"yellow"}>
          <FaComment />
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}

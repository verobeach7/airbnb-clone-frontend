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
        {/* as를 이용하여 다른 Tag로 작동하도록 할 수 있음 */}
        {/* anchor로 변경해줬기 때문에 href 이용가능 */}
        <Button asChild w={"100%"} colorPalette={"blue"}>
          <a href="https://github.com/login/oauth/authorize?client_id=Ov23liRvQnZqj0Iril2U&scope=read:user,user:email">
            <FaGithub />
            Continue with Github
          </a>
        </Button>
        <Button w={"100%"} colorPalette={"yellow"}>
          <FaComment />
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}

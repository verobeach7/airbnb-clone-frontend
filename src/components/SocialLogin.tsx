import { Box, Button, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  // 전체 URL이 너무 길 때는 객체를 생성하여 활용하면 헷갈리지 않고 좋음
  const kakaoDevelopmentParams = {
    client_id: "a4e1b24eef7b898ce0cb1c33edfa353f",
    redirect_uri: "http://127.0.0.1:5173/social/kakao",
    response_type: "code",
  };
  const kakaoProductionParams = {
    client_id: "a4e1b24eef7b898ce0cb1c33edfa353f",
    redirect_uri:
      "https://airbnb-clone-frontend-v0pq.onrender.com/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(
    import.meta.env.MODE === "development"
      ? kakaoDevelopmentParams
      : kakaoProductionParams
  ).toString();
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
        <Button asChild w={"100%"} colorPalette={"yellow"}>
          <a href={`https://kauth.kakao.com/oauth/authorize?${params}`}>
            <FaComment />
            Continue with Kakao
          </a>
        </Button>
      </VStack>
    </Box>
  );
}

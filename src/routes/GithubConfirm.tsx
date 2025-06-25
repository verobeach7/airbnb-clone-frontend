import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { githubLogIn } from "../api";

export default function NotFound() {
  // const location = useLocation();
  // console.log(location);
  // hash: ""
  // key: "default"
  // pathname: "/social/github"
  // search:"?code=83ac8b3652f2248ed654"
  // state: null

  // location은 object로 그 안의 필요한 것을 꺼내어 사용
  const { search } = useLocation();
  const confirmLogIn = async () => {
    // URLSearchParams: 브라우저 API로 String에서 필요한 것을 꺼내 사용
    const params = new URLSearchParams(search);
    const code = params.get("code");
    // URL에서 얻은 code를 다시 장고(백엔드)로 보내줘야 함
    // code가 없을 수도 있으므로 있는지 체크한 후 있을 때만 실행해야 함
    if (code) {
      await githubLogIn(code);
    }
  };
  useEffect(() => {
    confirmLogIn();
  }, []);
  return (
    // VStack은 일종의 Flex 컨테이너이므로 Flex Container에서 사용할 수 있는 Prop을 그대로 사용할 수 있음
    // Chakra는 자동완성과 줄여쓰기가 잘 되어있음
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in</Heading>
      <Text>Don't go anywhere</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}

import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { toaster } from "../components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  // useNavigate()는 user를 새로운 URL로 보내게 할 수 있음
  const navigate = useNavigate();
  const confirmLogIn = async () => {
    // URLSearchParams: 브라우저 API로 String에서 필요한 것을 꺼내 사용
    const params = new URLSearchParams(search);
    const code = params.get("code");
    // URL에서 얻은 code를 다시 장고(백엔드)로 보내줘야 함
    // code가 없을 수도 있으므로 있는지 체크한 후 있을 때만 실행해야 함
    if (code) {
      // React.JS는 Development Mode에서 두 번씩 작동하기에 githubLogIn()도 두 번 호출하게 됨 -> 백엔드에서 작은 오류를 발생시키게 됨
      // 두 번씩 작동하는 것을 없애기 위해서 main.tsx의 StrictMode를 없앱버리면 됨
      const status = await githubLogIn(code);
      if (status == 200) {
        toaster.create({
          title: "Welcome!",
          description: "Happy to have you back",
          type: "success",
        });
        // 로그인에 성공한 후 아바타를 보여주기 위한 것
        queryClient.refetchQueries({
          queryKey: ["me"],
        });
        // 로그인 성공 시 이동할 URL
        navigate("/");
      }
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

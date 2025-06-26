import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";
import { toaster } from "../components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogIn = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogIn(code);
      if (status == 200) {
        toaster.create({
          title: "Welcome!",
          description: "Happy to have you back",
          type: "success",
        });
        queryClient.refetchQueries({
          queryKey: ["me"],
        });
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogIn();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in</Heading>
      <Text>Don't go anywhere</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}

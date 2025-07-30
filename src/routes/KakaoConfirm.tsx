import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";
import { toaster } from "../components/ui/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const confirmLogIn = async () => {
  //   const params = new URLSearchParams(search);
  //   const code = params.get("code");
  //   if (code) {
  //     const status = await kakaoLogIn(code);
  //     if (status == 200) {
  //       toaster.create({
  //         title: "Welcome!",
  //         description: "Happy to have you back",
  //         type: "success",
  //       });
  //       queryClient.refetchQueries({
  //         queryKey: ["me"],
  //       });
  //       navigate("/");
  //     }
  //   }
  // };
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const mutation = useMutation({
    mutationFn: kakaoLogIn,
    onMutate: () => {
      console.log("Start the Kakao login function");
    },
    onSuccess: () => {
      toaster.create({
        title: "Welcome!",
        description: "Happy to have you back",
        type: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      navigate("/");
    },
    onError: () => {
      toaster.create({
        title: "Login failed",
        description: "Something went wrong...",
        type: "error",
      });
      navigate("/");
    },
  });
  useEffect(() => {
    if (code) {
      console.log("useEffect", code);
      mutation.mutate({ code });
    }
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in</Heading>
      <Text>Don't go anywhere</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}

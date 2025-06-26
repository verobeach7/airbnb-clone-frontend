import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogPositioner,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";

export default function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLDivElement>) => {
    // 브라우저의 기본 동작을 모두 없애버림
    event.preventDefault();
    console.log(username, password);
  };
  return (
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Log in</Dialog.Title>
          </Dialog.Header>
          {/* onSubmit에 TypeScript 에러가 발생하는 이유는 form으로 변경해주었지만 타입스크립트는 여전히 div로 판단하고 있기 때문임 */}
          {/* 해결방법1: onSubmit as any로 바꿔줌: 이 방법은 또 다른 에러 발생함 */}
          {/* 해결방법2: onSubmit 함수의 event 타입을 <HTMLDivElement>로 변경해줌 */}
          {/* 둘 중 어떤 방법을 사용해도 상관 없음 */}
          <DialogBody as={"form"} onSubmit={onSubmit}>
            <VStack>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaUser />
                  </Box>
                }
              >
                <Input
                  // required를 해주면 이 칸을 채우지 않고는 submit 버튼을 클릭하는 것이 불가능해짐
                  required
                  // 어떤 것이 바뀌는지 알기 위해서 name이 필요
                  name="username"
                  // 값이 바뀐 때 useState의 onChangeUsername이 작동하여 state가 변경됨
                  onChange={onChange}
                  // value를 통해 useState()와 연결됨
                  value={username}
                  variant={"subtle"}
                  placeholder="Username"
                />
              </InputGroup>
              <InputGroup
                startElement={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              >
                <Input
                  required
                  name="password"
                  onChange={onChange}
                  value={password}
                  type="password"
                  variant={"subtle"}
                  placeholder="Password"
                />
              </InputGroup>
            </VStack>
            {/* Button의 type을 submit으로 변경해줘야 브라우저가 기본으로 가지고 있는 submit 동작을 하게 됨 */}
            {/* submit이 정상적으로 동작한다면 이 버튼을 클릭하면 페이지가 완전히 새로고침 됨 */}
            {/* 새로고침이 되지 않고 form만 제출되게 하기 위해서는 별도의 함수를 작성하여 사용해야 함 */}
            <Button type="submit" mt={4} colorPalette={"red"} w={"100%"}>
              Log in
            </Button>
            <SocialLogin />
          </DialogBody>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </DialogPositioner>
    </Portal>
  );
}

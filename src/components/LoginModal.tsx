import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogPositioner,
  Field,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Log in</Dialog.Title>
          </Dialog.Header>
          <DialogBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Field.Root invalid={Boolean(errors.username?.message)}>
                <InputGroup
                  startElement={
                    <Box color="gray.500">
                      <FaUser />
                    </Box>
                  }
                >
                  <Input
                    required
                    // react-hook-form을 사용하면 name, value, onchange 모두 불필요해짐
                    {...register("username", {
                      required: "Please write a username",
                    })}
                    variant={"subtle"}
                    placeholder="Username"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(errors.password?.message)}>
                <InputGroup
                  startElement={
                    <Box color="gray.500">
                      <FaLock />
                    </Box>
                  }
                >
                  <Input
                    required
                    // {...register("password", { required: true })}
                    {...register("password", {
                      required: "Please write a password",
                    })}
                    type="password"
                    variant={"subtle"}
                    placeholder="Password"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
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

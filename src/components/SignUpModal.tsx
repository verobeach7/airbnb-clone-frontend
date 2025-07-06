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
import { FaEnvelope, FaLock, FaUser, FaUserEdit } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import type { ISignUpSuccess, ISignUpVariables } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api";
import { toaster } from "./ui/toaster";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export default function SignUpModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpVariables>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<ISignUpSuccess, AxiosError, ISignUpVariables>({
    mutationFn: signUp,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: () => {
      toaster.create({
        title: "Sign up successed",
        description: "Congrats!",
        type: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.log(`Mutation has an error: ${error}`);
      // console.log(error.response?.data);
      const errorMessage = Object.values(error.response?.data as object)[0];
      // console.log(errorMessage);

      toaster.create({
        title: "Sign up failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
  const onSubmit = ({ name, email, username, password }: ISignUpVariables) => {
    mutation.mutate({ name, email, username, password });
  };
  return (
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Sign up</Dialog.Title>
          </Dialog.Header>
          <DialogBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Field.Root invalid={Boolean(errors.name?.message)}>
                <InputGroup
                  startElement={
                    <Box color="gray.500">
                      <FaUserEdit />
                    </Box>
                  }
                >
                  <Input
                    required
                    {...register("name", {
                      required: "Please write your name",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 4 characters",
                      },
                      pattern: {
                        value: /^[A-za-z0-9가-힣]{3,20}$/,
                        message: "Only possible to english, korean, number",
                      },
                    })}
                    variant={"subtle"}
                    placeholder="Name"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(errors.email?.message)}>
                <InputGroup
                  startElement={
                    <Box color="gray.500">
                      <FaEnvelope />
                    </Box>
                  }
                >
                  <Input
                    required
                    {...register("email", {
                      required: "Email is mandatory",
                      pattern: {
                        value: /\w+@\w+\.\w+(\.\w+)?$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    variant={"subtle"}
                    placeholder="Email"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
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
                    {...register("username", {
                      required: "Username is mandatory",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 4 characters",
                      },
                      pattern: {
                        value: /^[A-za-z0-9]{3,20}$/,
                        message: "Only possible to english, korean, number",
                      },
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
                    {...register("password", {
                      required: "Password is mandatory",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 32,
                        message: "Password must be less than 32 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/,
                        message:
                          "Please enter a valid password, min 8 max 32 english+number+characters",
                      },
                    })}
                    variant={"subtle"}
                    placeholder="Password"
                    type="password"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
            <Button
              loading={mutation.isPending}
              type="submit"
              mt={4}
              colorPalette={"red"}
              w={"100%"}
            >
              Sign Up
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

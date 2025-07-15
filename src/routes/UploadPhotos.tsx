import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const { roomPk } = useParams();
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
  const uploadURLMutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: IUploadURLResponse) => {
      // 반환받은 uploadURL에 이미지를 실제로 올려주는 작업을 해주면 됨
      uploadImageMutation.mutate({
        // cloudflare로부터 받아온 uploadURL과 register를 이용해 받은 file을 넘겨줘야 함
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  // useParams() 훅을 이용해 URL에서 pk를 받음
  useHostOnlyPage(); // host 권한이 있는 사람만 접근 가능

  // Form이 전송되면 api.ts를 이용하여 POST request를 /medias/photos/get-url로 보내게 됨
  const onSubmit = () => {
    uploadURLMutation.mutate();
  };

  return (
    // 로그인한 사람만 접근 가능
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as={"form"}
            gap={5}
            mt={10} /* onSubmit={handleSubmit(onSubmit)} */
          >
            <Field.Root>
              {/* type 설정을 file로 해줘야 함 */}
              <Input {...register("file")} type="file" accept="image/*" />
            </Field.Root>
            <Button type="submit" w="full" colorPalette={"red"}>
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

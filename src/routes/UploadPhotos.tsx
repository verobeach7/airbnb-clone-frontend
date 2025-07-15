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

export default function UploadPhotos() {
  const { register, watch } = useForm();
  // useParams() 훅을 이용해 URL에서 pk를 받음
  const { roomPk } = useParams();
  useHostOnlyPage(); // host 권한이 있는 사람만 접근 가능
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
          <VStack gap={5} mt={10}>
            <Field.Root>
              {/* type 설정을 file로 해줘야 함 */}
              <Input {...register("file")} type="file" accept="image/*" />
            </Field.Root>
            <Button w="full" colorPalette={"red"}>
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

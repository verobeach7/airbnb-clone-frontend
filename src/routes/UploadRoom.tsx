import {
  Box,
  Checkbox,
  Container,
  Field,
  Heading,
  Input,
  InputGroup,
  NativeSelect,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";

export default function UploadRoom() {
  // 두 가지 방식으로 사용할 수 있음
  // 방법1: useHostOnlyPage()처럼 Hook으로 만들어 사용 가능
  // 방법2: <ProtectedPage>처럼 컴포넌트로 만들어 하위에 children 컴포넌트를 두어 사용하는 방식
  // 방법1은 UploadRoom 전체를 허용할지 말지, 방법2는 전체에 대해서 또는 일부 컴포넌트에 대해서도 허용 여부를 선택할 수 있음
  useHostOnlyPage();
  return (
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
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack gap={5} as="form" mt={5}>
            <Field.Root>
              <Field.Label>
                Name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input required type="text" />
              <Field.HelperText>Write the name of your room.</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Country
                <Field.RequiredIndicator />
              </Field.Label>
              <Input required type="text" />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                City
                <Field.RequiredIndicator />
              </Field.Label>
              <Input required type="text" />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Address
                <Field.RequiredIndicator />
              </Field.Label>
              <Input required type="text" />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Price
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaDollarSign />}>
                <Input required type="number" min={0} />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Rooms
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaBed />}>
                <Input required type="number" min={0} />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Toilets
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaToilet />}>
                <Input required type="number" min={0} />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea />
            </Field.Root>
            <Field.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Pet friendly?</Checkbox.Label>
              </Checkbox.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>Kind of room</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field>
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.HelperText>
                What kind of room are you renting?
              </Field.HelperText>
            </Field.Root>
          </VStack>
        </Container>
      </Box>{" "}
    </ProtectedPage>
  );
}

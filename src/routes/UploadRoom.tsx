import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Field,
  Fieldset,
  Grid,
  Heading,
  Input,
  InputGroup,
  NativeSelect,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { IAmenity, ICategory, IRoomDetail } from "../types";
import {
  getAmenities,
  getCategories,
  uploadRoom,
  type IUploadRoomVariables,
} from "../api";
import { useForm } from "react-hook-form";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

export default function UploadRoom() {
  // 제너릭을 설정하여 Form의 형태를 TypeScript에게 알려줘야 함
  // TypeScript에게 form의 형태를 알려줘야 register를 사용하는게 훨씬 쉬워짐
  const { register, handleSubmit, watch, setValue } =
    useForm<IUploadRoomVariables>({ defaultValues: { pet_friendly: false } });
  const petFriendly = watch("pet_friendly");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: uploadRoom,
    // 백엔드에서 방을 성공적으로 생성하면 그 방을 반환해줌. 반환된 방은 data로 받아 줄 수 있음
    onSuccess: (data: IRoomDetail) => {
      toaster.create({
        type: "success",
        title: "Room created",
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const { data: amenities } = useQuery<IAmenity[]>({
    queryKey: ["amenities"],
    queryFn: getAmenities,
  });
  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // console.log(amenities, isAmenitiesLoading);
  // console.log(categories, isCategoriesLoading);
  // 두 가지 방식으로 사용할 수 있음
  // 방법1: useHostOnlyPage()처럼 Hook으로 만들어 사용 가능
  // 방법2: <ProtectedPage>처럼 컴포넌트로 만들어 하위에 children 컴포넌트를 두어 사용하는 방식
  // 방법1은 UploadRoom 전체를 허용할지 말지, 방법2는 전체에 대해서 또는 일부 컴포넌트에 대해서도 허용 여부를 선택할 수 있음
  useHostOnlyPage();
  console.log(watch());
  // // 하나의 필드만 선택하여 볼 수도 있음
  // console.log(watch("address"));

  const onSubmit = (data: IUploadRoomVariables) => {
    // console.log(data);
    mutation.mutate(data);
  };

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
          <VStack onSubmit={handleSubmit(onSubmit)} gap={10} as="form" mt={5}>
            <Field.Root>
              <Field.Label>
                Name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <Field.HelperText>Write the name of your room.</Field.HelperText>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Country
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                City
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Address
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Price
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaDollarSign />}>
                <Input
                  {...register("price", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Rooms
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaBed />}>
                <Input
                  {...register("rooms", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Toilets
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon={<FaToilet />}>
                <Input
                  {...register("toilets", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea {...register("description", { required: true })} />
            </Field.Root>
            {/* Root는 상태를 제어하는 컴포넌트 */}

            <Field.Root>
              <Checkbox.Root
                checked={petFriendly ?? false}
                onCheckedChange={({ checked }) =>
                  setValue("pet_friendly", checked === true, {
                    shouldValidate: true,
                  })
                }
              >
                {/* 실제 HTML 역할을 하는 컴포넌트: <input type="checkbox">의 역할을 함 */}
                {/* React Hook Form은 HTML <input>에 직접 ref, onChange, name 등을 검 */}
                <Checkbox.HiddenInput name="pet_friendly" />
                <Checkbox.Control />
                <Checkbox.Label>Pet friendly?</Checkbox.Label>
              </Checkbox.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>Kind of room</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  {...register("kind", { required: true })}
                  placeholder="Choose a kind"
                >
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
            <Field.Root>
              <Field.Label>Category</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  {...register("category", { required: true })}
                  placeholder="Choose a category"
                >
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.HelperText>
                What category describes your room?
              </Field.HelperText>
            </Field.Root>
            <Fieldset.Root>
              <CheckboxGroup>
                <Fieldset.Legend>Amenities</Fieldset.Legend>
                <Fieldset.Content>
                  <Grid templateColumns={"1fr 1fr"} gap={5}>
                    {amenities?.map((amenity) => (
                      <Box key={amenity.pk}>
                        <Checkbox.Root
                          value={amenity.pk.toString()}
                          alignItems={"flex-start"}
                        >
                          {/* amenities의 경우 여러 개 선택이 가능하므로 value를 이용하여 구분해줘야 함 */}
                          <Checkbox.HiddenInput
                            value={amenity.pk}
                            {...register("amenities", { required: true })}
                          />
                          <Checkbox.Control />
                          <Stack gap="1">
                            <Checkbox.Label>{amenity.name}</Checkbox.Label>
                            <Box textStyle={"sm"} color={"fg.muted"}>
                              {amenity.description}
                            </Box>
                          </Stack>
                        </Checkbox.Root>
                      </Box>
                    ))}
                  </Grid>
                </Fieldset.Content>
              </CheckboxGroup>
            </Fieldset.Root>
            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null}
            <Button
              // 반드시 submit으로 설정해주어야 버튼 클릭 시 폼을 제출하게 됨
              type="submit"
              loading={mutation.isPending}
              colorPalette={"red"}
              size={"lg"}
              w={"100%"}
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

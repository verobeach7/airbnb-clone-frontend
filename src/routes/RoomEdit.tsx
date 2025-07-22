import ProtectedPage from "../components/ProtectedPage";
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
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import {
  getAmenities,
  getCategories,
  getRoom,
  updateRoom,
  type IUpdateRoomVariables,
} from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import useHostOnlyPage from "../components/HostOnlyPage";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import type {
  IAmenity,
  ICategory,
  IRoomDetail,
  IUpdateRoomDetail,
} from "../types";
import { toaster } from "../components/ui/toaster";
import { useEffect } from "react";

export default function RoomEdit() {
  const { roomPk } = useParams();
  const { register, handleSubmit, reset, control, watch } =
    useForm<IUpdateRoomVariables>();

  const navigate = useNavigate();
  const updateRoomMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: (data: IRoomDetail) => {
      toaster.create({
        title: "Room update complete!",
        type: "success",
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const { data: updateRoomData, isLoading: isUpdateRoomDataLoading } =
    useQuery<IUpdateRoomDetail>({
      queryKey: [`rooms`, roomPk],
      queryFn: getRoom,
    });

  //   console.log(updateRoomData?.amenities);

  const { data: amenitiesData, isLoading: isAmenitiesDataLoading } = useQuery<
    IAmenity[]
  >({ queryKey: ["amenities"], queryFn: getAmenities });
  const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery<
    ICategory[]
  >({ queryKey: ["categories"], queryFn: getCategories });

  useHostOnlyPage();
  const onSubmit = (data: IUpdateRoomVariables) => {
    if (roomPk) {
      data.roomPk = roomPk;
      updateRoomMutation.mutate(data);
    }
  };

  useEffect(() => {
    if (updateRoomData) {
      reset({
        ...updateRoomData,
        category: updateRoomData.category.pk,
        amenities: updateRoomData.amenities,
      });
    }
  }, [updateRoomData, reset]);

  console.log("after", watch("amenities"));

  return (
    <ProtectedPage>
      {isUpdateRoomDataLoading ||
      isAmenitiesDataLoading ||
      isCategoriesDataLoading ? null : (
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Helmet>
            <title>{updateRoomData ? updateRoomData.name : "Loading..."}</title>
          </Helmet>
          <Container>
            <Heading textAlign={"center"}>Update Room</Heading>
            <VStack
              gap={10}
              as={"form"}
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
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
                <Field.HelperText>
                  Write the name of your room.
                </Field.HelperText>
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
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea {...register("description", { required: true })} />
              </Field.Root>
              <Field.Root>
                <Controller
                  control={control}
                  name="pet_friendly"
                  render={({ field }) => (
                    <Checkbox.Root
                      checked={field.value}
                      onCheckedChange={({ checked }) => {
                        // checked는 true, false, "indeterminate"(중간상태)
                        // field.onChange(!!checked); : "indeterminate"를 true로 간주
                        field.onChange(checked === true);
                      }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>Pet friendly?</Checkbox.Label>
                    </Checkbox.Root>
                  )}
                />
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
                    placeholder="Choose a Category"
                  >
                    {categoriesData?.map((category) => (
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
                <Fieldset.Legend>Amenities</Fieldset.Legend>
                <Controller
                  control={control}
                  name="amenities"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CheckboxGroup
                      value={field.value?.map(String)}
                      onChange={(value) => {
                        if (Array.isArray(value)) {
                          field.onChange(value.map((v) => Number(v)));
                        }
                      }}
                    >
                      <Grid templateColumns={"1fr 1fr"} gap={5}>
                        {amenitiesData?.map((amenity) => (
                          <Box key={amenity.pk}>
                            <Checkbox.Root
                              value={String(amenity.pk)}
                              alignItems={"flex-start"}
                              checked={
                                field.value?.includes(amenity.pk) ?? false
                              }
                              onCheckedChange={({ checked }) => {
                                const current = field.value ?? [];
                                console.log("before", current);
                                if (checked === true) {
                                  console.log("true", amenity.pk);
                                  field.onChange([...current, amenity.pk]);
                                } else {
                                  console.log("false", amenity.pk);
                                  field.onChange(
                                    current.filter((id) => id !== amenity.pk)
                                  );
                                }
                              }}
                            >
                              <Checkbox.HiddenInput />
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
                    </CheckboxGroup>
                  )}
                />
              </Fieldset.Root>
              {updateRoomMutation.isError ? (
                <Text color={"red.500"}>Something went wrong</Text>
              ) : null}
              <Button
                type={"submit"}
                loading={updateRoomMutation.isPending}
                colorPalette={"red"}
                size="lg"
                w={"100%"}
              >
                Update Room
              </Button>
            </VStack>
          </Container>
        </Box>
      )}
    </ProtectedPage>
  );
}

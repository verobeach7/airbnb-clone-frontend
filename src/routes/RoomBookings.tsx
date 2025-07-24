import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomBookings } from "../api";
import { Link, useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import {
  Avatar,
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { IRoomBookingList, IRoomDetail } from "../types";

export default function RoomBookings() {
  const { roomPk } = useParams();
  const { isLoading: isRoomLoading, data: roomData } = useQuery<IRoomDetail>({
    // queryKey로 두 개의 key를 병합하여 유니크하게 만들어 줄 수 있음
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const { data } = useQuery<IRoomBookingList[]>({
    queryKey: ["roomBookings", roomPk],
    queryFn: getRoomBookings,
  });

  useHostOnlyPage();

  console.log(data);
  return (
    <ProtectedPage>
      <Stack
        gap={0}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box my={6} px={{ base: 10, lg: 40 }}>
          <Skeleton height={"30px"} width={"100%"} loading={isRoomLoading}>
            <HStack w={"100%"} display={"flex"}>
              <Heading>{roomData?.name}</Heading>
            </HStack>
          </Skeleton>
        </Box>
        <Box px={{ base: 10, lg: 40 }}>
          <Link to={`/rooms/${roomData?.id}`}>
            <VStack gap={0} alignItems={"flex-start"} w={"100%"} maxW={"300px"}>
              <Box
                overflow={"hidden"}
                mb={2}
                rounded={"3xl"}
                w={"100%"}
                maxW={"300px"}
                maxH={"300px"}
              >
                {roomData?.photos[0].file ? (
                  <Image
                    src={roomData?.photos[0].file}
                    w={"100%"}
                    h={"100%"}
                    alt={roomData.name}
                  />
                ) : (
                  <Box
                    w="100%"
                    h="100%"
                    bg="gray.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.500"
                    fontSize="sm"
                  >
                    No Image
                  </Box>
                )}
              </Box>
            </VStack>
          </Link>
        </Box>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Grid gap={10} templateColumns={"1fr"}>
            {data?.map((roomBooking) => (
              <HStack key={roomBooking.pk}>
                <Avatar.Root mr={5}>
                  <Avatar.Fallback name={roomBooking.user.name} />
                  <Avatar.Image src={roomBooking.user.avatar} />
                </Avatar.Root>
                <Box>
                  <Text display={"block"} as="b" lineClamp={1} fontSize="md">
                    Reservation name: {roomBooking.user.name}
                  </Text>
                  <Text display={"block"} fontSize="md">
                    Reservation Period:
                  </Text>
                  <Text display={"block"} fontSize={"md"}>
                    {roomBooking.check_in} ~{roomBooking.check_out}
                  </Text>
                  <Text display={"block"} lineClamp={1} fontSize="md">
                    Guests: {roomBooking.guests}
                  </Text>
                </Box>
              </HStack>
            ))}
          </Grid>
        </Box>
      </Stack>
    </ProtectedPage>
  );
}

import { Box, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../api";
import type { IUserBookingList } from "../types";
import BookedRoom from "../components/BookedRoom";

export default function MyBookings() {
  const { data } = useQuery<IUserBookingList[]>({
    queryKey: ["myBookings"],
    queryFn: getUserBookings,
  });
  return data && data.length > 0 ? (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
      templateColumns={{
        sm: "1fr",
        md: "1fr",
        lg: "1fr 1fr",
        xl: "1fr 1fr",
        "2xl": "1fr 1fr",
      }}
    >
      {data?.map((bookedRoom) => (
        <BookedRoom
          key={bookedRoom.pk}
          pk={bookedRoom.room.pk}
          imageUrl={bookedRoom.room.photos[0]?.file}
          name={bookedRoom.room.name}
          city={bookedRoom.room.city}
          country={bookedRoom.room.country}
          check_in={bookedRoom.check_in}
          check_out={bookedRoom.check_out}
          guests={bookedRoom.guests}
        />
      ))}
    </Grid>
  ) : (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"60vh"}
    >
      <Text fontSize={"xl"}>There is no bookings.</Text>
    </Box>
  );
}

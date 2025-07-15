import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import type { IRoomList } from "../types";

export default function Home() {
  // useQuery는 key를 줘야 함. key는 무엇을 fetch한 것인지 인식하게 해주며 캐싱 작업에 사용됨.
  // tanstack Query가 isLoading, data 등 많은 것을 제공함
  // Cache는 메모리에 저장됨
  const { isLoading, data } = useQuery<IRoomList[]>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  // columnGap의 단위는 rem
  return (
    <Grid
      columnGap={4}
      rowGap={8}
      mt={10}
      px={10}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        // 숫자가 포함될 때는 "" 필요
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {/* `?`를 붙이면 데이터가 있으면이라고 가정하게 됨 */}
      {data?.map((room) => (
        <Room
          key={room.pk}
          pk={room.pk}
          imageUrl={room.photos[0]?.file}
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}

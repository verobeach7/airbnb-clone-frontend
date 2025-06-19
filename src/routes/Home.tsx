import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect, useState } from "react";
import RoomSkeleton from "../components/RoomSkeleton";

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  // IPhoto 타입을 가진 Array
  photos: IPhoto[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // default value로 undefined 설정
  // TypeScript는 room이 뭔지 모르므로 room에 대해 설명해줘야 함.
  // const [rooms, setRooms] = useState([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  // 아래 방법이 React.JS에서 데이터를 fetch하는 최고의 방법은 아님
  const fetchRooms = async () => {
    // 반드시 url 마지막은 `/`로 끝나야 함. 없으면 CORS 에러 발생
    const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/");
    const json = await response.json();
    setRooms(json);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRooms();
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
      {rooms.map((room) => (
        <Room
          imageUrl={room.photos[0].file}
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

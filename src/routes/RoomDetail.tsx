import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import type { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>({
    // queryKey로 두 개의 key를 병합하여 유니크하게 만들어 줄 수 있음
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >({
    queryKey: [`rooms`, roomPk, `reviews`],
    queryFn: getRoomReviews,
  });
  // ReactQueryDevtools 사용으로 더이상 Query로 받아온 데이터를 console.log()로 확인할 필요 없음.
  // console.log(data);
  return (
    <Box mt={6} px={60}>
      <Skeleton height={"30px"} width={"25%"} loading={isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={6}
        gap={3}
        rounded={"2xl"}
        // overflow={"hidden"} 없이는 rounded가 적용되지 않은 것처럼 보임
        overflow={"hidden"}
        height="50vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          // overflow="hidden": Box 크기에서 넘치는 부분을 숨겨줌
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton loading={isLoading} w={"100%"} h={"100%"}>
              <Image
                objectFit={"cover"}
                w={"100%"}
                h={"100%"}
                // 사진이 5개 미만인 경우 photos[index]가 존재하지 않는 것이 있어 에러 발생
                // `?`를 이용하면 있는 경우에만 file을 가져옴
                src={data?.photos[index]?.file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack w={"50%"} justifyContent={"space-between"} mt={18}>
        <VStack alignItems={"flex-start"}>
          <Skeleton loading={isLoading}>
            <Heading fontSize={"2xl"}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton loading={isLoading}>
            {/* 앞부터 채우기 위해서 flex-start 이용, 단 너비를 지정해줘야 적용됨을 잊지 말기 */}
            <HStack justifyContent={"flex-start"} w={"100%"}>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar.Root size={"2xl"}>
          <Avatar.Fallback name={data?.owner.name} />
          <Avatar.Image src={data?.owner.avatar} />
        </Avatar.Root>
      </HStack>
      <Box mt={10}>
        <Heading fontSize={"2xl"}>
          <HStack>
            <FaStar />
            <Text>{data?.rating}</Text>
            <Text>•</Text>
            <Text>
              {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
      </Box>
    </Box>
  );
}

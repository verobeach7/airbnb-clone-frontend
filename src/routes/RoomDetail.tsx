import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import type { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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

  const [dates, setDates] = useState<Value>();
  console.log(dates);
  // 0: Thu Jul 17 2025 00:00:00 GMT+0900 (한국 표준시)
  // 1: Sat Jul 19 2025 23:59:59 GMT+0900 (한국 표준시)

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
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  // 사진이 5개 미만인 경우 photos[index]가 존재하지 않는 것이 있어 에러 발생
                  // `?`를 이용하면 있는 경우에만 file을 가져옴
                  src={data?.photos[index]?.file}
                />
              ) : null}
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
      <Grid gap={10} templateColumns={"2fr 1fr"}>
        <Box mt={10}>
          <Skeleton w={"50%"} loading={isReviewsLoading}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack fontSize={"2xl"}>
                <FaStar />
                <Text>{data?.rating}</Text>
                <Text>•</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
          </Skeleton>
          {/* Container에 넣으면 기본으로 중앙 정렬됨 */}
          <Container mt={8} maxW={"5xl"} marginX={"unset"}>
            <Grid gap={8} templateColumns={"1fr 1fr"}>
              {reviewsData?.map((review, index) => (
                <VStack alignItems={"flex-start"} key={index}>
                  <HStack>
                    <SkeletonCircle loading={isReviewsLoading}>
                      <Avatar.Root size={"md"}>
                        <Avatar.Fallback name={review.user.name} />
                        <Avatar.Image src={review.user.avatar} />
                      </Avatar.Root>
                    </SkeletonCircle>
                    <VStack gap={0} alignItems={"flex-start"}>
                      <Skeleton loading={isReviewsLoading}>
                        <Box>
                          <Heading fontSize={"md"}>{review.user.name}</Heading>
                        </Box>
                      </Skeleton>
                      <Skeleton loading={isReviewsLoading}>
                        <HStack>
                          <FaStar size={"12px"} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </Skeleton>
                    </VStack>
                  </HStack>
                  <Skeleton h={4} loading={isReviewsLoading}>
                    <Text>{review.payload}</Text>
                  </Skeleton>
                </VStack>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box>
          <Calendar
            onChange={setDates}
            prev2Label={null} // 연도 뒤로 넘기기 버튼(<<) 없애기
            next2Label={null} // 연도 앞으로 넘기기 버튼(>>) 없애기
            minDate={new Date()} // 오늘 이전으로 갈 수 없음
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)} // 6개월 이후로 갈 수 없음
            minDetail="month"
            selectRange
          />
        </Box>
      </Grid>
    </Box>
  );
}

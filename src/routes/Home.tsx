import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
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
      <Box>
        {/* Room.tsx의 Image minH을 280으로 설정하였으므로 스켈레톤의 높이를 280으로 설정하여 정사각형 모양으로 만들어주기 */}
        <Skeleton rounded={"3xl"} mb={3} h={280} />
        <SkeletonText mt={1} mb={3} h={3} noOfLines={1} />
        <SkeletonText mb={3} w={"45%"} h={3} noOfLines={1} />
        <SkeletonText mt={1} w={"30%"} h={3} noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}

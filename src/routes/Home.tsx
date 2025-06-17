import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  // columnGap의 단위는 rem
  return (
    <Grid
      columnGap={4}
      rowGap={8}
      mt={10}
      px={10}
      templateColumns={"repeat(5, 1fr)"}
    >
      {/* alignItems를 이용하여 정렬할 수 있음 */}
      {/* VStack은 더이상 spacing을 지원하지 않으므로 간격을 좁히기 위해서는 gap={0} 설정 후 좁힐 필요가 있는 컴포넌트에서 margin을 이용하여 좁혀줘야 함 */}
      <VStack gap={0} alignItems={"flex-start"}>
        {/* borderRadius를 사용해도 되지만 rounded를 사용하면 일관성있게 적용할 수 있음 */}
        <Box overflow={"hidden"} mb={2} rounded={"3xl"}>
          <Image src="https://a0.muscache.com/im/pictures/lombard/MtTemplate-1019730-active_media/original/8c6edcf7-789c-4449-8e72-247a70892cb6.jpg?im_w=960" />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text
              display={"block"}
              as={"b"}
              mb={-0.5}
              fontSize={"md"}
              lineClamp={1}
            >
              Bujeon-dong, Busanjin-gu, 한국의 공동 주택 전체
            </Text>
            <HStack gap={1}>
              <FaStar size={13} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text mb={2} fontSize={"sm"} color={"gray.600"}>
            Seoul, S. Korea
          </Text>
          <Text fontSize={"sm"} color={"gray.600"}>
            <Text as={"b"}>$72</Text> /night
          </Text>
        </Box>
      </VStack>
    </Grid>
  );
}

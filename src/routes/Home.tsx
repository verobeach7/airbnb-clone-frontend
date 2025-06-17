import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
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
      {/* alignItems를 이용하여 정렬할 수 있음 */}
      {/* VStack은 더이상 spacing을 지원하지 않으므로 간격을 좁히기 위해서는 gap={0} 설정 후 좁힐 필요가 있는 컴포넌트에서 margin을 이용하여 좁혀줘야 함 */}
      {[
        1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 1, 2, 3, 2, 3, 2, 3, 2,
        3,
      ].map((index) => (
        // useColorModeValue를 사용하기 위해 별도의 파일로 분리
        // Room 컴포넌트를 별도의 파일로 만들었기 때문에 VStack에 주었던 key를 Room 컴포넌트에 주면 됨
        <Room key={index} />
      ))}
    </Grid>
  );
}

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
import { useColorModeValue } from "./ui/color-mode";
import { Link } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.400");
  return (
    <Link to={`rooms/${pk}`}>
      <VStack gap={0} alignItems={"flex-start"}>
        {/* borderRadius를 사용해도 되지만 rounded를 사용하면 일관성있게 적용할 수 있음 */}
        {/* 1. 두 컴포넌트를 겹치기 위해서 부모 컴포넌트의 position을 relative로 설정 */}
        <Box
          h={280}
          position={"relative"}
          overflow={"hidden"}
          mb={2}
          rounded={"3xl"}
        >
          <Image minH={280} src={imageUrl} />
          {/* 2. 겹치고 싶은 대상의 position을 absolute로 설정 후 위치를 조정 */}
          {/* 클릭 가능하게 하는 방법1 */}
          {/* <Box cursor={"pointer"} position={"absolute"} top={5} right={5} color={"white"}>
            <FaRegHeart />
          </Box> */}
          {/* 클릭 가능하게 하는 방법2 */}
          <Button
            variant={"ghost"}
            position={"absolute"}
            top={2}
            right={0}
            color={"white"}
          >
            <FaRegHeart />
          </Button>
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
              {name}
            </Text>
            {/* `_`를 이용하여 h1:hover와 같은 CSS Selector(선택자)를 사용할 수 있음 */}
            <HStack
              gap={1}
              _hover={{
                color: "red.500",
              }}
            >
              {/* FaStar는 부모 컴포넌트인 HStack으로부터 스타일을 상속받음 */}
              <FaStar size={13} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text mb={2} fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
          <Text fontSize={"sm"} color={gray}>
            <Text as={"b"}>${price}</Text> /night
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}

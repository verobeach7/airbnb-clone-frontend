import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { Link, useNavigate } from "react-router-dom";
import type React from "react";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.400");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    // Link 안에 있기 때문에 버튼을 클릭하는 경우 Link를 우선 작동시키게 됨. 이것을 막기 위해 preventDefault() 설정
    // 즉, 클릭이 링크로 전파되는 것을 막아주게 됨
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`rooms/${pk}`}>
      <VStack gap={0} alignItems={"flex-start"} w={"100%"} maxW={"300px"}>
        {/* borderRadius를 사용해도 되지만 rounded를 사용하면 일관성있게 적용할 수 있음 */}
        {/* 1. 두 컴포넌트를 겹치기 위해서 부모 컴포넌트의 position을 relative로 설정 */}
        <Box
          position={"relative"}
          overflow={"hidden"}
          mb={2}
          rounded={"3xl"}
          w={"100%"}
          maxW={"300px"}
          maxH={"300px"}
          aspectRatio={1}
        >
          {imageUrl ? (
            <Image src={imageUrl} w={"100%"} h={"100%"} alt={name} />
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
            onClick={onCameraClick}
          >
            {isOwner ? (
              <FaCamera size={"20px"} />
            ) : (
              <FaRegHeart size={"20px"} />
            )}
          </Button>
        </Box>
        <Box w={"100%"}>
          <HStack gap={2} justifyContent={"space-between"} w={"100%"}>
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
          </HStack>
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

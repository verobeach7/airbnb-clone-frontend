import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Root() {
  return (
    <Box px={5}>
      <Header />
      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
}

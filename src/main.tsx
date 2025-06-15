import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ChakraProvider를 이용해 테마와 구성을 모든 컴포넌트에 전달할 수 있음 */}
    <ChakraProvider value={defaultSystem}>
      {/* Root router가 header, footer, child app을 렌더링 */}
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

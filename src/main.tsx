import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ColorModeProvider } from "./components/ui/color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      {/* ChakraProvider를 이용해 테마와 구성을 모든 컴포넌트에 전달할 수 있음 */}
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          {/* Root router가 header, footer, child app을 렌더링 */}
          <RouterProvider router={router} />
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);

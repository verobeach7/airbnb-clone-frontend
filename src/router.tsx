import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";

// createBrowserRouter는 함수
// 이 함수를 호출하여 이 안에 라우터 배열을 둠
const router = createBrowserRouter([
  {
    // react-router-dom의 동작 방식은 유저가 브라우저에 작성한 URL을 보는 것
    // router로 이동해서 해당 URL의 라우터가 있는지 확인
    // 있으면 연결된 컴포넌트를 보여줌
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;

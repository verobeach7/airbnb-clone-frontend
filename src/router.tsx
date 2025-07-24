import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadPhotos";
import RoomEdit from "./routes/RoomEdit";
import MyBookings from "./routes/MyBookings";
import RoomBookings from "./routes/RoomBookings";

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
        path: "my-bookings",
        element: <MyBookings />,
      },
      // "rooms/:roomPk"보다 위에다 두어 upload가 하나의 방(:roomPk)으로 인식하지 않도록 함
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "rooms/:roomPk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "rooms/:roomPk/edit",
        element: <RoomEdit />,
      },
      {
        path: "rooms/:roomPk/Bookings",
        element: <RoomBookings />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;

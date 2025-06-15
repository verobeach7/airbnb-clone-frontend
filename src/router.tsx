// 리액트 컴포넌트를 사용하기 위해서는 확장자가 tsx여야 함

// // react-router-dom 5.x 방식
// <Router>
//     <Route path="/">
//         <Home />
//     </Route>
//     <Route path="/movies/:id">
//         <MovieDetail />
//     </Route>
// </Router>

// react-router-dom 6.x 방식
import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Users from "./routes/Users";

// createBrowserRouter는 함수
// 이 함수를 호출하여 이 안에 라우터 배열을 둠
const router = createBrowserRouter([
  {
    // react-router-dom의 동작 방식은 유저가 브라우저에 작성한 URL을 보는 것
    // router로 이동해서 해당 URL의 라우터가 있는지 확인
    // 있으면 연결된 컴포넌트를 보여줌
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;

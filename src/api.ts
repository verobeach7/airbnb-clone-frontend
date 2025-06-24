import Cookie from "js-cookie";
import type { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

// Axios의 instance 생성 기능을 이용해 편리하게 이용할 수 있으며 오타로 인한 에러 발생 가능성도 줄여줌
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  // JavaScript는 Cookie를 자동으로 포함하여 보내지 않으므로 수동으로 설정해줘야 함
  withCredentials: true,
});

// export async function getRooms() {
//   // axios가 fetch부터 await json까지 내부적으로 다 처리함
//   const response = await instance.get(`rooms/`);
//   return response.data;
// }

// 한 줄로 만들어 줄 수 있음
export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

// export const getRoom = (something) => {
//   // React Query를 사용하면 자동으로 정보들을 객체에 담아 보내옴
//   // 이 객체 안에서 queryKey에 대한 정보를 가져올 수 있음
//   console.log(something);
//   return instance.get("rooms/1").then((response) => response.data);
// };

// QueryFunctionContext는 React Query에서 import된 type
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  // 필요 없는 데이터는 `_`를 이용하여 무시 할 수 있음
  // queryKey Array에 담긴 데이터 중 두번째 것만 필요
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        // Django로부터 받은 Cookie에 csrftoken이 없을 수도 있으므로 `|| ""` 설정
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

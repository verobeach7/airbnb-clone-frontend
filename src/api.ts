import axios from "axios";

// Axios의 instance 생성 기능을 이용해 편리하게 이용할 수 있으며 오타로 인한 에러 발생 가능성도 줄여줌
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

// export async function getRooms() {
//   // axios가 fetch부터 await json까지 내부적으로 다 처리함
//   const response = await instance.get(`rooms/`);
//   return response.data;
// }

// 한 줄로 만들어 줄 수 있음
export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

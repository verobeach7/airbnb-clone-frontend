import Cookie from "js-cookie";
import type { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import type { ISignUpVariables, IUsernameLoginVariables } from "./types";
import type { Value } from "./routes/RoomDetail";
import { formatDate } from "./lib/utils";

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
  const [, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  // `_`로 자리 표시를 하는 경우 eslint 에러 발생. 아예 생략해버릴 수 있음.
  const [, roomPk] = queryKey;
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

// Django(Backend로 Github로부터 받은 code를 보내는 API)
export const githubLogIn = ({ code }: { code: string }) =>
  instance
    .post(
      `/users/github`,
      { code },
      // 프론트엔드에서 백엔드로 보낼 때 헤더에 CSRF Token을 넣어서 보내야 보안 통과 가능
      {
        headers: {
          // Django로부터 받은 Cookie에 csrftoken이 없을 수도 있으므로 `|| ""` 설정
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = ({ code }: { code: string }) =>
  instance
    .post(
      `/users/kakao`,
      { code },
      // 프론트엔드에서 백엔드로 보낼 때 헤더에 CSRF Token을 넣어서 보내야 보안 통과 가능
      {
        headers: {
          // Django로부터 받은 Cookie에 csrftoken이 없을 수도 있으므로 `|| ""` 설정
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      // 프론트엔드에서 백엔드로 보낼 때 헤더에 CSRF Token을 넣어서 보내야 보안 통과 가능
      {
        headers: {
          // Django로부터 받은 Cookie에 csrftoken이 없을 수도 있으므로 `|| ""` 설정
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const signUp = ({ username, password, name, email }: ISignUpVariables) =>
  instance
    .post(
      `/users/sign-up`,
      { username, password, name, email },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities/`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories/`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(
      `rooms/`,
      variables,
      // 프론트엔드에서 백엔드로 보낼 때 헤더에 CSRF Token을 넣어서 보내야 보안 통과 가능
      {
        headers: {
          // Django로부터 받은 Cookie에 csrftoken이 없을 수도 있으므로 `|| ""` 설정
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    // Django(Backend)에서 방을 성공적으로 생성하고 나면 그 방을 프론트엔드로 반환해줌
    .then((response) => response.data);

// getUploadURL은 백엔드에 POST 요청을 보내고 백엔드로부터 One-time Upload URL을 반환받게 됨
export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}

// Cloudflare에 실제 이미지를 uploadURL을 사용하여 탑재하는 데 사용
export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  // new FormData()는 html form을 생성해줌: JavaScript를 사용하여 form을 생성
  const form = new FormData();
  form.append("file", file[0]);
  // 위에서 생성해 놓은 axios instance는 http://127.0.0.1:8000/api/v1/으로 가는데 여기서는 Cloudflare의 one-time upload url을 사용해야 함
  return (
    axios
      // data는 form을 넣어주면 됨
      .post(uploadURL, form, {
        headers: {
          // cloudflare에게 파일을 업로드한다고 알려주는 것
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
  );
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}

// 장고 DB에 사진 경로 저장
export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `rooms/${roomPk}/photos`, // 장고의 RoomPhotos 경로
      { description, file }, // 보낼 데이터
      {
        headers: {
          // CSRFToken은 허용된 사이트에서만 POST 요청을 보낼 수 있도록 해줌
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

// undefined일 수 있을 때 ? 사용
export type CheckBookingQueryKey = [string, string?, Value?];

// QueryFunctionContext의 타입을 generic으로 넣어주기
export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [, roomPk, dates] = queryKey;
  // 타입스크립트가 queryKey가 무엇인지 모르기 때문에 에러가 발생
  // TS에러 해결 방법1.
  // 아래처럼 타입 단언을 해 주거나 if(Array.isArray(dates))를 사용하여 확인해주어야 함
  // const [firstDate, secondDate] = dates as [Date, Date];
  // TS에러 해결 방법2. 추천!!!
  // queryKey가 어떤 타입인지 설명
  // generic으로 type을 넣어줘도 여전히 에러가 발생: undefined일 때가 있기 때문
  // 페이지가 로드되고 사용자가 어떤 날짜도 선택하지 않았을 때는 분명 undefined이기 때문
  // if로 해결
  if (dates) {
    const [firstDate, secondDate] = dates as [Date, Date];
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);
    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
  // 그렇다면 dates가 undefined일 때는 어떻게 RoomDetail.tsx에서 useQuery 실행을 막을 것인가???
  // 페이지가 로드된 순간에 useQuery 동작을 방지하는 방법
  // useQuery에 설정(configuration)을 위한 Object를 만들어 enabled를 false로 설정해주면 됨
};

export interface IRoomBookingVariables {
  check_in: string;
  check_out: string;
  roomPk: string;
  guests: number;
}

export interface IRoomBookingSuccess {
  check_in: string;
  check_out: string;
}

export type roomBookingErrMsgType = {
  [key: string]: string[];
};

export interface IRoomBookingError {
  response: {
    data: roomBookingErrMsgType;
    status: number;
    statusText: string;
  };
}

export const roomBooking = (variables: IRoomBookingVariables) =>
  instance
    .post(`rooms/${variables.roomPk}/bookings`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUpdateRoomVariables {
  roomPk: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const updateRoom = (variables: IUpdateRoomVariables) =>
  instance
    .put(`rooms/${variables.roomPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUserBookings = () =>
  instance.get("users/bookings").then((response) => response.data);

export const getRoomBookings = ({ queryKey }: QueryFunctionContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/bookings`)
    .then((response) => response.data);
};

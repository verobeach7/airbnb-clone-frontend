import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import type { IUser } from "../types";

export default function useUser() {
  // error가 필요한 이유: 로그인하지 않은 상태에서 이 쿼리를 사용하려고 하면 403 Forbidden 에러가 발생하기 때문
  // `api/v1/users/me` 접근은 로그인 한 사용자만 가능하기 때문
  // const { isLoading, data, error } = useQuery({
  // isError: 에러가 있는지 없는지 여부만 True, False로 반환
  const { isLoading, data, isError } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false, // 요청이 실패해도 한번만 실행함
  });
  return {
    // isLoading: isLoading,
    // ES6 문법에 의해 줄여쓸 수 있음
    // isLoading,
    // isLoading은 너무 일반적인 이름이므로 구체화하면 더 좋음
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError, // 에러가 없으면 로그인되었다는 것
  };
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectedPageProps {
  children: React.ReactNode;
}

// 로그인 하지 않은 사용자는 홈으로 돌아가도록 하여 접근하지 못 하도록 함
export default function ProtectedPage({ children }: IProtectedPageProps) {
  // Header 호출 시 캐시되어 있는 정보를 가져오므로 매우 빠르게 처리됨
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}

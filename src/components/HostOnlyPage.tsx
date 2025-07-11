import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

// 사용자가 Host인지만 확인하여 Host가 아닌 경우 홈으로 쫓아냄
export default function useHostOnlyPage() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);
  return;
}

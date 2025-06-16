import { Slot } from "expo-router";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthLayout() {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace("/(drawer)/home");
    }
  }, [isAuth]);

  return <Slot />;
}

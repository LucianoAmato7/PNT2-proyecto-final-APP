import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import MainDrawer from "../../components/mainDrawer";

export default function DrawerLayout() {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/(auth)/login");
    }
  }, [isAuth]);

  if (!isAuth) return null;

  return <MainDrawer />;
}

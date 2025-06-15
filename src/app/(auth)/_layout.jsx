import { useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../../context/authContext.jsx";
import { useEffect, useState } from "react";
import { Slot } from "expo-router";

function ProtectedRoutes() {
  const { isAuth } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    if (segments.length > 0) {
      setIsNavigationReady(true);
    }
  }, [segments]);

  useEffect(() => {
    if (!isNavigationReady) return;

    const currentRoute = segments[0]; // 'login' o '(drawer)'
    const isInLogin = currentRoute === "login";

    if (!isAuth && !isInLogin) {
      router.replace("/login");
    } else if (isAuth && isInLogin) {
      router.replace("/home");
    }
  }, [isAuth, segments, isNavigationReady]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoutes />
    </AuthProvider>
  );
}

import { useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext.jsx";
import { useEffect, useState } from "react";
import CustomDrawer from "../components/customDrawer.jsx";

function ProtectedLayout() {

    const {isAuth} = useAuth()
    const segments = useSegments()
    const router = useRouter()
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    useEffect(() => {
        if (segments.length > 0) {
        setIsNavigationReady(true);
        }
    }, [segments]);

    useEffect(() => {
        if (!isNavigationReady) return;

        const inAuthGroup = segments[0] === "login"

        if(!isAuth && !inAuthGroup) {
            router.replace("/login")
        }else if (isAuth && inAuthGroup) {
            router.replace("/home")
        }
    }, [isAuth, segments, isNavigationReady]);

    return (
        <CustomDrawer/>
    )
}

export default function Layout() {
    return (
        <AuthProvider>
            <ProtectedLayout/>
        </AuthProvider>
    )
}
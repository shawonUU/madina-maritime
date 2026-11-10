"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/storage";

export default function MmlAdminRedirect() {
    const router = useRouter();

    useEffect(() => {
        const token = getToken();

        router.replace(
            token
                ? "/mml-admin/dashboard"
                : "/mml-admin/login"
        );
    }, [router]);

    return null;
}
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import SideNav from "@/components/admin/SideNav";
import TopNav from "@/components/admin/TopNav";
import { getToken } from "@/lib/storage";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [openSidebar, setOpenSidebar] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            router.replace( `/admin/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        setCheckingAuth(false);
    }, [router, pathname]);

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-[#06245a] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {openSidebar && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setOpenSidebar(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
                />
            )}

            <SideNav
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
            />

            <div className="min-h-screen lg:pl-[280px]">
                <TopNav
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                />

                <main className="min-h-[calc(100vh-64px)] p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
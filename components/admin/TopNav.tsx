"use client";

import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    User,
    Settings,
    LogOut,
    UserCircle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "../../services/authService";
import { getUser, removeToken, removeUser, } from "../../lib/storage";

interface TopNavProps {
    openSidebar: boolean;
    setOpenSidebar: (value: boolean) => void;
}

interface UserData {
    id?: number;
    name?: string;
    email?: string;
    status?: string;
}

export default function TopNav({
    openSidebar,
    setOpenSidebar,
}: TopNavProps) {
    const router = useRouter();

    const [user, setUser] = useState<UserData | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUser = getUser();

        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            removeToken();
            removeUser();

            sessionStorage.removeItem("current_menu");

            router.replace("/admin/login");
        }
    };

    const handleProfile = () => {
        setProfileOpen(false);
        router.push("/admin/profile");
    };

    const handleSettings = () => {
        setProfileOpen(false);
        router.push("/admin/settings");
    };

    const displayName = user?.name || "Administrator";
    const displayEmail = user?.email || "admin@madina-maritime.com";

    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((item) => item.charAt(0).toUpperCase())
        .join("");

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#06245a] lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden min-w-0 md:block">
                    <p className="truncate text-sm font-semibold text-slate-700">
                        Madina Maritime
                    </p>

                    <p className="truncate text-[11px] text-slate-400">
                        Management System
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#06245a]"
                    aria-label="Search"
                >
                    <Search size={18} />
                </button>

                <button
                    type="button"
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#06245a]"
                    aria-label="Notifications"
                >
                    <Bell size={18} />

                    <span className="absolute right-1.5 top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                        3
                    </span>
                </button>

                <div
                    ref={profileRef}
                    className="relative ml-1"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06245a] text-xs font-bold text-white">
                            {initials || "A"}
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="max-w-[130px] truncate text-xs font-semibold text-slate-700">
                                {displayName}
                            </p>

                            <p className="max-w-[130px] truncate text-[10px] text-slate-400">
                                {displayEmail}
                            </p>
                        </div>

                        <ChevronDown
                            size={15}
                            className={`hidden text-slate-400 transition-transform sm:block ${
                                profileOpen
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                            <div className="border-b border-slate-100 px-4 py-3">
                                <p className="truncate text-sm font-semibold text-slate-700">
                                    {displayName}
                                </p>

                                <p className="truncate text-xs text-slate-400">
                                    {displayEmail}
                                </p>
                            </div>

                            <div className="p-2">
                                <button
                                    type="button"
                                    onClick={handleProfile}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#06245a]"
                                >
                                    <UserCircle size={17} />
                                    <span>Profile</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSettings}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#06245a]"
                                >
                                    <Settings size={17} />
                                    <span>Settings</span>
                                </button>
                            </div>

                            <div className="border-t border-slate-100 p-2">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
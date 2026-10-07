"use client";

import {
    ChevronDown,
    Settings,
    Users,
    Package,
    ShieldCheck,
    UserRound,
    FileText,
    ClipboardList,
    CalendarDays,
    BarChart3,
    Database,
    Building2,
    Truck,
    Receipt,
    ShoppingCart,
    Boxes,
    Folder,
    Circle,
    Utensils,
    ChevronRight,
    CircleDot,
    LayoutDashboard,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import api from "@/services/api";
import { setCurrentMenu } from "@/lib/storage";
import { userAccess } from "@/hooks/userAccess";

interface SidebarProps {
    openSidebar: boolean;
    setOpenSidebar: (value: boolean) => void;
}

interface ChildMenu {
    id: number;
    name: string;
    slug: string;
    route: string | null;
    permission: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
}

interface Menu {
    id: number;
    name: string;
    slug: string;
    route: string | null;
    permission: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    child_menus: ChildMenu[];
}

interface Module {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    menus: Menu[];
}

export default function SideNav({
    openSidebar,
    setOpenSidebar,
}: SidebarProps) {
    const {
        moduleHasAccess,
        menuHasAccess,
        childMenuHasAccess,
    } = userAccess();

    const router = useRouter();
    const pathname = usePathname();

    const [modules, setModules] = useState<Module[]>([]);
    const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(true);

    const iconMap: Record<string, React.ElementType> = {
        Settings,
        Users,
        Package,
        ShieldCheck,
        UserRound,
        FileText,
        ClipboardList,
        CalendarDays,
        BarChart3,
        Database,
        Building2,
        Truck,
        Receipt,
        ShoppingCart,
        Boxes,
        Folder,
        Utensils,
        ChevronRight,
        CircleDot,
        LayoutDashboard,
    };

    const getIcon = (icon: string | null) => {
        return iconMap[icon ?? ""] ?? Circle;
    };

    const getChildIcon = (icon: string | null) => {
        return iconMap[icon ?? ""] ?? CircleDot;
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/modules", {
                params: {
                    is_active: true,
                },
            });

            if (response.data.success) {
                setModules(response.data.data);
            }
        } catch (error) {
            console.error("Failed to load sidebar menus:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleModule = (moduleId: number) => {
        setOpenModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }));
    };

    const toggleMenu = (menuId: number) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menuId]: !prev[menuId],
        }));
    };

    const handleNavigate = (
        route: string | null,
        moduleId: number | null = null,
        menuId: number | null = null,
        childMenuId: number | null = null
    ) => {
        if (!route) {
            return;
        }

        setCurrentMenu(moduleId, menuId, childMenuId);

        router.push(route);

        setOpenSidebar(false);
    };

    const isActiveRoute = (route: string) => {
        return pathname === route;
    };

    const isChildActive = (
        moduleSlug: string,
        menuSlug: string,
        childSlug: string
    ) => {
        return (
            pathname ===
            `/${moduleSlug}/${menuSlug}/${childSlug}`
        );
    };

    const isMenuActive = (
        moduleSlug: string,
        menuSlug: string
    ) => {
        return pathname === `/${moduleSlug}/${menuSlug}`;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {openSidebar && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setOpenSidebar(false)}
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-[280px]
                    flex-col
                    overflow-hidden
                    border-r
                    border-slate-200
                    bg-white
                    shadow-[4px_0_20px_rgba(15,23,42,0.05)]
                    transition-transform
                    duration-300
                    ease-in-out
                    lg:translate-x-0
                    ${
                        openSidebar
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                {/* BRAND */}
                <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06245a] shadow-sm">
                            <span className="text-lg font-bold text-white">
                                M
                            </span>
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-[17px] font-bold tracking-tight text-[#06245a]">
                                Madina Maritime Admin Panal
                            </h1>

                            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Management System
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenSidebar(false)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">

                    {/* Dashboard */}
                    <div className="mb-5">

                        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Main
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                handleNavigate("/admin/dashboard")
                            }
                            className={`
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                ${
                                    isActiveRoute("/admin/dashboard")
                                        ? "bg-[#06245a] text-white shadow-md shadow-blue-900/10"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-[#06245a]"
                                }
                            `}
                        >
                            <span
                                className={`
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    transition
                                    ${
                                        isActiveRoute("/admin/dashboard")
                                            ? "bg-white/15 text-white"
                                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#06245a]"
                                    }
                                `}
                            >
                                <LayoutDashboard size={17} />
                            </span>

                            <span>Dashboard</span>
                        </button>

                    </div>

                    {/* MODULES */}
                    <div>

                        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Modules
                        </div>

                        {loading && (
                            <div className="space-y-2 px-2">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-10 animate-pulse rounded-xl bg-slate-100"
                                    />
                                ))}
                            </div>
                        )}

                        {!loading &&
                            modules.map((module) => {

                                if (!moduleHasAccess(module.id)) {
                                    return null;
                                }

                                const hasMenus =
                                    module.menus &&
                                    module.menus.length > 0;

                                const isModuleOpen =
                                    openModules[module.id] ?? false;

                                return (
                                    <div
                                        key={module.id}
                                        className="mb-1"
                                    >

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (hasMenus) {
                                                    toggleModule(module.id);
                                                }
                                            }}
                                            className={`
                                                group
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-3
                                                py-2.5
                                                text-left
                                                transition-all
                                                duration-200
                                                ${
                                                    isModuleOpen
                                                        ? "bg-slate-50 text-[#06245a]"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-[#06245a]"
                                                }
                                            `}
                                        >
                                            <span className="flex min-w-0 items-center gap-3">

                                                <span
                                                    className={`
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        transition
                                                        ${
                                                            isModuleOpen
                                                                ? "bg-blue-50 text-[#06245a]"
                                                                : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#06245a]"
                                                        }
                                                    `}
                                                >
                                                    {(() => {
                                                        const ModuleIcon =
                                                            getIcon(module.icon);

                                                        return (
                                                            <ModuleIcon size={17} />
                                                        );
                                                    })()}
                                                </span>

                                                <span className="truncate text-[13px] font-semibold">
                                                    {module.name}
                                                </span>

                                            </span>

                                            {hasMenus && (
                                                <ChevronDown
                                                    size={16}
                                                    className={`
                                                        shrink-0
                                                        text-slate-400
                                                        transition-transform
                                                        duration-200
                                                        ${
                                                            isModuleOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }
                                                    `}
                                                />
                                            )}

                                        </button>

                                        {hasMenus && (
                                            <div
                                                className={`
                                                    grid
                                                    transition-all
                                                    duration-300
                                                    ease-in-out
                                                    ${
                                                        isModuleOpen
                                                            ? "grid-rows-[1fr] opacity-100"
                                                            : "grid-rows-[0fr] opacity-0"
                                                    }
                                                `}
                                            >
                                                <div className="min-h-0 overflow-hidden">

                                                    <div className="relative ml-[27px] mt-1 space-y-1 border-l border-slate-200 pl-3">

                                                        {module.menus
                                                            .filter((menu) => {

                                                                if (
                                                                    menu.child_menus &&
                                                                    menu.child_menus.length > 0
                                                                ) {
                                                                    return menu.child_menus.some(
                                                                        (childMenu) =>
                                                                            childMenuHasAccess(
                                                                                menu.id,
                                                                                childMenu.id
                                                                            )
                                                                    );
                                                                }

                                                                return menuHasAccess(
                                                                    menu.id
                                                                );
                                                            })
                                                            .map((menu) => {

                                                                const accessibleChildren =
                                                                    menu.child_menus?.filter(
                                                                        (childMenu) =>
                                                                            childMenuHasAccess(
                                                                                menu.id,
                                                                                childMenu.id
                                                                            )
                                                                    ) ?? [];

                                                                const hasChildren =
                                                                    accessibleChildren.length >
                                                                    0;

                                                                const isMenuOpen =
                                                                    openMenus[
                                                                        menu.id
                                                                    ] ?? false;

                                                                const menuRoute =
                                                                    "/admin/" +
                                                                    module.slug +
                                                                    "/" +
                                                                    menu.slug;

                                                                const active =
                                                                    isMenuActive(
                                                                        module.slug,
                                                                        menu.slug
                                                                    );

                                                                return (
                                                                    <div
                                                                        key={menu.id}
                                                                        className="relative"
                                                                    >

                                                                        <span
                                                                            className={`
                                                                                absolute
                                                                                -left-[13px]
                                                                                top-1/2
                                                                                h-px
                                                                                w-3
                                                                                ${
                                                                                    active
                                                                                        ? "bg-[#06245a]"
                                                                                        : "bg-slate-200"
                                                                                }
                                                                            `}
                                                                        />

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                if (hasChildren) {
                                                                                    toggleMenu(
                                                                                        menu.id
                                                                                    );
                                                                                } else {
                                                                                    handleNavigate(
                                                                                        menuRoute,
                                                                                        module.id,
                                                                                        menu.id,
                                                                                        null
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className={`
                                                                                group
                                                                                flex
                                                                                w-full
                                                                                items-center
                                                                                justify-between
                                                                                rounded-lg
                                                                                px-3
                                                                                py-2
                                                                                text-left
                                                                                transition
                                                                                ${
                                                                                    active
                                                                                        ? "bg-blue-50 text-[#06245a]"
                                                                                        : "text-slate-500 hover:bg-slate-50 hover:text-[#06245a]"
                                                                                }
                                                                            `}
                                                                        >

                                                                            <span className="flex min-w-0 items-center gap-2.5">

                                                                                <span
                                                                                    className={`
                                                                                        shrink-0
                                                                                        ${
                                                                                            active
                                                                                                ? "text-[#06245a]"
                                                                                                : "text-slate-400 group-hover:text-[#06245a]"
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {(() => {
                                                                                        const MenuIcon =
                                                                                            getIcon(
                                                                                                menu.icon
                                                                                            );

                                                                                        return (
                                                                                            <MenuIcon
                                                                                                size={16}
                                                                                            />
                                                                                        );
                                                                                    })()}
                                                                                </span>

                                                                                <span
                                                                                    className={`
                                                                                        truncate
                                                                                        text-xs
                                                                                        ${
                                                                                            active
                                                                                                ? "font-semibold"
                                                                                                : "font-medium"
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {menu.name}
                                                                                </span>

                                                                            </span>

                                                                            {hasChildren && (
                                                                                <ChevronDown
                                                                                    size={14}
                                                                                    className={`
                                                                                        shrink-0
                                                                                        text-slate-400
                                                                                        transition-transform
                                                                                        ${
                                                                                            isMenuOpen
                                                                                                ? "rotate-180"
                                                                                                : ""
                                                                                        }
                                                                                    `}
                                                                                />
                                                                            )}

                                                                        </button>

                                                                        {hasChildren && (
                                                                            <div
                                                                                className={`
                                                                                    grid
                                                                                    transition-all
                                                                                    duration-300
                                                                                    ${
                                                                                        isMenuOpen
                                                                                            ? "grid-rows-[1fr] opacity-100"
                                                                                            : "grid-rows-[0fr] opacity-0"
                                                                                    }
                                                                                `}
                                                                            >
                                                                                <div className="min-h-0 overflow-hidden">

                                                                                    <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-100 pl-2">

                                                                                        {accessibleChildren.map(
                                                                                            (childMenu) => {

                                                                                                const childRoute =
                                                                                                    "/admin/" +
                                                                                                    module.slug +
                                                                                                    "/" +
                                                                                                    menu.slug +
                                                                                                    "/" +
                                                                                                    childMenu.slug;

                                                                                                const childActive =
                                                                                                    isChildActive(
                                                                                                        module.slug,
                                                                                                        menu.slug,
                                                                                                        childMenu.slug
                                                                                                    );

                                                                                                return (
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        key={
                                                                                                            childMenu.id
                                                                                                        }
                                                                                                        onClick={() =>
                                                                                                            handleNavigate(
                                                                                                                childRoute,
                                                                                                                module.id,
                                                                                                                menu.id,
                                                                                                                childMenu.id
                                                                                                            )
                                                                                                        }
                                                                                                        className={`
                                                                                                            group
                                                                                                            flex
                                                                                                            w-full
                                                                                                            items-center
                                                                                                            gap-2.5
                                                                                                            rounded-lg
                                                                                                            px-3
                                                                                                            py-2
                                                                                                            text-left
                                                                                                            text-[11px]
                                                                                                            transition
                                                                                                            ${
                                                                                                                childActive
                                                                                                                    ? "bg-[#06245a] font-semibold text-white shadow-sm"
                                                                                                                    : "text-slate-400 hover:bg-slate-50 hover:text-[#06245a]"
                                                                                                            }
                                                                                                        `}
                                                                                                    >

                                                                                                        <span
                                                                                                            className={`
                                                                                                                flex
                                                                                                                shrink-0
                                                                                                                items-center
                                                                                                                justify-center
                                                                                                                ${
                                                                                                                    childActive
                                                                                                                        ? "text-white"
                                                                                                                        : "text-slate-400 group-hover:text-[#06245a]"
                                                                                                                }
                                                                                                            `}
                                                                                                        >
                                                                                                            {(() => {
                                                                                                                const ChildIcon =
                                                                                                                    getChildIcon(
                                                                                                                        childMenu.icon
                                                                                                                    );

                                                                                                                return (
                                                                                                                    <ChildIcon
                                                                                                                        size={14}
                                                                                                                    />
                                                                                                                );
                                                                                                            })()}
                                                                                                        </span>

                                                                                                        <span className="truncate">
                                                                                                            {childMenu.name}
                                                                                                        </span>

                                                                                                    </button>
                                                                                                );
                                                                                            }
                                                                                        )}

                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                );
                                                            })}

                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                );
                            })}

                    </div>

                </nav>

                {/* FOOTER */}
                <div className="shrink-0 border-t border-slate-100 bg-slate-50/70 p-3">

                    <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#06245a] text-white">
                            <ShieldCheck size={17} />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-700">
                                Secure Access
                            </p>

                            <p className="truncate text-[10px] text-slate-400">
                                Madina ERP System
                            </p>
                        </div>

                    </div>

                </div>

            </aside>
        </>
    );
}
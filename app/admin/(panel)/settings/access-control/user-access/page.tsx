"use client";

import {
    ShieldCheck,
    Save,
    RefreshCw,
    ChevronDown,
    ChevronRight,
    UserRound,
    Check,
} from "lucide-react";
import { useEffect, useState } from "react";

import api from "@/services/api";

interface User {
    id: number;
    name: string;
    email?: string;
}

interface Permission {
    can_view: boolean;
    can_create: boolean;
    can_update: boolean;
    can_delete: boolean;
}

interface ChildMenu {
    id: number;
    code: string;
    name: string;
    slug: string;
    route?: string | null;
    icon?: string | null;
    sort_order: number;
    permission: Permission;
}

interface Menu {
    id: number;
    code: string;
    name: string;
    slug: string;
    route?: string | null;
    icon?: string | null;
    sort_order: number;
    has_child_menu: boolean;
    permission: Permission | null;
    child_menus: ChildMenu[];
}

interface Module {
    id: number;
    code: string;
    name: string;
    slug: string;
    icon?: string | null;
    sort_order: number;
    menus: Menu[];
}

export default function UserAccessPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const [modules, setModules] = useState<Module[]>([]);

    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingAccess, setLoadingAccess] = useState(false);
    const [saving, setSaving] = useState(false);

    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [expandedMenus, setExpandedMenus] = useState<number[]>([]);

    const loadUsers = async () => {
        try {
            setLoadingUsers(true);

            const res = await api.get("/admin/users");

            setUsers(res.data.data ?? res.data);
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const loadUserAccess = async (userId: number) => {
        try {
            setLoadingAccess(true);

            const res = await api.get(`/admin/users/${userId}/access`);

            const moduleData = res.data.data?.modules ?? [];

            setModules(moduleData);

            const moduleIds = moduleData.map(
                (module: Module) => module.id
            );

            setExpandedModules(moduleIds);
            setExpandedMenus([]);
        } catch (error) {
            console.error("Failed to load user access:", error);
            setModules([]);
        } finally {
            setLoadingAccess(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            loadUserAccess(selectedUser);
        } else {
            setModules([]);
            setExpandedModules([]);
            setExpandedMenus([]);
        }
    }, [selectedUser]);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId)
                ? prev.filter((id) => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const toggleMenu = (menuId: number) => {
        setExpandedMenus((prev) =>
            prev.includes(menuId)
                ? prev.filter((id) => id !== menuId)
                : [...prev, menuId]
        );
    };

    const updateMenuPermission = (
        moduleId: number,
        menuId: number,
        field: keyof Permission,
        value: boolean
    ) => {
        setModules((prev) =>
            prev.map((module) => {
                if (module.id !== moduleId) {
                    return module;
                }

                return {
                    ...module,
                    menus: module.menus.map((menu) => {
                        if (menu.id !== menuId || !menu.permission) {
                            return menu;
                        }

                        return {
                            ...menu,
                            permission: {
                                ...menu.permission,
                                [field]: value,
                            },
                        };
                    }),
                };
            })
        );
    };

    const updateChildPermission = (
        moduleId: number,
        menuId: number,
        childMenuId: number,
        field: keyof Permission,
        value: boolean
    ) => {
        setModules((prev) =>
            prev.map((module) => {
                if (module.id !== moduleId) {
                    return module;
                }

                return {
                    ...module,
                    menus: module.menus.map((menu) => {
                        if (menu.id !== menuId) {
                            return menu;
                        }

                        return {
                            ...menu,
                            child_menus: menu.child_menus.map((child) => {
                                if (child.id !== childMenuId) {
                                    return child;
                                }

                                return {
                                    ...child,
                                    permission: {
                                        ...child.permission,
                                        [field]: value,
                                    },
                                };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const isAllPermissionChecked = (
        permission: Permission | null
    ): boolean => {
        if (!permission) {
            return false;
        }

        return (
            permission.can_view &&
            permission.can_create &&
            permission.can_update &&
            permission.can_delete
        );
    };

    const setAllMenuPermissions = (
        moduleId: number,
        menuId: number,
        value: boolean
    ) => {
        const fields: (keyof Permission)[] = [
            "can_view",
            "can_create",
            "can_update",
            "can_delete",
        ];

        setModules((prev) =>
            prev.map((module) => {
                if (module.id !== moduleId) {
                    return module;
                }

                return {
                    ...module,
                    menus: module.menus.map((menu) => {
                        if (menu.id !== menuId || !menu.permission) {
                            return menu;
                        }

                        return {
                            ...menu,
                            permission: {
                                can_view: value,
                                can_create: value,
                                can_update: value,
                                can_delete: value,
                            },
                        };
                    }),
                };
            })
        );
    };

    const setAllChildPermissions = (
        moduleId: number,
        menuId: number,
        childMenuId: number,
        value: boolean
    ) => {
        const fields: (keyof Permission)[] = [
            "can_view",
            "can_create",
            "can_update",
            "can_delete",
        ];

        setModules((prev) =>
            prev.map((module) => {
                if (module.id !== moduleId) {
                    return module;
                }

                return {
                    ...module,
                    menus: module.menus.map((menu) => {
                        if (menu.id !== menuId) {
                            return menu;
                        }

                        return {
                            ...menu,
                            child_menus: menu.child_menus.map((child) => {
                                if (child.id !== childMenuId) {
                                    return child;
                                }

                                return {
                                    ...child,
                                    permission: {
                                        can_view: value,
                                        can_create: value,
                                        can_update: value,
                                        can_delete: value,
                                    },
                                };
                            }),
                        };
                    }),
                };
            })
        );
    };

    const saveAccess = async () => {
        if (!selectedUser) {
            return;
        }

        try {
            setSaving(true);

            const permissions: any[] = [];

            modules.forEach((module) => {
                module.menus.forEach((menu) => {
                    if (menu.child_menus.length > 0) {
                        menu.child_menus.forEach((child) => {
                            permissions.push({
                                module_id: module.id,
                                menu_id: menu.id,
                                child_menu_id: child.id,
                                can_view: child.permission.can_view,
                                can_create: child.permission.can_create,
                                can_update: child.permission.can_update,
                                can_delete: child.permission.can_delete,
                            });
                        });
                    } else if (menu.permission) {
                        permissions.push({
                            module_id: module.id,
                            menu_id: menu.id,
                            child_menu_id: null,
                            can_view: menu.permission.can_view,
                            can_create: menu.permission.can_create,
                            can_update: menu.permission.can_update,
                            can_delete: menu.permission.can_delete,
                        });
                    }
                });
            });

            await api.put(`/admin/users/${selectedUser}/access`, {
                permissions,
            });

            await loadUserAccess(selectedUser);
        } catch (error) {
            console.error("Failed to save user access:", error);
        } finally {
            setSaving(false);
        }
    };

    const refreshAccess = () => {
        if (selectedUser) {
            loadUserAccess(selectedUser);
        }
    };

    const permissionLabels = [
        {
            key: "can_view" as keyof Permission,
            label: "View",
        },
        {
            key: "can_create" as keyof Permission,
            label: "Create",
        },
        {
            key: "can_update" as keyof Permission,
            label: "Update",
        },
        {
            key: "can_delete" as keyof Permission,
            label: "Delete",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    User Access Management
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage module, menu and child menu permissions for users.
                </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                    <div className="flex-1">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Select User
                        </label>

                        <div className="relative">
                            <UserRound
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                value={selectedUser ?? ""}
                                onChange={(e) =>
                                    setSelectedUser(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : null
                                    )
                                }
                                disabled={loadingUsers}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                            >
                                <option value="">
                                    {loadingUsers
                                        ? "Loading users..."
                                        : "Select a user"}
                                </option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                        {user.email
                                            ? ` - ${user.email}`
                                            : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={refreshAccess}
                            disabled={!selectedUser || loadingAccess}
                            className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={18}
                                className={
                                    loadingAccess
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={saveAccess}
                            disabled={
                                !selectedUser ||
                                saving ||
                                loadingAccess
                            }
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#06245a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#041b45] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save size={18} />

                            {saving ? "Saving..." : "Save Access"}
                        </button>
                    </div>
                </div>
            </div>

            {!selectedUser && (
                <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                    <div className="mx-auto flex w-fit rounded-2xl bg-blue-50 p-4">
                        <ShieldCheck
                            size={35}
                            className="text-[#06245a]"
                        />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-gray-800">
                        Select a User
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        Select a user above to manage their module and
                        menu access.
                    </p>
                </div>
            )}

            {selectedUser && (
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            Access Permissions
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Select the permissions this user should have.
                        </p>
                    </div>

                    {loadingAccess ? (
                        <div className="p-12 text-center">
                            <RefreshCw
                                size={30}
                                className="mx-auto animate-spin text-[#06245a]"
                            />

                            <p className="mt-4 text-sm text-gray-500">
                                Loading access permissions...
                            </p>
                        </div>
                    ) : modules.length === 0 ? (
                        <div className="p-12 text-center text-sm text-gray-500">
                            No active modules found.
                        </div>
                    ) : (
                        <div className="space-y-4 p-6">
                            {modules.map((module) => {
                                const moduleExpanded =
                                    expandedModules.includes(module.id);

                                return (
                                    <div
                                        key={module.id}
                                        className="overflow-hidden rounded-2xl border border-gray-200"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleModule(module.id)
                                            }
                                            className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left transition hover:bg-gray-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                {moduleExpanded ? (
                                                    <ChevronDown size={20} />
                                                ) : (
                                                    <ChevronRight size={20} />
                                                )}

                                                <ShieldCheck
                                                    size={20}
                                                    className="text-[#06245a]"
                                                />

                                                <span className="font-bold text-gray-800">
                                                    {module.name}
                                                </span>

                                                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#06245a]">
                                                    {module.menus.length} Menus
                                                </span>
                                            </div>
                                        </button>

                                        {moduleExpanded && (
                                            <div className="space-y-3 p-4">
                                                {module.menus.map((menu) => {
                                                    const hasChildren =
                                                        menu.child_menus.length >
                                                        0;

                                                    const menuExpanded =
                                                        expandedMenus.includes(
                                                            menu.id
                                                        );

                                                    return (
                                                        <div
                                                            key={menu.id}
                                                            className="overflow-hidden rounded-xl border border-gray-100"
                                                        >
                                                            <div className="flex flex-col gap-4 bg-white px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
                                                                <div className="flex min-w-0 items-center gap-2">
                                                                    {hasChildren ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleMenu(
                                                                                    menu.id
                                                                                )
                                                                            }
                                                                            className="rounded-lg p-1 transition hover:bg-gray-100"
                                                                        >
                                                                            {menuExpanded ? (
                                                                                <ChevronDown
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <ChevronRight
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </button>
                                                                    ) : (
                                                                        <div className="w-7" />
                                                                    )}

                                                                    <span className="font-semibold text-gray-700">
                                                                        {
                                                                            menu.name
                                                                        }
                                                                    </span>

                                                                    {hasChildren && (
                                                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                                                            {
                                                                                menu
                                                                                    .child_menus
                                                                                    .length
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {!hasChildren &&
                                                                    menu.permission && (
                                                                        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                                                                            {permissionLabels.map(
                                                                                (
                                                                                    permission
                                                                                ) => (
                                                                                    <label
                                                                                        key={
                                                                                            permission.key
                                                                                        }
                                                                                        className="flex w-16 cursor-pointer flex-col items-center justify-center gap-1"
                                                                                    >
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={
                                                                                                menu
                                                                                                    .permission?.[
                                                                                                    permission.key
                                                                                                ] ??
                                                                                                false
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                updateMenuPermission(
                                                                                                    module.id,
                                                                                                    menu.id,
                                                                                                    permission.key,
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked
                                                                                                )
                                                                                            }
                                                                                            className="peer hidden"
                                                                                        />

                                                                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-gray-200 transition peer-checked:border-[#06245a] peer-checked:bg-[#06245a]">
                                                                                            {menu
                                                                                                .permission?.[
                                                                                                permission.key
                                                                                            ] && (
                                                                                                <Check
                                                                                                    size={
                                                                                                        17
                                                                                                    }
                                                                                                    className="text-white"
                                                                                                />
                                                                                            )}
                                                                                        </span>

                                                                                        <span className="text-[11px] font-semibold text-gray-500">
                                                                                            {
                                                                                                permission.label
                                                                                            }
                                                                                        </span>
                                                                                    </label>
                                                                                )
                                                                            )}

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    setAllMenuPermissions(
                                                                                        module.id,
                                                                                        menu.id,
                                                                                        !isAllPermissionChecked(
                                                                                            menu.permission
                                                                                        )
                                                                                    )
                                                                                }
                                                                                className="ml-1 text-xs font-semibold text-[#06245a] hover:underline"
                                                                            >
                                                                                {isAllPermissionChecked(
                                                                                    menu.permission
                                                                                )
                                                                                    ? "Clear"
                                                                                    : "All"}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                            </div>

                                                            {hasChildren &&
                                                                menuExpanded && (
                                                                    <div className="space-y-2 border-t border-gray-100 bg-gray-50 p-3">
                                                                        {menu.child_menus.map(
                                                                            (
                                                                                child
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        child.id
                                                                                    }
                                                                                    className="flex flex-col gap-4 rounded-xl bg-white px-4 py-3 lg:flex-row lg:items-center lg:justify-between"
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className="w-7" />

                                                                                        <span className="text-sm font-medium text-gray-600">
                                                                                            {
                                                                                                child.name
                                                                                            }
                                                                                        </span>
                                                                                    </div>

                                                                                    <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                                                                                        {permissionLabels.map(
                                                                                            (
                                                                                                permission
                                                                                            ) => (
                                                                                                <label
                                                                                                    key={
                                                                                                        permission.key
                                                                                                    }
                                                                                                    className="flex w-16 cursor-pointer flex-col items-center justify-center gap-1"
                                                                                                >
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        checked={
                                                                                                            child
                                                                                                                .permission[
                                                                                                                permission.key
                                                                                                            ] ??
                                                                                                            false
                                                                                                        }
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            updateChildPermission(
                                                                                                                module.id,
                                                                                                                menu.id,
                                                                                                                child.id,
                                                                                                                permission.key,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked
                                                                                                            )
                                                                                                        }
                                                                                                        className="peer hidden"
                                                                                                    />

                                                                                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-gray-200 transition peer-checked:border-[#06245a] peer-checked:bg-[#06245a]">
                                                                                                        {child
                                                                                                            .permission[
                                                                                                            permission.key
                                                                                                        ] && (
                                                                                                            <Check
                                                                                                                size={
                                                                                                                    17
                                                                                                                }
                                                                                                                className="text-white"
                                                                                                            />
                                                                                                        )}
                                                                                                    </span>

                                                                                                    <span className="text-[11px] font-semibold text-gray-500">
                                                                                                        {
                                                                                                            permission.label
                                                                                                        }
                                                                                                    </span>
                                                                                                </label>
                                                                                            )
                                                                                        )}

                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                setAllChildPermissions(
                                                                                                    module.id,
                                                                                                    menu.id,
                                                                                                    child.id,
                                                                                                    !isAllPermissionChecked(
                                                                                                        child.permission
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                            className="ml-1 text-xs font-semibold text-[#06245a] hover:underline"
                                                                                        >
                                                                                            {isAllPermissionChecked(
                                                                                                child.permission
                                                                                            )
                                                                                                ? "Clear"
                                                                                                : "All"}
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
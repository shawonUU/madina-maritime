"use client";

import {
    Plus,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    Menu as MenuIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

import api from "@/services/api";

interface ModuleData {
    id: number;
    name: string;
}

interface MenuData {
    id: number;
    module_id: number;
    name: string;
    slug: string;
    route: string | null;
    permission: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    module?: ModuleData;
}

interface MenuForm {
    module_id: string;
    name: string;
    slug: string;
    route: string;
    permission: string;
    icon: string;
    sort_order: number;
    is_active: boolean;
}

const initialForm: MenuForm = {
    module_id: "",
    name: "",
    slug: "",
    route: "",
    permission: "",
    icon: "",
    sort_order: 0,
    is_active: true,
};

export default function Menu() {
    const [menus, setMenus] = useState<MenuData[]>([]);
    const [modules, setModules] = useState<ModuleData[]>([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState<MenuForm>({
        ...initialForm,
    });

    const fetchData = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const [menuResponse, moduleResponse] = await Promise.all([
                api.get("/admin/menus"),
                api.get("/admin/modules"),
            ]);

            if (menuResponse.data.success) {
                setMenus(menuResponse.data.data);
            }

            if (moduleResponse.data.success) {
                setModules(moduleResponse.data.data);
            }
        } catch (error) {
            console.error("Failed to load menus:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openCreateModal = () => {
        setEditingId(null);
        setForm({ ...initialForm });
        setModalOpen(true);
    };

    const openEditModal = (menu: MenuData) => {
        setEditingId(menu.id);

        setForm({
            module_id: String(menu.module_id),
            name: menu.name,
            slug: menu.slug,
            route: menu.route || "",
            permission: menu.permission || "",
            icon: menu.icon || "",
            sort_order: menu.sort_order,
            is_active: menu.is_active,
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingId(null);
        setForm({ ...initialForm });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !form.module_id ||
            !form.name.trim() ||
            !form.slug.trim()
        ) {
            return;
        }

        try {
            setSaving(true);

            const payload = {
                module_id: Number(form.module_id),
                name: form.name.trim(),
                slug: form.slug.trim(),
                route: form.route.trim() || null,
                permission: form.permission.trim() || null,
                icon: form.icon.trim() || null,
                sort_order: Number(form.sort_order),
                is_active: form.is_active,
            };

            if (editingId) {
                await api.put(
                    `/admin/menus/${editingId}`,
                    payload
                );
            } else {
                await api.post(
                    "/admin/menus",
                    payload
                );
            }

            setModalOpen(false);
            setEditingId(null);
            setForm({ ...initialForm });

            await fetchData();
        } catch (error: any) {
            console.error("Failed to save menu:", error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save menu."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this menu?"
            )
        ) {
            return;
        }

        try {
            await api.delete(`/admin/menus/${id}`);

            await fetchData(true);
        } catch (error: any) {
            console.error(
                "Failed to delete menu:",
                error
            );

            alert(
                error?.response?.data?.message ||
                    "Failed to delete menu."
            );
        }
    };

    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <MenuIcon
                            size={20}
                            className="text-[#06245a]"
                        />

                        <span className="text-sm font-semibold text-[#06245a]">
                            System Management
                        </span>
                    </div>

                    <h2 className="mt-1 text-2xl font-extrabold text-gray-800 lg:text-3xl">
                        Menus
                    </h2>

                    <p className="mt-1 text-gray-500">
                        Manage module menus and navigation items.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => fetchData(true)}
                        disabled={refreshing}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#06245a]/20 hover:text-[#06245a] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw
                            size={17}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />
                    </button>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#06245a] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#041d4a]"
                    >
                        <Plus size={18} />
                        Add Menu
                    </button>
                </div>
            </div>

            {/* Menu Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-5">
                    <h3 className="text-xl font-bold text-gray-800">
                        Menu List
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        All available menus
                    </p>
                </div>

                {loading ? (
                    <div className="py-16 text-center">
                        <RefreshCw
                            size={30}
                            className="mx-auto animate-spin text-[#06245a]"
                        />

                        <p className="mt-3 text-sm text-gray-500">
                            Loading menus...
                        </p>
                    </div>
                ) : menus.length === 0 ? (
                    <div className="py-16 text-center">
                        <MenuIcon
                            size={32}
                            className="mx-auto text-gray-300"
                        />

                        <p className="mt-3 font-semibold text-gray-600">
                            No menus found
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        #
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Module
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Name
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Route
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Permission
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Sort Order
                                    </th>

                                    <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {menus.map((menu, index) => (
                                    <tr
                                        key={menu.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-[#06245a]">
                                                {menu.module?.name ||
                                                    "--"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {menu.name}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    {menu.slug}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">
                                                {menu.route || "--"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">
                                                {menu.permission ||
                                                    "--"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {menu.sort_order}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                                                    menu.is_active
                                                        ? "border-green-100 bg-green-50 text-green-700"
                                                        : "border-red-100 bg-red-50 text-red-700"
                                                }`}
                                            >
                                                {menu.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(
                                                            menu
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                >
                                                    <Pencil
                                                        size={16}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            menu.id
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                                >
                                                    <Trash2
                                                        size={16}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                                    <MenuIcon
                                        size={21}
                                        className="text-[#06245a]"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {editingId
                                            ? "Update Menu"
                                            : "Create Menu"}
                                    </h3>

                                    <p className="mt-0.5 text-xs text-gray-400">
                                        {editingId
                                            ? "Update menu information"
                                            : "Add a new menu under a module"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex min-h-0 flex-col"
                        >
                            {/* Modal Body */}
                            <div className="space-y-5 overflow-y-auto p-6">
                                {/* Module */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Module
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        value={form.module_id}
                                        onChange={(e) =>
                                            setForm(
                                                (prev) => ({
                                                    ...prev,
                                                    module_id:
                                                        e.target
                                                            .value,
                                                })
                                            )
                                        }
                                        required
                                        disabled={saving}
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50 disabled:text-gray-400"
                                    >
                                        <option value="">
                                            Select Module
                                        </option>

                                        {modules.map((module) => (
                                            <option
                                                key={module.id}
                                                value={module.id}
                                            >
                                                {module.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Name + Slug */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Name
                                            <span className="ml-1 text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        name: e
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            required
                                            disabled={saving}
                                            placeholder="System Management"
                                            className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Slug
                                            <span className="ml-1 text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        slug: e
                                                            .target
                                                            .value,
                                                    })
                                                )
                                            }
                                            required
                                            disabled={saving}
                                            placeholder="system-management"
                                            className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                {/* Route */}
                                <div className="hidden">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Route
                                    </label>

                                    <input
                                        type="text"
                                        value={form.route}
                                        onChange={(e) =>
                                            setForm(
                                                (prev) => ({
                                                    ...prev,
                                                    route: e.target
                                                        .value,
                                                })
                                            )
                                        }
                                        disabled={saving}
                                        placeholder="/admin/system-management/modules"
                                        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                    />

                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Leave empty if this menu only
                                        contains child menus.
                                    </p>
                                </div>

                                {/* Permission + Icon */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Permission
                                        </label>

                                        <input
                                            type="text"
                                            value={form.permission}
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        permission:
                                                            e.target
                                                                .value,
                                                    })
                                                )
                                            }
                                            disabled={saving}
                                            placeholder="menu.view"
                                            className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Icon
                                        </label>

                                        <input
                                            type="text"
                                            value={form.icon}
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        icon: e.target
                                                            .value,
                                                    })
                                                )
                                            }
                                            disabled={saving}
                                            placeholder="Settings2"
                                            className="h-11 w-full rounded-xl border border-gray-200 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                {/* Sort Order + Active */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Sort Order
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            value={form.sort_order}
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        sort_order:
                                                            Number(
                                                                e
                                                                    .target
                                                                    .value
                                                            ),
                                                    })
                                                )
                                            }
                                            disabled={saving}
                                            className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#06245a]/20 disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <label className="flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 transition hover:bg-gray-50">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Active
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Show this menu
                                                </p>
                                            </div>

                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.is_active
                                                }
                                                onChange={(e) =>
                                                    setForm(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            is_active:
                                                                e
                                                                    .target
                                                                    .checked,
                                                        })
                                                    )
                                                }
                                                disabled={saving}
                                                className="h-5 w-5 rounded text-[#06245a] focus:ring-[#06245a]"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#06245a] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#041d4a] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <RefreshCw
                                                size={16}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : editingId ? (
                                        "Update"
                                    ) : (
                                        "Create"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
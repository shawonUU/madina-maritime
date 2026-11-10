
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    X,
    Loader2,
    Users,
    RefreshCw,
} from "lucide-react";

import api from "@/services/api";

type Role = {
    id: number;
    name: string;
};

type Employee = {
    id: number;
    name?: string;
};

type User = {
    id: number;
    code: string;
    employee_id: number | null;
    employee?: Employee | null;
    name: string;
    email: string;
    status: "Active" | "Inactive";
    roles: Role[];
};

type UserForm = {
    employee_id: string;
    name: string;
    email: string;
    password: string;
    status: "Active" | "Inactive";
    role: string;
};

type Pagination = {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

const initialForm: UserForm = {
    employee_id: "",
    name: "",
    email: "",
    password: "",
    status: "Active",
    role: "",
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [pagination, setPagination] = useState<Pagination>({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 15,
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form, setForm] = useState<UserForm>(initialForm);

    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchUsers = useCallback(async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/admin/users", {
                params: {
                    search: search || undefined,
                    status: statusFilter || undefined,
                    role: roleFilter || undefined,
                    page,
                    per_page: 15,
                },
            });

            const result = response.data.data;

            setUsers(result.data ?? []);

            setPagination({
                current_page: result.current_page ?? 1,
                last_page: result.last_page ?? 1,
                total: result.total ?? 0,
                per_page: result.per_page ?? 15,
            });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                    "Failed to load users."
            );
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, roleFilter]);

    const fetchRoles = useCallback(async () => {
        try {
            const response = await api.get("/admin/roles");

            const result = response.data.data;

            setRoles(
                Array.isArray(result)
                    ? result
                    : result?.data ?? []
            );
        } catch {
            setRoles([]);
        }
    }, []);

    useEffect(() => {
        fetchUsers(1);
    }, [fetchUsers]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const openCreateModal = () => {
        setEditingUser(null);
        setForm(initialForm);
        setError("");
        setModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);

        setForm({
            employee_id: user.employee_id
                ? String(user.employee_id)
                : "",
            name: user.name,
            email: user.email,
            password: "",
            status: user.status,
            role: user.roles?.[0]?.name ?? "",
        });

        setError("");
        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;

        setModalOpen(false);
        setEditingUser(null);
        setForm(initialForm);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        const payload = {
            code: editingUser?.code || `USR-${Date.now()}`,
            employee_id: form.employee_id
                ? Number(form.employee_id)
                : null,
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password || undefined,
            status: form.status,
            role: form.role || null,
        };

        try {
            if (editingUser) {
                await api.put(
                    `/admin/users/${editingUser.id}`,
                    payload
                );

                setSuccess("User updated successfully.");
            } else {
                await api.post("/admin/users", payload);

                setSuccess("User created successfully.");
            }

            setModalOpen(false);
            setEditingUser(null);
            setForm(initialForm);

            await fetchUsers(1);
        } catch (err: any) {
            const responseErrors = err?.response?.data?.errors;

            if (responseErrors) {
                const firstError = Object.values(responseErrors)
                    .flat()
                    .find((value) => typeof value === "string");

                setError(
                    firstError
                        ? String(firstError)
                        : "Validation failed."
                );
            } else {
                setError(
                    err?.response?.data?.message ||
                        "Something went wrong."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteUser) return;

        setDeleting(true);
        setError("");
        setSuccess("");

        try {
            await api.delete(`/admin/users/${deleteUser.id}`);

            setDeleteUser(null);
            setSuccess("User deleted successfully.");

            const currentPage = pagination.current_page;

            await fetchUsers(
                users.length === 1 && currentPage > 1
                    ? currentPage - 1
                    : currentPage
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                    "Failed to delete user."
            );

            setDeleteUser(null);
        } finally {
            setDeleting(false);
        }
    };

    const updateForm = (
        field: keyof UserForm,
        value: string
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        User Management
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage system users, roles and account status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a347e]"
                >
                    <Plus size={18} />
                    Create User
                </button>
            </div>

            {/* Notifications */}
            {error && !modalOpen && (
                <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={() => setError("")}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {success && (
                <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    <span>{success}</span>

                    <button
                        type="button"
                        onClick={() => setSuccess("")}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                        <Users size={22} />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Total Users
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800">
                            {pagination.total}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search code, name or email"
                            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {/* <select
                        value={roleFilter}
                        onChange={(event) =>
                            setRoleFilter(event.target.value)
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option value="">All Roles</option>

                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select> */}

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setStatusFilter("");
                            setRoleFilter("");
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        <RefreshCw size={16} />
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* User Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-5 py-4">Code</th>
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Email</th>
                                {/* <th className="px-5 py-4">Employee</th> */}
                                {/* <th className="px-5 py-4">Role</th> */}
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-12 text-center"
                                    >
                                        <Loader2
                                            className="mx-auto animate-spin text-blue-700"
                                            size={28}
                                        />

                                        <p className="mt-2 text-slate-500">
                                            Loading users...
                                        </p>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-12 text-center text-slate-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-slate-50"
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-700">
                                            {user.code}
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-slate-800">
                                            {user.name}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {user.email}
                                        </td>

                                        {/* <td className="px-5 py-4 text-slate-600">
                                            {user.employee?.name ||
                                                user.employee_id ||
                                                "-"}
                                        </td> */}

                                        {/* <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles?.length ? (
                                                    user.roles.map((role) => (
                                                        <span
                                                            key={role.id}
                                                            className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-400">
                                                        No Role
                                                    </span>
                                                )}
                                            </div>
                                        </td> */}

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    user.status === "Active"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-700"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(user)
                                                    }
                                                    title="Edit User"
                                                    className="rounded-lg border border-blue-200 p-2 text-blue-700 transition hover:bg-blue-50"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDeleteUser(user)
                                                    }
                                                    title="Delete User"
                                                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row">
                    <p className="text-sm text-slate-500">
                        Total {pagination.total} users
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={
                                pagination.current_page <= 1 || loading
                            }
                            onClick={() =>
                                fetchUsers(pagination.current_page - 1)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="px-2 text-sm text-slate-600">
                            Page {pagination.current_page} of{" "}
                            {pagination.last_page}
                        </span>

                        <button
                            type="button"
                            disabled={
                                pagination.current_page >=
                                    pagination.last_page ||
                                loading
                            }
                            onClick={() =>
                                fetchUsers(pagination.current_page + 1)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {editingUser
                                        ? "Update User"
                                        : "Create User"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Fill in the user information below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >
                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Employee ID */}
                                <div className="hidden">
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Employee ID
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={form.employee_id}
                                        onChange={(event) =>
                                            updateForm(
                                                "employee_id",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Optional"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(event) =>
                                            updateForm(
                                                "name",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter full name"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Email Address *
                                    </label>

                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(event) =>
                                            updateForm(
                                                "email",
                                                event.target.value
                                            )
                                        }
                                        placeholder="user@madinamaritime.com"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Password {!editingUser && "*"}
                                    </label>

                                    <input
                                        type="password"
                                        required={!editingUser}
                                        minLength={8}
                                        value={form.password}
                                        onChange={(event) =>
                                            updateForm(
                                                "password",
                                                event.target.value
                                            )
                                        }
                                        placeholder={
                                            editingUser
                                                ? "Leave blank to keep current password"
                                                : "Minimum 8 characters"
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Role */}
                                <div className="hidden">
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Role
                                    </label>

                                    <select
                                        value={form.role}
                                        onChange={(event) =>
                                            updateForm(
                                                "role",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">No Role</option>

                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.name}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Account Status *
                                    </label>

                                    <select
                                        required
                                        value={form.status}
                                        onChange={(event) =>
                                            updateForm(
                                                "status",
                                                event.target.value as
                                                    | "Active"
                                                    | "Inactive"
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a347e] disabled:opacity-60"
                                >
                                    {saving && (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    )}

                                    {editingUser
                                        ? "Update User"
                                        : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="text-lg font-bold text-slate-800">
                            Delete User
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-slate-800">
                                {deleteUser.name}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() => setDeleteUser(null)}
                                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {deleting && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                )}

                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

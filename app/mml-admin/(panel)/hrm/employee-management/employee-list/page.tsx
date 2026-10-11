
"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    RefreshCw,
    X,
    UserPlus,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import api from "@/services/api";

interface User {
    id: number;
    name: string;
    email: string;
    status: "Active" | "Inactive";
}

interface Employee {
    id: number;
    employee_code: string;
    name: string;
    department?: string | null;
    designation?: string | null;
    phone?: string | null;
    email?: string | null;
    status: "Active" | "Inactive";
    user?: User | null;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface EmployeeForm {
    name: string;
    employee_code: string;
    department: string;
    designation: string;
    phone: string;
    email: string;
    status: "Active" | "Inactive";
    create_user: boolean;
    user_password: string;
}

const initialForm: EmployeeForm = {
    name: "",
    employee_code: "",
    department: "",
    designation: "",
    phone: "",
    email: "",
    status: "Active",
    create_user: false,
    user_password: "",
};

const initialPagination: Pagination = {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
};

export default function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [form, setForm] = useState<EmployeeForm>(initialForm);

    const [editId, setEditId] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [openSidebar, setOpenSidebar] = useState(false);

    const [pagination, setPagination] =
        useState<Pagination>(initialPagination);

    const getErrorMessage = (
        error: unknown,
        fallback: string
    ): string => {
        const err = error as {
            response?: {
                data?: {
                    message?: string;
                    errors?: Record<string, string[] | string>;
                };
            };
        };

        const responseData = err?.response?.data;

        if (responseData?.message) {
            return responseData.message;
        }

        if (responseData?.errors) {
            const firstError = Object.values(responseData.errors)
                .flatMap((message) =>
                    Array.isArray(message) ? message : [message]
                )
                .find((message) => typeof message === "string");

            if (firstError) {
                return firstError;
            }
        }

        return fallback;
    };

    const normalizeEmployeesResponse = (
        responseData: unknown
    ): {
        data: Employee[];
        pagination: Pagination;
    } => {
        const response = responseData as {
            data?: unknown;
            current_page?: number;
            last_page?: number;
            per_page?: number;
            total?: number;
        };

        let data: Employee[] = [];
        let meta = response;

        if (Array.isArray(responseData)) {
            data = responseData as Employee[];

            return {
                data,
                pagination: {
                    current_page: 1,
                    last_page: 1,
                    per_page: data.length || 15,
                    total: data.length,
                },
            };
        }

        if (Array.isArray(response?.data)) {
            data = response.data as Employee[];
        } else {
            const nested = response?.data as {
                data?: unknown;
                current_page?: number;
                last_page?: number;
                per_page?: number;
                total?: number;
            } | undefined;

            if (Array.isArray(nested?.data)) {
                data = nested.data as Employee[];
                meta = nested;
            }
        }

        return {
            data,
            pagination: {
                current_page: Number(meta?.current_page) || 1,
                last_page: Number(meta?.last_page) || 1,
                per_page: Number(meta?.per_page) || 15,
                total: Number(meta?.total) || data.length,
            },
        };
    };

    const fetchEmployees = useCallback(
        async (page = 1) => {
            try {
                setLoading(true);

                const response = await api.get("/employees", {
                    params: {
                        page,
                        per_page: 15,
                        search: search.trim() || undefined,
                        status: statusFilter || undefined,
                    },
                });

                const normalized = normalizeEmployeesResponse(
                    response.data
                );

                setEmployees(normalized.data);
                setPagination(normalized.pagination);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                setEmployees([]);

                alert(
                    getErrorMessage(
                        error,
                        "Failed to load employees."
                    )
                );
            } finally {
                setLoading(false);
            }
        },
        [search, statusFilter]
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchEmployees(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [fetchEmployees]);

    const openCreateModal = () => {
        setEditId(null);
        setForm({ ...initialForm });
        setOpenModal(true);
    };

    const openEditModal = (employee: Employee) => {
        setEditId(employee.id);

        setForm({
            name: employee.name || "",
            employee_code: employee.employee_code || "",
            department: employee.department || "",
            designation: employee.designation || "",
            phone: employee.phone || "",
            email: employee.email || "",
            status: employee.status || "Active",
            create_user: Boolean(employee.user),
            user_password: "",
        });

        setOpenModal(true);
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setOpenModal(false);
        setEditId(null);
        setForm({ ...initialForm });
    };

    const handleChange = <K extends keyof EmployeeForm>(
        field: K,
        value: EmployeeForm[K]
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            alert("Employee name is required.");
            return false;
        }

        if (form.create_user && !form.email.trim()) {
            alert(
                "Email is required when system access is enabled."
            );
            return false;
        }

        if (
            form.create_user &&
            editId === null &&
            !form.user_password
        ) {
            alert(
                "Password is required when creating a user account."
            );
            return false;
        }

        if (
            form.create_user &&
            form.user_password &&
            form.user_password.length < 6
        ) {
            alert("Password must be at least 6 characters.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSaving(true);

            const payload: Record<string, unknown> = {
                name: form.name.trim(),
                department: form.department.trim() || null,
                designation: form.designation.trim() || null,
                phone: form.phone.trim() || null,
                email: form.email.trim() || null,
                status: form.status,
                create_user: form.create_user,
            };

            if (form.create_user && form.user_password) {
                payload.user_password = form.user_password;
            }

            const currentEditId = editId;

            if (currentEditId !== null) {
                await api.put(
                    `/employees/${currentEditId}`,
                    payload
                );
            } else {
                await api.post("/employees", payload);
            }

            setOpenModal(false);
            setEditId(null);
            setForm({ ...initialForm });

            await fetchEmployees(
                currentEditId !== null
                    ? pagination.current_page
                    : 1
            );
        } catch (error) {
            console.error("Failed to save employee:", error);

            alert(
                getErrorMessage(
                    error,
                    "Failed to save employee."
                )
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (employee: Employee) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${employee.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(employee.id);

            await api.delete(`/employees/${employee.id}`);

            const nextPage =
                employees.length === 1 &&
                pagination.current_page > 1
                    ? pagination.current_page - 1
                    : pagination.current_page;

            await fetchEmployees(nextPage);
        } catch (error) {
            console.error("Failed to delete employee:", error);

            alert(
                getErrorMessage(
                    error,
                    "Failed to delete employee."
                )
            );
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusClass = (status: string) => {
        return status === "Active"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-slate-100 text-slate-600 border border-slate-200";
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100">


            <div className="min-w-0 flex-1">


                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Employees
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage employees and their system access.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        void fetchEmployees(
                                            pagination.current_page
                                        )
                                    }
                                    disabled={loading}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <RefreshCw
                                        size={17}
                                        className={
                                            loading ? "animate-spin" : ""
                                        }
                                    />
                                    Refresh
                                </button>

                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                                >
                                    <Plus size={18} />
                                    Add Employee
                                </button>
                            </div>
                        </div>

                        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex flex-col gap-3 md:flex-row">
                                <div className="relative flex-1">
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search by employee code, name, email, phone..."
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Employee
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Department
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Designation
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Contact
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                System Access
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="px-5 py-16 text-center"
                                                >
                                                    <RefreshCw
                                                        size={28}
                                                        className="mx-auto animate-spin text-indigo-500"
                                                    />
                                                    <p className="mt-3 text-sm font-medium text-slate-500">
                                                        Loading employees...
                                                    </p>
                                                </td>
                                            </tr>
                                        ) : employees.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="px-5 py-16 text-center"
                                                >
                                                    <div className="mx-auto flex max-w-sm flex-col items-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                                            <UserPlus size={26} />
                                                        </div>

                                                        <h3 className="mt-4 text-base font-bold text-slate-800">
                                                            No employees found
                                                        </h3>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Add a new employee to get started.
                                                        </p>

                                                        <button
                                                            type="button"
                                                            onClick={openCreateModal}
                                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                                        >
                                                            <Plus size={17} />
                                                            Add Employee
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            employees.map((employee) => (
                                                <tr
                                                    key={employee.id}
                                                    className="transition hover:bg-slate-50/80"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                                                                {employee.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() || "E"}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="font-semibold text-slate-800">
                                                                    {employee.name}
                                                                </div>
                                                                <div className="mt-0.5 text-xs font-medium text-indigo-600">
                                                                    {employee.employee_code || "-"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        {employee.department || "-"}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        {employee.designation || "-"}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="space-y-1">
                                                            <div className="text-sm text-slate-700">
                                                                {employee.phone || "-"}
                                                            </div>
                                                            <div className="max-w-[220px] truncate text-xs text-slate-400">
                                                                {employee.email || "-"}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {employee.user ? (
                                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                                                                <ShieldCheck size={16} />
                                                                Enabled
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-slate-400">
                                                                No Login
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                                employee.status
                                                            )}`}
                                                        >
                                                            {employee.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEditModal(employee)
                                                                }
                                                                title="Edit Employee"
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    void handleDelete(employee)
                                                                }
                                                                disabled={
                                                                    deletingId === employee.id
                                                                }
                                                                title="Delete Employee"
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {deletingId === employee.id ? (
                                                                    <RefreshCw
                                                                        size={16}
                                                                        className="animate-spin"
                                                                    />
                                                                ) : (
                                                                    <Trash2 size={16} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {!loading && employees.length > 0 && (
                                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-slate-500">
                                        Showing{" "}
                                        <span className="font-semibold text-slate-700">
                                            {(pagination.current_page - 1) *
                                                pagination.per_page +
                                                1}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-semibold text-slate-700">
                                            {Math.min(
                                                pagination.current_page *
                                                    pagination.per_page,
                                                pagination.total
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-slate-700">
                                            {pagination.total}
                                        </span>{" "}
                                        employees
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            disabled={
                                                pagination.current_page <= 1
                                            }
                                            onClick={() =>
                                                void fetchEmployees(
                                                    pagination.current_page - 1
                                                )
                                            }
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronLeft size={17} />
                                        </button>

                                        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white">
                                            {pagination.current_page}
                                        </div>

                                        <button
                                            type="button"
                                            disabled={
                                                pagination.current_page >=
                                                pagination.last_page
                                            }
                                            onClick={() =>
                                                void fetchEmployees(
                                                    pagination.current_page + 1
                                                )
                                            }
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronRight size={17} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {openModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-3 sm:p-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="my-auto flex max-h-[calc(100dvh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-32px)]">
                        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editId !== null
                                        ? "Update Employee"
                                        : "Create Employee"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {editId !== null
                                        ? "Update employee information and system access."
                                        : "Add a new employee to the system."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Employee Name{" "}
                                            <span className="text-red-500">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(event) =>
                                                handleChange(
                                                    "name",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            placeholder="Enter employee name"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Employee Code
                                        </label>

                                        <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500">
                                            {editId !== null
                                                ? form.employee_code || "Auto generated"
                                                : "Auto generated"}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Status
                                        </label>

                                        <select
                                            value={form.status}
                                            onChange={(event) =>
                                                handleChange(
                                                    "status",
                                                    event.target.value as
                                                        | "Active"
                                                        | "Inactive"
                                                )
                                            }
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        >
                                            <option value="Active">
                                                Active
                                            </option>
                                            <option value="Inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Department
                                        </label>

                                        <input
                                            type="text"
                                            value={form.department}
                                            onChange={(event) =>
                                                handleChange(
                                                    "department",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter department"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Designation
                                        </label>

                                        <input
                                            type="text"
                                            value={form.designation}
                                            onChange={(event) =>
                                                handleChange(
                                                    "designation",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter designation"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={(event) =>
                                                handleChange(
                                                    "phone",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter phone number"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Email
                                            {form.create_user && (
                                                <span className="text-red-500">
                                                    {" "}*
                                                </span>
                                            )}
                                        </label>

                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(event) =>
                                                handleChange(
                                                    "email",
                                                    event.target.value
                                                )
                                            }
                                            required={form.create_user}
                                            placeholder="Enter email address"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                            <ShieldCheck size={20} />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-slate-800">
                                                System Access
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                Create a login account for this employee to access the system.
                                            </p>
                                        </div>

                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                checked={form.create_user}
                                                onChange={(event) =>
                                                    handleChange(
                                                        "create_user",
                                                        event.target.checked
                                                    )
                                                }
                                                className="peer sr-only"
                                            />

                                            <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-indigo-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
                                        </label>
                                    </div>

                                    {form.create_user && (
                                        <div className="mt-5 border-t border-slate-200 pt-5">
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                {editId !== null
                                                    ? "New Password"
                                                    : "Password"}

                                                {editId === null && (
                                                    <span className="text-red-500">
                                                        {" "}*
                                                    </span>
                                                )}
                                            </label>

                                            <input
                                                type="password"
                                                value={form.user_password}
                                                onChange={(event) =>
                                                    handleChange(
                                                        "user_password",
                                                        event.target.value
                                                    )
                                                }
                                                required={
                                                    editId === null &&
                                                    form.create_user
                                                }
                                                minLength={6}
                                                autoComplete="new-password"
                                                placeholder={
                                                    editId !== null
                                                        ? "Leave blank to keep current password"
                                                        : "Enter password"
                                                }
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                            />

                                            <p className="mt-2 text-xs text-slate-500">
                                                Leave the password blank when updating an existing account to keep its current password.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex h-11 min-w-[140px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <RefreshCw
                                                size={17}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            {editId !== null ? (
                                                <Pencil size={17} />
                                            ) : (
                                                <Plus size={18} />
                                            )}

                                            {editId !== null
                                                ? "Update Employee"
                                                : "Create Employee"}
                                        </>
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

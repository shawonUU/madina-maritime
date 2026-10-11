"use client";

import {
    BarChart3,
    CheckCircle2,
    ShieldCheck,
    Users,
    Boxes,
    Activity,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    getToken,
    getUser,
    getUserAccess,
} from "../../../../lib/storage";

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
}

interface Access {
    module_id: number;
    menu_id: number;
    child_menu_id: number | null;
    can_view: boolean;
    can_create: boolean;
    can_update: boolean;
    can_delete: boolean;
}

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [accesses, setAccesses] = useState<Access[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token) {router.replace("/admin/login");return;}

        setUser(getUser());
        setAccesses(getUserAccess());
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#06245a]" />

                    <span className="text-sm">
                        Loading dashboard...
                    </span>

                </div>
            </div>
        );
    }

    const totalPermissions = accesses.length;

    const viewPermissions = accesses.filter(
        (item) => item.can_view
    ).length;

    const createPermissions = accesses.filter(
        (item) => item.can_create
    ).length;

    const updatePermissions = accesses.filter(
        (item) => item.can_update
    ).length;

    return (
        <div>

            {/* Page Header */}
            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Welcome back,{" "}
                    <span className="font-medium text-gray-700">
                        {user?.name || "Administrator"}
                    </span>
                    . Here is your administration overview.
                </p>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Access
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                {totalPermissions}
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                Assigned access records
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                            <ShieldCheck
                                size={21}
                                className="text-[#06245a]"
                            />
                        </div>

                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                View Access
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                {viewPermissions}
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                Records with view permission
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
                            <CheckCircle2
                                size={21}
                                className="text-green-600"
                            />
                        </div>

                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Create Access
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                {createPermissions}
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                Records with create permission
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50">
                            <Boxes
                                size={21}
                                className="text-purple-600"
                            />
                        </div>

                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Update Access
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                {updatePermissions}
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                Records with update permission
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
                            <Activity
                                size={21}
                                className="text-orange-500"
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

                {/* System Overview */}
                <div className="rounded-xl border border-gray-200 bg-white xl:col-span-2">

                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                System Overview
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Current administration access overview
                            </p>
                        </div>

                        <BarChart3
                            size={20}
                            className="text-[#06245a]"
                        />

                    </div>

                    <div className="p-5">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="rounded-lg border border-gray-100 p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                        <Users
                                            size={19}
                                            className="text-[#06245a]"
                                        />
                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Administrator
                                        </p>

                                        <p className="mt-0.5 text-sm font-semibold text-gray-900">
                                            {user?.name ||
                                                "Administrator"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-lg border border-gray-100 p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                        <CheckCircle2
                                            size={19}
                                            className="text-green-600"
                                        />
                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Account Status
                                        </p>

                                        <p className="mt-0.5 text-sm font-semibold text-green-600">
                                            {user?.status ||
                                                "Active"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Permission Summary */}
                        <div className="mt-5">

                            <h3 className="mb-3 text-sm font-semibold text-gray-800">
                                Permission Summary
                            </h3>

                            <div className="space-y-3">

                                <div>

                                    <div className="mb-1.5 flex items-center justify-between">

                                        <span className="text-xs text-gray-500">
                                            View
                                        </span>

                                        <span className="text-xs font-medium text-gray-700">
                                            {viewPermissions}
                                        </span>

                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full rounded-full bg-[#06245a]"
                                            style={{
                                                width:
                                                    totalPermissions > 0
                                                        ? `${Math.min(
                                                              (viewPermissions /
                                                                  totalPermissions) *
                                                                  100,
                                                              100
                                                          )}%`
                                                        : "0%",
                                            }}
                                        />

                                    </div>

                                </div>

                                <div>

                                    <div className="mb-1.5 flex items-center justify-between">

                                        <span className="text-xs text-gray-500">
                                            Create
                                        </span>

                                        <span className="text-xs font-medium text-gray-700">
                                            {createPermissions}
                                        </span>

                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full rounded-full bg-purple-500"
                                            style={{
                                                width:
                                                    totalPermissions > 0
                                                        ? `${Math.min(
                                                              (createPermissions /
                                                                  totalPermissions) *
                                                                  100,
                                                              100
                                                          )}%`
                                                        : "0%",
                                            }}
                                        />

                                    </div>

                                </div>

                                <div>

                                    <div className="mb-1.5 flex items-center justify-between">

                                        <span className="text-xs text-gray-500">
                                            Update
                                        </span>

                                        <span className="text-xs font-medium text-gray-700">
                                            {updatePermissions}
                                        </span>

                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full rounded-full bg-orange-500"
                                            style={{
                                                width:
                                                    totalPermissions > 0
                                                        ? `${Math.min(
                                                              (updatePermissions /
                                                                  totalPermissions) *
                                                                  100,
                                                              100
                                                          )}%`
                                                        : "0%",
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Profile */}
                <div className="rounded-xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-100 px-5 py-4">

                        <h2 className="text-base font-semibold text-gray-900">
                            Account Information
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Logged in administrator
                        </p>

                    </div>

                    <div className="p-5">

                        <div className="flex flex-col items-center text-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#06245a] text-2xl font-bold text-white">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "A"}
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                {user?.name ||
                                    "Administrator"}
                            </h3>

                            <p className="mt-1 break-all text-sm text-gray-500">
                                {user?.email || ""}
                            </p>

                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">

                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                                {user?.status ||
                                    "Active"}

                            </div>

                        </div>

                        <div className="mt-6 border-t border-gray-100 pt-5">

                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-gray-500">
                                    Total Access
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    {totalPermissions}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-gray-500">
                                    View Access
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    {viewPermissions}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-gray-500">
                                    Create Access
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    {createPermissions}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-gray-500">
                                    Update Access
                                </span>

                                <span className="text-sm font-semibold text-gray-800">
                                    {updatePermissions}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Status */}
            <div className="mt-5 rounded-xl border border-gray-200 bg-white px-5 py-4">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                            <CheckCircle2
                                size={18}
                                className="text-green-600"
                            />
                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-800">
                                System is operational
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                                Your account is active and authenticated.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">

                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        Connected

                    </div>

                </div>

            </div>

        </div>
    );
}
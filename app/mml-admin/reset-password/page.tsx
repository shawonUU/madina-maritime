"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, ArrowLeft, CheckCircle2 } from "lucide-react";
import api from "@/services/api";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!token || !email) {
            setError("Invalid password reset link. Please request a new link.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/reset-password", {
                token,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            setSuccess(
                response.data.message || "Password reset successfully."
            );

            setTimeout(() => {
                router.replace("/mml-admin/login");
            }, 1500);
        } catch (err: any) {
            const responseData = err.response?.data;

            if (responseData?.errors) {
                const firstError = Object.values(responseData.errors)
                    .flat()
                    .find((message) => typeof message === "string");

                setError(
                    typeof firstError === "string"
                        ? firstError
                        : "Unable to reset password."
                );
            } else {
                setError(
                    responseData?.message ||
                    "Unable to reset password. The link may be invalid or expired."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <Link
                    href="/admin/login"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#06245a]"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#06245a]">
                    <LockKeyhole size={26} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Reset Password
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Create a new password for your account.
                </p>

                {email && (
                    <p className="mt-3 break-all text-sm font-medium text-gray-700">
                        {email}
                    </p>
                )}

                {success && (
                    <div className="mt-6 flex gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                        <p>{success} Redirecting to login...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                disabled={loading || !!success}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-[#06245a]"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                            Use at least 8 characters.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                                required
                                disabled={loading || !!success}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-[#06245a]"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !!success}
                        className="w-full rounded-lg bg-[#06245a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Resetting Password..." : "Reset Password"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <Link
                        href="/admin/login"
                        className="font-semibold text-[#06245a] hover:text-blue-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
                    Loading...
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import api from "@/services/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await api.post("/auth/forgot-password", {
                email,
            });

            setMessage(
                response.data.message ||
                "If your email is registered, you will receive password reset instructions."
            );
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Unable to process your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <Link
                    href="/admin/login"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#06245a]"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#06245a]">
                    <Mail size={26} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Forgot Password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Enter your registered email address. If your account exists,
                    we will send you instructions to reset your password.
                </p>

                {message && (
                    <div className="mt-6 flex gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                        <p>{message}</p>
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
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#06245a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
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
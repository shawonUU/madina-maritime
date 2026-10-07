"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck,
    Building2,
    CheckCircle2,
} from "lucide-react";

import { login } from "../../../services/authService";

export default function AdminLoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError(
                "Please enter your email address and password."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await login(form);

            if (response.token) {
                setSuccess(true);

                const redirect =
                    new URLSearchParams(window.location.search).get("redirect");

                router.replace(redirect || "/admin/dashboard");

                return;
            }

            setError(
                response.message ||
                    "Invalid email address or password."
            );
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                "Invalid email address or password.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4 py-8">

            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">

                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#06245a]/5" />

                <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full bg-[#06245a]/5" />

            </div>


            {/* Login Container */}
            <div className="relative w-full max-w-[440px]">

                {/* Brand */}
                <div className="text-center mb-7">

                    <div className="flex justify-center mb-4">

                        <div className="w-14 h-14 rounded-xl bg-[#06245a] flex items-center justify-center shadow-lg shadow-[#06245a]/20">
                            <Building2
                                size={27}
                                className="text-white"
                            />
                        </div>

                    </div>

                    <h1 className="text-xl font-bold text-[#06245a]">
                        Madina Maritime
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Administration Portal
                    </p>

                </div>


                {/* Login Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* Card Top */}
                    <div className="px-7 sm:px-9 pt-8 pb-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <ShieldCheck
                                    size={21}
                                    className="text-[#06245a]"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Administrator Sign In
                                </h2>

                                <p className="text-xs text-gray-500 mt-0.5">
                                    Secure access to the management system
                                </p>
                            </div>

                        </div>


                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <div className="flex items-start gap-2.5">

                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />

                                    <p className="text-sm text-red-600 leading-5">
                                        {error}
                                    </p>

                                </div>
                            </div>
                        )}


                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>

                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        disabled={loading}
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    />

                                </div>

                            </div>


                            {/* Password */}
                            <div>

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        disabled={loading}
                                        className="w-full h-11 pl-10 pr-11 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        disabled={loading}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#06245a] transition disabled:cursor-not-allowed"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Forgot Password */}
                            <div className="flex justify-end">

                                <Link
                                    href="/admin/forgot-password"
                                    className="text-sm font-medium text-[#06245a] hover:text-blue-700 transition"
                                >
                                    Forgot Password?
                                </Link>

                            </div>


                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 rounded-lg bg-[#06245a] hover:bg-[#041d4a] text-white text-sm font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Signing In...
                                    </>
                                ) : success ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        Signed In
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={17} />
                                    </>
                                )}

                            </button>

                        </form>

                    </div>


                    {/* Security Footer */}
                    <div className="border-t border-gray-100 bg-gray-50 px-7 sm:px-9 py-4">

                        <div className="flex items-start gap-3">

                            <ShieldCheck
                                size={18}
                                className="text-[#06245a] mt-0.5 shrink-0"
                            />

                            <div>

                                <p className="text-xs font-semibold text-gray-700">
                                    Secure Administration
                                </p>

                                <p className="text-xs text-gray-500 mt-1 leading-5">
                                    This portal is restricted to authorized
                                    personnel only.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Copyright */}
                <div className="text-center mt-6">

                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Madina Maritime Ltd.
                        All rights reserved.
                    </p>

                </div>

            </div>
        </div>
    );
}

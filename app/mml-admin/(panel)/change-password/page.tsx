
"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
} from "lucide-react";
import api from "@/services/api";

export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrorMessage("");
        setSuccessMessage("");
    };

    const togglePassword = (field: "current" | "new" | "confirm") => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        if (formData.password !== formData.password_confirmation) {
            setErrorMessage("New password and confirm password do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setErrorMessage("New password must be at least 8 characters.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/auth/change-password",
                formData
            );

            setSuccessMessage(
                response.data.message || "Password changed successfully."
            );

            setFormData({
                current_password: "",
                password: "",
                password_confirmation: "",
            });
        } catch (error: any) {
            const responseData = error?.response?.data;

            if (responseData?.errors) {
                const firstError = Object.values(
                    responseData.errors
                ).flat()[0];

                setErrorMessage(
                    String(firstError || "Please check your input.")
                );
            } else {
                setErrorMessage(
                    responseData?.message ||
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const renderPasswordField = (
        label: string,
        name: "current_password" | "password" | "password_confirmation",
        field: "current" | "new" | "confirm",
        placeholder: string
    ) => (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    type={showPassword[field] ? "text" : "password"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                />

                <button
                    type="button"
                    onClick={() => togglePassword(field)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#06245a]"
                    aria-label={showPassword[field] ? "Hide password" : "Show password"}
                >
                    {showPassword[field] ? (
                        <EyeOff size={19} />
                    ) : (
                        <Eye size={19} />
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Change Password
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update your account password to keep your account secure.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {successMessage && (
                        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            <AlertCircle size={19} className="mt-0.5 shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className="max-w-xl space-y-5">
                        {renderPasswordField(
                            "Current Password",
                            "current_password",
                            "current",
                            "Enter current password"
                        )}

                        <div className="border-t border-gray-100 pt-5">

                            <div className="space-y-5">
                                {renderPasswordField(
                                    "New Password",
                                    "password",
                                    "new",
                                    "Enter new password"
                                )}

                                {renderPasswordField(
                                    "Confirm New Password",
                                    "password_confirmation",
                                    "confirm",
                                    "Re-enter new password"
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            Password must contain at least 8 characters.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    current_password: "",
                                    password: "",
                                    password_confirmation: "",
                                });
                                setErrorMessage("");
                                setSuccessMessage("");
                            }}
                            disabled={loading}
                            className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#06245a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a347d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={17} className="animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <LockKeyhole size={17} />
                                    Update Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

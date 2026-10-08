"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import api from "@/services/api";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");
        setErrors({});

        try {
            const response = await api.post(
                "/website/contact-enquiries",
                form
            );

            setSuccess(
                response.data.message ||
                    "Your message has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (err: any) {
            const response = err?.response?.data;

            if (response?.errors) {
                setErrors(response.errors);
                setError("Please check the form fields and try again.");
            } else {
                setError(
                    response?.message ||
                        "Unable to submit your message. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

    const fieldError = (field: string) =>
        errors[field]?.length ? (
            <p className="mt-1 text-sm text-red-600">
                {errors[field][0]}
            </p>
        ) : null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
                <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <CheckCircle2 size={20} className="shrink-0" />
                    <p>{success}</p>
                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name *
                </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your full name"
                    required
                    maxLength={150}
                    autoComplete="name"
                />
                {fieldError("name")}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@example.com"
                        required
                        maxLength={255}
                        autoComplete="email"
                    />
                    {fieldError("email")}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your phone number"
                        maxLength={50}
                        autoComplete="tel"
                    />
                    {fieldError("phone")}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject *
                </label>
                <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="How can we help you?"
                    required
                    maxLength={255}
                />
                {fieldError("subject")}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Message *
                </label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} min-h-36 resize-y`}
                    placeholder="Write your message here..."
                    required
                    maxLength={10000}
                    rows={5}
                />
                {fieldError("message")}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06245a] px-6 py-3.5 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send size={18} />
                    </>
                )}
            </button>
        </form>
    );
}
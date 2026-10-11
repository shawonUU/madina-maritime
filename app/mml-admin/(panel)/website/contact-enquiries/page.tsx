"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Search,
    Eye,
    Trash2,
    Reply,
    X,
    Mail,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import api from "@/services/api";

interface ContactReply {
    id: number;
    reply_message: string;
    replied_by: string | null;
    recipient_email: string;
    sent_at: string | null;
    created_at: string;
}

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: "New" | "Read" | "Replied";
    replies_count?: number;
    created_at: string;
    read_at: string | null;
    replied_at: string | null;
    replies?: ContactReply[];
}

interface PaginationData {
    current_page: number;
    last_page: number;
    total: number;
}

export default function ContactEnquiriesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selected, setSelected] = useState<ContactMessage | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    const loadMessages = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/website/admin/contact-enquiries", {
                params: {
                    search: search || undefined,
                    status: status || undefined,
                    page,
                },
            });

            const result = response.data;

            setMessages(result.data.data);
            setPagination({
                current_page: result.data.current_page,
                last_page: result.data.last_page,
                total: result.data.total,
            });
            setCounts(result.counts || {});
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                    "Failed to load contact enquiries."
            );
        } finally {
            setLoading(false);
        }
    }, [search, status, page]);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const openMessage = async (id: number) => {
        setActionError("");
        setActionSuccess("");

        try {
            const response = await api.get(
                `/website/admin/contact-enquiries/${id}`
            );

            setSelected(response.data.data);
            setReplyMessage("");
            loadMessages();
        } catch (err: any) {
            setActionError(
                err?.response?.data?.message ||
                    "Failed to load enquiry details."
            );
        }
    };

    const sendReply = async () => {
        if (!selected || !replyMessage.trim()) {
            setActionError("Please write a reply message.");
            return;
        }

        if (
            !window.confirm(
                `Send this reply to ${selected.email}?`
            )
        ) {
            return;
        }

        setSendingReply(true);
        setActionError("");
        setActionSuccess("");

        try {
            const response = await api.post(
                `/website/admin/contact-enquiries/${selected.id}/reply`,
                {
                    reply_message: replyMessage.trim(),
                }
            );

            setSelected(response.data.data);
            setReplyMessage("");
            setActionSuccess("Reply email sent successfully.");

            await loadMessages();
        } catch (err: any) {
            setActionError(
                err?.response?.data?.message ||
                    "Failed to send reply email."
            );
        } finally {
            setSendingReply(false);
        }
    };

    const deleteMessage = async (item: ContactMessage) => {
        if (
            !window.confirm(
                `Delete the enquiry from ${item.name}? This cannot be undone.`
            )
        ) {
            return;
        }

        try {
            await api.delete(
                `/website/admin/contact-enquiries/${item.id}`
            );

            if (selected?.id === item.id) {
                setSelected(null);
            }

            await loadMessages();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                    "Failed to delete enquiry."
            );
        }
    };

    const statusClass = (value: string) => {
        if (value === "New") {
            return "bg-blue-50 text-blue-700";
        }

        if (value === "Replied") {
            return "bg-green-50 text-green-700";
        }

        return "bg-slate-100 text-slate-600";
    };

    const formatDate = (value: string) =>
        new Date(value).toLocaleString("en-BD", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#06245a]">
                            Contact Enquiries
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage website messages and reply by email.
                        </p>
                    </div>

                    <button
                        onClick={loadMessages}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: "New", value: counts.New || 0 },
                        { label: "Read", value: counts.Read || 0 },
                        { label: "Replied", value: counts.Replied || 0 },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-slate-200 bg-white p-5"
                        >
                            <p className="text-sm text-slate-500">
                                {item.label} Enquiries
                            </p>
                            <p className="mt-2 text-3xl font-bold text-[#06245a]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search name, email, subject or phone..."
                                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                <tr>
                                    <th className="px-5 py-4">Sender</th>
                                    <th className="px-5 py-4">Subject</th>
                                    <th className="px-5 py-4">Received</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Replies</th>
                                    <th className="px-5 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center text-slate-500"
                                        >
                                            Loading enquiries...
                                        </td>
                                    </tr>
                                ) : messages.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center text-slate-500"
                                        >
                                            No contact enquiries found.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-slate-800">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-slate-500">
                                                    {item.email}
                                                </p>
                                            </td>

                                            <td className="max-w-xs px-5 py-4">
                                                <p className="truncate font-medium text-slate-700">
                                                    {item.subject}
                                                </p>
                                                <p className="mt-1 truncate text-slate-400">
                                                    {item.message}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                                {formatDate(item.created_at)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {item.replies_count || 0}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openMessage(item.id)
                                                        }
                                                        title="View and reply"
                                                        className="rounded-lg border border-blue-100 p-2 text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Eye size={17} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteMessage(item)
                                                        }
                                                        title="Delete enquiry"
                                                        className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                        <p className="text-sm text-slate-500">
                            Total: {pagination.total} enquiries
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setPage((current) => Math.max(1, current - 1))
                                }
                                disabled={page <= 1 || loading}
                                className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <span className="text-sm text-slate-600">
                                {pagination.current_page} / {pagination.last_page}
                            </span>

                            <button
                                onClick={() =>
                                    setPage((current) =>
                                        Math.min(pagination.last_page, current + 1)
                                    )
                                }
                                disabled={
                                    page >= pagination.last_page || loading
                                }
                                className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6">
                    <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
                            <div>
                                <h2 className="text-lg font-bold text-[#06245a]">
                                    Enquiry Details
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Received {formatDate(selected.created_at)}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
                            {actionError && (
                                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                    {actionError}
                                </div>
                            )}

                            {actionSuccess && (
                                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                                    {actionSuccess}
                                </div>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        Name
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-800">
                                        {selected.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all font-medium text-slate-800">
                                        {selected.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        Phone
                                    </p>
                                    <p className="mt-1 text-slate-700">
                                        {selected.phone || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        Subject
                                    </p>
                                    <p className="mt-1 font-medium text-slate-800">
                                        {selected.subject}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                                    Original Message
                                </p>
                                <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                                    {selected.message}
                                </div>
                            </div>

                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Mail size={18} className="text-blue-700" />
                                    <h3 className="font-bold text-[#06245a]">
                                        Reply History ({selected.replies?.length || 0})
                                    </h3>
                                </div>

                                {selected.replies?.length ? (
                                    <div className="space-y-3">
                                        {selected.replies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="rounded-xl border border-slate-200 p-4"
                                            >
                                                <div className="flex flex-wrap justify-between gap-2">
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        To: {reply.recipient_email}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {reply.sent_at
                                                            ? formatDate(reply.sent_at)
                                                            : "Not marked as sent"}
                                                    </span>
                                                </div>
                                                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                                    {reply.reply_message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No replies have been sent yet.
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-slate-200 pt-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Write Reply
                                </label>

                                <textarea
                                    value={replyMessage}
                                    onChange={(e) =>
                                        setReplyMessage(e.target.value)
                                    }
                                    rows={5}
                                    maxLength={20000}
                                    placeholder="Write your email reply here..."
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Reply will be emailed to {selected.email}.
                                </p>

                                <button
                                    onClick={sendReply}
                                    disabled={
                                        sendingReply || !replyMessage.trim()
                                    }
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Reply size={17} />
                                    {sendingReply ? "Sending Reply..." : "Send Reply"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
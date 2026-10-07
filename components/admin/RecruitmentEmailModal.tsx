"use client";

import { useEffect, useState } from "react";
import {
    Mail,
    X,
    Eye,
    Send,
} from "lucide-react";
import api from "@/services/api";

interface EmailTemplate {
    id: number;
    name: string;
    code: string;
    subject: string;
    body: string;
}

interface Application {
    id: number;
    name: string;
    email: string;
    application_no: string;
}

interface Props {
    applicationIds: number[];
    applications: Application[];
    open: boolean;
    onClose: () => void;
}

export default function RecruitmentEmailModal({
    applicationIds,
    applications,
    open,
    onClose,
}: Props) {
    const [templates, setTemplates] =
        useState<EmailTemplate[]>([]);

    const [templateId, setTemplateId] =
        useState("");

    const [interviewDate, setInterviewDate] =
        useState("");

    const [interviewTime, setInterviewTime] =
        useState("");

    const [interviewMode, setInterviewMode] =
        useState("");

    const [interviewLocation, setInterviewLocation] =
        useState("");

    const [meetingLink, setMeetingLink] =
        useState("");

    const [interviewNote, setInterviewNote] =
        useState("");

    const [preview, setPreview] = useState<{
        subject: string;
        body: string;
    } | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const loadTemplates = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/hrm/recruitment/email/templates"
            );

            setTemplates(
                response.data?.data ?? []
            );
        } catch (error) {
            console.error(
                "Failed to load email templates:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            loadTemplates();
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const selectedTemplate = templates.find(
        (template) =>
            String(template.id) === templateId
    );

    const previewEmail = async () => {
        if (!templateId || !applicationIds.length) {
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/hrm/recruitment/email/preview",
                {
                    application_id:
                        applicationIds[0],
                    template_id:
                        Number(templateId),
                    interview_date:
                        interviewDate || null,
                    interview_time:
                        interviewTime || null,
                    interview_mode:
                        interviewMode || null,
                    interview_location:
                        interviewLocation || null,
                    meeting_link:
                        meetingLink || null,
                    interview_note:
                        interviewNote || null,
                }
            );

            setPreview(
                response.data?.data ?? null
            );
        } catch (error) {
            console.error(
                "Failed to preview email:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async () => {
        if (!templateId || !applicationIds.length) {
            return;
        }

        try {
            setSending(true);

            await api.post(
                "/hrm/recruitment/email/send",
                {
                    application_ids:
                        applicationIds,
                    template_id:
                        Number(templateId),
                    interview_date:
                        interviewDate || null,
                    interview_time:
                        interviewTime || null,
                    interview_mode:
                        interviewMode || null,
                    interview_location:
                        interviewLocation || null,
                    meeting_link:
                        meetingLink || null,
                    interview_note:
                        interviewNote || null,
                }
            );

            alert(
                `${applicationIds.length} email(s) queued successfully.`
            );

            onClose();
        } catch (error) {
            console.error(
                "Failed to send email:",
                error
            );
        } finally {
            setSending(false);
        }
    };

    const showInterviewFields =
        selectedTemplate?.code === "interview";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
            <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Send Recruitment Email
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            {applicationIds.length} applicant
                            {applicationIds.length !== 1
                                ? "s"
                                : ""} selected
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email Template
                            </label>

                            <select
                                value={templateId}
                                onChange={(event) => {
                                    setTemplateId(
                                        event.target.value
                                    );
                                    setPreview(null);
                                }}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                            >
                                <option value="">
                                    Select Email Template
                                </option>

                                {templates.map(
                                    (template) => (
                                        <option
                                            key={
                                                template.id
                                            }
                                            value={
                                                template.id
                                            }
                                        >
                                            {
                                                template.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                Recipients
                            </p>

                            <div className="mt-2 space-y-1">
                                {applications.map(
                                    (application) => (
                                        <p
                                            key={
                                                application.id
                                            }
                                            className="text-sm text-slate-700"
                                        >
                                            {
                                                application.name
                                            }{" "}
                                            -
                                            {" "}
                                            {
                                                application.email
                                            }
                                        </p>
                                    )
                                )}
                            </div>
                        </div>

                        {showInterviewFields && (
                            <div className="rounded-xl border border-slate-200 p-5">
                                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                                    Interview Details
                                </h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Interview Date
                                        </label>

                                        <input
                                            type="date"
                                            value={
                                                interviewDate
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInterviewDate(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Interview Time
                                        </label>

                                        <input
                                            type="time"
                                            value={
                                                interviewTime
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInterviewTime(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Interview Mode
                                        </label>

                                        <select
                                            value={
                                                interviewMode
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInterviewMode(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        >
                                            <option value="">
                                                Select Mode
                                            </option>

                                            <option value="Physical">
                                                Physical
                                            </option>

                                            <option value="Online">
                                                Online
                                            </option>

                                            <option value="Phone">
                                                Phone
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                interviewLocation
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInterviewLocation(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Interview location"
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Meeting Link
                                        </label>

                                        <input
                                            type="url"
                                            value={
                                                meetingLink
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setMeetingLink(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="https://..."
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Interview Note
                                        </label>

                                        <textarea
                                            value={
                                                interviewNote
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setInterviewNote(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={3}
                                            placeholder="Additional instructions..."
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {preview && (
                            <div className="rounded-xl border border-slate-200">
                                <div className="border-b border-slate-200 px-5 py-3">
                                    <p className="text-xs text-slate-400">
                                        Subject
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {
                                            preview.subject
                                        }
                                    </p>
                                </div>

                                <div className="p-5">
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                preview.body,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={previewEmail}
                        disabled={
                            loading ||
                            !templateId
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[#06245a] px-4 py-2.5 text-sm font-medium text-[#06245a] disabled:opacity-50"
                    >
                        <Eye size={16} />

                        Preview
                    </button>

                    <button
                        type="button"
                        onClick={sendEmail}
                        disabled={
                            sending ||
                            !templateId
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                    >
                        <Send size={16} />

                        {sending
                            ? "Sending..."
                            : "Send Email"}
                    </button>
                </div>
            </div>
        </div>
    );
}
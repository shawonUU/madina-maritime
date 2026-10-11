"use client";

import { useEffect, useState } from "react";
import {
Search,
RefreshCw,
Eye,
FileText,
Download,
X,
ChevronLeft,
ChevronRight,
Mail,
Send,
} from "lucide-react";
import api from "@/services/api";

interface JobPost {
id: number;
title: string;
slug: string;
department?: string | null;
location?: string | null;
employment_type?: string | null;
}

interface StatusHistory {
id: number;
old_status?: string | null;
new_status: string;
note?: string | null;
created_at: string;
}

interface Application {
id: number;
job_post_id: number;
application_no: string;
name: string;
email: string;
phone: string;
address?: string | null;
current_company?: string | null;
current_position?: string | null;
expected_salary?: number | string | null;
cv_path?: string | null;
cv_original_name?: string | null;
cover_letter?: string | null;
status: string;
created_at: string;
job_post?: JobPost;
status_histories?: StatusHistory[];
}

interface PaginatedApplications {
current_page: number;
last_page: number;
per_page: number;
total: number;
data: Application[];
}

interface JobPostResponse {
id: number;
title: string;
slug: string;
department?: string | null;
location?: string | null;
employment_type?: string | null;
}

interface EmailTemplate {
id: number;
name: string;
code: string;
subject: string;
body: string;
is_active?: boolean;
}

interface EmailPreview {
subject: string;
body: string;
recipient_name: string;
recipient_email: string;
}

const statuses = [
"New",
"Shortlisted",
"Interview",
"Selected",
"Rejected",
];

export default function ApplicationsPage() {
const [jobPosts, setJobPosts] = useState<JobPostResponse[]>([]);
const [selectedJobPost, setSelectedJobPost] = useState("");


const [applications, setApplications] =
    useState<PaginatedApplications | null>(null);

const [status, setStatus] = useState("");
const [search, setSearch] = useState("");

const [loadingJobs, setLoadingJobs] = useState(true);
const [loadingApplications, setLoadingApplications] =
    useState(false);

const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

const [detailsLoading, setDetailsLoading] = useState(false);

const [updatingStatus, setUpdatingStatus] = useState(false);
const [newStatus, setNewStatus] = useState("");
const [statusNote, setStatusNote] = useState("");

const [cvLoading, setCvLoading] = useState(false);

const [selectedApplicationIds, setSelectedApplicationIds] =
    useState<number[]>([]);

const [emailModalOpen, setEmailModalOpen] =
    useState(false);

const [emailTemplates, setEmailTemplates] =
    useState<EmailTemplate[]>([]);

const [selectedTemplateId, setSelectedTemplateId] =
    useState("");

const [emailLoading, setEmailLoading] =
    useState(false);

const [emailSending, setEmailSending] =
    useState(false);

const [emailPreview, setEmailPreview] =
    useState<EmailPreview | null>(null);

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

const loadJobPosts = async () => {
    try {
        setLoadingJobs(true);

        const response = await api.get(
            "/hrm/recruitment/job-posts",
            {
                params: {
                    per_page: 100,
                },
            }
        );

        const data = response.data?.data;

        if (Array.isArray(data)) {
            setJobPosts(data);
        } else {
            setJobPosts([]);
        }
    } catch (error) {
        console.error(
            "Failed to load job posts:",
            error
        );

        setJobPosts([]);
    } finally {
        setLoadingJobs(false);
    }
};

const loadApplications = async (page = 1) => {
    if (!selectedJobPost) {
        setApplications(null);
        return;
    }

    try {
        setLoadingApplications(true);

        const response = await api.get(
            "/hrm/recruitment/applications",
            {
                params: {
                    job_post_id: selectedJobPost,
                    status: status || undefined,
                    search: search || undefined,
                    page,
                    per_page: 15,
                },
            }
        );

        setApplications(response.data.data);
    } catch (error) {
        console.error(
            "Failed to load applications:",
            error
        );

        setApplications(null);
    } finally {
        setLoadingApplications(false);
    }
};

const viewApplication = async (
    applicationId: number
) => {
    try {
        setDetailsLoading(true);

        const response = await api.get(
            `/hrm/recruitment/applications/${applicationId}`
        );

        const application = response.data.data;

        setSelectedApplication(application);
        setNewStatus(application.status);
        setStatusNote("");
    } catch (error) {
        console.error(
            "Failed to load application:",
            error
        );
    } finally {
        setDetailsLoading(false);
    }
};

const updateApplicationStatus = async () => {
    if (!selectedApplication || !newStatus) {
        return;
    }

    if (
        selectedApplication.status ===
        newStatus
    ) {
        return;
    }

    try {
        setUpdatingStatus(true);

        const response = await api.put(
            `/hrm/recruitment/applications/${selectedApplication.id}/status`,
            {
                status: newStatus,
                note: statusNote || null,
            }
        );

        const updatedApplication =
            response.data.data;

        setSelectedApplication(
            updatedApplication
        );

        setStatusNote("");

        await loadApplications(
            applications?.current_page || 1
        );
    } catch (error) {
        console.error(
            "Failed to update application status:",
            error
        );
    } finally {
        setUpdatingStatus(false);
    }
};

const viewCv = async () => {
    if (!selectedApplication) {
        return;
    }

    try {
        setCvLoading(true);

        const response = await api.get(
            `/hrm/recruitment/applications/${selectedApplication.id}/cv`,
            {
                responseType: "blob",
            }
        );

        const blob = new Blob([
            response.data,
        ]);

        const url =
            window.URL.createObjectURL(blob);

        window.open(url, "_blank");

        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 60000);
    } catch (error) {
        console.error(
            "Failed to open CV:",
            error
        );
    } finally {
        setCvLoading(false);
    }
};

const downloadCv = async () => {
    if (!selectedApplication) {
        return;
    }

    try {
        setCvLoading(true);

        const response = await api.get(
            `/hrm/recruitment/applications/${selectedApplication.id}/cv`,
            {
                responseType: "blob",
            }
        );

        const blob = new Blob([
            response.data,
        ]);

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            selectedApplication.cv_original_name ||
            `CV-${selectedApplication.application_no}`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(
            "Failed to download CV:",
            error
        );
    } finally {
        setCvLoading(false);
    }
};

const loadEmailTemplates = async () => {
    try {
        setEmailLoading(true);

        const response = await api.get(
            "/hrm/recruitment/email/templates"
        );

        setEmailTemplates(
            response.data?.data ?? []
        );
    } catch (error) {
        console.error(
            "Failed to load email templates:",
            error
        );

        setEmailTemplates([]);
    } finally {
        setEmailLoading(false);
    }
};

const resetEmailForm = () => {
    setSelectedTemplateId("");

    setEmailPreview(null);

    setInterviewDate("");
    setInterviewTime("");
    setInterviewMode("");
    setInterviewLocation("");
    setMeetingLink("");
    setInterviewNote("");
};

const openEmailModal = async (
    applicationIds: number[]
) => {
    if (!applicationIds.length) {
        return;
    }

    setSelectedApplicationIds(
        applicationIds
    );

    resetEmailForm();

    setEmailModalOpen(true);

    await loadEmailTemplates();
};

const closeEmailModal = () => {
    setEmailModalOpen(false);

    setSelectedApplicationIds([]);

    resetEmailForm();
};

const toggleApplication = (
    applicationId: number
) => {
    setSelectedApplicationIds((current) =>
        current.includes(applicationId)
            ? current.filter(
                  (id) =>
                      id !== applicationId
              )
            : [
                  ...current,
                  applicationId,
              ]
    );
};

const toggleAllApplications = () => {
    if (!applications?.data?.length) {
        return;
    }

    const currentPageIds =
        applications.data.map(
            (application) =>
                application.id
        );

    const allSelected =
        currentPageIds.every((id) =>
            selectedApplicationIds.includes(
                id
            )
        );

    if (allSelected) {
        setSelectedApplicationIds(
            (current) =>
                current.filter(
                    (id) =>
                        !currentPageIds.includes(
                            id
                        )
                )
        );
    } else {
        setSelectedApplicationIds(
            (current) => [
                ...new Set([
                    ...current,
                    ...currentPageIds,
                ]),
            ]
        );
    }
};

const previewEmail = async () => {
    if (
        !selectedTemplateId ||
        !selectedApplicationIds.length
    ) {
        return;
    }

    try {
        setEmailLoading(true);

        const response = await api.post(
            "/hrm/recruitment/email/preview",
            {
                application_id:
                    selectedApplicationIds[0],

                template_id:
                    Number(
                        selectedTemplateId
                    ),

                interview_date:
                    interviewDate ||
                    null,

                interview_time:
                    interviewTime ||
                    null,

                interview_mode:
                    interviewMode ||
                    null,

                interview_location:
                    interviewLocation ||
                    null,

                meeting_link:
                    meetingLink ||
                    null,

                interview_note:
                    interviewNote ||
                    null,
            }
        );

        setEmailPreview(
            response.data?.data ?? null
        );
    } catch (error) {
        console.error(
            "Failed to preview email:",
            error
        );
    } finally {
        setEmailLoading(false);
    }
};

const sendEmail = async () => {
    if (
        !selectedTemplateId ||
        !selectedApplicationIds.length
    ) {
        return;
    }

    const selectedTemplate =
        emailTemplates.find(
            (template) =>
                String(
                    template.id
                ) ===
                selectedTemplateId
        );

    if (
        selectedTemplate?.code ===
        "interview"
    ) {
        if (!interviewDate) {
            alert(
                "Please select interview date."
            );

            return;
        }

        if (!interviewTime) {
            alert(
                "Please select interview time."
            );

            return;
        }

        if (!interviewMode) {
            alert(
                "Please select interview mode."
            );

            return;
        }
    }

    try {
        setEmailSending(true);

        await api.post(
            "/hrm/recruitment/email/send",
            {
                application_ids:
                    selectedApplicationIds,

                template_id:
                    Number(
                        selectedTemplateId
                    ),

                interview_date:
                    interviewDate ||
                    null,

                interview_time:
                    interviewTime ||
                    null,

                interview_mode:
                    interviewMode ||
                    null,

                interview_location:
                    interviewLocation ||
                    null,

                meeting_link:
                    meetingLink ||
                    null,

                interview_note:
                    interviewNote ||
                    null,
            }
        );

        alert(
            `${selectedApplicationIds.length} email(s) queued successfully.`
        );

        closeEmailModal();
    } catch (error) {
        console.error(
            "Failed to send email:",
            error
        );

        alert(
            "Failed to send email."
        );
    } finally {
        setEmailSending(false);
    }
};

useEffect(() => {
    loadJobPosts();
}, []);

useEffect(() => {
    if (!selectedJobPost) {
        setApplications(null);
        setSelectedApplicationIds([]);
        return;
    }

    setSelectedApplicationIds([]);

    loadApplications(1);
}, [selectedJobPost, status]);

const handleSearch = () => {
    loadApplications(1);
};

const formatDate = (
    date?: string
) => {
    if (!date) {
        return "-";
    }

    return new Date(
        date
    ).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

const formatDateTime = (
    date?: string
) => {
    if (!date) {
        return "-";
    }

    return new Date(
        date
    ).toLocaleString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

const getStatusClass = (
    value: string
) => {
    switch (value) {
        case "New":
            return "bg-blue-50 text-blue-700";

        case "Shortlisted":
            return "bg-amber-50 text-amber-700";

        case "Interview":
            return "bg-purple-50 text-purple-700";

        case "Selected":
            return "bg-green-50 text-green-700";

        case "Rejected":
            return "bg-red-50 text-red-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
};

const currentPageIds =
    applications?.data?.map(
        (application) =>
            application.id
    ) || [];

const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
        selectedApplicationIds.includes(
            id
        )
    );

const selectedTemplate =
    emailTemplates.find(
        (template) =>
            String(
                template.id
            ) ===
            selectedTemplateId
    );

const showInterviewFields =
    selectedTemplate?.code ===
    "interview";

const selectedApplications =
    applications?.data
        ?.filter((application) =>
            selectedApplicationIds.includes(
                application.id
            )
        )
        .map((application) => ({
            id: application.id,
            name: application.name,
            email: application.email,
        })) || [];

return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-semibold text-slate-800">
                Recruitment Applications
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                Review and manage applications job post wise.
            </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Job Post
                    </label>

                    <select
                        value={
                            selectedJobPost
                        }
                        onChange={(
                            event
                        ) =>
                            setSelectedJobPost(
                                event
                                    .target
                                    .value
                            )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                    >
                        <option value="">
                            Select Job Post
                        </option>

                        {jobPosts.map(
                            (job) => (
                                <option
                                    key={
                                        job.id
                                    }
                                    value={
                                        job.id
                                    }
                                >
                                    {
                                        job.title
                                    }
                                </option>
                            )
                        )}
                    </select>

                    {loadingJobs && (
                        <p className="mt-1 text-xs text-slate-400">
                            Loading job posts...
                        </p>
                    )}
                </div>

                <div className="lg:col-span-3">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(
                            event
                        ) =>
                            setStatus(
                                event
                                    .target
                                    .value
                            )
                        }
                        disabled={
                            !selectedJobPost
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none disabled:bg-slate-100 focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                    >
                        <option value="">
                            All Status
                        </option>

                        {statuses.map(
                            (item) => (
                                <option
                                    key={
                                        item
                                    }
                                    value={
                                        item
                                    }
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="lg:col-span-4">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Search
                    </label>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search
                                size={
                                    17
                                }
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={
                                    search
                                }
                                onChange={(
                                    event
                                ) =>
                                    setSearch(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                onKeyDown={(
                                    event
                                ) => {
                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {
                                        handleSearch();
                                    }
                                }}
                                disabled={
                                    !selectedJobPost
                                }
                                placeholder="Applicant name, email, phone..."
                                className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none disabled:bg-slate-100 focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleSearch
                            }
                            disabled={
                                !selectedJobPost
                            }
                            className="rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {!selectedJobPost ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <FileText
                    size={40}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-base font-semibold text-slate-700">
                    Select a Job Post
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Select a job post to view its applications.
                </p>
            </div>
        ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                    <div>
                        <h2 className="text-base font-semibold text-slate-800">
                            Applications
                        </h2>

                        {applications && (
                            <p className="mt-1 text-xs text-slate-500">
                                {
                                    applications.total
                                }{" "}
                                application
                                {applications.total !==
                                1
                                    ? "s"
                                    : ""}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {selectedApplicationIds.length >
                            0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    openEmailModal(
                                        selectedApplicationIds
                                    )
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-3 py-2 text-sm font-medium text-white hover:bg-[#041b45]"
                            >
                                <Mail
                                    size={
                                        16
                                    }
                                />

                                Send Email (
                                {
                                    selectedApplicationIds.length
                                }
                                )
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                loadApplications(
                                    applications?.current_page ||
                                        1
                                )
                            }
                            disabled={
                                loadingApplications
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <RefreshCw
                                size={
                                    16
                                }
                                className={
                                    loadingApplications
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh
                        </button>
                    </div>
                </div>

                {selectedApplicationIds.length >
                    0 && (
                    <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
                        <p className="text-sm text-slate-600">
                            {
                                selectedApplicationIds.length
                            }{" "}
                            applicant
                            {selectedApplicationIds.length !==
                            1
                                ? "s"
                                : ""}{" "}
                            selected
                        </p>
                    </div>
                )}

                {loadingApplications ? (
                    <div className="py-16 text-center text-sm text-slate-500">
                        Loading applications...
                    </div>
                ) : !applications ||
                  applications.data
                      .length === 0 ? (
                    <div className="py-16 text-center">
                        <FileText
                            size={
                                40
                            }
                            className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm text-slate-500">
                            No applications found for this job post.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="w-12 px-5 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    allCurrentPageSelected
                                                }
                                                onChange={
                                                    toggleAllApplications
                                                }
                                                className="h-4 w-4 rounded border-slate-300 text-[#06245a] focus:ring-[#06245a]"
                                            />
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Application
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Applicant
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Contact
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Applied
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {applications.data.map(
                                        (
                                            application
                                        ) => (
                                            <tr
                                                key={
                                                    application.id
                                                }
                                                className={
                                                    selectedApplicationIds.includes(
                                                        application.id
                                                    )
                                                        ? "bg-blue-50/40 hover:bg-blue-50"
                                                        : "hover:bg-slate-50"
                                                }
                                            >
                                                <td className="px-5 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedApplicationIds.includes(
                                                            application.id
                                                        )}
                                                        onChange={() =>
                                                            toggleApplication(
                                                                application.id
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-slate-300 text-[#06245a] focus:ring-[#06245a]"
                                                    />
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <p className="text-sm font-medium text-slate-800">
                                                        {
                                                            application.application_no
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            application
                                                                .job_post
                                                                ?.title
                                                        }
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-medium text-slate-800">
                                                        {
                                                            application.name
                                                        }
                                                    </p>

                                                    {application.current_position && (
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {
                                                                application.current_position
                                                            }
                                                        </p>
                                                    )}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm text-slate-700">
                                                        {
                                                            application.email
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {
                                                            application.phone
                                                        }
                                                    </p>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                    {formatDate(
                                                        application.created_at
                                                    )}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                            application.status
                                                        )}`}
                                                    >
                                                        {
                                                            application.status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            viewApplication(
                                                                application.id
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs font-medium text-white hover:bg-[#041b45]"
                                                    >
                                                        <Eye
                                                            size={
                                                                15
                                                            }
                                                        />

                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                            <p className="text-sm text-slate-500">
                                Page{" "}
                                {
                                    applications.current_page
                                }{" "}
                                of{" "}
                                {
                                    applications.last_page
                                }
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={
                                        applications.current_page <=
                                        1
                                    }
                                    onClick={() =>
                                        loadApplications(
                                            applications.current_page -
                                                1
                                        )
                                    }
                                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft
                                        size={
                                            16
                                        }
                                    />

                                    Previous
                                </button>

                                <button
                                    type="button"
                                    disabled={
                                        applications.current_page >=
                                        applications.last_page
                                    }
                                    onClick={() =>
                                        loadApplications(
                                            applications.current_page +
                                                1
                                        )
                                    }
                                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next

                                    <ChevronRight
                                        size={
                                            16
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )}

        {selectedApplication && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Application Details
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                {
                                    selectedApplication.application_no
                                }
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSelectedApplication(
                                    null
                                )
                            }
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-6">
                        {detailsLoading ? (
                            <div className="py-16 text-center text-sm text-slate-500">
                                Loading application...
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div>
                                            <p className="text-xs font-medium uppercase text-slate-400">
                                                Job Post
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                {
                                                    selectedApplication
                                                        .job_post
                                                        ?.title
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase text-slate-400">
                                                Application No
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                                {
                                                    selectedApplication.application_no
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase text-slate-400">
                                                Applied Date
                                            </p>

                                            <p className="mt-1 text-sm text-slate-700">
                                                {formatDateTime(
                                                    selectedApplication.created_at
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase text-slate-400">
                                                Current Status
                                            </p>

                                            <span
                                                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                    selectedApplication.status
                                                )}`}
                                            >
                                                {
                                                    selectedApplication.status
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-sm font-semibold text-slate-800">
                                        Applicant Information
                                    </h3>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Name
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {
                                                    selectedApplication.name
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Email
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {
                                                    selectedApplication.email
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Phone
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {
                                                    selectedApplication.phone
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Address
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {selectedApplication.address ||
                                                    "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Current Company
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {selectedApplication.current_company ||
                                                    "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Current Position
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {selectedApplication.current_position ||
                                                    "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Expected Salary
                                            </p>

                                            <p className="mt-1 text-sm text-slate-800">
                                                {selectedApplication.expected_salary
                                                    ? Number(
                                                          selectedApplication.expected_salary
                                                      ).toLocaleString()
                                                    : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-slate-800">
                                        CV
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-slate-100 p-2.5">
                                                <FileText
                                                    size={
                                                        20
                                                    }
                                                    className="text-[#06245a]"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {selectedApplication.cv_original_name ||
                                                        "CV"}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    Applicant CV
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex gap-2">
                                            <button
                                                type="button"
                                                onClick={
                                                    viewCv
                                                }
                                                disabled={
                                                    cvLoading
                                                }
                                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                <Eye
                                                    size={
                                                        16
                                                    }
                                                />

                                                View CV
                                            </button>

                                            <button
                                                type="button"
                                                onClick={
                                                    downloadCv
                                                }
                                                disabled={
                                                    cvLoading
                                                }
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-3 py-2 text-sm font-medium text-white hover:bg-[#041b45] disabled:opacity-50"
                                            >
                                                <Download
                                                    size={
                                                        16
                                                    }
                                                />

                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-slate-800">
                                        Cover Letter
                                    </h3>

                                    <div className="rounded-xl border border-slate-200 p-4">
                                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                            {selectedApplication.cover_letter ||
                                                "No cover letter provided."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEmailModal(
                                                [
                                                    selectedApplication.id,
                                                ]
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg border border-[#06245a] px-4 py-2.5 text-sm font-medium text-[#06245a] hover:bg-blue-50"
                                    >
                                        <Mail
                                            size={
                                                16
                                            }
                                        />

                                        Email Applicant
                                    </button>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">
                                    <h3 className="mb-4 text-sm font-semibold text-slate-800">
                                        Update Application Status
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Status
                                            </label>

                                            <select
                                                value={
                                                    newStatus
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setNewStatus(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                                            >
                                                {statuses.map(
                                                    (
                                                        item
                                                    ) => (
                                                        <option
                                                            key={
                                                                item
                                                            }
                                                            value={
                                                                item
                                                            }
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Note
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    statusNote
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setStatusNote(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="Optional note"
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={
                                                updateApplicationStatus
                                            }
                                            disabled={
                                                updatingStatus ||
                                                newStatus ===
                                                    selectedApplication.status
                                            }
                                            className="rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#041b45] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {updatingStatus
                                                ? "Updating..."
                                                : "Update Status"}
                                        </button>
                                    </div>
                                </div>

                                {selectedApplication.status_histories &&
                                    selectedApplication
                                        .status_histories
                                        .length >
                                        0 && (
                                        <div>
                                            <h3 className="mb-4 text-sm font-semibold text-slate-800">
                                                Status History
                                            </h3>

                                            <div className="space-y-3">
                                                {selectedApplication.status_histories.map(
                                                    (
                                                        history
                                                    ) => (
                                                        <div
                                                            key={
                                                                history.id
                                                            }
                                                            className="rounded-xl border border-slate-200 p-4"
                                                        >
                                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    {history.old_status && (
                                                                        <>
                                                                            <span
                                                                                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(
                                                                                    history.old_status
                                                                                )}`}
                                                                            >
                                                                                {
                                                                                    history.old_status
                                                                                }
                                                                            </span>

                                                                            <span className="text-slate-400">
                                                                                →
                                                                            </span>
                                                                        </>
                                                                    )}

                                                                    <span
                                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(
                                                                            history.new_status
                                                                        )}`}
                                                                    >
                                                                        {
                                                                            history.new_status
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <span className="text-xs text-slate-400">
                                                                    {formatDateTime(
                                                                        history.created_at
                                                                    )}
                                                                </span>
                                                            </div>

                                                            {history.note && (
                                                                <p className="mt-2 text-sm text-slate-600">
                                                                    {
                                                                        history.note
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {emailModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
                <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Send Recruitment Email
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                {
                                    selectedApplicationIds.length
                                }{" "}
                                applicant
                                {selectedApplicationIds.length !==
                                1
                                    ? "s"
                                    : ""}{" "}
                                selected
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={
                                closeEmailModal
                            }
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
                                    value={
                                        selectedTemplateId
                                    }
                                    onChange={(
                                        event
                                    ) => {
                                        setSelectedTemplateId(
                                            event
                                                .target
                                                .value
                                        );

                                        setEmailPreview(
                                            null
                                        );
                                    }}
                                    disabled={
                                        emailLoading
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                                >
                                    <option value="">
                                        Select Email Template
                                    </option>

                                    {emailTemplates.map(
                                        (
                                            template
                                        ) => (
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

                                {emailLoading && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        Loading email templates...
                                    </p>
                                )}
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Recipients
                                </p>

                                <div className="mt-3 space-y-2">
                                    {selectedApplications.map(
                                        (
                                            application
                                        ) => (
                                            <div
                                                key={
                                                    application.id
                                                }
                                                className="flex items-center justify-between rounded-lg bg-white px-3 py-2"
                                            >
                                                <span className="text-sm font-medium text-slate-700">
                                                    {
                                                        application.name
                                                    }
                                                </span>

                                                <span className="text-sm text-slate-500">
                                                    {
                                                        application.email
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>

                                {selectedApplicationIds.length >
                                    selectedApplications.length && (
                                    <p className="mt-3 text-xs text-amber-600">
                                        Selected applicants from another page will also receive this email.
                                    </p>
                                )}
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
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
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
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
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
                                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
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
                                                Interview Location
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
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
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
                                                placeholder="https://meet.google.com/..."
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
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
                                                rows={
                                                    3
                                                }
                                                placeholder="Additional interview instructions..."
                                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {emailPreview && (
                                <div className="rounded-xl border border-slate-200 overflow-hidden">
                                    <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Email Preview
                                        </p>

                                        <p className="mt-2 text-sm font-semibold text-slate-800">
                                            {
                                                emailPreview.subject
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            To:{" "}
                                            {
                                                emailPreview.recipient_name
                                            }{" "}
                                            &lt;
                                            {
                                                emailPreview.recipient_email
                                            }
                                            &gt;
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <div
                                            className="prose prose-sm max-w-none text-slate-700"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    emailPreview.body,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                        <button
                            type="button"
                            onClick={
                                closeEmailModal
                            }
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={
                                previewEmail
                            }
                            disabled={
                                emailLoading ||
                                !selectedTemplateId ||
                                !selectedApplicationIds.length
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-[#06245a] px-4 py-2.5 text-sm font-medium text-[#06245a] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Eye size={16} />

                            Preview
                        </button>

                        <button
                            type="button"
                            onClick={
                                sendEmail
                            }
                            disabled={
                                emailSending ||
                                !selectedTemplateId ||
                                !selectedApplicationIds.length
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#041b45] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={16} />

                            {emailSending
                                ? "Sending..."
                                : "Send Email"}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
);


}

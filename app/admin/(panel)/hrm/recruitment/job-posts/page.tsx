"use client";

import {
    Plus,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    BriefcaseBusiness,
    Search,
    CalendarDays,
    Star,
} from "lucide-react";

import { FormEvent, useEffect, useState } from "react";

import api from "@/services/api";

interface JobPost {
    id: number;
    title: string;
    slug: string;
    department: string | null;
    location: string;
    employment_type: string;
    experience: string | null;
    short_description: string | null;
    description: string | null;
    responsibilities: string | null;
    requirements: string | null;
    benefits: string | null;
    application_deadline: string | null;
    status: "Draft" | "Published" | "Closed";
    is_featured: boolean;
    sort_order: number;
    created_at: string;
}

interface JobForm {
    title: string;
    slug: string;
    department: string;
    location: string;
    employment_type: string;
    experience: string;
    short_description: string;
    description: string;
    responsibilities: string;
    requirements: string;
    benefits: string;
    application_deadline: string;
    status: "Draft" | "Published" | "Closed";
    is_featured: boolean;
    sort_order: number;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

const initialForm: JobForm = {
    title: "",
    slug: "",
    department: "",
    location: "Dhaka, Bangladesh",
    employment_type: "Full-time",
    experience: "",
    short_description: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    application_deadline: "",
    status: "Draft",
    is_featured: false,
    sort_order: 0,
};

export default function JobPostsPage() {
    const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState<JobForm>(initialForm);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0,
    });

    const fetchJobPosts = async (
        page = 1,
        showRefreshing = false
    ) => {
        try {
            if (showRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response = await api.get(
                "/hrm/recruitment/job-posts",
                {
                    params: {
                        page,
                        per_page: 20,
                        search: search || undefined,
                        status: statusFilter || undefined,
                    },
                }
            );

            const responseData = response.data;

            setJobPosts(responseData.data ?? []);

            setPagination({
                current_page: responseData.current_page ?? 1,
                last_page: responseData.last_page ?? 1,
                per_page: responseData.per_page ?? 20,
                total: responseData.total ?? 0,
            });
        } catch (error) {
            console.error("Failed to load job posts:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchJobPosts();
    }, [statusFilter]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        fetchJobPosts(1);
    };

    const openCreateModal = () => {
        setEditingId(null);
        setForm(initialForm);
        setModalOpen(true);
    };

    const openEditModal = (job: JobPost) => {
        setEditingId(job.id);

        setForm({
            title: job.title ?? "",
            slug: job.slug ?? "",
            department: job.department ?? "",
            location: job.location ?? "",
            employment_type:
                job.employment_type ?? "Full-time",
            experience: job.experience ?? "",
            short_description:
                job.short_description ?? "",
            description: job.description ?? "",
            responsibilities:
                job.responsibilities ?? "",
            requirements: job.requirements ?? "",
            benefits: job.benefits ?? "",
            application_deadline:
                job.application_deadline
                    ? job.application_deadline.substring(0, 10)
                    : "",
            status: job.status ?? "Draft",
            is_featured: Boolean(job.is_featured),
            sort_order: job.sort_order ?? 0,
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingId(null);
        setForm(initialForm);
    };

    const updateForm = (
        field: keyof JobForm,
        value: string | boolean | number
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.title.trim()) {
            alert("Job title is required.");
            return;
        }

        if (!form.location.trim()) {
            alert("Location is required.");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                title: form.title.trim(),
                slug: form.slug.trim() || undefined,
                department: form.department.trim() || null,
                location: form.location.trim(),
                employment_type: form.employment_type,
                experience: form.experience.trim() || null,
                short_description:
                    form.short_description.trim() || null,
                description: form.description.trim() || null,
                responsibilities:
                    form.responsibilities.trim() || null,
                requirements:
                    form.requirements.trim() || null,
                benefits: form.benefits.trim() || null,
                application_deadline:
                    form.application_deadline || null,
                status: form.status,
                is_featured: form.is_featured,
                sort_order: Number(form.sort_order),
            };

            if (editingId) {
                await api.put(
                    `/hrm/recruitment/job-posts/${editingId}`,
                    payload
                );
            } else {
                await api.post(
                    "/hrm/recruitment/job-posts",
                    payload
                );
            }

            closeModal();

            await fetchJobPosts(
                editingId
                    ? pagination.current_page
                    : 1
            );
        } catch (error) {
            console.error("Failed to save job post:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this job post?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(
                `/hrm/recruitment/job-posts/${id}`
            );

            await fetchJobPosts(
                pagination.current_page
            );
        } catch (error) {
            console.error("Failed to delete job post:", error);
        }
    };

    const getStatusClass = (status: JobPost["status"]) => {
        if (status === "Published") {
            return "bg-green-50 text-green-700";
        }

        if (status === "Closed") {
            return "bg-red-50 text-red-700";
        }

        return "bg-yellow-50 text-yellow-700";
    };

    const formatDate = (date: string | null) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06245a]">
                            <BriefcaseBusiness
                                size={22}
                                className="text-white"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Job Posts
                            </h1>

                            <p className="text-sm text-gray-500">
                                Manage recruitment job vacancies.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#06245a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#041b45]"
                >
                    <Plus size={18} />

                    Add Job Post
                </button>
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-1"
                    >
                        <div className="relative w-full">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search job title, department or location..."
                                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="ml-2 rounded-xl bg-gray-100 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                        >
                            Search
                        </button>
                    </form>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="Draft">
                            Draft
                        </option>

                        <option value="Published">
                            Published
                        </option>

                        <option value="Closed">
                            Closed
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={() =>
                            fetchJobPosts(
                                pagination.current_page,
                                true
                            )
                        }
                        disabled={refreshing}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={18}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    #
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Job
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Location
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Employment
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Deadline
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-16 text-center"
                                    >
                                        <RefreshCw
                                            size={30}
                                            className="mx-auto animate-spin text-[#06245a]"
                                        />

                                        <p className="mt-3 text-sm text-gray-500">
                                            Loading job posts...
                                        </p>
                                    </td>
                                </tr>
                            ) : jobPosts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-16 text-center"
                                    >
                                        <BriefcaseBusiness
                                            size={40}
                                            className="mx-auto text-gray-300"
                                        />

                                        <p className="mt-3 font-semibold text-gray-600">
                                            No job posts found.
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Create your first job post.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                jobPosts.map((job, index) => (
                                    <tr
                                        key={job.id}
                                        className="border-b border-gray-50 transition hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-4 text-sm text-gray-500">
                                            {(pagination.current_page -
                                                1) *
                                                pagination.per_page +
                                                index +
                                                1}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                                    <BriefcaseBusiness
                                                        size={17}
                                                        className="text-[#06245a]"
                                                    />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-gray-800">
                                                            {job.title}
                                                        </p>

                                                        {job.is_featured && (
                                                            <Star
                                                                size={15}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                        )}
                                                    </div>

                                                    {job.department && (
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {
                                                                job.department
                                                            }
                                                        </p>
                                                    )}

                                                    {job.experience && (
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {
                                                                job.experience
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {job.location}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                                                {
                                                    job.employment_type
                                                }
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <CalendarDays
                                                    size={16}
                                                    className="text-gray-400"
                                                />

                                                {formatDate(
                                                    job.application_deadline
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                                                    job.status
                                                )}`}
                                            >
                                                {job.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(
                                                            job
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#06245a] transition hover:bg-blue-100"
                                                    title="Edit"
                                                >
                                                    <Pencil
                                                        size={16}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            job.id
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                                    title="Delete"
                                                >
                                                    <Trash2
                                                        size={16}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!loading && jobPosts.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-700">
                                {jobPosts.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {pagination.total}
                            </span>{" "}
                            job posts
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={
                                    pagination.current_page <= 1
                                }
                                onClick={() =>
                                    fetchJobPosts(
                                        pagination.current_page - 1
                                    )
                                }
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="rounded-lg bg-[#06245a] px-4 py-2 text-sm font-semibold text-white">
                                {pagination.current_page}
                            </span>

                            <button
                                type="button"
                                disabled={
                                    pagination.current_page >=
                                    pagination.last_page
                                }
                                onClick={() =>
                                    fetchJobPosts(
                                        pagination.current_page + 1
                                    )
                                }
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
                    <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {editingId
                                        ? "Edit Job Post"
                                        : "Create Job Post"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {editingId
                                        ? "Update recruitment job information."
                                        : "Create a new career opportunity."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form
                            onSubmit={handleSubmit}
                            className="overflow-y-auto"
                        >
                            <div className="space-y-6 p-6">
                                {/* Basic Information */}
                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#06245a]">
                                        Basic Information
                                    </h3>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Job Title
                                                <span className="text-red-500">
                                                    {" "}
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                value={form.title}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. Frontend Developer"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                                required
                                            />
                                        </div>

                                        <div className="hidden">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Slug
                                            </label>

                                            <input
                                                type="text"
                                                value={form.slug}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "slug",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="frontend-developer"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />

                                            <p className="mt-1 text-xs text-gray-400">
                                                Leave empty to generate automatically.
                                            </p>
                                        </div>

                                        <div className="hidden">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Department
                                            </label>

                                            <input
                                                type="text"
                                                value={form.department}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "department",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. IT"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Location
                                                <span className="text-red-500">
                                                    {" "}
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                value={form.location}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "location",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Dhaka, Bangladesh"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Employment Type
                                            </label>

                                            <select
                                                value={
                                                    form.employment_type
                                                }
                                                onChange={(e) =>
                                                    updateForm(
                                                        "employment_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            >
                                                <option value="Full-time">
                                                    Full-time
                                                </option>

                                                <option value="Part-time">
                                                    Part-time
                                                </option>

                                                <option value="Contract">
                                                    Contract
                                                </option>

                                                <option value="Internship">
                                                    Internship
                                                </option>

                                                <option value="Remote">
                                                    Remote
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Experience
                                            </label>

                                            <input
                                                type="text"
                                                value={form.experience}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "experience",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. 2+ Years"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#06245a]">
                                        Job Description
                                    </h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Short Description
                                            </label>

                                            <textarea
                                                value={
                                                    form.short_description
                                                }
                                                onChange={(e) =>
                                                    updateForm(
                                                        "short_description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                placeholder="Short description shown on the career listing."
                                                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Description
                                            </label>

                                            <textarea
                                                value={form.description}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={5}
                                                placeholder="Detailed job description..."
                                                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    Responsibilities
                                                </label>

                                                <textarea
                                                    value={
                                                        form.responsibilities
                                                    }
                                                    onChange={(e) =>
                                                        updateForm(
                                                            "responsibilities",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={7}
                                                    placeholder="One responsibility per line..."
                                                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    Requirements
                                                </label>

                                                <textarea
                                                    value={
                                                        form.requirements
                                                    }
                                                    onChange={(e) =>
                                                        updateForm(
                                                            "requirements",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={7}
                                                    placeholder="One requirement per line..."
                                                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    Benefits
                                                </label>

                                                <textarea
                                                    value={form.benefits}
                                                    onChange={(e) =>
                                                        updateForm(
                                                            "benefits",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={7}
                                                    placeholder="One benefit per line..."
                                                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Publishing */}
                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#06245a]">
                                        Publishing
                                    </h3>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Application Deadline
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    form.application_deadline
                                                }
                                                onChange={(e) =>
                                                    updateForm(
                                                        "application_deadline",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Status
                                            </label>

                                            <select
                                                value={form.status}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "status",
                                                        e.target
                                                            .value as JobForm["status"]
                                                    )
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            >
                                                <option value="Draft">
                                                    Draft
                                                </option>

                                                <option value="Published">
                                                    Published
                                                </option>

                                                <option value="Closed">
                                                    Closed
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Sort Order
                                            </label>

                                            <input
                                                type="number"
                                                value={form.sort_order}
                                                onChange={(e) =>
                                                    updateForm(
                                                        "sort_order",
                                                        Number(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                min={0}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                            />
                                        </div>
                                    </div>

                                    <label className="mt-5 flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={
                                                form.is_featured
                                            }
                                            onChange={(e) =>
                                                updateForm(
                                                    "is_featured",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-[#06245a] focus:ring-[#06245a]"
                                        />

                                        <span className="text-sm font-semibold text-gray-700">
                                            Featured Job Post
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#06245a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#041b45] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving && (
                                        <RefreshCw
                                            size={17}
                                            className="animate-spin"
                                        />
                                    )}

                                    {saving
                                        ? "Saving..."
                                        : editingId
                                        ? "Update Job Post"
                                        : "Create Job Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}


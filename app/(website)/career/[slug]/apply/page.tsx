"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    FileText,
    Loader2,
    MapPin,
    Upload,
} from "lucide-react";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
    application_deadline: string | null;
}

interface ApplicationForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    cover_letter: string;
    cv: File | null;
}

export default function JobApplyPage() {
    const params = useParams();
    const router = useRouter();

    const slug = params.slug as string;

    const [job, setJob] = useState<JobPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState<ApplicationForm>({
        name: "",
        email: "",
        phone: "",
        address: "",
        cover_letter: "",
        cv: null,
    });

    useEffect(() => {
        if (!slug) {
            return;
        }

        loadJob();
    }, [slug]);

    const loadJob = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/careers/jobs/${slug}`
            );

            setJob(response.data.data ?? response.data);
        } catch (error) {
            console.error("Failed to load job:", error);

            setError(
                "This job position could not be found or is no longer available."
            );
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (
        field: keyof ApplicationForm,
        value: string | File | null
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] ?? null;

        if (!file) {
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PDF, DOC or DOCX file.");
            event.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            alert("CV file size must be less than 5 MB.");
            event.target.value = "";
            return;
        }

        updateForm("cv", file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!job) {
            return;
        }

        if (!form.cv) {
            alert("Please upload your CV.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append("job_post_id", String(job.id));
            formData.append("name", form.name.trim());
            formData.append("email", form.email.trim());
            formData.append("phone", form.phone.trim());
            formData.append("address", form.address.trim());
            formData.append("cover_letter",form.cover_letter.trim());
            formData.append("cv", form.cv);
            const response = await api.post( `/careers/jobs/${slug}/apply`, formData );
            setSuccess(response.data.message ||"Your application has been submitted successfully.");
            setForm({name: "",email: "",phone: "",address: "",cover_letter: "",cv: null,});
            window.scrollTo({top: 0, behavior: "smooth",});
        } catch (error: any) {
            console.error(
                "Failed to submit application:",
                error
            );

            const validationErrors =
                error?.response?.data?.errors;

            if (validationErrors) {
                const firstError =
                    Object.values(validationErrors)[0];

                if (Array.isArray(firstError)) {
                    setError(String(firstError[0]));
                } else {
                    setError(String(firstError));
                }
            } else {
                setError(
                    error?.response?.data?.message ||
                        "Failed to submit your application. Please try again."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f8fc]">
                <div className="text-center">
                    <Loader2
                        size={40}
                        className="mx-auto animate-spin text-[#06245a]"
                    />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading job information...
                    </p>
                </div>
            </main>
        );
    }

    if (error && !job) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f8fc] px-6">
                <div className="max-w-md rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                    <BriefcaseBusiness
                        size={45}
                        className="mx-auto text-slate-300"
                    />

                    <h1 className="mt-5 text-2xl font-bold text-[#06245a]">
                        Job Not Found
                    </h1>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        {error}
                    </p>

                    <Button
                        asChild
                        className="mt-6 rounded-full bg-[#06245a] px-6 hover:bg-blue-800"
                    >
                        <Link href="/careers">
                            <ArrowLeft size={17} />
                            Back to Careers
                        </Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#f5f8fc]">
            {/* Header */}
            <section className="bg-[#03172f] py-20">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <Link
                        href="/careers"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Back to Careers
                    </Link>

                    <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-200">
                            <BriefcaseBusiness size={28} />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                                Career Opportunity
                            </p>

                            <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
                                {job?.title}
                            </h1>

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/70">
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {job?.location}
                                </span>

                                <span className="flex items-center gap-2">
                                    <BriefcaseBusiness size={16} />
                                    {job?.employment_type}
                                </span>

                                {job?.experience && (
                                    <span>
                                        {job.experience}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application */}
            <section className="py-16">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr]">
                        {/* Job Summary */}
                        <div>
                            <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                    Position
                                </div>

                                <h2 className="mt-3 text-2xl font-bold text-[#06245a]">
                                    {job?.title}
                                </h2>

                                {job?.department && (
                                    <p className="mt-2 text-sm font-semibold text-blue-700">
                                        {job.department}
                                    </p>
                                )}

                                {job?.short_description && (
                                    <p className="mt-5 text-sm leading-7 text-slate-500">
                                        {job.short_description}
                                    </p>
                                )}

                                <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
                                    <div className="flex gap-3">
                                        <MapPin
                                            size={18}
                                            className="mt-0.5 text-blue-700"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Location
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-600">
                                                {job?.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <BriefcaseBusiness
                                            size={18}
                                            className="mt-0.5 text-blue-700"
                                        />

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Employment
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-600">
                                                {job?.employment_type}
                                            </p>
                                        </div>
                                    </div>

                                    {job?.experience && (
                                        <div className="flex gap-3">
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 text-blue-700"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Experience
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-slate-600">
                                                    {job.experience}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 rounded-3xl bg-[#06245a] p-7 text-white">
                                <FileText
                                    size={28}
                                    className="text-blue-200"
                                />

                                <h3 className="mt-5 text-xl font-bold">
                                    Ready to join us?
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-blue-100/75">
                                    Submit your information and CV. Our HR
                                    team will review your application.
                                </p>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-7 py-6 sm:px-9">
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                                    Apply Now
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#06245a]">
                                    Submit Your Application
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Please provide your basic information and
                                    upload your latest CV.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-7 sm:p-9"
                            >
                                {success && (
                                    <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-5">
                                        <div className="flex gap-3">
                                            <CheckCircle2
                                                size={22}
                                                className="shrink-0 text-green-600"
                                            />

                                            <div>
                                                <p className="font-semibold text-green-800">
                                                    Application Submitted
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-green-700">
                                                    {success}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {error && job && (
                                    <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
                                        {error}
                                    </div>
                                )}

                                <div className="grid gap-5 md:grid-cols-2">
                                    {/* Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Full Name
                                            <span className="text-red-500">
                                                {" "}
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) =>
                                                updateForm(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Email Address
                                            <span className="text-red-500">
                                                {" "}
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                updateForm(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Phone Number
                                            <span className="text-red-500">
                                                {" "}
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) =>
                                                updateForm(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="+880 1XXXXXXXXX"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Address
                                        </label>

                                        <input
                                            type="text"
                                            value={form.address}
                                            onChange={(e) =>
                                                updateForm(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Your current address"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                        />
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Cover Letter
                                    </label>

                                    <textarea
                                        value={form.cover_letter}
                                        onChange={(e) =>
                                            updateForm(
                                                "cover_letter",
                                                e.target.value
                                            )
                                        }
                                        rows={7}
                                        placeholder="Tell us briefly why you are suitable for this position..."
                                        className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#06245a] focus:ring-2 focus:ring-[#06245a]/10"
                                    />
                                </div>

                                {/* CV */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Upload CV
                                        <span className="text-red-500">
                                            {" "}
                                            *
                                        </span>
                                    </label>

                                    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#06245a] shadow-sm">
                                            <Upload size={24} />
                                        </div>

                                        <p className="mt-4 text-sm font-semibold text-slate-700">
                                            {form.cv
                                                ? form.cv.name
                                                : "Click to upload your CV"}
                                        </p>

                                        <p className="mt-2 text-xs text-slate-400">
                                            PDF, DOC or DOCX · Maximum 5 MB
                                        </p>

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="mt-7">
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="group w-full rounded-xl bg-[#06245a] py-6 text-sm font-semibold hover:bg-blue-800"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                Submit Application
                                                <ArrowRight
                                                    size={18}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </>
                                        )}
                                    </Button>

                                    <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                                        By submitting this application, you
                                        confirm that the information provided
                                        is accurate.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
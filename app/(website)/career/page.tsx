"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronDown,
    Clock3,
    GraduationCap,
    MapPin,
    Sparkles,
    Users,
} from "lucide-react";

import { useEffect, useState } from "react";

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
    responsibilities: string | null;
    requirements: string | null;
    benefits: string | null;
    application_deadline: string | null;
    status: "Draft" | "Published" | "Closed";
    is_featured: boolean;
    sort_order: number;
}

interface Benefit {
    icon: typeof GraduationCap;
    title: string;
    desc: string;
}

const benefits: Benefit[] = [
    {
        icon: GraduationCap,
        title: "Professional Growth",
        desc: "Opportunities to learn, develop new skills and grow with the organization.",
    },
    {
        icon: Sparkles,
        title: "Innovation",
        desc: "Work on modern digital solutions and technology-driven business initiatives.",
    },
    {
        icon: Users,
        title: "Collaborative Culture",
        desc: "A professional environment where people, ideas and teamwork are valued.",
    },
];

const formatList = (value: string | null) => {
    if (!value) {
        return [];
    }

    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
};

const formatDeadline = (date: string | null) => {
    if (!date) {
        return null;
    }

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function CareerPage() {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState<number | null>(null);

    const loadJobs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/careers/jobs");

            const data = response.data;

            setJobs(data.data ?? data ?? []);
        } catch (error) {
            console.error("Failed to load career jobs:", error);

            setError(
                "Unable to load current job opportunities. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <main className="bg-white text-slate-900">
            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative min-h-[600px] overflow-hidden bg-[#03172f]">
                <Image
                    src="/images/ship32.jpeg"
                    alt="Careers at Madina Maritime"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/25" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/90 via-transparent to-transparent" />

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                        backgroundSize: "70px 70px",
                    }}
                />

                <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
                            <span className="h-px w-12 bg-blue-400" />
                            Careers at MML
                        </div>

                        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Build your
                            <br />
                            <span className="text-blue-300">
                                future with us.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
                            Join a growing maritime organization where talented
                            people, technology and operational excellence come
                            together.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
                            >
                                <Link
                                    href="#open-positions"
                                    className="flex items-center gap-2"
                                >
                                    Explore Opportunities

                                    <ArrowRight
                                        size={18}
                                        className="ml-2 transition-transform group-hover:translate-x-1"
                                    />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 lg:left-10">
                    <BriefcaseBusiness size={15} />
                    Careers & Opportunities
                </div>
            </section>

            {/* =====================================================
                CAREER STATS
            ====================================================== */}
            <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
                <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            value: jobs.length.toString().padStart(2, "0"),
                            label: "Open Positions",
                        },
                        {
                            value: "24/7",
                            label: "Operational Environment",
                        },
                        {
                            value: "100%",
                            label: "Commitment to People",
                        },
                        {
                            value: "∞",
                            label: "Opportunities to Grow",
                        },
                    ].map((item, index) => (
                        <div
                            key={item.label}
                            className={`p-7 ${
                                index !== 3
                                    ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                                    : ""
                            }`}
                        >
                            <div className="text-3xl font-bold text-[#06245a]">
                                {item.value}
                            </div>

                            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* =====================================================
                WHY MML
            ====================================================== */}
            <section className="py-5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                            01 — Why MML
                        </div>
                    </div>

                    <div className="mt-5 grid gap-6 md:grid-cols-3">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <div
                                    key={benefit.title}
                                    className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-[#06245a]">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        {benefit.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =====================================================
                OPEN POSITIONS
            ====================================================== */}
            <section
                id="open-positions"
                className="bg-[#f5f8fc] py-5"
            >
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                            02 — Open Positions
                        </div>

                        <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                            Find your next opportunity.
                        </h2>

                        <p className="mt-5 leading-7 text-slate-600">
                            Explore our current openings and find a role where
                            your skills and experience can make an impact.
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="mt-14 rounded-3xl border border-slate-100 bg-white px-6 py-20 text-center shadow-sm">
                            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#06245a]" />

                            <p className="mt-5 text-sm font-medium text-slate-500">
                                Loading available positions...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="mt-14 rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
                            <BriefcaseBusiness
                                size={42}
                                className="mx-auto text-red-300"
                            />

                            <h3 className="mt-4 text-lg font-bold text-slate-700">
                                Unable to load job opportunities
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {error}
                            </p>

                            <Button
                                type="button"
                                onClick={loadJobs}
                                className="mt-6 rounded-full bg-[#06245a] px-6 hover:bg-blue-800"
                            >
                                Try Again
                            </Button>
                        </div>
                    )}

                    {/* No Jobs */}
                    {!loading && !error && jobs.length === 0 && (
                        <div className="mt-14 rounded-3xl border border-slate-100 bg-white px-6 py-20 text-center shadow-sm">
                            <BriefcaseBusiness
                                size={46}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-5 text-xl font-bold text-[#06245a]">
                                No Open Positions
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                                There are currently no open positions. Please
                                check back later for new career opportunities.
                            </p>
                        </div>
                    )}

                    {/* Jobs */}
                    {!loading && !error && jobs.length > 0 && (
                        <div className="mt-14 space-y-5">
                            {jobs.map((job) => {
                                const isSelected =
                                    selectedJob === job.id;

                                const responsibilities = formatList(
                                    job.responsibilities
                                );

                                const requirements = formatList(
                                    job.requirements
                                );

                                const benefitsList = formatList(
                                    job.benefits
                                );

                                const deadline = formatDeadline(
                                    job.application_deadline
                                );

                                return (
                                    <div
                                        key={job.id}
                                        className={`overflow-hidden rounded-3xl border bg-white transition duration-300 ${
                                            isSelected
                                                ? "border-blue-200 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
                                                : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl"
                                        }`}
                                    >
                                        {/* Job Header */}
                                        <div className="p-6 sm:p-7">
                                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                                <div className="flex gap-5">
                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#06245a]">
                                                        <BriefcaseBusiness
                                                            size={23}
                                                        />
                                                    </div>

                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <h3 className="text-2xl font-bold text-[#06245a]">
                                                                {job.title}
                                                            </h3>

                                                            {job.is_featured && (
                                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                                                                    Featured
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                                                            <span className="flex items-center gap-1.5">
                                                                <MapPin
                                                                    size={14}
                                                                />
                                                                {job.location}
                                                            </span>

                                                            <span className="flex items-center gap-1.5">
                                                                <Clock3
                                                                    size={14}
                                                                />
                                                                {
                                                                    job.employment_type
                                                                }
                                                            </span>

                                                            {job.experience && (
                                                                <span className="flex items-center gap-1.5">
                                                                    <GraduationCap
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    {
                                                                        job.experience
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>

                                                        {job.department && (
                                                            <div className="mt-2 text-xs font-semibold text-blue-700">
                                                                {
                                                                    job.department
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    className="group w-full rounded-full border-slate-200 text-[#06245a] hover:bg-[#06245a] hover:text-white lg:w-auto"
                                                    onClick={() =>
                                                        setSelectedJob(
                                                            isSelected
                                                                ? null
                                                                : job.id
                                                        )
                                                    }
                                                >
                                                    {isSelected
                                                        ? "Hide Details"
                                                        : "View Details"}

                                                    <ChevronDown
                                                        size={17}
                                                        className={`ml-2 transition-transform ${
                                                            isSelected
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </Button>
                                            </div>

                                            {job.short_description && (
                                                <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-500">
                                                    {
                                                        job.short_description
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Expanded Details */}
                                        {isSelected && (
                                            <div className="border-t border-slate-100 bg-[#f8fbff] px-7 py-8 sm:px-8">
                                                <div className="mb-10">
                                                    <div>
                                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                                            About the Role
                                                        </div>

                                                        <p className="mt-4 text-sm leading-7 text-slate-600">
                                                            {job.description ||
                                                                "No detailed description has been provided for this position."}
                                                        </p>

                                                    </div>
                                                </div>


                                                {/* Key Responsibilities */}
                                                {responsibilities.length >
                                                    0 && (
                                                    <>
                                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                                            Key
                                                            Responsibilities
                                                        </div>

                                                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                            {responsibilities.map(
                                                                (
                                                                    responsibility,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={`${job.id}-responsibility-${index}`}
                                                                        className="flex gap-3 text-sm leading-6 text-slate-600"
                                                                    >
                                                                        <CheckCircle2
                                                                            size={
                                                                                17
                                                                            }
                                                                            className="mt-1 shrink-0 text-blue-700"
                                                                        />

                                                                        <span>
                                                                            {
                                                                                responsibility
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </>
                                                )}

                                                {/* Requirements */}
                                                {requirements.length > 0 && (
                                                    <div className="mt-8">
                                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                                            Requirements
                                                        </div>

                                                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                            {requirements.map(
                                                                (
                                                                    requirement,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={`${job.id}-requirement-${index}`}
                                                                        className="flex gap-3 text-sm leading-6 text-slate-600"
                                                                    >
                                                                        <CheckCircle2
                                                                            size={
                                                                                17
                                                                            }
                                                                            className="mt-1 shrink-0 text-blue-700"
                                                                        />

                                                                        <span>
                                                                            {
                                                                                requirement
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Benefits */}
                                                {benefitsList.length > 0 && (
                                                    <div className="mt-8">
                                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                                            Benefits
                                                        </div>

                                                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                            {benefitsList.map(
                                                                (
                                                                    benefit,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={`${job.id}-benefit-${index}`}
                                                                        className="flex gap-3 text-sm leading-6 text-slate-600"
                                                                    >
                                                                        <CheckCircle2
                                                                            size={
                                                                                17
                                                                            }
                                                                            className="mt-1 shrink-0 text-blue-700"
                                                                        />

                                                                        <span>
                                                                            {
                                                                                benefit
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}


                                                {deadline && (
                                                    <div className="mt-6">
                                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                                            Application
                                                            Deadline
                                                        </div>

                                                        <p className="mt-2 text-sm font-semibold text-slate-600">
                                                            {deadline}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="mt-8 flex flex-wrap gap-4">
                                                    <Button className="group rounded-full bg-[#06245a] px-7 hover:bg-blue-800">
                                                        <Link
                                                            href={`/career/${job.slug}/apply`}
                                                            className="flex items-center gap-2"
                                                        >
                                                            Apply for This
                                                            Position

                                                            <ArrowRight
                                                                size={17}
                                                                className="ml-2 transition-transform group-hover:translate-x-1"
                                                            />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        className="rounded-full border-slate-200 text-[#06245a]"
                                                        onClick={() =>
                                                            setSelectedJob(null)
                                                        }
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
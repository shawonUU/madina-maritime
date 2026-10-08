"use client";

import { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    Edit,
    GraduationCap,
    Image as ImageIcon,
    Plus,
    Save,
    Sparkles,
    Trash2,
    Upload,
    Users,
    X,
} from "lucide-react";

import api from "@/services/api";

interface CareerStat {
    value: string;
    label: string;
}

interface CareerBenefit {
    icon: string;
    title: string;
    desc: string;
}

interface CareerData {
    id?: number;
    hero_label: string;
    hero_title: string;
    hero_highlight: string;
    hero_description: string;
    hero_image: string | null;
    hero_button_text: string;
    hero_button_url: string;
    bottom_caption: string;

    stats: CareerStat[];

    why_label: string;
    why_benefits: CareerBenefit[];

    jobs_label: string;
    jobs_title: string;
    jobs_description: string;

    status: boolean;
}

const defaultCareer: CareerData = {
    hero_label: "Careers at MML",
    hero_title: "Build your",
    hero_highlight: "future with us.",
    hero_description:
        "Join a growing maritime organization where talented people, technology and operational excellence come together.",
    hero_image: null,
    hero_button_text: "Explore Opportunities",
    hero_button_url: "#open-positions",
    bottom_caption: "Careers & Opportunities",

    stats: [
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
    ],

    why_label: "01 — Why MML",

    why_benefits: [
        {
            icon: "GraduationCap",
            title: "Professional Growth",
            desc: "Opportunities to learn, develop new skills and grow with the organization.",
        },
        {
            icon: "Sparkles",
            title: "Innovation",
            desc: "Work on modern digital solutions and technology-driven business initiatives.",
        },
        {
            icon: "Users",
            title: "Collaborative Culture",
            desc: "A professional environment where people, ideas and teamwork are valued.",
        },
    ],

    jobs_label: "02 — Open Positions",
    jobs_title: "Find your next opportunity.",
    jobs_description:
        "Explore our current openings and find a role where your skills and experience can make an impact.",

    status: true,
};

export default function CareerAdminPage() {
    const [career, setCareer] = useState<CareerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const loadCareer = async () => {
        try {
            setLoading(true);

            const response = await api.get("/website/admin/career");

            setCareer(response.data?.data ?? null);
        } catch (error) {
            console.error("Failed to load career content:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCareer();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#06245a]" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading career page content...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fa] p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#06245a]">
                            Career Page Content
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage career page hero, statistics, benefits and
                            open position section content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                        {career ? (
                            <>
                                <Edit size={17} />
                                Edit Career Page
                            </>
                        ) : (
                            <>
                                <Plus size={17} />
                                Create Career Page
                            </>
                        )}
                    </button>
                </div>

                {!career ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                        <BriefcaseBusiness
                            size={46}
                            className="mx-auto text-slate-300"
                        />

                        <h2 className="mt-4 text-lg font-bold text-[#06245a]">
                            Career Page Content Not Found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Create career page content to display it on the
                            website.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                                <div>
                                    <h2 className="font-bold text-[#06245a]">
                                        Hero Section
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Main career page banner content.
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        career.status
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {career.status
                                        ? "Published"
                                        : "Disabled"}
                                </span>
                            </div>

                            <div className="grid gap-6 p-6 lg:grid-cols-[260px_1fr]">
                                <div>
                                    {career.hero_image ? (
                                        <img
                                            src={career.hero_image}
                                            alt="Career Hero"
                                            className="h-40 w-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100">
                                            <ImageIcon
                                                size={35}
                                                className="text-slate-300"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <InfoItem
                                        label="Hero Label"
                                        value={career.hero_label}
                                    />

                                    <InfoItem
                                        label="Hero Title"
                                        value={career.hero_title}
                                    />

                                    <InfoItem
                                        label="Hero Highlight"
                                        value={career.hero_highlight}
                                    />

                                    <InfoItem
                                        label="Button"
                                        value={career.hero_button_text}
                                    />

                                    <InfoItem
                                        label="Button URL"
                                        value={career.hero_button_url}
                                    />

                                    <InfoItem
                                        label="Bottom Caption"
                                        value={career.bottom_caption}
                                    />

                                    <div className="md:col-span-2">
                                        <InfoItem
                                            label="Description"
                                            value={career.hero_description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h2 className="font-bold text-[#06245a]">
                                    Career Statistics
                                </h2>
                            </div>

                            <div className="grid gap-4 p-6 md:grid-cols-3">
                                {career.stats?.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                                    >
                                        <div className="text-2xl font-bold text-[#06245a]">
                                            {stat.value}
                                        </div>

                                        <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h2 className="font-bold text-[#06245a]">
                                    Why MML
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {career.why_label}
                                </p>
                            </div>

                            <div className="grid gap-5 p-6 md:grid-cols-3">
                                {career.why_benefits?.map(
                                    (benefit, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-100 p-5"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#06245a]">
                                                {benefit.icon ===
                                                    "GraduationCap" && (
                                                    <GraduationCap size={21} />
                                                )}

                                                {benefit.icon ===
                                                    "Sparkles" && (
                                                    <Sparkles size={21} />
                                                )}

                                                {benefit.icon === "Users" && (
                                                    <Users size={21} />
                                                )}
                                            </div>

                                            <h3 className="mt-4 font-bold text-[#06245a]">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {benefit.desc}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h2 className="font-bold text-[#06245a]">
                                    Open Positions Section
                                </h2>
                            </div>

                            <div className="grid gap-5 p-6">
                                <InfoItem
                                    label="Section Label"
                                    value={career.jobs_label}
                                />

                                <InfoItem
                                    label="Title"
                                    value={career.jobs_title}
                                />

                                <InfoItem
                                    label="Description"
                                    value={career.jobs_description}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {modalOpen && (
                <CareerModal
                    initialData={career ?? defaultCareer}
                    onClose={() => setModalOpen(false)}
                    onSaved={(data) => {
                        setCareer(data);
                        setModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {label}
            </div>

            <div className="mt-1 text-sm leading-6 text-slate-700">
                {value || "-"}
            </div>
        </div>
    );
}

function CareerModal({
    initialData,
    onClose,
    onSaved,
}: {
    initialData: CareerData;
    onClose: () => void;
    onSaved: (data: CareerData) => void;
}) {
    const [form, setForm] = useState<CareerData>(initialData);
    const [heroImage, setHeroImage] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const updateField = (
        field: keyof CareerData,
        value: string | boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateStat = (
        index: number,
        field: keyof CareerStat,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            stats: prev.stats.map((stat, statIndex) =>
                statIndex === index
                    ? {
                          ...stat,
                          [field]: value,
                      }
                    : stat
            ),
        }));
    };

    const addStat = () => {
        setForm((prev) => ({
            ...prev,
            stats: [
                ...prev.stats,
                {
                    value: "",
                    label: "",
                },
            ],
        }));
    };

    const removeStat = (index: number) => {
        setForm((prev) => ({
            ...prev,
            stats: prev.stats.filter((_, statIndex) => statIndex !== index),
        }));
    };

    const updateBenefit = (
        index: number,
        field: keyof CareerBenefit,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            why_benefits: prev.why_benefits.map((benefit, benefitIndex) =>
                benefitIndex === index
                    ? {
                          ...benefit,
                          [field]: value,
                      }
                    : benefit
            ),
        }));
    };

    const addBenefit = () => {
        setForm((prev) => ({
            ...prev,
            why_benefits: [
                ...prev.why_benefits,
                {
                    icon: "GraduationCap",
                    title: "",
                    desc: "",
                },
            ],
        }));
    };

    const removeBenefit = (index: number) => {
        setForm((prev) => ({
            ...prev,
            why_benefits: prev.why_benefits.filter(
                (_, benefitIndex) => benefitIndex !== index
            ),
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("hero_label", form.hero_label);
            formData.append("hero_title", form.hero_title);
            formData.append("hero_highlight", form.hero_highlight);
            formData.append(
                "hero_description",
                form.hero_description
            );
            formData.append(
                "hero_button_text",
                form.hero_button_text
            );
            formData.append(
                "hero_button_url",
                form.hero_button_url
            );
            formData.append(
                "bottom_caption",
                form.bottom_caption
            );

            formData.append(
                "stats",
                JSON.stringify(form.stats)
            );

            formData.append("why_label", form.why_label);

            formData.append(
                "why_benefits",
                JSON.stringify(form.why_benefits)
            );

            formData.append("jobs_label", form.jobs_label);
            formData.append("jobs_title", form.jobs_title);
            formData.append(
                "jobs_description",
                form.jobs_description
            );

            formData.append(
                "status",
                form.status ? "1" : "0"
            );

            if (heroImage) {
                formData.append("hero_image", heroImage);
            }

            const response = await api.post(
                "/website/admin/career/update",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            onSaved(response.data.data);
        } catch (error) {
            console.error("Failed to save career content:", error);

            alert("Failed to save career page content.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold text-[#06245a]">
                            Edit Career Page
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Update website career page content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6">
                    <div className="space-y-8">
                        <section>
                            <SectionTitle title="Hero Section" />

                            <div className="grid gap-5 md:grid-cols-2">
                                <Field
                                    label="Hero Label"
                                    value={form.hero_label}
                                    onChange={(value) =>
                                        updateField(
                                            "hero_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Hero Title"
                                    value={form.hero_title}
                                    onChange={(value) =>
                                        updateField(
                                            "hero_title",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Hero Highlight"
                                    value={form.hero_highlight}
                                    onChange={(value) =>
                                        updateField(
                                            "hero_highlight",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Hero Button Text"
                                    value={form.hero_button_text}
                                    onChange={(value) =>
                                        updateField(
                                            "hero_button_text",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Hero Button URL"
                                    value={form.hero_button_url}
                                    onChange={(value) =>
                                        updateField(
                                            "hero_button_url",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Bottom Caption"
                                    value={form.bottom_caption}
                                    onChange={(value) =>
                                        updateField(
                                            "bottom_caption",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Hero Description"
                                        value={form.hero_description}
                                        onChange={(value) =>
                                            updateField(
                                                "hero_description",
                                                value
                                            )
                                        }
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Hero Image
                                    </label>

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        {form.hero_image && (
                                            <img
                                                src={form.hero_image}
                                                alt="Hero"
                                                className="h-28 w-48 rounded-xl object-cover"
                                            />
                                        )}

                                        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-[#06245a] hover:bg-slate-50">
                                            <Upload size={17} />
                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(event) => {
                                                    const file =
                                                        event.target.files?.[0];

                                                    if (file) {
                                                        setHeroImage(file);

                                                        setForm(
                                                            (prev) => ({
                                                                ...prev,
                                                                hero_image:
                                                                    URL.createObjectURL(
                                                                        file
                                                                    ),
                                                            })
                                                        );
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between">
                                <SectionTitle title="Career Statistics" />

                                <button
                                    type="button"
                                    onClick={addStat}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#06245a] hover:bg-slate-50"
                                >
                                    <Plus size={15} />
                                    Add Stat
                                </button>
                            </div>

                            <div className="space-y-4">
                                {form.stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[180px_1fr_auto]"
                                    >
                                        <Field
                                            label="Value"
                                            value={stat.value}
                                            onChange={(value) =>
                                                updateStat(
                                                    index,
                                                    "value",
                                                    value
                                                )
                                            }
                                        />

                                        <Field
                                            label="Label"
                                            value={stat.label}
                                            onChange={(value) =>
                                                updateStat(
                                                    index,
                                                    "label",
                                                    value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeStat(index)
                                            }
                                            className="self-end rounded-lg p-3 text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between">
                                <SectionTitle title="Why MML" />

                                <button
                                    type="button"
                                    onClick={addBenefit}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#06245a] hover:bg-slate-50"
                                >
                                    <Plus size={15} />
                                    Add Benefit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {form.why_benefits.map(
                                    (benefit, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                        >
                                            <div className="grid gap-4 md:grid-cols-[180px_1fr_auto]">
                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold text-slate-600">
                                                        Icon
                                                    </label>

                                                    <select
                                                        value={
                                                            benefit.icon
                                                        }
                                                        onChange={(event) =>
                                                            updateBenefit(
                                                                index,
                                                                "icon",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                                    >
                                                        <option value="GraduationCap">
                                                            Graduation Cap
                                                        </option>

                                                        <option value="Sparkles">
                                                            Sparkles
                                                        </option>

                                                        <option value="Users">
                                                            Users
                                                        </option>
                                                    </select>
                                                </div>

                                                <Field
                                                    label="Title"
                                                    value={
                                                        benefit.title
                                                    }
                                                    onChange={(value) =>
                                                        updateBenefit(
                                                            index,
                                                            "title",
                                                            value
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeBenefit(
                                                            index
                                                        )
                                                    }
                                                    className="self-end rounded-lg p-3 text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="mt-4">
                                                <TextAreaField
                                                    label="Description"
                                                    value={
                                                        benefit.desc
                                                    }
                                                    onChange={(value) =>
                                                        updateBenefit(
                                                            index,
                                                            "desc",
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Section Label"
                                    value={form.why_label}
                                    onChange={(value) =>
                                        updateField(
                                            "why_label",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </section>

                        <section>
                            <SectionTitle title="Open Positions Section" />

                            <div className="space-y-5">
                                <Field
                                    label="Section Label"
                                    value={form.jobs_label}
                                    onChange={(value) =>
                                        updateField(
                                            "jobs_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Section Title"
                                    value={form.jobs_title}
                                    onChange={(value) =>
                                        updateField(
                                            "jobs_title",
                                            value
                                        )
                                    }
                                />

                                <TextAreaField
                                    label="Section Description"
                                    value={form.jobs_description}
                                    onChange={(value) =>
                                        updateField(
                                            "jobs_description",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div>
                                    <div className="font-semibold text-slate-700">
                                        Page Status
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        Enable or disable the public career
                                        page content.
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateField(
                                            "status",
                                            !form.status
                                        )
                                    }
                                    className={`relative h-6 w-11 rounded-full transition ${
                                        form.status
                                            ? "bg-[#06245a]"
                                            : "bg-slate-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                            form.status
                                                ? "left-6"
                                                : "left-1"
                                        }`}
                                    />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                    >
                        <Save size={17} />

                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title }: { title: string }) {
    return (
        <div className="mb-4">
            <h3 className="text-base font-bold text-[#06245a]">
                {title}
            </h3>

            <div className="mt-2 h-px bg-slate-100" />
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
            />
        </div>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
                {label}
            </label>

            <textarea
                rows={4}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#06245a] focus:ring-1 focus:ring-[#06245a]"
            />
        </div>
    );
}
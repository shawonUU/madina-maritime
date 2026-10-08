"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Trash2,
    Save,
    Upload,
    X,
    Users,
    BarChart3,
    Building2,
    Target,
    Eye,
    History,
    TrendingUp,
} from "lucide-react";

import api from "@/services/api";

interface AboutData {
    id?: number;
    label: string;
    title: string;
    highlight: string;
    description: string;
    image: string | null;
    journey_description: string;
    milestones: Milestone[];
    mission_title: string;
    mission_description: string;
    vision_title: string;
    vision_description: string;
    looking_ahead_title: string;
    looking_ahead_description: string;
    tonnage: Tonnage[];
    status: boolean;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
}

interface Tonnage {
    year: number;
    tonnage: number;
}

interface Stat {
    id: number;
    value: string;
    label: string;
    sort_order: number;
    status: boolean;
}

interface TeamMember {
    id: number;
    name: string;
    designation: string;
    category: "management" | "leadership";
    image: string | null;
    email: string | null;
    phone: string | null;
    sort_order: number;
    status: boolean;
}

const emptyAbout: AboutData = {
    label: "About Madina Maritime",
    title: "Built on Trust. Driven by Progress.",
    highlight: "",
    description: "",
    image: null,
    journey_description: "",
    milestones: [],
    mission_title: "Our Mission",
    mission_description: "",
    vision_title: "Our Vision",
    vision_description: "",
    looking_ahead_title: "Looking Ahead",
    looking_ahead_description: "",
    tonnage: [],
    status: true,
};

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState("information");

    const [about, setAbout] = useState<AboutData>(emptyAbout);
    const [stats, setStats] = useState<Stat[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [aboutImage, setAboutImage] = useState<File | null>(null);

    const [showStatModal, setShowStatModal] = useState(false);
    const [editingStat, setEditingStat] = useState<Stat | null>(null);

    const [showTeamModal, setShowTeamModal] = useState(false);
    const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);

    const [statForm, setStatForm] = useState({
        value: "",
        label: "",
        sort_order: 0,
        status: true,
    });

    const [teamForm, setTeamForm] = useState({
        name: "",
        designation: "",
        category: "management" as "management" | "leadership",
        email: "",
        phone: "",
        sort_order: 0,
        status: true,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const [
                aboutResponse,
                statsResponse,
                teamResponse,
            ] = await Promise.all([
                api.get("/website/about"),
                api.get("/website/about/stats"),
                api.get("/website/about/team"),
            ]);

            if (aboutResponse.data?.data) {
                const data = aboutResponse.data.data;

                setAbout({
                    ...emptyAbout,
                    ...data,

                    label: data.label ?? "",
                    title: data.title ?? "",
                    highlight: data.highlight ?? "",
                    description: data.description ?? "",
                    image: data.image ?? null,

                    journey_description:
                        data.journey_description ?? "",

                    milestones: Array.isArray(data.milestones)
                        ? data.milestones.map((item: any) => ({
                            year: item?.year ?? "",
                            title: item?.title ?? "",
                            description: item?.description ?? "",
                        }))
                        : [],

                    mission_title:
                        data.mission_title ?? "",

                    mission_description:
                        data.mission_description ?? "",

                    vision_title:
                        data.vision_title ?? "",

                    vision_description:
                        data.vision_description ?? "",

                    looking_ahead_title:
                        data.looking_ahead_title ?? "",

                    looking_ahead_description:
                        data.looking_ahead_description ?? "",

                    tonnage: Array.isArray(data.tonnage)
                        ? data.tonnage.map((item: any) => ({
                            year: Number(item?.year ?? 0),
                            tonnage: Number(item?.tonnage ?? 0),
                        }))
                        : [],

                    status: Boolean(data.status),
                });
            }

            setStats(
                Array.isArray(statsResponse.data?.data)
                    ? statsResponse.data.data.map((stat: any) => ({
                        id: stat.id,
                        value: stat.value ?? "",
                        label: stat.label ?? "",
                        sort_order: Number(stat.sort_order ?? 0),
                        status: Boolean(stat.status),
                    }))
                    : []
            );

            setTeam(
                Array.isArray(teamResponse.data?.data)
                    ? teamResponse.data.data.map((member: any) => ({
                        id: member.id,
                        name: member.name ?? "",
                        designation: member.designation ?? "",
                        category: member.category ?? "management",
                        image: member.image ?? null,
                        email: member.email ?? "",
                        phone: member.phone ?? "",
                        sort_order: Number(
                            member.sort_order ?? 0
                        ),
                        status: Boolean(member.status),
                    }))
                    : []
            );
        } catch (error) {
            console.error(
                "Failed to load About data:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const updateAboutField = (
        field: keyof AboutData,
        value: string | boolean | Milestone[] | Tonnage[]
    ) => {
        setAbout((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

const saveAbout = async () => {
    try {
        setSaving(true);

        const formData = new FormData();

        formData.append("label", about.label || "");
        formData.append("title", about.title || "");
        formData.append("highlight", about.highlight || "");
        formData.append("description", about.description || "");

        formData.append(
            "journey_description",
            about.journey_description || ""
        );

        formData.append(
            "mission_title",
            about.mission_title || ""
        );

        formData.append(
            "mission_description",
            about.mission_description || ""
        );

        formData.append(
            "vision_title",
            about.vision_title || ""
        );

        formData.append(
            "vision_description",
            about.vision_description || ""
        );

        formData.append(
            "looking_ahead_title",
            about.looking_ahead_title || ""
        );

        formData.append(
            "looking_ahead_description",
            about.looking_ahead_description || ""
        );

        // Milestones
        (about.milestones || []).forEach((item, index) => {
            formData.append(
                `milestones[${index}][year]`,
                item.year || ""
            );

            formData.append(
                `milestones[${index}][title]`,
                item.title || ""
            );

            formData.append(
                `milestones[${index}][description]`,
                item.description || ""
            );
        });

        // Tonnage
        (about.tonnage || []).forEach((item, index) => {
            formData.append(
                `tonnage[${index}][year]`,
                String(item.year ?? "")
            );

            formData.append(
                `tonnage[${index}][tonnage]`,
                String(item.tonnage ?? "")
            );
        });

        formData.append(
            "status",
            about.status ? "1" : "0"
        );

        if (aboutImage) {
            formData.append("image", aboutImage);
        }

        if (about.id) {
            // Backend route is POST, so do NOT send _method=PUT
            await api.post(
                `/website/about/${about.id}`,
                formData
            );
        } else {
            await api.post(
                "/website/about",
                formData
            );
        }

        alert("About information saved successfully.");

        setAboutImage(null);

        await loadData();
    } catch (error: any) {
        console.error(error);

        const message =
            error?.response?.data?.message ||
            "Failed to save About information.";

        alert(message);
    } finally {
        setSaving(false);
    }
};

    const addMilestone = () => {
        setAbout((prev) => ({
            ...prev,
            milestones: [
                ...prev.milestones,
                {
                    year: "",
                    title: "",
                    description: "",
                },
            ],
        }));
    };

    const updateMilestone = (
        index: number,
        field: keyof Milestone,
        value: string
    ) => {
        setAbout((prev) => {
            const milestones = [...prev.milestones];

            milestones[index] = {
                ...milestones[index],
                [field]: value,
            };

            return {
                ...prev,
                milestones,
            };
        });
    };

    const removeMilestone = (index: number) => {
        setAbout((prev) => ({
            ...prev,
            milestones: prev.milestones.filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    const addTonnage = () => {
        setAbout((prev) => ({
            ...prev,
            tonnage: [
                ...prev.tonnage,
                {
                    year: new Date().getFullYear(),
                    tonnage: 0,
                },
            ],
        }));
    };

    const updateTonnage = (
        index: number,
        field: keyof Tonnage,
        value: number
    ) => {
        setAbout((prev) => {
            const tonnage = [...prev.tonnage];

            tonnage[index] = {
                ...tonnage[index],
                [field]: value,
            };

            return {
                ...prev,
                tonnage,
            };
        });
    };

    const removeTonnage = (index: number) => {
        setAbout((prev) => ({
            ...prev,
            tonnage: prev.tonnage.filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    const openStatModal = (stat?: Stat) => {
        if (stat) {
            setEditingStat(stat);

            setStatForm({
                value: stat.value,
                label: stat.label,
                sort_order: stat.sort_order,
                status: stat.status,
            });
        } else {
            setEditingStat(null);

            setStatForm({
                value: "",
                label: "",
                sort_order: stats.length,
                status: true,
            });
        }

        setShowStatModal(true);
    };

    const saveStat = async () => {
        try {
            if (!statForm.value || !statForm.label) {
                alert("Value and label are required.");
                return;
            }

            setSaving(true);

            if (editingStat) {
                await api.post(
                    `/website/about/stats/${editingStat.id}`,
                    statForm
                );
            } else {
                await api.post(
                    "/website/about/stats",
                    statForm
                );
            }

            setShowStatModal(false);

            await loadData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save statistic."
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteStat = async (id: number) => {
        if (!confirm("Are you sure you want to delete this statistic?")) {
            return;
        }

        try {
            await api.delete(`/website/about/stats/${id}`);

            await loadData();
        } catch (error) {
            console.error(error);
            alert("Failed to delete statistic.");
        }
    };

    const openTeamModal = (member?: TeamMember) => {
        if (member) {
            setEditingTeam(member);

            setTeamForm({
                name: member.name,
                designation: member.designation,
                category: member.category,
                email: member.email || "",
                phone: member.phone || "",
                sort_order: member.sort_order,
                status: member.status,
            });
        } else {
            setEditingTeam(null);

            setTeamForm({
                name: "",
                designation: "",
                category: "management",
                email: "",
                phone: "",
                sort_order: team.length,
                status: true,
            });
        }

        setShowTeamModal(true);
    };

    const saveTeam = async (image: File | null) => {
        try {
            if (!teamForm.name || !teamForm.designation) {
                alert("Name and designation are required.");
                return;
            }

            setSaving(true);

            const formData = new FormData();

            formData.append("name", teamForm.name);
            formData.append("designation", teamForm.designation);
            formData.append("category", teamForm.category);
            formData.append("email", teamForm.email);
            formData.append("phone", teamForm.phone);
            formData.append(
                "sort_order",
                String(teamForm.sort_order)
            );
            formData.append(
                "status",
                teamForm.status ? "1" : "0"
            );

            if (image) {
                formData.append("image", image);
            }

            if (editingTeam) {
                formData.append("_method", "PUT");

                await api.post(
                    `/website/about/team/${editingTeam.id}`,
                    formData
                );
            } else {
                await api.post(
                    "/website/about/team",
                    formData
                );
            }

            setShowTeamModal(false);

            await loadData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save team member."
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteTeam = async (id: number) => {
        if (!confirm("Are you sure you want to delete this team member?")) {
            return;
        }

        try {
            await api.delete(`/website/about/team/${id}`);

            await loadData();
        } catch (error) {
            console.error(error);
            alert("Failed to delete team member.");
        }
    };

    const tabs = [
        {
            key: "information",
            label: "About Information",
            icon: Building2,
        },
        {
            key: "statistics",
            label: "Statistics",
            icon: BarChart3,
        },
        {
            key: "team",
            label: "Team",
            icon: Users,
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-sm text-gray-500">
                    Loading About information...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#06245a]">
                    About Us
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage About Us content of Madina Maritime website.
                </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                                activeTab === tab.key
                                    ? "border-[#06245a] text-[#06245a]"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            <Icon size={17} />

                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {activeTab === "information" && (
                <div className="space-y-6">
                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Hero Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Manage the main About Us section.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={saveAbout}
                                disabled={saving}
                                className="flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#041b45] disabled:opacity-50"
                            >
                                <Save size={16} />

                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    value={about.label}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "label",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Highlight
                                </label>

                                <input
                                    type="text"
                                    value={about.highlight}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "highlight",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={about.title}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    rows={5}
                                    value={about.description}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    About Image
                                </label>

                                <div className="flex flex-wrap items-center gap-4">
                                    {about.image && !aboutImage && (
                                        <img
                                            src={about.image}
                                            alt="About"
                                            className="h-32 w-52 rounded-lg object-cover"
                                        />
                                    )}

                                    {aboutImage && (
                                        <img
                                            src={URL.createObjectURL(
                                                aboutImage
                                            )}
                                            alt="Preview"
                                            className="h-32 w-52 rounded-lg object-cover"
                                        />
                                    )}

                                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <Upload size={16} />

                                        Choose Image

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                setAboutImage(
                                                    e.target.files?.[0] ||
                                                        null
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <History
                                    size={20}
                                    className="text-[#06245a]"
                                />

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Our Journey
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Manage company milestones.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addMilestone}
                                className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2 text-sm font-medium text-white"
                            >
                                <Plus size={16} />
                                Add Milestone
                            </button>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Journey Description
                            </label>

                            <textarea
                                rows={4}
                                value={about.journey_description}
                                onChange={(e) =>
                                    updateAboutField(
                                        "journey_description",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
                            />
                        </div>

                        <div className="space-y-4">
                            {(about.milestones || []).map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-800">
                                            Milestone {index + 1}
                                        </h4>

                                        <button
                                            type="button"
                                            onClick={() => removeMilestone(index)}
                                            className="text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Year
                                            </label>

                                            <input
                                                type="text"
                                                value={item.year ?? ""}
                                                onChange={(e) => {
                                                    const milestones = [...(about.milestones || [])];

                                                    milestones[index] = {
                                                        ...milestones[index],
                                                        year: e.target.value,
                                                    };

                                                    setAbout({
                                                        ...about,
                                                        milestones,
                                                    });
                                                }}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                                placeholder="2020"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Title
                                            </label>

                                            <input
                                                type="text"
                                                value={item.title ?? ""}
                                                onChange={(e) => {
                                                    const milestones = [...(about.milestones || [])];

                                                    milestones[index] = {
                                                        ...milestones[index],
                                                        title: e.target.value,
                                                    };

                                                    setAbout({
                                                        ...about,
                                                        milestones,
                                                    });
                                                }}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                                placeholder="Company Established"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Description
                                            </label>

                                            <textarea
                                                value={item.description ?? ""}
                                                onChange={(e) => {
                                                    const milestones = [...(about.milestones || [])];

                                                    milestones[index] = {
                                                        ...milestones[index],
                                                        description: e.target.value,
                                                    };

                                                    setAbout({
                                                        ...about,
                                                        milestones,
                                                    });
                                                }}
                                                rows={3}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                                placeholder="Milestone description"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <Target
                                size={20}
                                className="text-[#06245a]"
                            />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Mission & Vision
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Manage mission and vision content.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Mission Title
                                </label>

                                <input
                                    type="text"
                                    value={about.mission_title}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "mission_title",
                                            e.target.value
                                        )
                                    }
                                    className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />

                                <textarea
                                    rows={6}
                                    value={about.mission_description}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "mission_description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Vision Title
                                </label>

                                <input
                                    type="text"
                                    value={about.vision_title}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "vision_title",
                                            e.target.value
                                        )
                                    }
                                    className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />

                                <textarea
                                    rows={6}
                                    value={about.vision_description}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "vision_description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <Eye
                                size={20}
                                className="text-[#06245a]"
                            />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Looking Ahead
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={about.looking_ahead_title}
                                    onChange={(e) =>
                                        updateAboutField(
                                            "looking_ahead_title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    rows={4}
                                    value={
                                        about.looking_ahead_description
                                    }
                                    onChange={(e) =>
                                        updateAboutField(
                                            "looking_ahead_description",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <TrendingUp
                                    size={20}
                                    className="text-[#06245a]"
                                />

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Operational Tonnage
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Manage yearly total tonnage.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addTonnage}
                                className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2 text-sm font-medium text-white"
                            >
                                <Plus size={16} />
                                Add Year
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(about.tonnage || []).map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="number"
                                        value={item.year}
                                        onChange={(e) =>
                                            updateTonnage(
                                                index,
                                                "year",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-32 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                    />

                                    <input
                                        type="number"
                                        value={item.tonnage}
                                        onChange={(e) =>
                                            updateTonnage(
                                                index,
                                                "tonnage",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTonnage(index)
                                        }
                                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={saveAbout}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-[#06245a] px-6 py-3 text-sm font-medium text-white hover:bg-[#041b45] disabled:opacity-50"
                        >
                            <Save size={17} />

                            {saving
                                ? "Saving..."
                                : "Save About Information"}
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "statistics" && (
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 p-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                About Statistics
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage experience and company statistics.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => openStatModal()}
                            className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white"
                        >
                            <Plus size={16} />
                            Add Statistic
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Value
                                    </th>

                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Label
                                    </th>

                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Order
                                    </th>

                                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {stats.map((stat) => (
                                    <tr
                                        key={stat.id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="px-5 py-4 font-semibold text-[#06245a]">
                                            {stat.value}
                                        </td>

                                        <td className="px-5 py-4 text-gray-700">
                                            {stat.label}
                                        </td>

                                        <td className="px-5 py-4 text-gray-500">
                                            {stat.sort_order}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openStatModal(stat)
                                                    }
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteStat(stat.id)
                                                    }
                                                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "team" && (
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 p-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Team Members
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage management and leadership members.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => openTeamModal()}
                            className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white"
                        >
                            <Plus size={16} />
                            Add Member
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Member
                                    </th>

                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Designation
                                    </th>

                                    <th className="px-5 py-3 font-medium text-gray-600">
                                        Category
                                    </th>

                                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {team.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {member.image ? (
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                        <Users size={18} />
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="font-medium text-gray-800">
                                                        {member.name}
                                                    </div>

                                                    {member.email && (
                                                        <div className="text-xs text-gray-500">
                                                            {member.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-gray-700">
                                            {member.designation}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                                                {member.category}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openTeamModal(
                                                            member
                                                        )
                                                    }
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteTeam(
                                                            member.id
                                                        )
                                                    }
                                                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showStatModal && (
                <StatModal
                    form={statForm}
                    setForm={setStatForm}
                    editing={!!editingStat}
                    saving={saving}
                    onClose={() => setShowStatModal(false)}
                    onSave={saveStat}
                />
            )}

            {showTeamModal && (
                <TeamModal
                    form={teamForm}
                    setForm={setTeamForm}
                    editing={!!editingTeam}
                    existingImage={editingTeam?.image || null}
                    saving={saving}
                    onClose={() => setShowTeamModal(false)}
                    onSave={saveTeam}
                />
            )}
        </div>
    );
}

function StatModal({
    form,
    setForm,
    editing,
    saving,
    onClose,
    onSave,
}: {
    form: {
        value: string;
        label: string;
        sort_order: number;
        status: boolean;
    };
    setForm: React.Dispatch<
        React.SetStateAction<{
            value: string;
            label: string;
            sort_order: number;
            status: boolean;
        }>
    >;
    editing: boolean;
    saving: boolean;
    onClose: () => void;
    onSave: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {editing ? "Edit Statistic" : "Add Statistic"}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Value
                        </label>

                        <input
                            type="text"
                            value={form.value}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    value: e.target.value,
                                }))
                            }
                            placeholder="30+"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Label
                        </label>

                        <input
                            type="text"
                            value={form.label}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    label: e.target.value,
                                }))
                            }
                            placeholder="Years of Experience"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Sort Order
                        </label>

                        <input
                            type="number"
                            value={form.sort_order}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    sort_order: Number(
                                        e.target.value
                                    ),
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="rounded-lg bg-[#06245a] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function TeamModal({
    form,
    setForm,
    editing,
    existingImage,
    saving,
    onClose,
    onSave,
}: {
    form: {
        name: string;
        designation: string;
        category: "management" | "leadership";
        email: string;
        phone: string;
        sort_order: number;
        status: boolean;
    };
    setForm: React.Dispatch<
        React.SetStateAction<{
            name: string;
            designation: string;
            category: "management" | "leadership";
            email: string;
            phone: string;
            sort_order: number;
            status: boolean;
        }>
    >;
    editing: boolean;
    existingImage: string | null;
    saving: boolean;
    onClose: () => void;
    onSave: (image: File | null) => void;
}) {
    const [image, setImage] = useState<File | null>(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-8 w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {editing
                            ? "Edit Team Member"
                            : "Add Team Member"}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Designation
                        </label>

                        <input
                            type="text"
                            value={form.designation}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    designation: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Category
                        </label>

                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    category: e.target.value as
                                        | "management"
                                        | "leadership",
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        >
                            <option value="management">
                                Management
                            </option>

                            <option value="leadership">
                                Leadership
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone
                        </label>

                        <input
                            type="text"
                            value={form.phone}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Sort Order
                        </label>

                        <input
                            type="number"
                            value={form.sort_order}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    sort_order: Number(
                                        e.target.value
                                    ),
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Photo
                        </label>

                        <div className="flex items-center gap-4">
                            {existingImage && !image && (
                                <img
                                    src={existingImage}
                                    alt={form.name}
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                            )}

                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                            )}

                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Upload size={16} />

                                Choose Photo

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        setImage(
                                            e.target.files?.[0] ||
                                                null
                                        )
                                    }
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => onSave(image)}
                        disabled={saving}
                        className="rounded-lg bg-[#06245a] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
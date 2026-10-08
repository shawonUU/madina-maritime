"use client";

import { useEffect, useState } from "react";
import {
    Save,
    Upload,
    Trash2,
    Edit,
    Plus,
    X,
    Building2,
    Globe2,
    Ship,
    Truck,
    Waves,
    Wrench,
    Fuel,
    Factory,
    Package,
    Landmark,
    RefreshCw,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

type IconName =
    | "Building2"
    | "Globe2"
    | "Ship"
    | "Truck"
    | "Waves"
    | "Wrench"
    | "Fuel"
    | "Factory"
    | "Package"
    | "Landmark";

interface PageData {
    id?: number;
    label: string;
    title: string;
    highlight: string;
    description: string;
    hero_image: string | null;
    hero_image_url: string | null;
    status: boolean;
}

interface SectorsData {
    id?: number;
    value: string;
    label: string;
    icon: IconName;
    sort_order: number;
    status: boolean;
}

interface ConcernData {
    id?: number;
    title: string;
    short_title: string;
    category: string;
    description: string;
    image: string | null;
    image_url: string | null;
    icon: IconName;
    number: string;
    sort_order: number;
    status: boolean;
}

interface OrganizationData {
    id?: number;
    name: string;
    function: string;
    icon: IconName;
    sort_order: number;
    status: boolean;
}

interface SisterConcernResponse {
    page: PageData | null;
    sectors: SectorsData[];
    concerns: ConcernData[];
    organizations: OrganizationData[];
}

const iconOptions: IconName[] = [
    "Building2",
    "Globe2",
    "Ship",
    "Truck",
    "Waves",
    "Wrench",
    "Fuel",
    "Factory",
    "Package",
    "Landmark",
];

const iconMap = {
    Building2,
    Globe2,
    Ship,
    Truck,
    Waves,
    Wrench,
    Fuel,
    Factory,
    Package,
    Landmark,
};

const emptyPage: PageData = {
    label: "Madina Group",
    title: "One Group.",
    highlight: "Many Capabilities.",
    description:
        "Our sister concerns bring together expertise across marine services, logistics, transportation, equipment, energy and industrial operations.",
    hero_image: "/images/ship-new3.jpeg",
    hero_image_url: "/images/ship-new3.jpeg",
    status: true,
};

const emptyStat: SectorsData = {
    value: "",
    label: "",
    icon: "Building2",
    sort_order: 1,
    status: true,
};

const emptyConcern: ConcernData = {
    title: "",
    short_title: "",
    category: "",
    description: "",
    image: null,
    image_url: null,
    icon: "Building2",
    number: "",
    sort_order: 1,
    status: true,
};

const emptyOrganization: OrganizationData = {
    name: "",
    function: "",
    icon: "Building2",
    sort_order: 1,
    status: true,
};

function getIcon(iconName?: IconName) {
    return iconMap[iconName || "Building2"] || Building2;
}

export default function SisterConcernsAdminPage() {
    const queryClient = useQueryClient();

    const [pageForm, setPageForm] = useState<PageData>(emptyPage);
    const [heroFile, setHeroFile] = useState<File | null>(null);

    const [statForm, setStatForm] = useState<SectorsData>(emptyStat);
    const [editingStatId, setEditingStatId] = useState<number | null>(null);

    const [concernForm, setConcernForm] =
        useState<ConcernData>(emptyConcern);
    const [concernFile, setConcernFile] = useState<File | null>(null);
    const [editingConcernId, setEditingConcernId] =
        useState<number | null>(null);

    const [organizationForm, setOrganizationForm] =
        useState<OrganizationData>(emptyOrganization);
    const [editingOrganizationId, setEditingOrganizationId] =
        useState<number | null>(null);

    const [activeForm, setActiveForm] = useState<
        "stat" | "concern" | "organization" | null
    >(null);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<SisterConcernResponse>({
        queryKey: ["admin-sister-concerns"],
        queryFn: async () => {
            const response = await api.get(
                "/website/admin/sister-concerns"
            );

            return response.data.data;
        },
    });

    useEffect(() => {
        if (data?.page) {
            setPageForm(data.page);
        }
    }, [data?.page]);

    const savePageMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("label", pageForm.label);
            formData.append("title", pageForm.title);
            formData.append("highlight", pageForm.highlight);
            formData.append("description", pageForm.description);
            formData.append(
                "status",
                pageForm.status ? "1" : "0"
            );

            if (heroFile) {
                formData.append("hero_image", heroFile);
            }

            const response = await api.post(
                "/website/admin/sister-concerns/page",
                formData
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });

            setHeroFile(null);

            alert("Page settings saved successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save page settings."
            );
        },
    });

    const saveStatMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("value", statForm.value);
            formData.append("label", statForm.label);
            formData.append("icon", statForm.icon);
            formData.append(
                "sort_order",
                String(statForm.sort_order)
            );
            formData.append(
                "status",
                statForm.status ? "1" : "0"
            );

            if (editingStatId) {
                const response = await api.post(
                    `/website/admin/sister-concerns/sectors/${editingStatId}`,
                    formData
                );

                return response.data;
            }

            const response = await api.post(
                "/website/admin/sister-concerns/stats",
                formData
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });

            setStatForm(emptyStat);
            setEditingStatId(null);
            setActiveForm(null);

            alert(
                editingStatId
                    ? "Stat updated successfully."
                    : "Stat added successfully."
            );
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save stat."
            );
        },
    });

    const deleteStatMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(
                `/website/admin/sister-concerns/sectors/${id}`
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to delete stat."
            );
        },
    });

    const saveConcernMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("title", concernForm.title);
            formData.append(
                "short_title",
                concernForm.short_title
            );
            formData.append("category", concernForm.category);
            formData.append(
                "description",
                concernForm.description
            );
            formData.append("icon", concernForm.icon);
            formData.append("number", concernForm.number);
            formData.append(
                "sort_order",
                String(concernForm.sort_order)
            );
            formData.append(
                "status",
                concernForm.status ? "1" : "0"
            );

            if (concernFile) {
                formData.append("image", concernFile);
            }

            if (editingConcernId) {
                const response = await api.post(
                    `/website/admin/sister-concerns/concerns/${editingConcernId}`,
                    formData
                );

                return response.data;
            }

            const response = await api.post(
                "/website/admin/sister-concerns/concerns",
                formData
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });

            setConcernForm(emptyConcern);
            setConcernFile(null);
            setEditingConcernId(null);
            setActiveForm(null);

            alert(
                editingConcernId
                    ? "Sister concern updated successfully."
                    : "Sister concern added successfully."
            );
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save sister concern."
            );
        },
    });

    const deleteConcernMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(
                `/website/admin/sister-concerns/concerns/${id}`
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to delete sister concern."
            );
        },
    });

    const saveOrganizationMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("name", organizationForm.name);
            formData.append(
                "function",
                organizationForm.function
            );
            formData.append("icon", organizationForm.icon);
            formData.append(
                "sort_order",
                String(organizationForm.sort_order)
            );
            formData.append(
                "status",
                organizationForm.status ? "1" : "0"
            );

            if (editingOrganizationId) {
                const response = await api.post(
                    `/website/admin/sister-concerns/organizations/${editingOrganizationId}`,
                    formData
                );

                return response.data;
            }

            const response = await api.post(
                "/website/admin/sister-concerns/organizations",
                formData
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });

            setOrganizationForm(emptyOrganization);
            setEditingOrganizationId(null);
            setActiveForm(null);

            alert(
                editingOrganizationId
                    ? "Organization updated successfully."
                    : "Organization added successfully."
            );
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save organization."
            );
        },
    });

    const deleteOrganizationMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(
                `/website/admin/sister-concerns/organizations/${id}`
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-sister-concerns"],
            });
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to delete organization."
            );
        },
    });

    const startEditStat = (item: SectorsData) => {
        setStatForm({
            ...item,
        });

        setEditingStatId(item.id || null);
        setActiveForm("stat");
    };

    const startEditConcern = (item: ConcernData) => {
        setConcernForm({
            ...item,
        });

        setEditingConcernId(item.id || null);
        setConcernFile(null);
        setActiveForm("concern");
    };

    const startEditOrganization = (item: OrganizationData) => {
        setOrganizationForm({
            ...item,
        });

        setEditingOrganizationId(item.id || null);
        setActiveForm("organization");
    };

    const cancelForm = () => {
        setActiveForm(null);

        setStatForm(emptyStat);
        setEditingStatId(null);

        setConcernForm(emptyConcern);
        setConcernFile(null);
        setEditingConcernId(null);

        setOrganizationForm(emptyOrganization);
        setEditingOrganizationId(null);
    };

    const page = data?.page || pageForm;
    const sectors = data?.sectors || [];
    const concerns = data?.concerns || [];
    const organizations = data?.organizations || [];

    if (isLoading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="flex items-center gap-3 text-gray-600">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Loading sister concerns...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <h2 className="text-lg font-semibold text-red-700">
                    Failed to load Sister Concerns
                </h2>

                <p className="mt-2 text-sm text-red-600">
                    {(error as any)?.response?.data?.message ||
                        "Something went wrong while loading the data."}
                </p>

                <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Sister Concerns
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage the Sister Concerns page content,
                    statistics, companies and organizations.
                </p>
            </div>

            {/* PAGE SETTINGS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Page Settings
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage hero section content and image.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Label
                            </label>

                            <input
                                type="text"
                                value={pageForm.label}
                                onChange={(e) =>
                                    setPageForm({
                                        ...pageForm,
                                        label: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                value={pageForm.title}
                                onChange={(e) =>
                                    setPageForm({
                                        ...pageForm,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Highlight
                            </label>

                            <input
                                type="text"
                                value={pageForm.highlight}
                                onChange={(e) =>
                                    setPageForm({
                                        ...pageForm,
                                        highlight: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                value={pageForm.description}
                                onChange={(e) =>
                                    setPageForm({
                                        ...pageForm,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={pageForm.status}
                                onChange={(e) =>
                                    setPageForm({
                                        ...pageForm,
                                        status: e.target.checked,
                                    })
                                }
                                className="h-4 w-4 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700">
                                Active
                            </span>
                        </label>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Hero Image
                        </label>

                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                            {heroFile ? (
                                <img
                                    src={URL.createObjectURL(heroFile)}
                                    alt="Hero Preview"
                                    className="h-72 w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={
                                        page.hero_image_url ||
                                        page.hero_image ||
                                        "/images/ship-new3.jpeg"
                                    }
                                    alt="Hero"
                                    className="h-72 w-full object-cover"
                                />
                            )}
                        </div>

                        <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                            <Upload className="h-4 w-4" />

                            <span>
                                {heroFile
                                    ? heroFile.name
                                    : "Choose Hero Image"}
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file =
                                        e.target.files?.[0] || null;

                                    setHeroFile(file);
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={() =>
                            savePageMutation.mutate()
                        }
                        disabled={savePageMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#041b46] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save className="h-4 w-4" />

                        {savePageMutation.isPending
                            ? "Saving..."
                            : "Save Page Settings"}
                    </button>
                </div>
            </section>

            {/* STATS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Overview Statistics
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage the four statistics shown below
                            the hero section.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setStatForm(emptyStat);
                            setEditingStatId(null);
                            setActiveForm("stat");
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#041b46]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Stat
                    </button>
                </div>

                {activeForm === "stat" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {editingStatId
                                    ? "Edit Statistic"
                                    : "Add Statistic"}
                            </h3>

                            <button
                                type="button"
                                onClick={cancelForm}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Value
                                </label>

                                <input
                                    type="text"
                                    value={statForm.value}
                                    onChange={(e) =>
                                        setStatForm({
                                            ...statForm,
                                            value: e.target.value,
                                        })
                                    }
                                    placeholder="09"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Label
                                </label>

                                <input
                                    type="text"
                                    value={statForm.label}
                                    onChange={(e) =>
                                        setStatForm({
                                            ...statForm,
                                            label: e.target.value,
                                        })
                                    }
                                    placeholder="Sister Concerns"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Icon
                                </label>

                                <select
                                    value={statForm.icon}
                                    onChange={(e) =>
                                        setStatForm({
                                            ...statForm,
                                            icon: e.target.value as IconName,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                >
                                    {iconOptions.map((icon) => (
                                        <option
                                            key={icon}
                                            value={icon}
                                        >
                                            {icon}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Sort Order
                                </label>

                                <input
                                    type="number"
                                    value={statForm.sort_order}
                                    onChange={(e) =>
                                        setStatForm({
                                            ...statForm,
                                            sort_order:
                                                Number(
                                                    e.target.value
                                                ),
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={statForm.status}
                                    onChange={(e) =>
                                        setStatForm({
                                            ...statForm,
                                            status: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4"
                                />

                                Active
                            </label>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={cancelForm}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        saveStatMutation.mutate()
                                    }
                                    disabled={
                                        saveStatMutation.isPending
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    <Save className="h-4 w-4" />

                                    {saveStatMutation.isPending
                                        ? "Saving..."
                                        : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left">
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Value
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Label
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Icon
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Order
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sectors.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
                                        No statistics found.
                                    </td>
                                </tr>
                            ) : (
                                sectors.map((item) => {
                                    const Icon =
                                        getIcon(item.icon);

                                    return (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-100"
                                        >
                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                {item.value}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {item.label}
                                            </td>

                                            <td className="px-6 py-4">
                                                <Icon className="h-5 w-5 text-[#06245a]" />
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {item.sort_order}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        item.status
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {item.status
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditStat(
                                                                item
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Are you sure you want to delete this statistic?"
                                                                )
                                                            ) {
                                                                deleteStatMutation.mutate(
                                                                    item.id!
                                                                );
                                                            }
                                                        }}
                                                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SISTER CONCERNS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sister Concerns
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage the company cards displayed on
                            the public page.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setConcernForm(emptyConcern);
                            setConcernFile(null);
                            setEditingConcernId(null);
                            setActiveForm("concern");
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#041b46]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Sister Concern
                    </button>
                </div>

                {activeForm === "concern" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {editingConcernId
                                    ? "Edit Sister Concern"
                                    : "Add Sister Concern"}
                            </h3>

                            <button
                                type="button"
                                onClick={cancelForm}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Title
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                concernForm.title
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    title: e.target
                                                        .value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Short Title
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                concernForm.short_title
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    short_title:
                                                        e.target
                                                            .value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                concernForm.category
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    category:
                                                        e.target
                                                            .value,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Number
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                concernForm.number
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    number: e.target
                                                        .value,
                                                })
                                            }
                                            placeholder="01"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Icon
                                        </label>

                                        <select
                                            value={
                                                concernForm.icon
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    icon: e.target
                                                        .value as IconName,
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        >
                                            {iconOptions.map(
                                                (icon) => (
                                                    <option
                                                        key={icon}
                                                        value={icon}
                                                    >
                                                        {icon}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Sort Order
                                        </label>

                                        <input
                                            type="number"
                                            value={
                                                concernForm.sort_order
                                            }
                                            onChange={(e) =>
                                                setConcernForm({
                                                    ...concernForm,
                                                    sort_order:
                                                        Number(
                                                            e.target
                                                                .value
                                                        ),
                                                })
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={
                                            concernForm.description
                                        }
                                        onChange={(e) =>
                                            setConcernForm({
                                                ...concernForm,
                                                description:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Company Image
                                </label>

                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                    {concernFile ? (
                                        <img
                                            src={URL.createObjectURL(
                                                concernFile
                                            )}
                                            alt="Preview"
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : concernForm.image_url ||
                                      concernForm.image ? (
                                        <img
                                            src={
                                                concernForm.image_url ||
                                                concernForm.image ||
                                                ""
                                            }
                                            alt={
                                                concernForm.title
                                            }
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-gray-100">
                                            <Building2 className="h-10 w-10 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <Upload className="h-4 w-4" />

                                    <span>
                                        {concernFile
                                            ? concernFile.name
                                            : "Choose Image"}
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] ||
                                                null;

                                            setConcernFile(file);
                                        }}
                                    />
                                </label>

                                <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={
                                            concernForm.status
                                        }
                                        onChange={(e) =>
                                            setConcernForm({
                                                ...concernForm,
                                                status: e.target
                                                    .checked,
                                            })
                                        }
                                        className="h-4 w-4"
                                    />

                                    Active
                                </label>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    saveConcernMutation.mutate()
                                }
                                disabled={
                                    saveConcernMutation.isPending
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />

                                {saveConcernMutation.isPending
                                    ? "Saving..."
                                    : "Save Concern"}
                            </button>
                        </div>
                    </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left">
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Image
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Company
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Category
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Number
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Order
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {concerns.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
                                        No sister concerns found.
                                    </td>
                                </tr>
                            ) : (
                                concerns.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-100"
                                    >
                                        <td className="px-6 py-4">
                                            {item.image_url ||
                                            item.image ? (
                                                <img
                                                    src={
                                                        item.image_url ||
                                                        item.image ||
                                                        ""
                                                    }
                                                    alt={
                                                        item.title
                                                    }
                                                    className="h-14 w-20 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-gray-100">
                                                    <Building2 className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">
                                                {item.title}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {
                                                    item.short_title
                                                }
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.category}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.number}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.sort_order}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    item.status
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {item.status
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startEditConcern(
                                                            item
                                                        )
                                                    }
                                                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                "Are you sure you want to delete this sister concern?"
                                                            )
                                                        ) {
                                                            deleteConcernMutation.mutate(
                                                                item.id!
                                                            );
                                                        }
                                                    }}
                                                    className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SISTER ORGANIZATIONS */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sister Organizations
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage the organizations shown in the
                            Sister Organizations section.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setOrganizationForm(
                                emptyOrganization
                            );
                            setEditingOrganizationId(null);
                            setActiveForm("organization");
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#041b46]"
                    >
                        <Plus className="h-4 w-4" />
                        Add Organization
                    </button>
                </div>

                {activeForm === "organization" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {editingOrganizationId
                                    ? "Edit Organization"
                                    : "Add Organization"}
                            </h3>

                            <button
                                type="button"
                                onClick={cancelForm}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Organization Name
                                </label>

                                <input
                                    type="text"
                                    value={
                                        organizationForm.name
                                    }
                                    onChange={(e) =>
                                        setOrganizationForm({
                                            ...organizationForm,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Function
                                </label>

                                <input
                                    type="text"
                                    value={
                                        organizationForm.function
                                    }
                                    onChange={(e) =>
                                        setOrganizationForm({
                                            ...organizationForm,
                                            function:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Icon
                                </label>

                                <select
                                    value={
                                        organizationForm.icon
                                    }
                                    onChange={(e) =>
                                        setOrganizationForm({
                                            ...organizationForm,
                                            icon: e.target
                                                .value as IconName,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                >
                                    {iconOptions.map((icon) => (
                                        <option
                                            key={icon}
                                            value={icon}
                                        >
                                            {icon}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Sort Order
                                </label>

                                <input
                                    type="number"
                                    value={
                                        organizationForm.sort_order
                                    }
                                    onChange={(e) =>
                                        setOrganizationForm({
                                            ...organizationForm,
                                            sort_order:
                                                Number(
                                                    e.target
                                                        .value
                                                ),
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                                />
                            </div>

                            <div className="flex items-end">
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={
                                            organizationForm.status
                                        }
                                        onChange={(e) =>
                                            setOrganizationForm({
                                                ...organizationForm,
                                                status: e.target
                                                    .checked,
                                            })
                                        }
                                        className="h-4 w-4"
                                    />

                                    Active
                                </label>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    saveOrganizationMutation.mutate()
                                }
                                disabled={
                                    saveOrganizationMutation.isPending
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />

                                {saveOrganizationMutation.isPending
                                    ? "Saving..."
                                    : "Save Organization"}
                            </button>
                        </div>
                    </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left">
                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Organization
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Function
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Icon
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Order
                                </th>

                                <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {organizations.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
                                        No organizations found.
                                    </td>
                                </tr>
                            ) : (
                                organizations.map((item) => {
                                    const Icon =
                                        getIcon(item.icon);

                                    return (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-100"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {item.function}
                                            </td>

                                            <td className="px-6 py-4">
                                                <Icon className="h-5 w-5 text-[#06245a]" />
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {item.sort_order}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        item.status
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {item.status
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEditOrganization(
                                                                item
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Are you sure you want to delete this organization?"
                                                                )
                                                            ) {
                                                                deleteOrganizationMutation.mutate(
                                                                    item.id!
                                                                );
                                                            }
                                                        }}
                                                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
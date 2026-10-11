"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Save,
    Upload,
    Ship,
    FileCheck,
    ShipWheel,
    PackageCheck,
    Anchor,
    Container,
    Globe2,
    Warehouse,
    ShipIcon,
    Settings,
    BarChart3,
    BriefcaseBusiness,
    Boxes,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "@/services/api";

type TabType = "page" | "stats" | "services" | "equipment";

interface PageData {
    id?: number;
    label: string;
    title: string;
    highlight: string;
    description: string;
    hero_image?: string | null;
    hero_image_url?: string | null;
    hero_bottom_label: string;
    contact_button_text: string;
    contact_button_url: string;
    about_button_text: string;
    about_button_url: string;

    services_section_label: string;
    services_section_title: string;
    services_section_description: string;

    expertise_label: string;
    expertise_title: string;
    expertise_description: string;

    resources_label: string;
    resources_title: string;
    resources_description: string;

    status: boolean;
}

interface StatData {
    id?: number;
    value: string;
    label: string;
    sort_order: number;
    status: boolean;
}

interface ServiceData {
    id?: number;
    number: string;
    title: string;
    description: string;
    icon: string;
    network_position: string;
    sort_order: number;
    status: boolean;
}

interface EquipmentData {
    id?: number;
    name: string;
    category: string;
    units: string;
    description: string;
    image?: string | null;
    image_url?: string | null;
    sort_order: number;
    status: boolean;
}

interface ServicesData {
    page: PageData | null;
    stats: StatData[];
    services: ServiceData[];
    equipments: EquipmentData[];
}

const iconOptions = [
    { name: "Ship", icon: Ship },
    { name: "FileCheck", icon: FileCheck },
    { name: "ShipWheel", icon: ShipWheel },
    { name: "PackageCheck", icon: PackageCheck },
    { name: "Anchor", icon: Anchor },
    { name: "Container", icon: Container },
    { name: "Globe2", icon: Globe2 },
    { name: "Warehouse", icon: Warehouse },
    { name: "ShipIcon", icon: ShipIcon },
];

const networkPositions = [
    {
        label: "Top Center",
        value: "top-0 left-1/2 -translate-x-1/2",
    },
    {
        label: "Right Top",
        value: "right-0 top-[16%]",
    },
    {
        label: "Right Middle",
        value: "right-0 top-[42%]",
    },
    {
        label: "Right Bottom",
        value: "right-4 bottom-[8%]",
    },
    {
        label: "Left Bottom",
        value: "left-0 bottom-[8%]",
    },
    {
        label: "Left Bottom Middle",
        value: "left-[10%] bottom-[27%]",
    },
    {
        label: "Left Top",
        value: "left-10 top-[16%]",
    },
    {
        label: "Left Middle",
        value: "left-0 top-[42%]",
    },
    {
        label: "Right Bottom Middle",
        value: "right-[18%] bottom-[27%]",
    },
];

const emptyPage: PageData = {
    label: "",
    title: "",
    highlight: "",
    description: "",
    hero_image: "",
    hero_image_url: "",
    hero_bottom_label: "",
    contact_button_text: "",
    contact_button_url: "",
    about_button_text: "",
    about_button_url: "",
    services_section_label: "",
    services_section_title: "",
    services_section_description: "",
    expertise_label: "",
    expertise_title: "",
    expertise_description: "",
    resources_label: "",
    resources_title: "",
    resources_description: "",
    status: true,
};

const emptyStat: StatData = {
    value: "",
    label: "",
    sort_order: 0,
    status: true,
};

const emptyService: ServiceData = {
    number: "",
    title: "",
    description: "",
    icon: "Ship",
    network_position: "top-0 left-1/2 -translate-x-1/2",
    sort_order: 0,
    status: true,
};

const emptyEquipment: EquipmentData = {
    name: "",
    category: "",
    units: "",
    description: "",
    image: "",
    image_url: "",
    sort_order: 0,
    status: true,
};

async function getServices(): Promise<ServicesData> {
    const response = await api.get("/website/admin/services");

    return response.data.data;
}

export default function ServicesAdminPage() {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["admin-services"],
        queryFn: getServices,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
    });

    const [activeTab, setActiveTab] = useState<TabType>("page");

    const [pageModal, setPageModal] = useState(false);
    const [statModal, setStatModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [equipmentModal, setEquipmentModal] = useState(false);

    const [pageForm, setPageForm] = useState<PageData>(emptyPage);
    const [statForm, setStatForm] = useState<StatData>(emptyStat);
    const [serviceForm, setServiceForm] =
        useState<ServiceData>(emptyService);
    const [equipmentForm, setEquipmentForm] =
        useState<EquipmentData>(emptyEquipment);

    const [pageImage, setPageImage] = useState<File | null>(null);
    const [equipmentImage, setEquipmentImage] =
        useState<File | null>(null);

    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (data?.page) {
            setPageForm(data.page);
        }
    }, [data]);

    const refreshData = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["admin-services"],
        });
    };

    const openPageModal = () => {
        setPageForm(data?.page || emptyPage);
        setPageImage(null);
        setPageModal(true);
    };

    const openCreateStat = () => {
        setStatForm({
            ...emptyStat,
            sort_order: (data?.stats?.length || 0) + 1,
        });

        setStatModal(true);
    };

    const openEditStat = (item: StatData) => {
        setStatForm(item);
        setStatModal(true);
    };

    const openCreateService = () => {
        setServiceForm({
            ...emptyService,
            number: String((data?.services?.length || 0) + 1).padStart(
                2,
                "0"
            ),
            sort_order: (data?.services?.length || 0) + 1,
        });

        setServiceModal(true);
    };

    const openEditService = (item: ServiceData) => {
        setServiceForm(item);
        setServiceModal(true);
    };

    const openCreateEquipment = () => {
        setEquipmentForm({
            ...emptyEquipment,
            sort_order: (data?.equipments?.length || 0) + 1,
        });

        setEquipmentImage(null);
        setEquipmentModal(true);
    };

    const openEditEquipment = (item: EquipmentData) => {
        setEquipmentForm(item);
        setEquipmentImage(null);
        setEquipmentModal(true);
    };

    const savePage = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("label", pageForm.label);
            formData.append("title", pageForm.title);
            formData.append("highlight", pageForm.highlight);
            formData.append("description", pageForm.description);

            formData.append(
                "hero_bottom_label",
                pageForm.hero_bottom_label
            );

            formData.append(
                "contact_button_text",
                pageForm.contact_button_text
            );

            formData.append(
                "contact_button_url",
                pageForm.contact_button_url
            );

            formData.append(
                "about_button_text",
                pageForm.about_button_text
            );

            formData.append(
                "about_button_url",
                pageForm.about_button_url
            );

            formData.append(
                "services_section_label",
                pageForm.services_section_label
            );

            formData.append(
                "services_section_title",
                pageForm.services_section_title
            );

            formData.append(
                "services_section_description",
                pageForm.services_section_description
            );

            formData.append(
                "expertise_label",
                pageForm.expertise_label
            );

            formData.append(
                "expertise_title",
                pageForm.expertise_title
            );

            formData.append(
                "expertise_description",
                pageForm.expertise_description
            );

            formData.append(
                "resources_label",
                pageForm.resources_label
            );

            formData.append(
                "resources_title",
                pageForm.resources_title
            );

            formData.append(
                "resources_description",
                pageForm.resources_description
            );

            formData.append(
                "status",
                pageForm.status ? "1" : "0"
            );

            if (pageImage) {
                formData.append("hero_image", pageImage);
            }

            await api.post(
                "/website/admin/services/page",
                formData
            );

            setPageModal(false);
            setPageImage(null);

            await refreshData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to update page settings."
            );
        } finally {
            setSaving(false);
        }
    };

    const saveStat = async () => {
        try {
            setSaving(true);

            const payload = {
                value: statForm.value,
                label: statForm.label,
                sort_order: Number(statForm.sort_order),
                status: statForm.status,
            };

            if (statForm.id) {
                await api.post(
                    `/website/admin/services/stats/${statForm.id}/update`,
                    payload
                );
            } else {
                await api.post(
                    "/website/admin/services/stats",
                    payload
                );
            }

            setStatModal(false);
            setStatForm(emptyStat);

            await refreshData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save stat."
            );
        } finally {
            setSaving(false);
        }
    };

    const saveService = async () => {
        try {
            setSaving(true);

            const payload = {
                number: serviceForm.number,
                title: serviceForm.title,
                description: serviceForm.description,
                icon: serviceForm.icon,
                network_position: serviceForm.network_position,
                sort_order: Number(serviceForm.sort_order),
                status: serviceForm.status,
            };

            if (serviceForm.id) {
                await api.post(
                    `/website/admin/services/services/${serviceForm.id}/update`,
                    payload
                );
            } else {
                await api.post(
                    "/website/admin/services/services",
                    payload
                );
            }

            setServiceModal(false);
            setServiceForm(emptyService);

            await refreshData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save service."
            );
        } finally {
            setSaving(false);
        }
    };

    const saveEquipment = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("name", equipmentForm.name);
            formData.append("category", equipmentForm.category);
            formData.append("units", equipmentForm.units);
            formData.append(
                "description",
                equipmentForm.description
            );

            formData.append(
                "sort_order",
                String(equipmentForm.sort_order)
            );

            formData.append(
                "status",
                equipmentForm.status ? "1" : "0"
            );

            if (equipmentImage) {
                formData.append("image", equipmentImage);
            }

            if (equipmentForm.id) {
                await api.post(
                    `/website/admin/services/equipments/${equipmentForm.id}/update`,
                    formData
                );
            } else {
                await api.post(
                    "/website/admin/services/equipments",
                    formData
                );
            }

            setEquipmentModal(false);
            setEquipmentForm(emptyEquipment);
            setEquipmentImage(null);

            await refreshData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save equipment."
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteItem = async (
        type: "stats" | "services" | "equipments",
        id?: number
    ) => {
        if (!id) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            await api.delete(
                `/website/admin/services/${type}/${id}`
            );

            await refreshData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to delete item."
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="text-sm font-medium text-slate-500">
                    Loading services...
                </div>
            </div>
        );
    }

    const page = data?.page;
    const stats = data?.stats || [];
    const services = data?.services || [];
    const equipments = data?.equipments || [];

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* HEADER */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Services
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage services, statistics and
                            equipment displayed on the website.
                        </p>
                    </div>

                    {isFetching && !isLoading && (
                        <div className="text-xs font-medium text-slate-400">
                            Updating...
                        </div>
                    )}
                </div>

                {/* TABS */}
                <div className="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <div className="flex min-w-max">
                        <button
                            onClick={() => setActiveTab("page")}
                            className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-semibold transition ${
                                activeTab === "page"
                                    ? "border-blue-700 text-blue-700"
                                    : "border-transparent text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <Settings size={17} />
                            Page Settings
                        </button>

                        <button
                            onClick={() => setActiveTab("stats")}
                            className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-semibold transition ${
                                activeTab === "stats"
                                    ? "border-blue-700 text-blue-700"
                                    : "border-transparent text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <BarChart3 size={17} />
                            Statistics
                        </button>

                        <button
                            onClick={() => setActiveTab("services")}
                            className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-semibold transition ${
                                activeTab === "services"
                                    ? "border-blue-700 text-blue-700"
                                    : "border-transparent text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <BriefcaseBusiness size={17} />
                            Services
                        </button>

                        <button
                            onClick={() => setActiveTab("equipment")}
                            className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-semibold transition ${
                                activeTab === "equipment"
                                    ? "border-blue-700 text-blue-700"
                                    : "border-transparent text-slate-500 hover:text-slate-900"
                            }`}
                        >
                            <Boxes size={17} />
                            Equipment
                        </button>
                    </div>
                </div>

                {/* PAGE SETTINGS */}
                {activeTab === "page" && (
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Page Content
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage hero and section content.
                                </p>
                            </div>

                            <button
                                onClick={openPageModal}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
                            >
                                <Pencil size={16} />
                                Edit Page
                            </button>
                        </div>

                        {page ? (
                            <div className="grid gap-6 p-6 lg:grid-cols-2">
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    {page.hero_image_url ? (
                                        <img
                                            src={page.hero_image_url}
                                            alt={page.title}
                                            className="h-64 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-64 items-center justify-center bg-slate-100 text-sm text-slate-400">
                                            No Hero Image
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                            {page.label}
                                        </div>

                                        <h3 className="mt-2 text-2xl font-bold text-slate-900">
                                            {page.title}{" "}
                                            <span className="text-blue-700">
                                                {page.highlight}
                                            </span>
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                            {page.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <InfoCard
                                        title="Services Section"
                                        value={
                                            page.services_section_title
                                        }
                                        description={
                                            page.services_section_description
                                        }
                                    />

                                    <InfoCard
                                        title="Expertise Section"
                                        value={page.expertise_title}
                                        description={
                                            page.expertise_description
                                        }
                                    />

                                    <InfoCard
                                        title="Resources Section"
                                        value={page.resources_title}
                                        description={
                                            page.resources_description
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="p-10 text-center">
                                <p className="text-sm text-slate-500">
                                    No page settings found.
                                </p>

                                <button
                                    onClick={openPageModal}
                                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white"
                                >
                                    <Plus size={16} />
                                    Create Page
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* STATS */}
                {activeTab === "stats" && (
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <SectionHeader
                            title="Statistics"
                            description="Manage the four statistics shown below the hero section."
                            buttonText="Add Statistic"
                            onClick={openCreateStat}
                        />

                        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-slate-200 bg-white p-5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-3xl font-bold text-[#06245a]">
                                                {item.value}
                                            </div>

                                            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                {item.label}
                                            </div>
                                        </div>

                                        <div
                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                                item.status
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                            }`}
                                        >
                                            {item.status
                                                ? "Active"
                                                : "Inactive"}
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                                        <button
                                            onClick={() =>
                                                openEditStat(item)
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                        >
                                            <Pencil size={14} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteItem(
                                                    "stats",
                                                    item.id
                                                )
                                            }
                                            disabled={
                                                deletingId === item.id
                                            }
                                            className="flex items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SERVICES */}
                {activeTab === "services" && (
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <SectionHeader
                            title="ervices"
                            description="Manage services displayed on the public services page."
                            buttonText="Add Service"
                            onClick={openCreateService}
                        />

                        <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((item) => {
                                const IconComponent =
                                    iconOptions.find(
                                        (icon) =>
                                            icon.name === item.icon
                                    )?.icon || Ship;

                                return (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-slate-200 bg-white p-5"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                                <IconComponent
                                                    size={19}
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold tracking-widest text-slate-300">
                                                    {item.number}
                                                </span>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                                        item.status
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
                                                    }`}
                                                >
                                                    {item.status
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="mt-4 text-base font-bold text-[#06245a]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {item.description}
                                        </p>

                                        <div className="mt-4 rounded-lg bg-slate-50 p-3">
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Network Position
                                            </div>

                                            <div className="mt-1 break-all text-xs text-slate-600">
                                                {item.network_position}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                                            <button
                                                onClick={() =>
                                                    openEditService(
                                                        item
                                                    )
                                                }
                                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteItem(
                                                        "services",
                                                        item.id
                                                    )
                                                }
                                                disabled={
                                                    deletingId === item.id
                                                }
                                                className="flex items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* EQUIPMENT */}
                {activeTab === "equipment" && (
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <SectionHeader
                            title="Equipment & Machinery"
                            description="Manage equipment and machinery displayed on the website."
                            buttonText="Add Equipment"
                            onClick={openCreateEquipment}
                        />

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Equipment
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Units
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {equipments.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-slate-100 last:border-0"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100">
                                                        {item.image_url ? (
                                                            <img
                                                                src={
                                                                    item.image_url
                                                                }
                                                                alt={
                                                                    item.name
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center">
                                                                <Boxes
                                                                    size={
                                                                        20
                                                                    }
                                                                    className="text-slate-300"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="font-semibold text-slate-900">
                                                            {item.name}
                                                        </div>

                                                        <div className="mt-1 max-w-md text-xs text-slate-500">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {item.category}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                {item.units || "-"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                                        item.status
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
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
                                                        onClick={() =>
                                                            openEditEquipment(
                                                                item
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                                                    >
                                                        <Pencil
                                                            size={15}
                                                        />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteItem(
                                                                "equipments",
                                                                item.id
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            item.id
                                                        }
                                                        className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        <Trash2
                                                            size={15}
                                                        />
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
            </div>

            {/* PAGE MODAL */}
            {pageModal && (
                <Modal
                    title="Edit Services Page"
                    onClose={() => setPageModal(false)}
                    size="xl"
                >
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-4 text-sm font-bold text-slate-900">
                                Hero Section
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Label"
                                    value={pageForm.label}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            label: value,
                                        })
                                    }
                                />

                                <Input
                                    label="Title"
                                    value={pageForm.title}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            title: value,
                                        })
                                    }
                                />

                                <Input
                                    label="Highlight"
                                    value={pageForm.highlight}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            highlight: value,
                                        })
                                    }
                                />

                                <Input
                                    label="Hero Bottom Label"
                                    value={
                                        pageForm.hero_bottom_label
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            hero_bottom_label: value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mt-4">
                                <Textarea
                                    label="Hero Description"
                                    value={pageForm.description}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            description: value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mt-4">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Hero Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setPageImage(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                                />

                                {pageForm.hero_image_url && (
                                    <img
                                        src={
                                            pageForm.hero_image_url
                                        }
                                        alt="Hero"
                                        className="mt-3 h-32 w-56 rounded-lg object-cover"
                                    />
                                )}
                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Contact Button Text"
                                    value={
                                        pageForm.contact_button_text
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            contact_button_text:
                                                value,
                                        })
                                    }
                                />

                                <Input
                                    label="Contact Button URL"
                                    value={
                                        pageForm.contact_button_url
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            contact_button_url:
                                                value,
                                        })
                                    }
                                />

                                <Input
                                    label="About Button Text"
                                    value={
                                        pageForm.about_button_text
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            about_button_text: value,
                                        })
                                    }
                                />

                                <Input
                                    label="About Button URL"
                                    value={
                                        pageForm.about_button_url
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            about_button_url: value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="mb-4 text-sm font-bold text-slate-900">
                                Services Section
                            </h3>

                            <div className="space-y-4">
                                <Input
                                    label="Section Label"
                                    value={
                                        pageForm.services_section_label
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            services_section_label:
                                                value,
                                        })
                                    }
                                />

                                <Input
                                    label="Section Title"
                                    value={
                                        pageForm.services_section_title
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            services_section_title:
                                                value,
                                        })
                                    }
                                />

                                <Textarea
                                    label="Section Description"
                                    value={
                                        pageForm.services_section_description
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            services_section_description:
                                                value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="mb-4 text-sm font-bold text-slate-900">
                                Expertise Section
                            </h3>

                            <div className="space-y-4">
                                <Input
                                    label="Section Label"
                                    value={pageForm.expertise_label}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            expertise_label: value,
                                        })
                                    }
                                />

                                <Input
                                    label="Section Title"
                                    value={pageForm.expertise_title}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            expertise_title: value,
                                        })
                                    }
                                />

                                <Textarea
                                    label="Section Description"
                                    value={
                                        pageForm.expertise_description
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            expertise_description:
                                                value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="mb-4 text-sm font-bold text-slate-900">
                                Resources Section
                            </h3>

                            <div className="space-y-4">
                                <Input
                                    label="Section Label"
                                    value={pageForm.resources_label}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            resources_label: value,
                                        })
                                    }
                                />

                                <Input
                                    label="Section Title"
                                    value={pageForm.resources_title}
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            resources_title: value,
                                        })
                                    }
                                />

                                <Textarea
                                    label="Section Description"
                                    value={
                                        pageForm.resources_description
                                    }
                                    onChange={(value) =>
                                        setPageForm({
                                            ...pageForm,
                                            resources_description:
                                                value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <StatusSwitch
                            checked={pageForm.status}
                            onChange={(value) =>
                                setPageForm({
                                    ...pageForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            saving={saving}
                            onCancel={() => setPageModal(false)}
                            onSave={savePage}
                        />
                    </div>
                </Modal>
            )}

            {/* STAT MODAL */}
            {statModal && (
                <Modal
                    title={
                        statForm.id
                            ? "Update Statistic"
                            : "Create Statistic"
                    }
                    onClose={() => setStatModal(false)}
                >
                    <div className="space-y-4">
                        <Input
                            label="Value"
                            value={statForm.value}
                            placeholder="24/7"
                            onChange={(value) =>
                                setStatForm({
                                    ...statForm,
                                    value,
                                })
                            }
                        />

                        <Input
                            label="Label"
                            value={statForm.label}
                            placeholder="Operational Support"
                            onChange={(value) =>
                                setStatForm({
                                    ...statForm,
                                    label: value,
                                })
                            }
                        />

                        <Input
                            label="Sort Order"
                            type="number"
                            value={String(statForm.sort_order)}
                            onChange={(value) =>
                                setStatForm({
                                    ...statForm,
                                    sort_order: Number(value),
                                })
                            }
                        />

                        <StatusSwitch
                            checked={statForm.status}
                            onChange={(value) =>
                                setStatForm({
                                    ...statForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            saving={saving}
                            onCancel={() => setStatModal(false)}
                            onSave={saveStat}
                        />
                    </div>
                </Modal>
            )}

            {/* SERVICE MODAL */}
            {serviceModal && (
                <Modal
                    title={
                        serviceForm.id
                            ? "Update Service"
                            : "Create Service"
                    }
                    onClose={() => setServiceModal(false)}
                    size="lg"
                >
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input
                                label="Number"
                                value={serviceForm.number}
                                placeholder="01"
                                onChange={(value) =>
                                    setServiceForm({
                                        ...serviceForm,
                                        number: value,
                                    })
                                }
                            />

                            <Input
                                label="Title"
                                value={serviceForm.title}
                                placeholder="Shipping Agency"
                                onChange={(value) =>
                                    setServiceForm({
                                        ...serviceForm,
                                        title: value,
                                    })
                                }
                            />
                        </div>

                        <Textarea
                            label="Description"
                            value={serviceForm.description}
                            onChange={(value) =>
                                setServiceForm({
                                    ...serviceForm,
                                    description: value,
                                })
                            }
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                            <Select
                                label="Icon"
                                value={serviceForm.icon}
                                options={iconOptions.map((item) => ({
                                    label: item.name,
                                    value: item.name,
                                }))}
                                onChange={(value) =>
                                    setServiceForm({
                                        ...serviceForm,
                                        icon: value,
                                    })
                                }
                            />

                            <Input
                                label="Sort Order"
                                type="number"
                                value={String(
                                    serviceForm.sort_order
                                )}
                                onChange={(value) =>
                                    setServiceForm({
                                        ...serviceForm,
                                        sort_order: Number(value),
                                    })
                                }
                            />
                        </div>

                        <Select
                            label="Network Position"
                            value={serviceForm.network_position}
                            options={networkPositions.map((item) => ({
                                label: item.label,
                                value: item.value,
                            }))}
                            onChange={(value) =>
                                setServiceForm({
                                    ...serviceForm,
                                    network_position: value,
                                })
                            }
                        />

                        <StatusSwitch
                            checked={serviceForm.status}
                            onChange={(value) =>
                                setServiceForm({
                                    ...serviceForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            saving={saving}
                            onCancel={() =>
                                setServiceModal(false)
                            }
                            onSave={saveService}
                        />
                    </div>
                </Modal>
            )}

            {/* EQUIPMENT MODAL */}
            {equipmentModal && (
                <Modal
                    title={
                        equipmentForm.id
                            ? "Update Equipment"
                            : "Create Equipment"
                    }
                    onClose={() => setEquipmentModal(false)}
                    size="lg"
                >
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input
                                label="Equipment Name"
                                value={equipmentForm.name}
                                onChange={(value) =>
                                    setEquipmentForm({
                                        ...equipmentForm,
                                        name: value,
                                    })
                                }
                            />

                            <Input
                                label="Category"
                                value={equipmentForm.category}
                                onChange={(value) =>
                                    setEquipmentForm({
                                        ...equipmentForm,
                                        category: value,
                                    })
                                }
                            />

                            <Input
                                label="Units"
                                value={equipmentForm.units}
                                placeholder="31"
                                onChange={(value) =>
                                    setEquipmentForm({
                                        ...equipmentForm,
                                        units: value,
                                    })
                                }
                            />

                            <Input
                                label="Sort Order"
                                type="number"
                                value={String(
                                    equipmentForm.sort_order
                                )}
                                onChange={(value) =>
                                    setEquipmentForm({
                                        ...equipmentForm,
                                        sort_order: Number(value),
                                    })
                                }
                            />
                        </div>

                        <Textarea
                            label="Description"
                            value={equipmentForm.description}
                            onChange={(value) =>
                                setEquipmentForm({
                                    ...equipmentForm,
                                    description: value,
                                })
                            }
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Equipment Image
                            </label>

                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                                        <Upload size={18} />
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold text-slate-700">
                                            Upload Image
                                        </div>

                                        <div className="text-xs text-slate-400">
                                            JPG, PNG or WEBP
                                        </div>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEquipmentImage(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="mt-4 block w-full text-sm"
                                />

                                {equipmentForm.image_url && (
                                    <img
                                        src={
                                            equipmentForm.image_url
                                        }
                                        alt={
                                            equipmentForm.name
                                        }
                                        className="mt-4 h-36 w-56 rounded-lg object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        <StatusSwitch
                            checked={equipmentForm.status}
                            onChange={(value) =>
                                setEquipmentForm({
                                    ...equipmentForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            saving={saving}
                            onCancel={() =>
                                setEquipmentModal(false)
                            }
                            onSave={saveEquipment}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

function SectionHeader({
    title,
    description,
    buttonText,
    onClick,
}: {
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}) {
    return (
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center">
            <div>
                <h2 className="text-lg font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

            <button
                onClick={onClick}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
                <Plus size={16} />
                {buttonText}
            </button>
        </div>
    );
}

function InfoCard({
    title,
    value,
    description,
}: {
    title: string;
    value: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {title}
            </div>

            <div className="mt-2 text-base font-bold text-slate-900">
                {value}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}

function Textarea({
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
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <textarea
                value={value}
                rows={4}
                onChange={(e) => onChange(e.target.value)}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}

function Select({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function StatusSwitch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
                <div className="text-sm font-semibold text-slate-700">
                    Status
                </div>

                <div className="text-xs text-slate-400">
                    {checked ? "Visible on website" : "Hidden from website"}
                </div>
            </div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 rounded-full transition ${
                    checked ? "bg-blue-700" : "bg-slate-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        checked ? "left-6" : "left-1"
                    }`}
                />
            </button>
        </div>
    );
}

function Modal({
    title,
    children,
    onClose,
    size = "md",
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    size?: "md" | "lg" | "xl";
}) {
    const width =
        size === "xl"
            ? "max-w-5xl"
            : size === "lg"
            ? "max-w-3xl"
            : "max-w-lg";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div
                className={`w-full ${width} max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl`}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="max-h-[calc(90vh-73px)] overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalFooter({
    saving,
    onCancel,
    onSave,
}: {
    saving: boolean;
    onCancel: () => void;
    onSave: () => void;
}) {
    return (
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
                Cancel
            </button>

            <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />

                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}
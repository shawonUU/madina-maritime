"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    Upload,
    X,
    Handshake,
    Globe2,
    Ship,
    Star,
    Image as ImageIcon,
    Settings,
    BarChart3,
    Building2,
    Search,
    RefreshCw,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import SideNav from "@/components/admin/SideNav";
import TopNav from "@/components/admin/TopNav";
import api from "@/services/api";

interface PageData {
    id?: number;
    label: string;
    title: string;
    highlight: string;
    description: string;
    hero_image?: string | null;
    hero_image_url?: string | null;
    explore_button_text: string;
    explore_button_url: string;
    partner_button_text: string;
    partner_button_url: string;
    status: boolean;
}

interface Stat {
    id: number;
    value: string;
    label: string;
    icon: string | null;
    sort_order: number;
    status: boolean;
}

interface Partner {
    id: number;
    name: string;
    category: string;
    logo?: string | null;
    logo_url?: string | null;
    description: string | null;
    sort_order: number;
    status: boolean;
}

interface VendorPartnerData {
    page: PageData | null;
    stats: Stat[];
    partners: Partner[];
}

const defaultPage: PageData = {
    label: "Vendors & Partners",
    title: "Strong partnerships.",
    highlight: "Reliable operations.",
    description:
        "We work with trusted vendors, suppliers and service partners who help us deliver safe, reliable and efficient maritime operations across Bangladesh.",
    hero_image: "",
    explore_button_text: "Explore Partners",
    explore_button_url: "#partners",
    partner_button_text: "Become a Partner",
    partner_button_url: "/contact",
    status: true,
};

const defaultStat = {
    value: "",
    label: "",
    icon: "Handshake",
    sort_order: 0,
    status: true,
};

const defaultPartner = {
    name: "",
    category: "Mother Vessel",
    description: "",
    sort_order: 0,
    status: true,
};

const iconOptions = [
    { value: "Handshake", label: "Handshake" },
    { value: "Globe2", label: "Globe" },
    { value: "Ship", label: "Ship" },
    { value: "Star", label: "Star" },
];

const iconMap = {
    Handshake,
    Globe2,
    Ship,
    Star,
};

const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-semibold text-slate-700";

export default function VendorsAndPartnersAdminPage() {
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState<
        "page" | "stats" | "partners"
    >("page");

    const [openSidebar, setOpenSidebar] = useState(false);

    const [pageModalOpen, setPageModalOpen] = useState(false);
    const [statModalOpen, setStatModalOpen] = useState(false);
    const [partnerModalOpen, setPartnerModalOpen] = useState(false);

    const [editingStat, setEditingStat] = useState<Stat | null>(null);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(
        null
    );

    const [pageForm, setPageForm] = useState<PageData>(defaultPage);
    const [pageImage, setPageImage] = useState<File | null>(null);
    const [pageImagePreview, setPageImagePreview] = useState<string | null>(
        null
    );

    const [statForm, setStatForm] = useState(defaultStat);

    const [partnerForm, setPartnerForm] = useState(defaultPartner);
    const [partnerLogo, setPartnerLogo] = useState<File | null>(null);
    const [partnerLogoPreview, setPartnerLogoPreview] = useState<
        string | null
    >(null);

    const [search, setSearch] = useState("");

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["admin-vendors-partners"],
        queryFn: async () => {
            const response = await api.get(
                "/website/admin/vendors-partners"
            );

            return response.data.data as VendorPartnerData;
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
    });

    const page = data?.page;
    const stats = data?.stats || [];
    const partners = data?.partners || [];

    useEffect(() => {
        if (!pageModalOpen) {
            setPageImage(null);
            setPageImagePreview(null);
        }
    }, [pageModalOpen]);

    useEffect(() => {
        if (!partnerModalOpen) {
            setPartnerLogo(null);
            setPartnerLogoPreview(null);
        }
    }, [partnerModalOpen]);

    const refreshData = async () => {
        await Promise.all([
            queryClient.invalidateQueries({
                queryKey: ["admin-vendors-partners"],
            }),
            queryClient.invalidateQueries({
                queryKey: ["vendors-partners"],
            }),
        ]);
    };

    const pageMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return api.post(
                "/website/admin/vendors-partners/page/update",
                formData
            );
        },
        onSuccess: async () => {
            await refreshData();
            setPageModalOpen(false);
            alert("Page settings updated successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to update page settings."
            );
        },
    });

    const statMutation = useMutation({
        mutationFn: async (payload: {
            id?: number;
            data: typeof defaultStat;
        }) => {
            if (payload.id) {
                return api.post(
                    `/website/admin/vendors-partners/stats/${payload.id}/update`,
                    payload.data
                );
            }

            return api.post(
                "/website/admin/vendors-partners/stats",
                payload.data
            );
        },
        onSuccess: async () => {
            await refreshData();
            setStatModalOpen(false);
            setEditingStat(null);
            setStatForm(defaultStat);
            alert("Statistic saved successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save statistic."
            );
        },
    });

    const deleteStatMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/website/admin/vendors-partners/stats/${id}`);
        },
        onSuccess: async () => {
            await refreshData();
            alert("Statistic deleted successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to delete statistic."
            );
        },
    });

    const partnerMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const id = formData.get("id");

            formData.delete("id");

            if (id) {
                return api.post(
                    `/website/admin/vendors-partners/${id}/update`,
                    formData
                );
            }

            return api.post("/website/admin/vendors-partners", formData);
        },
        onSuccess: async () => {
            await refreshData();
            setPartnerModalOpen(false);
            setEditingPartner(null);
            setPartnerForm(defaultPartner);
            setPartnerLogo(null);
            setPartnerLogoPreview(null);
            alert("Vendor/Partner saved successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to save vendor/partner."
            );
        },
    });

    const deletePartnerMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/website/admin/vendors-partners/${id}`);
        },
        onSuccess: async () => {
            await refreshData();
            alert("Vendor/Partner deleted successfully.");
        },
        onError: (error: any) => {
            alert(
                error?.response?.data?.message ||
                    "Failed to delete vendor/partner."
            );
        },
    });

    const openPageModal = () => {
        setPageForm({
            ...defaultPage,
            ...page,
        });

        setPageImage(null);
        setPageImagePreview(page?.hero_image_url || page?.hero_image || null);
        setPageModalOpen(true);
    };

    const openCreateStatModal = () => {
        setEditingStat(null);

        setStatForm({
            ...defaultStat,
            sort_order: stats.length + 1,
        });

        setStatModalOpen(true);
    };

    const openEditStatModal = (stat: Stat) => {
        setEditingStat(stat);

        setStatForm({
            value: stat.value,
            label: stat.label,
            icon: stat.icon || "Handshake",
            sort_order: stat.sort_order,
            status: Boolean(stat.status),
        });

        setStatModalOpen(true);
    };

    const openCreatePartnerModal = () => {
        setEditingPartner(null);

        setPartnerForm({
            ...defaultPartner,
            sort_order: partners.length + 1,
        });

        setPartnerLogo(null);
        setPartnerLogoPreview(null);
        setPartnerModalOpen(true);
    };

    const openEditPartnerModal = (partner: Partner) => {
        setEditingPartner(partner);

        setPartnerForm({
            name: partner.name,
            category: partner.category,
            description: partner.description || "",
            sort_order: partner.sort_order,
            status: Boolean(partner.status),
        });

        setPartnerLogo(null);
        setPartnerLogoPreview(partner.logo_url || partner.logo || null);
        setPartnerModalOpen(true);
    };

    const handlePageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("label", pageForm.label || "");
        formData.append("title", pageForm.title || "");
        formData.append("highlight", pageForm.highlight || "");
        formData.append("description", pageForm.description || "");
        formData.append(
            "explore_button_text",
            pageForm.explore_button_text || ""
        );
        formData.append(
            "explore_button_url",
            pageForm.explore_button_url || ""
        );
        formData.append(
            "partner_button_text",
            pageForm.partner_button_text || ""
        );
        formData.append(
            "partner_button_url",
            pageForm.partner_button_url || ""
        );
        formData.append("status", pageForm.status ? "1" : "0");

        if (pageImage) {
            formData.append("hero_image", pageImage);
        }

        pageMutation.mutate(formData);
    };

    const handleStatSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        statMutation.mutate({
            id: editingStat?.id,
            data: {
                ...statForm,
                sort_order: Number(statForm.sort_order) || 0,
                status: Boolean(statForm.status),
            },
        });
    };

    const handlePartnerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();

        if (editingPartner) {
            formData.append("id", String(editingPartner.id));
        }

        formData.append("name", partnerForm.name);
        formData.append("category", partnerForm.category);
        formData.append("description", partnerForm.description || "");
        formData.append("sort_order", String(partnerForm.sort_order || 0));
        formData.append("status", partnerForm.status ? "1" : "0");

        if (partnerLogo) {
            formData.append("logo", partnerLogo);
        }

        partnerMutation.mutate(formData);
    };

    const filteredPartners = partners.filter((partner) => {
        const term = search.toLowerCase();

        return (
            partner.name.toLowerCase().includes(term) ||
            partner.category.toLowerCase().includes(term)
        );
    });

    const isSaving =
        pageMutation.isPending ||
        statMutation.isPending ||
        partnerMutation.isPending;

    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            {openSidebar && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setOpenSidebar(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}


            <div className="min-h-screen">


                <main className="">
                    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                Vendors & Partners
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Manage the public vendors and partners page.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={isFetching ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                        <TabButton
                            active={activeTab === "page"}
                            onClick={() => setActiveTab("page")}
                            icon={<Settings size={17} />}
                        >
                            Page Settings
                        </TabButton>

                        <TabButton
                            active={activeTab === "stats"}
                            onClick={() => setActiveTab("stats")}
                            icon={<BarChart3 size={17} />}
                        >
                            Statistics
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                                {stats.length}
                            </span>
                        </TabButton>

                        <TabButton
                            active={activeTab === "partners"}
                            onClick={() => setActiveTab("partners")}
                            icon={<Handshake size={17} />}
                        >
                            Vendors & Partners
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                                {partners.length}
                            </span>
                        </TabButton>
                    </div>

                    {isLoading ? (
                        <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />
                        </div>
                    ) : isError ? (
                        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
                            <p className="font-semibold text-red-600">
                                Failed to load vendors and partners data.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                {(error as any)?.response?.data?.message ||
                                    (error as Error)?.message ||
                                    "Please check the API and try again."}
                            </p>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="mt-4 rounded-xl bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {activeTab === "page" && (
                                <section className="space-y-6">
                                    <SectionHeader
                                        title="Page Settings"
                                        description="Manage the hero content and action buttons displayed on the public page."
                                        action={
                                            <button
                                                type="button"
                                                onClick={openPageModal}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
                                            >
                                                <Pencil size={16} />
                                                Edit Settings
                                            </button>
                                        }
                                    />

                                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                                        <InfoCard>
                                            <div className="mb-5 flex items-center justify-between">
                                                <h3 className="font-bold text-slate-800">
                                                    Hero Content
                                                </h3>

                                                <StatusBadge
                                                    active={page?.status ?? true}
                                                />
                                            </div>

                                            <div className="space-y-5">
                                                <PreviewField
                                                    label="Label"
                                                    value={
                                                        page?.label ||
                                                        defaultPage.label
                                                    }
                                                />

                                                <PreviewField
                                                    label="Title"
                                                    value={
                                                        page?.title ||
                                                        defaultPage.title
                                                    }
                                                />

                                                <PreviewField
                                                    label="Highlight"
                                                    value={
                                                        page?.highlight ||
                                                        defaultPage.highlight
                                                    }
                                                />

                                                <PreviewField
                                                    label="Description"
                                                    value={
                                                        page?.description ||
                                                        defaultPage.description
                                                    }
                                                />
                                            </div>
                                        </InfoCard>

                                        <InfoCard>
                                            <h3 className="mb-5 font-bold text-slate-800">
                                                Hero Image
                                            </h3>

                                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                                {page?.hero_image_url ||
                                                page?.hero_image ? (
                                                    <img
                                                        src={
                                                            page.hero_image_url ||
                                                            page.hero_image ||
                                                            ""
                                                        }
                                                        alt="Hero preview"
                                                        className="h-64 w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-64 flex-col items-center justify-center gap-3 text-slate-400">
                                                        <ImageIcon size={40} />
                                                        <span className="text-sm">
                                                            Default hero image
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                                <PreviewField
                                                    label="Explore Button"
                                                    value={
                                                        page?.explore_button_text ||
                                                        "Explore Partners"
                                                    }
                                                />

                                                <PreviewField
                                                    label="Explore URL"
                                                    value={
                                                        page?.explore_button_url ||
                                                        "#partners"
                                                    }
                                                />

                                                <PreviewField
                                                    label="Partner Button"
                                                    value={
                                                        page?.partner_button_text ||
                                                        "Become a Partner"
                                                    }
                                                />

                                                <PreviewField
                                                    label="Partner URL"
                                                    value={
                                                        page?.partner_button_url ||
                                                        "/contact"
                                                    }
                                                />
                                            </div>
                                        </InfoCard>
                                    </div>
                                </section>
                            )}

                            {activeTab === "stats" && (
                                <section>
                                    <SectionHeader
                                        title="Statistics"
                                        description="Create and manage the statistic cards shown below the hero section."
                                        action={
                                            <button
                                                type="button"
                                                onClick={openCreateStatModal}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
                                            >
                                                <Plus size={17} />
                                                Add Statistic
                                            </button>
                                        }
                                    />

                                    {stats.length === 0 ? (
                                        <EmptyState
                                            title="No statistics found"
                                            description="Add your first statistic to display it on the public page."
                                            onClick={openCreateStatModal}
                                            buttonText="Add Statistic"
                                        />
                                    ) : (
                                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                            {stats.map((stat) => {
                                                const Icon =
                                                    iconMap[
                                                        stat.icon as keyof typeof iconMap
                                                    ] || Handshake;

                                                return (
                                                    <div
                                                        key={stat.id}
                                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                                                                <Icon size={23} />
                                                            </div>

                                                            <StatusBadge
                                                                active={stat.status}
                                                            />
                                                        </div>

                                                        <div className="mt-5 text-3xl font-bold text-[#06245a]">
                                                            {stat.value}
                                                        </div>

                                                        <div className="mt-1 text-sm font-semibold text-slate-600">
                                                            {stat.label}
                                                        </div>

                                                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                                            <span className="text-xs text-slate-400">
                                                                Order:{" "}
                                                                {stat.sort_order}
                                                            </span>

                                                            <div className="flex gap-2">
                                                                <ActionButton
                                                                    title="Edit"
                                                                    onClick={() =>
                                                                        openEditStatModal(
                                                                            stat
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil
                                                                        size={15}
                                                                    />
                                                                </ActionButton>

                                                                <ActionButton
                                                                    title="Delete"
                                                                    danger
                                                                    disabled={
                                                                        deleteStatMutation.isPending
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm(
                                                                                `Delete "${stat.label}"?`
                                                                            )
                                                                        ) {
                                                                            deleteStatMutation.mutate(
                                                                                stat.id
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2
                                                                        size={15}
                                                                    />
                                                                </ActionButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === "partners" && (
                                <section>
                                    <SectionHeader
                                        title="Vendors & Partners"
                                        description="Manage partner names, categories, logos and descriptions."
                                        action={
                                            <button
                                                type="button"
                                                onClick={openCreatePartnerModal}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
                                            >
                                                <Plus size={17} />
                                                Add Partner
                                            </button>
                                        }
                                    />

                                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="relative w-full sm:max-w-sm">
                                            <Search
                                                size={17}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                value={search}
                                                onChange={(event) =>
                                                    setSearch(event.target.value)
                                                }
                                                placeholder="Search partners..."
                                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>

                                        <p className="text-sm text-slate-500">
                                            Showing{" "}
                                            <span className="font-semibold text-slate-700">
                                                {filteredPartners.length}
                                            </span>{" "}
                                            of {partners.length} partners
                                        </p>
                                    </div>

                                    {filteredPartners.length === 0 ? (
                                        <EmptyState
                                            title="No partners found"
                                            description={
                                                search
                                                    ? "Try a different search term."
                                                    : "Add your first vendor or partner."
                                            }
                                            onClick={
                                                search
                                                    ? () => setSearch("")
                                                    : openCreatePartnerModal
                                            }
                                            buttonText={
                                                search
                                                    ? "Clear Search"
                                                    : "Add Partner"
                                            }
                                        />
                                    ) : (
                                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                            <div className="overflow-x-auto">
                                                <table className="w-full min-w-[900px]">
                                                    <thead className="bg-slate-50">
                                                        <tr>
                                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Partner
                                                            </th>
                                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Category
                                                            </th>
                                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Sort Order
                                                            </th>
                                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Status
                                                            </th>
                                                            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-slate-100">
                                                        {filteredPartners.map(
                                                            (partner) => (
                                                                <tr
                                                                    key={partner.id}
                                                                    className="transition hover:bg-slate-50/70"
                                                                >
                                                                    <td className="px-5 py-4">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2">
                                                                                {partner.logo_url ||
                                                                                partner.logo ? (
                                                                                    <img
                                                                                        src={
                                                                                            partner.logo_url ||
                                                                                            partner.logo ||
                                                                                            ""
                                                                                        }
                                                                                        alt={
                                                                                            partner.name
                                                                                        }
                                                                                        className="max-h-full max-w-full object-contain"
                                                                                    />
                                                                                ) : (
                                                                                    <Building2
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                        className="text-slate-400"
                                                                                    />
                                                                                )}
                                                                            </div>

                                                                            <div className="min-w-0">
                                                                                <p className="font-semibold text-slate-800">
                                                                                    {
                                                                                        partner.name
                                                                                    }
                                                                                </p>

                                                                                <p className="mt-1 max-w-md truncate text-xs text-slate-500">
                                                                                    {partner.description ||
                                                                                        "No description"}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-5 py-4">
                                                                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                                                                            {
                                                                                partner.category
                                                                            }
                                                                        </span>
                                                                    </td>

                                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                                        {
                                                                            partner.sort_order
                                                                        }
                                                                    </td>

                                                                    <td className="px-5 py-4">
                                                                        <StatusBadge
                                                                            active={
                                                                                partner.status
                                                                            }
                                                                        />
                                                                    </td>

                                                                    <td className="px-5 py-4">
                                                                        <div className="flex justify-end gap-2">
                                                                            <ActionButton
                                                                                title="Edit partner"
                                                                                onClick={() =>
                                                                                    openEditPartnerModal(
                                                                                        partner
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Pencil
                                                                                    size={
                                                                                        15
                                                                                    }
                                                                                />
                                                                            </ActionButton>

                                                                            <ActionButton
                                                                                title="Delete partner"
                                                                                danger
                                                                                disabled={
                                                                                    deletePartnerMutation.isPending
                                                                                }
                                                                                onClick={() => {
                                                                                    if (
                                                                                        window.confirm(
                                                                                            `Delete "${partner.name}"?`
                                                                                        )
                                                                                    ) {
                                                                                        deletePartnerMutation.mutate(
                                                                                            partner.id
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Trash2
                                                                                    size={
                                                                                        15
                                                                                    }
                                                                                />
                                                                            </ActionButton>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}
                        </>
                    )}
                </main>
            </div>

            {pageModalOpen && (
                <Modal
                    title="Edit Page Settings"
                    description="Update the public Vendors & Partners hero section."
                    onClose={() => setPageModalOpen(false)}
                    size="lg"
                >
                    <form onSubmit={handlePageSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Label">
                                <input
                                    value={pageForm.label}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            label: event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Title">
                                <input
                                    value={pageForm.title}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            title: event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Highlight">
                                <input
                                    value={pageForm.highlight}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            highlight: event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Status">
                                <StatusSwitch
                                    checked={pageForm.status}
                                    onChange={(checked) =>
                                        setPageForm({
                                            ...pageForm,
                                            status: checked,
                                        })
                                    }
                                />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Description">
                                    <textarea
                                        value={pageForm.description}
                                        onChange={(event) =>
                                            setPageForm({
                                                ...pageForm,
                                                description: event.target.value,
                                            })
                                        }
                                        rows={4}
                                        className={inputClass}
                                        required
                                    />
                                </Field>
                            </div>

                            <div className="sm:col-span-2">
                                <Field label="Hero Image">
                                    <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:bg-blue-50">
                                        <Upload size={18} />
                                        {pageImage
                                            ? pageImage.name
                                            : "Choose hero image"}

                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={(event) => {
                                                const file =
                                                    event.target.files?.[0];

                                                if (file) {
                                                    setPageImage(file);
                                                    setPageImagePreview(
                                                        URL.createObjectURL(file)
                                                    );
                                                }
                                            }}
                                        />
                                    </label>

                                    {pageImagePreview && (
                                        <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200">
                                            <img
                                                src={pageImagePreview}
                                                alt="Hero preview"
                                                className="h-48 w-full object-cover"
                                            />

                                            {pageImage && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPageImage(null);
                                                        setPageImagePreview(
                                                            page?.hero_image_url ||
                                                                page?.hero_image ||
                                                                null
                                                        );
                                                    }}
                                                    className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-600 shadow hover:text-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <Field label="Explore Button Text">
                                <input
                                    value={pageForm.explore_button_text}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            explore_button_text:
                                                event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Explore Button URL">
                                <input
                                    value={pageForm.explore_button_url}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            explore_button_url:
                                                event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Partner Button Text">
                                <input
                                    value={pageForm.partner_button_text}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            partner_button_text:
                                                event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Partner Button URL">
                                <input
                                    value={pageForm.partner_button_url}
                                    onChange={(event) =>
                                        setPageForm({
                                            ...pageForm,
                                            partner_button_url:
                                                event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>
                        </div>

                        <ModalFooter
                            onCancel={() => setPageModalOpen(false)}
                            loading={pageMutation.isPending}
                            submitText="Save Settings"
                        />
                    </form>
                </Modal>
            )}

            {statModalOpen && (
                <Modal
                    title={editingStat ? "Update Statistic" : "Create Statistic"}
                    description="Manage a statistic card on the public page."
                    onClose={() => setStatModalOpen(false)}
                >
                    <form onSubmit={handleStatSubmit}>
                        <div className="space-y-4">
                            <Field label="Value">
                                <input
                                    value={statForm.value}
                                    onChange={(event) =>
                                        setStatForm({
                                            ...statForm,
                                            value: event.target.value,
                                        })
                                    }
                                    placeholder="500+"
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Label">
                                <input
                                    value={statForm.label}
                                    onChange={(event) =>
                                        setStatForm({
                                            ...statForm,
                                            label: event.target.value,
                                        })
                                    }
                                    placeholder="Trusted Partners"
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Icon">
                                <select
                                    value={statForm.icon || "Handshake"}
                                    onChange={(event) =>
                                        setStatForm({
                                            ...statForm,
                                            icon: event.target.value,
                                        })
                                    }
                                    className={inputClass}
                                >
                                    {iconOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Sort Order">
                                <input
                                    type="number"
                                    value={statForm.sort_order}
                                    onChange={(event) =>
                                        setStatForm({
                                            ...statForm,
                                            sort_order: Number(
                                                event.target.value
                                            ),
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Status">
                                <StatusSwitch
                                    checked={statForm.status}
                                    onChange={(checked) =>
                                        setStatForm({
                                            ...statForm,
                                            status: checked,
                                        })
                                    }
                                />
                            </Field>
                        </div>

                        <ModalFooter
                            onCancel={() => setStatModalOpen(false)}
                            loading={statMutation.isPending}
                            submitText={
                                editingStat ? "Update Statistic" : "Create Statistic"
                            }
                        />
                    </form>
                </Modal>
            )}

            {partnerModalOpen && (
                <Modal
                    title={editingPartner ? "Update Partner" : "Create Partner"}
                    description="Add or update a vendor or partner card."
                    onClose={() => setPartnerModalOpen(false)}
                    size="lg"
                >
                    <form onSubmit={handlePartnerSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Partner Name">
                                <input
                                    value={partnerForm.name}
                                    onChange={(event) =>
                                        setPartnerForm({
                                            ...partnerForm,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Partner name"
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <Field label="Category">
                                <input
                                    value={partnerForm.category}
                                    onChange={(event) =>
                                        setPartnerForm({
                                            ...partnerForm,
                                            category: event.target.value,
                                        })
                                    }
                                    placeholder="Mother Vessel"
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Description">
                                    <textarea
                                        value={partnerForm.description}
                                        onChange={(event) =>
                                            setPartnerForm({
                                                ...partnerForm,
                                                description: event.target.value,
                                            })
                                        }
                                        rows={4}
                                        placeholder="Partner description..."
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            <Field label="Sort Order">
                                <input
                                    type="number"
                                    value={partnerForm.sort_order}
                                    onChange={(event) =>
                                        setPartnerForm({
                                            ...partnerForm,
                                            sort_order: Number(
                                                event.target.value
                                            ),
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Status">
                                <StatusSwitch
                                    checked={partnerForm.status}
                                    onChange={(checked) =>
                                        setPartnerForm({
                                            ...partnerForm,
                                            status: checked,
                                        })
                                    }
                                />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Partner Logo">
                                    <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:bg-blue-50">
                                        <Upload size={18} />
                                        {partnerLogo
                                            ? partnerLogo.name
                                            : "Choose logo image"}

                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={(event) => {
                                                const file =
                                                    event.target.files?.[0];

                                                if (file) {
                                                    setPartnerLogo(file);
                                                    setPartnerLogoPreview(
                                                        URL.createObjectURL(file)
                                                    );
                                                }
                                            }}
                                        />
                                    </label>

                                    {partnerLogoPreview && (
                                        <div className="relative mt-3 flex min-h-36 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-5">
                                            <img
                                                src={partnerLogoPreview}
                                                alt="Partner logo preview"
                                                className="max-h-28 max-w-full object-contain"
                                            />

                                            {partnerLogo && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPartnerLogo(null);
                                                        setPartnerLogoPreview(
                                                            editingPartner?.logo_url ||
                                                                editingPartner?.logo ||
                                                                null
                                                        );
                                                    }}
                                                    className="absolute right-2 top-2 rounded-full bg-white p-2 text-slate-600 shadow hover:text-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    <p className="mt-2 text-xs text-slate-400">
                                        Leave empty to keep the existing logo when updating.
                                    </p>
                                </Field>
                            </div>
                        </div>

                        <ModalFooter
                            onCancel={() => setPartnerModalOpen(false)}
                            loading={partnerMutation.isPending}
                            submitText={
                                editingPartner ? "Update Partner" : "Create Partner"
                            }
                        />
                    </form>
                </Modal>
            )}
        </div>
    );
}

function TabButton({
    active,
    onClick,
    icon,
    children,
}: {
    active: boolean;
    onClick: () => void;
    icon: ReactNode;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                    ? "bg-[#06245a] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
            }`}
        >
            {icon}
            {children}
        </button>
    );
}

function SectionHeader({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>

            {action}
        </div>
    );
}

function InfoCard({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {children}
        </div>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            {children}
        </div>
    );
}

function PreviewField({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                {value || "—"}
            </p>
        </div>
    );
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
            }`}
        >
            {active ? "Active" : "Inactive"}
        </span>
    );
}

function StatusSwitch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="mt-2 flex items-center gap-3"
        >
            <span
                className={`relative h-6 w-11 rounded-full transition ${
                    checked ? "bg-blue-700" : "bg-slate-300"
                }`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                        checked ? "left-[22px]" : "left-0.5"
                    }`}
                />
            </span>

            <span className="text-sm font-medium text-slate-600">
                {checked ? "Active" : "Inactive"}
            </span>
        </button>
    );
}

function ActionButton({
    children,
    onClick,
    title,
    danger = false,
    disabled = false,
}: {
    children: ReactNode;
    onClick: () => void;
    title: string;
    danger?: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            disabled={disabled}
            onClick={onClick}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                danger
                    ? "border-red-100 bg-white text-red-500 hover:bg-red-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            }`}
        >
            {children}
        </button>
    );
}

function EmptyState({
    title,
    description,
    onClick,
    buttonText,
}: {
    title: string;
    description: string;
    onClick: () => void;
    buttonText: string;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Building2 size={26} />
            </div>

            <h3 className="mt-4 font-bold text-slate-800">{title}</h3>

            <p className="mt-2 text-sm text-slate-500">{description}</p>

            <button
                type="button"
                onClick={onClick}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
                <Plus size={16} />
                {buttonText}
            </button>
        </div>
    );
}

function Modal({
    title,
    description,
    onClose,
    children,
    size = "md",
}: {
    title: string;
    description: string;
    onClose: () => void;
    children: ReactNode;
    size?: "md" | "lg";
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6">
            <div
                className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${
                    size === "lg" ? "max-w-3xl" : "max-w-lg"
                }`}
            >
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="overflow-y-auto px-5 py-5 sm:px-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalFooter({
    onCancel,
    loading,
    submitText,
}: {
    onCancel: () => void;
    loading: boolean;
    submitText: string;
}) {
    return (
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                    <Save size={16} />
                )}

                {loading ? "Saving..." : submitText}
            </button>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    Upload,
    X,
    Users,
    BarChart3,
    Building2,
    Globe2,
    Ship,
    Star,
    Eye,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

interface StatData {
    id: number;
    value: string;
    label: string;
    icon: string;
    sort_order: number;
    status: boolean;
}

interface CustomerData {
    id: number;
    name: string;
    category: string;
    logo?: string | null;
    logo_url?: string | null;
    description: string;
    sort_order: number;
    status: boolean;
}

interface CustomerResponse {
    page: PageData;
    stats: StatData[];
    customers: CustomerData[];
}

type ModalType = "page" | "stat" | "customer" | null;

const iconOptions = [
    {
        value: "Building2",
        label: "Building",
        icon: Building2,
    },
    {
        value: "Globe2",
        label: "Globe",
        icon: Globe2,
    },
    {
        value: "Ship",
        label: "Ship",
        icon: Ship,
    },
    {
        value: "Star",
        label: "Star",
        icon: Star,
    },
];

export default function CustomersAdminPage() {
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState<
        "page" | "stats" | "customers"
    >("page");

    const [modal, setModal] = useState<ModalType>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [pageForm, setPageForm] = useState<PageData>({
        label: "",
        title: "",
        highlight: "",
        description: "",
        explore_button_text: "",
        explore_button_url: "",
        partner_button_text: "",
        partner_button_url: "",
        status: true,
    });

    const [pageImage, setPageImage] = useState<File | null>(null);
    const [pageImagePreview, setPageImagePreview] = useState<string | null>(
        null
    );

    const [statForm, setStatForm] = useState({
        value: "",
        label: "",
        icon: "Building2",
        sort_order: 0,
        status: true,
    });

    const [customerForm, setCustomerForm] = useState({
        name: "",
        category: "",
        description: "",
        sort_order: 0,
        status: true,
    });

    const [customerLogo, setCustomerLogo] = useState<File | null>(null);
    const [customerLogoPreview, setCustomerLogoPreview] = useState<
        string | null
    >(null);

    const { data, isLoading } = useQuery<CustomerResponse>({
        queryKey: ["admin-customers"],
        queryFn: async () => {
            const response = await api.get("/website/admin/customers");
            return response.data.data;
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
    });

    useEffect(() => {
        if (data?.page) {
            setPageForm(data.page);
        }
    }, [data]);

    const invalidateCustomers = () => {
        queryClient.invalidateQueries({
            queryKey: ["admin-customers"],
        });

        queryClient.invalidateQueries({
            queryKey: ["customers"],
        });
    };

    const pageMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("label", pageForm.label);
            formData.append("title", pageForm.title);
            formData.append("highlight", pageForm.highlight);
            formData.append("description", pageForm.description);
            formData.append(
                "explore_button_text",
                pageForm.explore_button_text
            );
            formData.append(
                "explore_button_url",
                pageForm.explore_button_url
            );
            formData.append(
                "partner_button_text",
                pageForm.partner_button_text
            );
            formData.append(
                "partner_button_url",
                pageForm.partner_button_url
            );
            formData.append("status", pageForm.status ? "1" : "0");

            if (pageImage) {
                formData.append("hero_image", pageImage);
            }

            return api.post(
                "/website/admin/customers/page/update",
                formData
            );
        },
        onSuccess: () => {
            invalidateCustomers();
            setPageImage(null);
            setPageImagePreview(null);

            alert("Customer page updated successfully.");
        },
    });

    const statMutation = useMutation({
        mutationFn: async () => {
            if (editingId) {
                return api.post(
                    `/website/admin/customers/stats/${editingId}/update`,
                    statForm
                );
            }

            return api.post("/website/admin/customers/stats", statForm);
        },
        onSuccess: () => {
            invalidateCustomers();
            closeModal();
        },
    });

    const deleteStatMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/website/admin/customers/stats/${id}`);
        },
        onSuccess: () => {
            invalidateCustomers();
        },
    });

    const customerMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("name", customerForm.name);
            formData.append("category", customerForm.category);
            formData.append("description", customerForm.description);
            formData.append(
                "sort_order",
                String(customerForm.sort_order)
            );
            formData.append("status", customerForm.status ? "1" : "0");

            if (customerLogo) {
                formData.append("logo", customerLogo);
            }

            if (editingId) {
                return api.post(
                    `/website/admin/customers/${editingId}/update`,
                    formData
                );
            }

            return api.post("/website/admin/customers", formData);
        },
        onSuccess: () => {
            invalidateCustomers();
            closeModal();
        },
    });

    const deleteCustomerMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/website/admin/customers/${id}`);
        },
        onSuccess: () => {
            invalidateCustomers();
        },
    });

    const openPageModal = () => {
        if (data?.page) {
            setPageForm(data.page);
        }

        setPageImage(null);
        setPageImagePreview(null);
        setModal("page");
    };

    const openCreateStatModal = () => {
        setEditingId(null);

        setStatForm({
            value: "",
            label: "",
            icon: "Building2",
            sort_order: data?.stats?.length
                ? Math.max(...data.stats.map((item) => item.sort_order)) + 1
                : 1,
            status: true,
        });

        setModal("stat");
    };

    const openEditStatModal = (stat: StatData) => {
        setEditingId(stat.id);

        setStatForm({
            value: stat.value,
            label: stat.label,
            icon: stat.icon || "Building2",
            sort_order: stat.sort_order,
            status: stat.status,
        });

        setModal("stat");
    };

    const openCreateCustomerModal = () => {
        setEditingId(null);

        setCustomerForm({
            name: "",
            category: "",
            description: "",
            sort_order: data?.customers?.length
                ? Math.max(
                      ...data.customers.map((item) => item.sort_order)
                  ) + 1
                : 1,
            status: true,
        });

        setCustomerLogo(null);
        setCustomerLogoPreview(null);

        setModal("customer");
    };

    const openEditCustomerModal = (customer: CustomerData) => {
        setEditingId(customer.id);

        setCustomerForm({
            name: customer.name,
            category: customer.category || "",
            description: customer.description || "",
            sort_order: customer.sort_order,
            status: customer.status,
        });

        setCustomerLogo(null);
        setCustomerLogoPreview(customer.logo_url || null);

        setModal("customer");
    };

    const closeModal = () => {
        setModal(null);
        setEditingId(null);

        setCustomerLogo(null);
        setCustomerLogoPreview(null);

        setPageImage(null);
        setPageImagePreview(null);
    };

    const handlePageImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setPageImage(file);
        setPageImagePreview(URL.createObjectURL(file));
    };

    const handleCustomerLogoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setCustomerLogo(file);
        setCustomerLogoPreview(URL.createObjectURL(file));
    };

    const handleDeleteStat = (id: number) => {
        if (!confirm("Are you sure you want to delete this statistic?")) {
            return;
        }

        deleteStatMutation.mutate(id);
    };

    const handleDeleteCustomer = (id: number) => {
        if (!confirm("Are you sure you want to delete this customer?")) {
            return;
        }

        deleteCustomerMutation.mutate(id);
    };

    if (isLoading || !data) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="text-sm font-medium text-slate-500">
                    Loading customer settings...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Customers
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage customer page content, statistics and customer
                        profiles.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2">
                <TabButton
                    active={activeTab === "page"}
                    icon={<Eye size={17} />}
                    label="Page Settings"
                    onClick={() => setActiveTab("page")}
                />

                <TabButton
                    active={activeTab === "stats"}
                    icon={<BarChart3 size={17} />}
                    label="Statistics"
                    onClick={() => setActiveTab("stats")}
                />

                <TabButton
                    active={activeTab === "customers"}
                    icon={<Users size={17} />}
                    label="Customers"
                    onClick={() => setActiveTab("customers")}
                />
            </div>

            {activeTab === "page" && (
                <div className="rounded-2xl border border-slate-200 bg-white">
                    <SectionHeader
                        title="Customer Page Settings"
                        description="Manage the customer page hero section and buttons."
                        action={
                            <button
                                type="button"
                                onClick={openPageModal}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#031b46]"
                            >
                                <Pencil size={16} />
                                Edit Page
                            </button>
                        }
                    />

                    <div className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            {data.page.hero_image_url ? (
                                <img
                                    src={data.page.hero_image_url}
                                    alt="Customer Hero"
                                    className="h-48 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-48 items-center justify-center text-slate-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                            <InfoCard
                                label="Label"
                                value={data.page.label}
                            />

                            <InfoCard
                                label="Title"
                                value={`${data.page.title} ${data.page.highlight}`}
                            />

                            <div className="sm:col-span-2">
                                <InfoCard
                                    label="Description"
                                    value={data.page.description}
                                />
                            </div>

                            <InfoCard
                                label="Explore Button"
                                value={`${data.page.explore_button_text} → ${data.page.explore_button_url}`}
                            />

                            <InfoCard
                                label="Partner Button"
                                value={`${data.page.partner_button_text} → ${data.page.partner_button_url}`}
                            />

                            <InfoCard
                                label="Status"
                                value={data.page.status ? "Active" : "Inactive"}
                            />

                        </div>

                    </div>
                </div>
            )}

            {activeTab === "stats" && (
                <div className="rounded-2xl border border-slate-200 bg-white">
                    <SectionHeader
                        title="Customer Statistics"
                        description="Manage the statistics displayed below the hero section."
                        action={
                            <button
                                type="button"
                                onClick={openCreateStatModal}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#031b46]"
                            >
                                <Plus size={17} />
                                Add Statistic
                            </button>
                        }
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Value
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Label
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Icon
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
                                {data.stats
                                    .sort(
                                        (a, b) =>
                                            a.sort_order - b.sort_order
                                    )
                                    .map((stat) => {
                                        const icon =
                                            iconOptions.find(
                                                (item) =>
                                                    item.value === stat.icon
                                            )?.icon || Building2;

                                        const Icon = icon;

                                        return (
                                            <tr
                                                key={stat.id}
                                                className="border-b border-slate-100 last:border-0"
                                            >
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {stat.sort_order}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-[#06245a]">
                                                        {stat.value}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                    {stat.label}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                                        <Icon size={18} />
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge
                                                        active={stat.status}
                                                    />
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
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
                                                            onClick={() =>
                                                                handleDeleteStat(
                                                                    stat.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2
                                                                size={15}
                                                            />
                                                        </ActionButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "customers" && (
                <div className="rounded-2xl border border-slate-200 bg-white">
                    <SectionHeader
                        title="Customer List"
                        description="Manage your customer logos, descriptions and display order."
                        action={
                            <button
                                type="button"
                                onClick={openCreateCustomerModal}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#031b46]"
                            >
                                <Plus size={17} />
                                Add Customer
                            </button>
                        }
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Description
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
                                {data.customers
                                    .sort(
                                        (a, b) =>
                                            a.sort_order - b.sort_order
                                    )
                                    .map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b border-slate-100 last:border-0"
                                        >
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {customer.sort_order}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2">
                                                        {customer.logo_url || customer.logo ? (
                                                            <img
                                                                src={customer.logo_url || customer.logo || ""}
                                                                alt={customer.name}
                                                                className="max-h-10 max-w-full object-contain"
                                                            />
                                                        ) : (
                                                            <Building2
                                                                size={22}
                                                                className="text-slate-400"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="font-semibold text-slate-800">
                                                        {customer.name}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                                    {customer.category}
                                                </span>
                                            </td>

                                            <td className="max-w-[380px] px-6 py-4">
                                                <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                                                    {customer.description}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge
                                                    active={customer.status}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <ActionButton
                                                        title="Edit"
                                                        onClick={() =>
                                                            openEditCustomerModal(
                                                                customer
                                                            )
                                                        }
                                                    >
                                                        <Pencil size={15} />
                                                    </ActionButton>

                                                    <ActionButton
                                                        title="Delete"
                                                        danger
                                                        onClick={() =>
                                                            handleDeleteCustomer(
                                                                customer.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 size={15} />
                                                    </ActionButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {modal === "page" && (
                <Modal
                    title="Edit Customer Page"
                    description="Update customer page hero content."
                    onClose={closeModal}
                    width="max-w-3xl"
                >
                    <div className="space-y-5">

                        <div className="grid gap-5 sm:grid-cols-2">
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
                                label="Explore Button Text"
                                value={pageForm.explore_button_text}
                                onChange={(value) =>
                                    setPageForm({
                                        ...pageForm,
                                        explore_button_text: value,
                                    })
                                }
                            />

                            <Input
                                label="Explore Button URL"
                                value={pageForm.explore_button_url}
                                onChange={(value) =>
                                    setPageForm({
                                        ...pageForm,
                                        explore_button_url: value,
                                    })
                                }
                            />

                            <Input
                                label="Partner Button Text"
                                value={pageForm.partner_button_text}
                                onChange={(value) =>
                                    setPageForm({
                                        ...pageForm,
                                        partner_button_text: value,
                                    })
                                }
                            />

                            <Input
                                label="Partner Button URL"
                                value={pageForm.partner_button_url}
                                onChange={(value) =>
                                    setPageForm({
                                        ...pageForm,
                                        partner_button_url: value,
                                    })
                                }
                            />
                        </div>

                        <Textarea
                            label="Description"
                            value={pageForm.description}
                            onChange={(value) =>
                                setPageForm({
                                    ...pageForm,
                                    description: value,
                                })
                            }
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Hero Image
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:border-blue-400 hover:bg-blue-50">

                                {pageImagePreview ||
                                pageForm.hero_image_url ? (
                                    <img
                                        src={
                                            pageImagePreview ||
                                            pageForm.hero_image_url ||
                                            ""
                                        }
                                        alt="Hero"
                                        className="mb-4 h-40 w-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <Upload
                                        size={25}
                                        className="mb-2 text-slate-400"
                                    />
                                )}

                                <span className="text-sm font-medium text-slate-600">
                                    Click to upload hero image
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePageImageChange}
                                />
                            </label>
                        </div>

                        <StatusSwitch
                            value={pageForm.status}
                            onChange={(value) =>
                                setPageForm({
                                    ...pageForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            onCancel={closeModal}
                            onSave={() => pageMutation.mutate()}
                            loading={pageMutation.isPending}
                        />
                    </div>
                </Modal>
            )}

            {modal === "stat" && (
                <Modal
                    title={editingId ? "Update Statistic" : "Add Statistic"}
                    description="Manage customer page statistics."
                    onClose={closeModal}
                >
                    <div className="space-y-5">

                        <div className="grid gap-5 sm:grid-cols-2">

                            <Input
                                label="Value"
                                placeholder="50+"
                                value={statForm.value}
                                onChange={(value) =>
                                    setStatForm({
                                        ...statForm,
                                        value,
                                    })
                                }
                            />

                            <Input
                                label="Label"
                                placeholder="Corporate Clients"
                                value={statForm.label}
                                onChange={(value) =>
                                    setStatForm({
                                        ...statForm,
                                        label: value,
                                    })
                                }
                            />

                            <Select
                                label="Icon"
                                value={statForm.icon}
                                onChange={(value) =>
                                    setStatForm({
                                        ...statForm,
                                        icon: value,
                                    })
                                }
                                options={iconOptions.map((item) => ({
                                    value: item.value,
                                    label: item.label,
                                }))}
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

                        </div>

                        <StatusSwitch
                            value={statForm.status}
                            onChange={(value) =>
                                setStatForm({
                                    ...statForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            onCancel={closeModal}
                            onSave={() => statMutation.mutate()}
                            loading={statMutation.isPending}
                        />

                    </div>
                </Modal>
            )}

            {modal === "customer" && (
                <Modal
                    title={editingId ? "Update Customer" : "Add Customer"}
                    description="Manage customer information and logo."
                    onClose={closeModal}
                    width="max-w-2xl"
                >
                    <div className="space-y-5">

                        <div className="grid gap-5 sm:grid-cols-2">

                            <Input
                                label="Customer Name"
                                placeholder="Rahim Group"
                                value={customerForm.name}
                                onChange={(value) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        name: value,
                                    })
                                }
                            />

                            <Input
                                label="Category"
                                placeholder="Industrial"
                                value={customerForm.category}
                                onChange={(value) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        category: value,
                                    })
                                }
                            />

                            <Input
                                label="Sort Order"
                                type="number"
                                value={String(customerForm.sort_order)}
                                onChange={(value) =>
                                    setCustomerForm({
                                        ...customerForm,
                                        sort_order: Number(value),
                                    })
                                }
                            />

                        </div>

                        <Textarea
                            label="Description"
                            placeholder="Customer description..."
                            value={customerForm.description}
                            onChange={(value) =>
                                setCustomerForm({
                                    ...customerForm,
                                    description: value,
                                })
                            }
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Customer Logo
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:border-blue-400 hover:bg-blue-50">

                                {customerLogoPreview ? (
                                    <img
                                        src={customerLogoPreview}
                                        alt={customerForm.name}
                                        className="mb-4 h-28 max-w-full object-contain"
                                    />
                                ) : (
                                    <Upload
                                        size={25}
                                        className="mb-2 text-slate-400"
                                    />
                                )}

                                <span className="text-sm font-medium text-slate-600">
                                    Click to upload customer logo
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleCustomerLogoChange}
                                />
                            </label>
                        </div>

                        <StatusSwitch
                            value={customerForm.status}
                            onChange={(value) =>
                                setCustomerForm({
                                    ...customerForm,
                                    status: value,
                                })
                            }
                        />

                        <ModalFooter
                            onCancel={closeModal}
                            onSave={() => customerMutation.mutate()}
                            loading={customerMutation.isPending}
                        />

                    </div>
                </Modal>
            )}

        </div>
    );
}

function TabButton({
    active,
    icon,
    label,
    onClick,
}: {
    active: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                active
                    ? "bg-[#06245a] text-white"
                    : "text-slate-600 hover:bg-slate-100"
            }`}
        >
            {icon}
            {label}
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
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center">
            <div>
                <h2 className="text-lg font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

            {action}
        </div>
    );
}

function InfoCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
            </div>

            <div className="mt-2 text-sm font-medium leading-6 text-slate-700">
                {value || "-"}
            </div>
        </div>
    );
}

function StatusBadge({
    active,
}: {
    active: boolean;
}) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
            }`}
        >
            {active ? "Active" : "Inactive"}
        </span>
    );
}

function ActionButton({
    children,
    onClick,
    title,
    danger = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title: string;
    danger?: boolean;
}) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                danger
                    ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            }`}
        >
            {children}
        </button>
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
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}

function Textarea({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <textarea
                rows={5}
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
    value,
    onChange,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
                <div className="text-sm font-semibold text-slate-700">
                    Status
                </div>

                <div className="mt-0.5 text-xs text-slate-500">
                    {value ? "This item is active." : "This item is inactive."}
                </div>
            </div>

            <button
                type="button"
                onClick={() => onChange(!value)}
                className={`relative h-6 w-11 rounded-full transition ${
                    value ? "bg-blue-700" : "bg-slate-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        value ? "left-6" : "left-1"
                    }`}
                />
            </button>
        </div>
    );
}

function Modal({
    title,
    description,
    children,
    onClose,
    width = "max-w-xl",
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    onClose: () => void;
    width?: string;
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div
                className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-2xl bg-white shadow-2xl`}
            >
                <div className="flex items-start justify-between border-b border-slate-200 p-5">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalFooter({
    onCancel,
    onSave,
    loading,
}: {
    onCancel: () => void;
    onSave: () => void;
    loading: boolean;
}) {
    return (
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
                <X size={16} />
                Cancel
            </button>

            <button
                type="button"
                onClick={onSave}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#031b46] disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}
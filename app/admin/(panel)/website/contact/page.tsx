"use client";

import { useEffect, useState } from "react";
import {
    Edit,
    Save,
    Upload,
    X,
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Image as ImageIcon,
} from "lucide-react";

import api from "@/services/api";

interface ContactData {
    id?: number;

    hero_label: string;
    hero_title: string;
    hero_highlight: string;
    hero_description: string;
    hero_image: string | null;
    hero_button_text: string;
    hero_button_url: string;
    bottom_caption: string;

    address_label: string;
    office_title: string;
    address: string;

    phone_label: string;
    phone_title: string;
    phone_description: string;

    email_label: string;
    email: string;

    hours_label: string;
    working_days: string;
    working_hours: string;

    form_label: string;
    form_title: string;
    form_description: string;

    map_title: string;
    map_embed_url: string;

    status: boolean;
}

const emptyContact: ContactData = {
    hero_label: "",
    hero_title: "",
    hero_highlight: "",
    hero_description: "",
    hero_image: null,
    hero_button_text: "",
    hero_button_url: "",
    bottom_caption: "",

    address_label: "",
    office_title: "",
    address: "",

    phone_label: "",
    phone_title: "",
    phone_description: "",

    email_label: "",
    email: "",

    hours_label: "",
    working_days: "",
    working_hours: "",

    form_label: "",
    form_title: "",
    form_description: "",

    map_title: "",
    map_embed_url: "",

    status: true,
};

export default function ContactPage() {
    const [contact, setContact] =
        useState<ContactData>(emptyContact);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [editingContact, setEditingContact] =
        useState<ContactData | null>(null);

    const [contactImage, setContactImage] =
        useState<File | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/website/admin/contact"
            );

            if (response.data?.data) {
                const data = response.data.data;

                setContact({
                    ...emptyContact,
                    ...data,

                    hero_label: data.hero_label ?? "",
                    hero_title: data.hero_title ?? "",
                    hero_highlight: data.hero_highlight ?? "",
                    hero_description:
                        data.hero_description ?? "",
                    hero_image: data.hero_image ?? null,
                    hero_button_text:
                        data.hero_button_text ?? "",
                    hero_button_url:
                        data.hero_button_url ?? "",
                    bottom_caption:
                        data.bottom_caption ?? "",

                    address_label:
                        data.address_label ?? "",
                    office_title:
                        data.office_title ?? "",
                    address:
                        data.address ?? "",

                    phone_label:
                        data.phone_label ?? "",
                    phone_title:
                        data.phone_title ?? "",
                    phone_description:
                        data.phone_description ?? "",

                    email_label:
                        data.email_label ?? "",
                    email:
                        data.email ?? "",

                    hours_label:
                        data.hours_label ?? "",
                    working_days:
                        data.working_days ?? "",
                    working_hours:
                        data.working_hours ?? "",

                    form_label:
                        data.form_label ?? "",
                    form_title:
                        data.form_title ?? "",
                    form_description:
                        data.form_description ?? "",

                    map_title:
                        data.map_title ?? "",
                    map_embed_url:
                        data.map_embed_url ?? "",

                    status: Boolean(data.status),
                });
            }
        } catch (error) {
            console.error(
                "Failed to load Contact data:",
                error
            );

            alert("Failed to load Contact information.");
        } finally {
            setLoading(false);
        }
    };

    const openContactModal = () => {
        setEditingContact(contact);

        setContactImage(null);

        setShowModal(true);
    };

    const updateContactField = (
        field: keyof ContactData,
        value: string | boolean
    ) => {
        setContact((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveContact = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            formData.append(
                "hero_label",
                contact.hero_label || ""
            );

            formData.append(
                "hero_title",
                contact.hero_title || ""
            );

            formData.append(
                "hero_highlight",
                contact.hero_highlight || ""
            );

            formData.append(
                "hero_description",
                contact.hero_description || ""
            );

            formData.append(
                "hero_button_text",
                contact.hero_button_text || ""
            );

            formData.append(
                "hero_button_url",
                contact.hero_button_url || ""
            );

            formData.append(
                "bottom_caption",
                contact.bottom_caption || ""
            );

            formData.append(
                "address_label",
                contact.address_label || ""
            );

            formData.append(
                "office_title",
                contact.office_title || ""
            );

            formData.append(
                "address",
                contact.address || ""
            );

            formData.append(
                "phone_label",
                contact.phone_label || ""
            );

            formData.append(
                "phone_title",
                contact.phone_title || ""
            );

            formData.append(
                "phone_description",
                contact.phone_description || ""
            );

            formData.append(
                "email_label",
                contact.email_label || ""
            );

            formData.append(
                "email",
                contact.email || ""
            );

            formData.append(
                "hours_label",
                contact.hours_label || ""
            );

            formData.append(
                "working_days",
                contact.working_days || ""
            );

            formData.append(
                "working_hours",
                contact.working_hours || ""
            );

            formData.append(
                "form_label",
                contact.form_label || ""
            );

            formData.append(
                "form_title",
                contact.form_title || ""
            );

            formData.append(
                "form_description",
                contact.form_description || ""
            );

            formData.append(
                "map_title",
                contact.map_title || ""
            );

            formData.append(
                "map_embed_url",
                contact.map_embed_url || ""
            );

            formData.append(
                "status",
                contact.status ? "1" : "0"
            );

            if (contactImage) {
                formData.append(
                    "hero_image",
                    contactImage
                );
            }

            await api.post(
                "/website/admin/contact/update",
                formData
            );

            alert(
                "Contact information saved successfully."
            );

            setContactImage(null);
            setShowModal(false);

            await loadData();
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                    "Failed to save Contact information."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-sm text-gray-500">
                    Loading Contact information...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#06245a]">
                    Contact Page
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage Contact page content of Madina
                    Maritime website.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Contact Page Content
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage hero, contact information,
                            enquiry form and map content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openContactModal}
                        className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#041b45]"
                    >
                        <Edit size={16} />

                        Edit Contact Page
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard
                        icon={ImageIcon}
                        title="Hero Section"
                        value={
                            contact.hero_title ||
                            "Not configured"
                        }
                    />

                    <InfoCard
                        icon={MapPin}
                        title={
                            contact.address_label ||
                            "Location"
                        }
                        value={
                            contact.office_title ||
                            "Not configured"
                        }
                    />

                    <InfoCard
                        icon={Phone}
                        title={
                            contact.phone_label ||
                            "Phone"
                        }
                        value={
                            contact.phone_title ||
                            "Not configured"
                        }
                    />

                    <InfoCard
                        icon={Mail}
                        title={
                            contact.email_label ||
                            "Email"
                        }
                        value={
                            contact.email ||
                            "Not configured"
                        }
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 border-t border-gray-200 p-5 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <MapPin
                                size={20}
                                className="text-[#06245a]"
                            />

                            <h3 className="font-semibold text-gray-800">
                                Address
                            </h3>
                        </div>

                        <p className="text-sm leading-6 text-gray-600">
                            {contact.address ||
                                "No address configured."}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <Clock
                                size={20}
                                className="text-[#06245a]"
                            />

                            <h3 className="font-semibold text-gray-800">
                                Working Hours
                            </h3>
                        </div>

                        <p className="text-sm text-gray-600">
                            {contact.working_days ||
                                "No working days configured."}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                            {contact.working_hours ||
                                "No working hours configured."}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <MessageSquare
                                size={20}
                                className="text-[#06245a]"
                            />

                            <h3 className="font-semibold text-gray-800">
                                Contact Form
                            </h3>
                        </div>

                        <p className="text-sm font-medium text-gray-800">
                            {contact.form_title ||
                                "No title configured."}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {contact.form_description ||
                                "No description configured."}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <MapPin
                                size={20}
                                className="text-[#06245a]"
                            />

                            <h3 className="font-semibold text-gray-800">
                                Map
                            </h3>
                        </div>

                        <p className="text-sm text-gray-600">
                            {contact.map_title ||
                                "No map title configured."}
                        </p>

                        <p className="mt-2 truncate text-xs text-gray-400">
                            {contact.map_embed_url ||
                                "No map URL configured."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
                    <div>
                        <span className="text-sm font-medium text-gray-700">
                            Status
                        </span>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            contact.status
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                        }`}
                    >
                        {contact.status
                            ? "Active"
                            : "Inactive"}
                    </span>
                </div>
            </div>

            {showModal && (
                <ContactModal
                    form={contact}
                    setForm={setContact}
                    existingImage={
                        editingContact?.hero_image ||
                        contact.hero_image ||
                        null
                    }
                    image={contactImage}
                    setImage={setContactImage}
                    saving={saving}
                    onClose={() =>
                        setShowModal(false)
                    }
                    onSave={saveContact}
                />
            )}
        </div>
    );
}

function InfoCard({
    icon: Icon,
    title,
    value,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-gray-200 p-5">
            <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-[#06245a]">
                    <Icon size={18} />
                </div>

                <span className="text-sm font-medium text-gray-500">
                    {title}
                </span>
            </div>

            <p className="truncate text-sm font-semibold text-gray-800">
                {value}
            </p>
        </div>
    );
}

function ContactModal({
    form,
    setForm,
    existingImage,
    image,
    setImage,
    saving,
    onClose,
    onSave,
}: {
    form: ContactData;
    setForm: React.Dispatch<
        React.SetStateAction<ContactData>
    >;
    existingImage: string | null;
    image: File | null;
    setImage: React.Dispatch<
        React.SetStateAction<File | null>
    >;
    saving: boolean;
    onClose: () => void;
    onSave: () => void;
}) {
    const updateField = (
        field: keyof ContactData,
        value: string | boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-8 w-full max-w-5xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Edit Contact Page
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Update all Contact page content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto p-6">
                    <div className="space-y-6">
                        <section className="rounded-xl border border-gray-200 p-5">
                            <div className="mb-5">
                                <h4 className="text-base font-semibold text-gray-800">
                                    Hero Information
                                </h4>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage the main Contact page hero.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                    label="Hero Highlight"
                                    value={
                                        form.hero_highlight
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "hero_highlight",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <Field
                                        label="Hero Title"
                                        value={
                                            form.hero_title
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "hero_title",
                                                value
                                            )
                                        }
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Hero Description"
                                        value={
                                            form.hero_description
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "hero_description",
                                                value
                                            )
                                        }
                                        rows={4}
                                    />
                                </div>

                                <Field
                                    label="Button Text"
                                    value={
                                        form.hero_button_text
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "hero_button_text",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Button URL"
                                    value={
                                        form.hero_button_url
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "hero_button_url",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <Field
                                        label="Bottom Caption"
                                        value={
                                            form.bottom_caption
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "bottom_caption",
                                                value
                                            )
                                        }
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Hero Image
                                    </label>

                                    <div className="flex flex-wrap items-center gap-4">
                                        {existingImage &&
                                            !image && (
                                                <img
                                                    src={
                                                        existingImage
                                                    }
                                                    alt="Hero"
                                                    className="h-32 w-52 rounded-lg object-cover"
                                                />
                                            )}

                                        {image && (
                                            <img
                                                src={URL.createObjectURL(
                                                    image
                                                )}
                                                alt="Preview"
                                                className="h-32 w-52 rounded-lg object-cover"
                                            />
                                        )}

                                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <Upload
                                                size={16}
                                            />

                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setImage(
                                                        e.target
                                                            .files?.[0] ||
                                                            null
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-gray-200 p-5">
                            <div className="mb-5">
                                <h4 className="text-base font-semibold text-gray-800">
                                    Contact Information
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Address Label"
                                    value={
                                        form.address_label
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "address_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Office Title"
                                    value={
                                        form.office_title
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "office_title",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Address"
                                        value={form.address}
                                        onChange={(value) =>
                                            updateField(
                                                "address",
                                                value
                                            )
                                        }
                                        rows={3}
                                    />
                                </div>

                                <Field
                                    label="Phone Label"
                                    value={
                                        form.phone_label
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "phone_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Phone Title"
                                    value={
                                        form.phone_title
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "phone_title",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Phone Description"
                                        value={
                                            form.phone_description
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "phone_description",
                                                value
                                            )
                                        }
                                        rows={3}
                                    />
                                </div>

                                <Field
                                    label="Email Label"
                                    value={
                                        form.email_label
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "email_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={(value) =>
                                        updateField(
                                            "email",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Hours Label"
                                    value={
                                        form.hours_label
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "hours_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Working Days"
                                    value={
                                        form.working_days
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "working_days",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <Field
                                        label="Working Hours"
                                        value={
                                            form.working_hours
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "working_hours",
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-gray-200 p-5">
                            <div className="mb-5">
                                <h4 className="text-base font-semibold text-gray-800">
                                    Contact Form
                                </h4>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage the enquiry form section.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Form Label"
                                    value={
                                        form.form_label
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "form_label",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Form Title"
                                    value={
                                        form.form_title
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "form_title",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Form Description"
                                        value={
                                            form.form_description
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "form_description",
                                                value
                                            )
                                        }
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-gray-200 p-5">
                            <div className="mb-5">
                                <h4 className="text-base font-semibold text-gray-800">
                                    Map
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Map Title"
                                    value={
                                        form.map_title
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "map_title",
                                            value
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Map Embed URL"
                                        value={
                                            form.map_embed_url
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "map_embed_url",
                                                value
                                            )
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-800">
                                        Status
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enable or disable Contact page.
                                    </p>
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
                                            : "bg-gray-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                                            form.status
                                                ? "left-5"
                                                : "left-0.5"
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="mt-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        form.status
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {form.status
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2 text-sm font-medium text-white hover:bg-[#041b45] disabled:opacity-50"
                    >
                        <Save size={16} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#06245a]"
            />
        </div>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
    rows = 4,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#06245a]"
            />
        </div>
    );
}
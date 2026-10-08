"use client";

import { useEffect, useState } from "react";
import {
    Pencil,
    Plus,
    Save,
    X,
    Upload,
    Image as ImageIcon,
    Trash2,
    Eye,
    EyeOff,
    Waves,
    Award,
    Globe2,
    CheckCircle2,
    MoveUpRight,
    ShieldCheck,
    Target,
    Ship,
    Anchor,
    Users,
    Leaf,
    Video,
} from "lucide-react";

import api from "@/services/api";

interface HeroSlide {
    id?: number;
    title: string;
    subtitle: string;
    media_type: "image" | "video";
    media: string;
    sort_order: number;
    status: boolean;
    file?: File | null;
}

interface StatItem {
    value: string;
    label: string;
    icon: string;
}

interface MissionItem {
    number: string;
    title: string;
    desc: string;
    img: string;
    icon: string;
}

interface DivisionItem {
    title: string;
    description: string;
    image: string;
    icon: string;
    url?: string;
}

interface WhyItem {
    title: string;
    desc: string;
    icon: string;
}

interface HomeSettings {
    id?: number;

    hero_label: string;
    hero_title: string;
    hero_highlight: string;
    hero_title_suffix: string;
    hero_description: string;

    hero_primary_button_text: string;
    hero_primary_button_url: string;

    hero_secondary_button_text: string;
    hero_secondary_button_url: string;

    stats: StatItem[];

    about_label: string;
    about_title: string;
    about_highlight: string;
    about_description: string;
    about_secondary_description: string;
    about_image: string;
    about_badge_title: string;
    about_badge_subtitle: string;
    about_button_text: string;
    about_button_url: string;
    about_points: string[];

    philosophy_label: string;
    philosophy_title: string;
    philosophy_description: string;
    philosophy_items: MissionItem[];

    business_label: string;
    business_title: string;
    business_highlight: string;
    business_description: string;
    business_divisions: DivisionItem[];

    why_label: string;
    why_title: string;
    why_highlight: string;
    why_description: string;
    why_items: WhyItem[];
    why_image: string;

    responsible_title: string;
    responsible_description: string;

    status: boolean;
}

interface FormData {
    hero_label: string;
    hero_title: string;
    hero_highlight: string;
    hero_title_suffix: string;
    hero_description: string;

    hero_primary_button_text: string;
    hero_primary_button_url: string;

    hero_secondary_button_text: string;
    hero_secondary_button_url: string;

    stats: StatItem[];

    about_label: string;
    about_title: string;
    about_highlight: string;
    about_description: string;
    about_secondary_description: string;
    about_points: string[];
    about_image: File | null;
    existing_about_image: string;
    about_badge_title: string;
    about_badge_subtitle: string;
    about_button_text: string;
    about_button_url: string;

    philosophy_label: string;
    philosophy_title: string;
    philosophy_description: string;
    philosophy_items: MissionItem[];

    business_label: string;
    business_title: string;
    business_highlight: string;
    business_description: string;
    business_divisions: DivisionItem[];

    why_label: string;
    why_title: string;
    why_highlight: string;
    why_description: string;
    why_items: WhyItem[];
    why_image: File | null;
    existing_why_image: string;

    responsible_title: string;
    responsible_description: string;

    status: boolean;
}

const emptyForm: FormData = {
    hero_label: "Madina Maritime Limited",
    hero_title: "Connecting",
    hero_highlight: "Business",
    hero_title_suffix: "Through The Sea.",
    hero_description:
        "Flexible, reliable and on-time maritime services built around operational excellence, trust and long-term partnerships.",

    hero_primary_button_text: "Discover MML",
    hero_primary_button_url: "/about",

    hero_secondary_button_text: "Contact Us",
    hero_secondary_button_url: "/contact",

    stats: [
        {
            value: "24/7",
            label: "Operational Support",
            icon: "Waves",
        },
        {
            value: "30+",
            label: "Years of Experience",
            icon: "Award",
        },
        {
            value: "05",
            label: "Business Divisions",
            icon: "Globe2",
        },
        {
            value: "100%",
            label: "Commitment",
            icon: "CheckCircle2",
        },
    ],

    about_label: "01 — About Us",
    about_title: "Built on trust.",
    about_highlight: "Driven by progress.",
    about_description:
        "Madina Maritime Limited is part of Madina Group, one of the leading diversified business groups in Bangladesh.",
    about_secondary_description:
        "We are a group of professionals committed to expand services & business in the field of Maritime Trade, Transportation and Logistics, Supply Chain Management business with an innovative idea through meeting the international standard of best business practice.",
    about_points: [
        "Reliable marine operations",
        "Experienced professionals",
        "Safety-focused culture",
        "Long-term partnerships",
    ],
    about_image: null,
    existing_about_image: "/images/ship2.jpg",
    about_badge_title: "Maritime",
    about_badge_subtitle: "Excellence",
    about_button_text: "More About Us",
    about_button_url: "/about",

    philosophy_label: "02 — Our Philosophy",
    philosophy_title:
        "Delivering flexible, reliable, and timely shipping solutions across waters.",
    philosophy_description:
        "We are delighted to introduce ourselves as Madina Maritime Limited (MML). From a modest company to an International conglomerate, take a journey through our historic timeline to learn more about how Madina Maritime came to be how we are today.",
    philosophy_items: [
        {
            number: "01",
            title: "Rapid Progress",
            desc: "Madina Maritime Limited is a concern of Madina Group, one of the leading companies in Bangladesh, with diversified interests across Polymer Industries, Marine Services, Trading, Cement Industries and Property Development.",
            img: "/images/ship-new4.jpeg",
            icon: "MoveUpRight",
        },
        {
            number: "02",
            title: "Trust",
            desc: "We continuously strive to accomplish what has not easily been done before through the ideas, efforts and capabilities of every member of our team. A challenging mindset is fundamental to our approach.",
            img: "/images/ship-new1.jpeg",
            icon: "ShieldCheck",
        },
        {
            number: "03",
            title: "Action",
            desc: "Economic success is a common objective across industries. At MML, successful results matter, but we also place strong emphasis on the process, discipline and continuous improvement behind those results.",
            img: "/images/ship-new2.jpeg",
            icon: "Target",
        },
    ],

    business_label: "03 — Our Business",
    business_title: "Diverse capabilities.",
    business_highlight: "One trusted partner.",
    business_description:
        "Our diversified business capabilities allow us to create long-term value across multiple industries and markets.",
    business_divisions: [
        {
            title: "Marine Services",
            description:
                "Reliable marine operations supported by experienced teams and modern operational practices.",
            image: "/images/Picture4.png",
            icon: "Ship",
            url: "/services",
        },
        {
            title: "Marine Logistics",
            description:
                "Efficient commercial operations connecting products, partners and markets.",
            image: "/images/ship2.jpg",
            icon: "Globe2",
            url: "/services",
        },
        {
            title: "Industrial Operations",
            description:
                "Supporting diversified industrial activities through disciplined and reliable operations.",
            image: "/images/Picture3.png",
            icon: "Anchor",
            url: "/services",
        },
    ],

    why_label: "04 — Why MML",
    why_title: "Reliability is not",
    why_highlight: "just a promise.",
    why_description:
        "It is reflected in the way we operate, communicate and build relationships with our customers and partners.",
    why_items: [
        {
            title: "Safety First",
            desc: "Safety remains central to our operational culture.",
            icon: "ShieldCheck",
        },
        {
            title: "Experienced Team",
            desc: "Skilled people driving disciplined maritime operations.",
            icon: "Users",
        },
        {
            title: "Operational Excellence",
            desc: "Focused on consistency, quality and continuous improvement.",
            icon: "Award",
        },
    ],
    why_image: null,
    existing_why_image: "/images/ship-new3.jpeg",

    responsible_title: "Responsible Growth",
    responsible_description:
        "Building sustainable value for our business, people and communities.",

    status: true,
};

const iconOptions = [
    "Waves",
    "Award",
    "Globe2",
    "CheckCircle2",
    "MoveUpRight",
    "ShieldCheck",
    "Target",
    "Ship",
    "Anchor",
    "Users",
    "Leaf",
];

export default function HomePageAdmin() {
    const [home, setHome] = useState<HomeSettings | null>(null);

    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [deletedSlideIds, setDeletedSlideIds] = useState<number[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] =
        useState<FormData>(emptyForm);

    const fetchHome = async () => {
        try {
            setLoading(true);

            const [homeResponse, slidesResponse] =
                await Promise.all([
                    api.get("/website/admin/home"),
                    api.get("/website/hero-slides"),
                ]);

            if (homeResponse.data?.status) {
                const data = homeResponse.data.data;

                setHome(data || null);

                if (data) {
                    setFormData({
                        ...emptyForm,
                        ...data,

                        stats: data.stats || [],
                        about_points: data.about_points || [],
                        philosophy_items:
                            data.philosophy_items || [],
                        business_divisions:
                            data.business_divisions || [],
                        why_items: data.why_items || [],

                        about_image: null,
                        why_image: null,

                        existing_about_image:
                            data.about_image ||
                            "/images/ship2.jpg",

                        existing_why_image:
                            data.why_image ||
                            "/images/ship-new3.jpeg",
                    });
                }
            }

            if (slidesResponse.data?.status) {
                setSlides(
                    (slidesResponse.data.data || []).map(
                        (slide: HeroSlide) => ({
                            ...slide,
                            file: null,
                        })
                    )
                );
            }
        } catch (error) {
            console.error(
                "Failed to load home page:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHome();
    }, []);

    const openCreateModal = () => {
        setFormData({
            ...emptyForm,
            stats: emptyForm.stats.map((item) => ({
                ...item,
            })),
            about_points: [...emptyForm.about_points],
            philosophy_items:
                emptyForm.philosophy_items.map(
                    (item) => ({ ...item })
                ),
            business_divisions:
                emptyForm.business_divisions.map(
                    (item) => ({ ...item })
                ),
            why_items: emptyForm.why_items.map(
                (item) => ({ ...item })
            ),
            about_image: null,
            why_image: null,
        });

        setSlides([]);
        setDeletedSlideIds([]);
        setShowModal(true);
    };

    const openEditModal = () => {
        if (!home) {
            openCreateModal();
            return;
        }

        setFormData({
            hero_label: home.hero_label || "",
            hero_title: home.hero_title || "",
            hero_highlight:
                home.hero_highlight || "",
            hero_title_suffix:
                home.hero_title_suffix || "",
            hero_description:
                home.hero_description || "",

            hero_primary_button_text:
                home.hero_primary_button_text || "",
            hero_primary_button_url:
                home.hero_primary_button_url || "",

            hero_secondary_button_text:
                home.hero_secondary_button_text || "",
            hero_secondary_button_url:
                home.hero_secondary_button_url || "",

            stats: home.stats || [],

            about_label: home.about_label || "",
            about_title: home.about_title || "",
            about_highlight:
                home.about_highlight || "",
            about_description:
                home.about_description || "",
            about_secondary_description:
                home.about_secondary_description ||
                "",
            about_points:
                home.about_points || [],
            about_image: null,
            existing_about_image:
                home.about_image || "",
            about_badge_title:
                home.about_badge_title || "",
            about_badge_subtitle:
                home.about_badge_subtitle || "",
            about_button_text:
                home.about_button_text || "",
            about_button_url:
                home.about_button_url || "",

            philosophy_label:
                home.philosophy_label || "",
            philosophy_title:
                home.philosophy_title || "",
            philosophy_description:
                home.philosophy_description || "",
            philosophy_items:
                home.philosophy_items || [],

            business_label:
                home.business_label || "",
            business_title:
                home.business_title || "",
            business_highlight:
                home.business_highlight || "",
            business_description:
                home.business_description || "",
            business_divisions:
                home.business_divisions || [],

            why_label: home.why_label || "",
            why_title: home.why_title || "",
            why_highlight:
                home.why_highlight || "",
            why_description:
                home.why_description || "",
            why_items: home.why_items || [],
            why_image: null,
            existing_why_image:
                home.why_image || "",

            responsible_title:
                home.responsible_title || "",
            responsible_description:
                home.responsible_description || "",

            status: Boolean(home.status),
        });

        setDeletedSlideIds([]);
        setShowModal(true);
    };

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
    };

    const updateField = (
        field: keyof FormData,
        value: any
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateStat = (
        index: number,
        field: keyof StatItem,
        value: string
    ) => {
        setFormData((prev) => {
            const stats = [...prev.stats];

            stats[index] = {
                ...stats[index],
                [field]: value,
            };

            return {
                ...prev,
                stats,
            };
        });
    };

    const addStat = () => {
        setFormData((prev) => ({
            ...prev,
            stats: [
                ...prev.stats,
                {
                    value: "",
                    label: "",
                    icon: "CheckCircle2",
                },
            ],
        }));
    };

    const removeStat = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const updateAboutPoint = (
        index: number,
        value: string
    ) => {
        setFormData((prev) => {
            const points = [...prev.about_points];

            points[index] = value;

            return {
                ...prev,
                about_points: points,
            };
        });
    };

    const addAboutPoint = () => {
        setFormData((prev) => ({
            ...prev,
            about_points: [
                ...prev.about_points,
                "",
            ],
        }));
    };

    const removeAboutPoint = (
        index: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            about_points:
                prev.about_points.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    const updateMission = (
        index: number,
        field: keyof MissionItem,
        value: string
    ) => {
        setFormData((prev) => {
            const items = [
                ...prev.philosophy_items,
            ];

            items[index] = {
                ...items[index],
                [field]: value,
            };

            return {
                ...prev,
                philosophy_items: items,
            };
        });
    };

    const addMission = () => {
        setFormData((prev) => ({
            ...prev,
            philosophy_items: [
                ...prev.philosophy_items,
                {
                    number: String(
                        prev.philosophy_items.length + 1
                    ).padStart(2, "0"),
                    title: "",
                    desc: "",
                    img: "",
                    icon: "Target",
                },
            ],
        }));
    };

    const removeMission = (
        index: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            philosophy_items:
                prev.philosophy_items.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    const updateDivision = (
        index: number,
        field: keyof DivisionItem,
        value: string
    ) => {
        setFormData((prev) => {
            const items = [
                ...prev.business_divisions,
            ];

            items[index] = {
                ...items[index],
                [field]: value,
            };

            return {
                ...prev,
                business_divisions: items,
            };
        });
    };

    const addDivision = () => {
        setFormData((prev) => ({
            ...prev,
            business_divisions: [
                ...prev.business_divisions,
                {
                    title: "",
                    description: "",
                    image: "",
                    icon: "Ship",
                    url: "/services",
                },
            ],
        }));
    };

    const removeDivision = (
        index: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            business_divisions:
                prev.business_divisions.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    const updateWhyItem = (
        index: number,
        field: keyof WhyItem,
        value: string
    ) => {
        setFormData((prev) => {
            const items = [
                ...prev.why_items,
            ];

            items[index] = {
                ...items[index],
                [field]: value,
            };

            return {
                ...prev,
                why_items: items,
            };
        });
    };

    const addWhyItem = () => {
        setFormData((prev) => ({
            ...prev,
            why_items: [
                ...prev.why_items,
                {
                    title: "",
                    desc: "",
                    icon: "ShieldCheck",
                },
            ],
        }));
    };

    const removeWhyItem = (
        index: number
    ) => {
        setFormData((prev) => ({
            ...prev,
            why_items:
                prev.why_items.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    const addSlide = () => {
        setSlides((prev) => [
            ...prev,
            {
                title: "",
                subtitle: "",
                media_type: "image",
                media: "",
                sort_order: prev.length + 1,
                status: true,
                file: null,
            },
        ]);
    };

    const updateSlide = (
        index: number,
        field: keyof HeroSlide,
        value: any
    ) => {
        setSlides((prev) => {
            const items = [...prev];

            items[index] = {
                ...items[index],
                [field]: value,
            };

            return items;
        });
    };

    const removeSlide = (index: number) => {
        const slide = slides[index];

        if (slide.id) {
            setDeletedSlideIds((prev) => [
                ...prev,
                slide.id as number,
            ]);
        }

        setSlides((prev) =>
            prev.filter(
                (_, i) => i !== index
            )
        );
    };

    const handleSlideFileChange = (
        index: number,
        file: File | null
    ) => {
        if (!file) return;

        const slide = slides[index];

        if (
            slide.media_type === "image"
        ) {
            const allowed = [
                "image/jpeg",
                "image/png",
                "image/webp",
            ];

            if (!allowed.includes(file.type)) {
                alert(
                    "Please select a JPG, JPEG, PNG or WEBP image."
                );
                return;
            }

            if (
                file.size >
                10 * 1024 * 1024
            ) {
                alert(
                    "Image size must not exceed 10 MB."
                );
                return;
            }
        }

        if (
            slide.media_type === "video"
        ) {
            if (file.type !== "video/mp4") {
                alert(
                    "Please select an MP4 video."
                );
                return;
            }

            if (
                file.size >
                100 * 1024 * 1024
            ) {
                alert(
                    "Video size must not exceed 100 MB."
                );
                return;
            }
        }

        updateSlide(
            index,
            "file",
            file
        );
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field:
            | "about_image"
            | "why_image"
    ) => {
        const file =
            e.target.files?.[0] || null;

        if (!file) return;

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowed.includes(file.type)) {
            alert(
                "Please select a JPG, JPEG, PNG or WEBP image."
            );

            e.target.value = "";

            return;
        }

        if (
            file.size >
            10 * 1024 * 1024
        ) {
            alert(
                "Image size must not exceed 10 MB."
            );

            e.target.value = "";

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [field]: file,
        }));
    };

    const saveHome = async () => {
        const data = new FormData();

        data.append(
            "hero_label",
            formData.hero_label
        );

        data.append(
            "hero_title",
            formData.hero_title
        );

        data.append(
            "hero_highlight",
            formData.hero_highlight
        );

        data.append(
            "hero_title_suffix",
            formData.hero_title_suffix
        );

        data.append(
            "hero_description",
            formData.hero_description
        );

        data.append(
            "hero_primary_button_text",
            formData.hero_primary_button_text
        );

        data.append(
            "hero_primary_button_url",
            formData.hero_primary_button_url
        );

        data.append(
            "hero_secondary_button_text",
            formData.hero_secondary_button_text
        );

        data.append(
            "hero_secondary_button_url",
            formData.hero_secondary_button_url
        );

        data.append(
            "stats",
            JSON.stringify(formData.stats)
        );

        data.append(
            "about_label",
            formData.about_label
        );

        data.append(
            "about_title",
            formData.about_title
        );

        data.append(
            "about_highlight",
            formData.about_highlight
        );

        data.append(
            "about_description",
            formData.about_description
        );

        data.append(
            "about_secondary_description",
            formData.about_secondary_description
        );

        data.append(
            "about_points",
            JSON.stringify(
                formData.about_points
            )
        );

        data.append(
            "about_badge_title",
            formData.about_badge_title
        );

        data.append(
            "about_badge_subtitle",
            formData.about_badge_subtitle
        );

        data.append(
            "about_button_text",
            formData.about_button_text
        );

        data.append(
            "about_button_url",
            formData.about_button_url
        );

        if (formData.about_image) {
            data.append(
                "about_image",
                formData.about_image
            );
        }

        data.append(
            "philosophy_label",
            formData.philosophy_label
        );

        data.append(
            "philosophy_title",
            formData.philosophy_title
        );

        data.append(
            "philosophy_description",
            formData.philosophy_description
        );

        data.append(
            "philosophy_items",
            JSON.stringify(
                formData.philosophy_items
            )
        );

        data.append(
            "business_label",
            formData.business_label
        );

        data.append(
            "business_title",
            formData.business_title
        );

        data.append(
            "business_highlight",
            formData.business_highlight
        );

        data.append(
            "business_description",
            formData.business_description
        );

        data.append(
            "business_divisions",
            JSON.stringify(
                formData.business_divisions
            )
        );

        data.append(
            "why_label",
            formData.why_label
        );

        data.append(
            "why_title",
            formData.why_title
        );

        data.append(
            "why_highlight",
            formData.why_highlight
        );

        data.append(
            "why_description",
            formData.why_description
        );

        data.append(
            "why_items",
            JSON.stringify(
                formData.why_items
            )
        );

        if (formData.why_image) {
            data.append(
                "why_image",
                formData.why_image
            );
        }

        data.append(
            "responsible_title",
            formData.responsible_title
        );

        data.append(
            "responsible_description",
            formData.responsible_description
        );

        data.append(
            "status",
            formData.status ? "1" : "0"
        );

        await api.post(
            "/website/admin/home/update",
            data,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );
    };

    const saveSlides = async () => {
        for (
            const id of deletedSlideIds
        ) {
            await api.delete(
                `/website/hero-slides/${id}`
            );
        }

        for (
            const slide of slides
        ) {
            const data = new FormData();

            data.append(
                "title",
                slide.title || ""
            );

            data.append(
                "subtitle",
                slide.subtitle || ""
            );

            data.append(
                "media_type",
                slide.media_type
            );

            data.append(
                "sort_order",
                String(
                    slide.sort_order
                )
            );

            data.append(
                "status",
                slide.status ? "1" : "0"
            );

            if (slide.file) {
                data.append(
                    "media",
                    slide.file
                );
            }

            if (slide.id) {
                data.append(
                    "_method",
                    "PUT"
                );

                await api.post(
                    `/website/hero-slides/${slide.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            } else {
                await api.post(
                    "/website/hero-slides",
                    data,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            }
        }
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setSaving(true);

            await saveHome();

            await saveSlides();

            alert(
                "Home page content updated successfully."
            );

            setShowModal(false);

            await fetchHome();
        } catch (error: any) {
            console.error(error);

            if (
                error.response?.data?.errors
            ) {
                const errors =
                    error.response.data
                        .errors;

                const firstError =
                    Object.values(errors)
                        .flat()
                        .at(0);

                alert(
                    String(
                        firstError ||
                            "Validation failed."
                    )
                );
            } else if (
                error.response?.data?.message
            ) {
                alert(
                    error.response.data.message
                );
            } else {
                alert(
                    "Something went wrong while saving."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const getIcon = (
        icon: string
    ) => {
        const icons: Record<
            string,
            any
        > = {
            Waves,
            Award,
            Globe2,
            CheckCircle2,
            MoveUpRight,
            ShieldCheck,
            Target,
            Ship,
            Anchor,
            Users,
            Leaf,
        };

        return (
            icons[icon] ||
            CheckCircle2
        );
    };

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#06245a]";

    return (
        <div className="p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Home Page
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all website home page content and hero slides.
                    </p>
                </div>

                <button
                    onClick={
                        home
                            ? openEditModal
                            : openCreateModal
                    }
                    className="flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#041b45]"
                >
                    {home ? (
                        <>
                            <Pencil size={18} />
                            Edit Home Page
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Create Home Page
                        </>
                    )}
                </button>

            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#06245a]" />
                    </div>
                ) : !home ? (
                    <div className="py-20 text-center">

                        <ImageIcon
                            size={42}
                            className="mx-auto mb-3 text-gray-300"
                        />

                        <h3 className="text-lg font-medium text-gray-700">
                            Home page content not found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Create your home page content.
                        </p>

                        <button
                            onClick={
                                openCreateModal
                            }
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#06245a] px-4 py-2.5 text-sm font-medium text-white"
                        >
                            <Plus size={17} />
                            Create Home Page
                        </button>

                    </div>
                ) : (
                    <div className="p-6">

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Hero
                                </div>

                                <div className="mt-2 text-lg font-semibold text-gray-800">
                                    {home.hero_title}
                                </div>

                                <div className="text-sm text-blue-700">
                                    {home.hero_highlight}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Hero Slides
                                </div>

                                <div className="mt-2 text-2xl font-semibold text-[#06245a]">
                                    {slides.length}
                                </div>

                                <div className="text-sm text-gray-500">
                                    Images / Videos
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Statistics
                                </div>

                                <div className="mt-2 text-2xl font-semibold text-[#06245a]">
                                    {home.stats?.length || 0}
                                </div>

                                <div className="text-sm text-gray-500">
                                    Stat items
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Missions
                                </div>

                                <div className="mt-2 text-2xl font-semibold text-[#06245a]">
                                    {home.philosophy_items?.length || 0}
                                </div>

                                <div className="text-sm text-gray-500">
                                    Mission cards
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Status
                                </div>

                                <div className="mt-2 flex items-center gap-2">

                                    {home.status ? (
                                        <>
                                            <Eye
                                                size={18}
                                                className="text-green-600"
                                            />

                                            <span className="font-medium text-green-700">
                                                Active
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff
                                                size={18}
                                                className="text-gray-500"
                                            />

                                            <span className="font-medium text-gray-600">
                                                Inactive
                                            </span>
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-2">

                            <div className="rounded-xl border border-gray-200 p-5">

                                <h3 className="font-semibold text-gray-800">
                                    Hero Content
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {home.hero_description}
                                </p>

                                <div className="mt-4 flex gap-2 text-xs text-gray-500">

                                    <span className="rounded-full bg-gray-100 px-3 py-1">
                                        {home.hero_primary_button_text}
                                    </span>

                                    <span className="rounded-full bg-gray-100 px-3 py-1">
                                        {home.hero_secondary_button_text}
                                    </span>

                                </div>

                            </div>

                            <div className="rounded-xl border border-gray-200 p-5">

                                <h3 className="font-semibold text-gray-800">
                                    About Section
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {home.about_description}
                                </p>

                                <div className="mt-4 text-sm text-gray-600">
                                    {home.about_points?.length || 0} checklist items
                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </div>

            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[94vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-white shadow-xl">

                        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {home
                                        ? "Edit Home Page"
                                        : "Create Home Page"}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Manage hero slider and all home page content.
                                </p>
                            </div>

                            <button
                                onClick={
                                    closeModal
                                }
                                disabled={
                                    saving
                                }
                                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="space-y-8 p-6"
                        >

                            {/* HERO SLIDER */}

                            <section>

                                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                    <div>
                                        <h3 className="text-base font-semibold text-[#06245a]">
                                            Hero Slider
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Upload hero images or MP4 videos and manage slider order.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            addSlide
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs font-medium text-white"
                                    >
                                        <Plus
                                            size={15}
                                        />
                                        Add Slide
                                    </button>

                                </div>

                                <div className="space-y-5">

                                    {slides.length ===
                                    0 ? (
                                        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10 text-center">

                                            <ImageIcon
                                                size={35}
                                                className="mx-auto mb-3 text-gray-300"
                                            />

                                            <p className="text-sm text-gray-500">
                                                No hero slides added.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={
                                                    addSlide
                                                }
                                                className="mt-4 rounded-lg bg-[#06245a] px-4 py-2 text-sm text-white"
                                            >
                                                Add First Slide
                                            </button>

                                        </div>
                                    ) : (
                                        slides.map(
                                            (
                                                slide,
                                                index
                                            ) => (
                                                <div
                                                    key={
                                                        slide.id ||
                                                        `new-${index}`
                                                    }
                                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                                >

                                                    <div className="mb-4 flex items-center justify-between">

                                                        <div className="flex items-center gap-2">

                                                            <span className="rounded-full bg-[#06245a] px-3 py-1 text-xs font-medium text-white">
                                                                Slide{" "}
                                                                {index +
                                                                    1}
                                                            </span>

                                                            {slide.media_type ===
                                                            "video" ? (
                                                                <Video
                                                                    size={
                                                                        17
                                                                    }
                                                                    className="text-gray-500"
                                                                />
                                                            ) : (
                                                                <ImageIcon
                                                                    size={
                                                                        17
                                                                    }
                                                                    className="text-gray-500"
                                                                />
                                                            )}

                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeSlide(
                                                                    index
                                                                )
                                                            }
                                                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    17
                                                                }
                                                            />
                                                        </button>

                                                    </div>

                                                    <div className="grid gap-4 md:grid-cols-4">

                                                        <div>
                                                            <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                                                Title
                                                            </label>

                                                            <input
                                                                value={
                                                                    slide.title
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateSlide(
                                                                        index,
                                                                        "title",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                                                Subtitle
                                                            </label>

                                                            <input
                                                                value={
                                                                    slide.subtitle
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateSlide(
                                                                        index,
                                                                        "subtitle",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                                                Media Type
                                                            </label>

                                                            <select
                                                                value={
                                                                    slide.media_type
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateSlide(
                                                                        index,
                                                                        "media_type",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            >
                                                                <option value="image">
                                                                    Image
                                                                </option>

                                                                <option value="video">
                                                                    Video
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                                                Sort Order
                                                            </label>

                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    slide.sort_order
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateSlide(
                                                                        index,
                                                                        "sort_order",
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="mt-4">

                                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                                            Upload{" "}
                                                            {slide.media_type ===
                                                            "video"
                                                                ? "MP4 Video"
                                                                : "Image"}
                                                        </label>

                                                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-5 text-sm text-gray-600 hover:border-[#06245a]">

                                                            {slide.media_type ===
                                                            "video" ? (
                                                                <Video
                                                                    size={
                                                                        18
                                                                    }
                                                                />
                                                            ) : (
                                                                <Upload
                                                                    size={
                                                                        18
                                                                    }
                                                                />
                                                            )}

                                                            {slide.file
                                                                ? slide
                                                                      .file
                                                                      .name
                                                                : `Choose ${
                                                                      slide.media_type ===
                                                                      "video"
                                                                          ? "Video"
                                                                          : "Image"
                                                                  }`}

                                                            <input
                                                                type="file"
                                                                accept={
                                                                    slide.media_type ===
                                                                    "video"
                                                                        ? "video/mp4"
                                                                        : "image/jpeg,image/png,image/webp"
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    handleSlideFileChange(
                                                                        index,
                                                                        e
                                                                            .target
                                                                            .files?.[0] ||
                                                                            null
                                                                    )
                                                                }
                                                                className="hidden"
                                                            />

                                                        </label>

                                                    </div>

                                                    {slide.media && (
                                                        <div className="mt-4">

                                                            <div className="mb-2 text-xs font-medium text-gray-600">
                                                                Current Media
                                                            </div>

                                                            {slide.media_type ===
                                                            "video" ? (
                                                                <video
                                                                    src={
                                                                        slide.media
                                                                    }
                                                                    controls
                                                                    className="h-48 w-full rounded-lg object-cover"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        slide.media
                                                                    }
                                                                    alt={
                                                                        slide.title ||
                                                                        "Hero Slide"
                                                                    }
                                                                    className="h-48 w-full rounded-lg object-cover"
                                                                />
                                                            )}

                                                        </div>
                                                    )}

                                                    <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">

                                                        <div>
                                                            <div className="text-sm font-medium text-gray-700">
                                                                Slide Status
                                                            </div>

                                                            <div className="text-xs text-gray-500">
                                                                Show this slide on the website.
                                                            </div>
                                                        </div>

                                                        <label className="relative inline-flex cursor-pointer items-center">

                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    slide.status
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateSlide(
                                                                        index,
                                                                        "status",
                                                                        e
                                                                            .target
                                                                            .checked
                                                                    )
                                                                }
                                                                className="peer sr-only"
                                                            />

                                                            <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#06245a] peer-checked:after:translate-x-full peer-checked:after:border-white" />

                                                        </label>

                                                    </div>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>

                            </section>

                            {/* HERO TEXT */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Hero Content
                                    </h3>

                                </div>

                                <div className="grid gap-5 md:grid-cols-3">

                                    <input
                                        value={
                                            formData.hero_label
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_label",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Brand Label"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.hero_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Connecting"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.hero_highlight
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_highlight",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Business"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                                <input
                                    value={
                                        formData.hero_title_suffix
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "hero_title_suffix",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Through The Sea."
                                    className={`mt-4 ${inputClass}`}
                                />

                                <textarea
                                    rows={3}
                                    value={
                                        formData.hero_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "hero_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                                <div className="mt-4 grid gap-4 md:grid-cols-2">

                                    <input
                                        value={
                                            formData.hero_primary_button_text
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_primary_button_text",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Primary Button"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.hero_primary_button_url
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_primary_button_url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="/about"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.hero_secondary_button_text
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_secondary_button_text",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Secondary Button"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.hero_secondary_button_url
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "hero_secondary_button_url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="/contact"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                            </section>

                            {/* STATS */}

                            <section>

                                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Floating Statistics
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addStat
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs text-white"
                                    >
                                        <Plus size={15} />
                                        Add
                                    </button>

                                </div>

                                <div className="grid gap-4 md:grid-cols-2">

                                    {formData.stats.map(
                                        (
                                            stat,
                                            index
                                        ) => {
                                            const Icon =
                                                getIcon(
                                                    stat.icon
                                                );

                                            return (
                                                <div
                                                    key={
                                                        index
                                                    }
                                                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                                                >

                                                    <div className="mb-3 flex items-center justify-between">

                                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                            <Icon
                                                                size={
                                                                    17
                                                                }
                                                            />
                                                            Stat{" "}
                                                            {index +
                                                                1}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeStat(
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>

                                                    </div>

                                                    <div className="grid gap-3 md:grid-cols-3">

                                                        <input
                                                            value={
                                                                stat.value
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateStat(
                                                                    index,
                                                                    "value",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="24/7"
                                                            className={
                                                                inputClass
                                                            }
                                                        />

                                                        <input
                                                            value={
                                                                stat.label
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateStat(
                                                                    index,
                                                                    "label",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Operational Support"
                                                            className={
                                                                inputClass
                                                            }
                                                        />

                                                        <select
                                                            value={
                                                                stat.icon
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateStat(
                                                                    index,
                                                                    "icon",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClass
                                                            }
                                                        >
                                                            {iconOptions.map(
                                                                (
                                                                    icon
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            icon
                                                                        }
                                                                        value={
                                                                            icon
                                                                        }
                                                                    >
                                                                        {
                                                                            icon
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>

                                                    </div>

                                                </div>
                                            );
                                        }
                                    )}

                                </div>

                            </section>

                            {/* ABOUT */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">
                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        About Section
                                    </h3>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">

                                    <input
                                        value={
                                            formData.about_label
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_label",
                                                e.target.value
                                            )
                                        }
                                        placeholder="01 — About Us"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.about_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Built on trust."
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.about_highlight
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_highlight",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Driven by progress."
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                                <textarea
                                    rows={3}
                                    value={
                                        formData.about_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "about_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                                <textarea
                                    rows={4}
                                    value={
                                        formData.about_secondary_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "about_secondary_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                                <div className="mt-5">

                                    <div className="mb-3 flex items-center justify-between">

                                        <label className="text-sm font-medium text-gray-700">
                                            Checklist
                                        </label>

                                        <button
                                            type="button"
                                            onClick={
                                                addAboutPoint
                                            }
                                            className="text-xs font-medium text-[#06245a]"
                                        >
                                            + Add Item
                                        </button>

                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">

                                        {formData.about_points.map(
                                            (
                                                point,
                                                index
                                            ) => (
                                                <div
                                                    key={
                                                        index
                                                    }
                                                    className="flex gap-2"
                                                >

                                                    <input
                                                        value={
                                                            point
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateAboutPoint(
                                                                index,
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeAboutPoint(
                                                                index
                                                            )
                                                        }
                                                        className="rounded-lg border border-red-100 px-3 text-red-500"
                                                    >
                                                        <Trash2
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>

                                <div className="mt-5 grid gap-5 md:grid-cols-2">

                                    <div>

                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            About Image
                                        </label>

                                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-sm text-gray-600 hover:border-[#06245a]">

                                            <Upload
                                                size={17}
                                            />

                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={(e) =>
                                                    handleImageChange(
                                                        e,
                                                        "about_image"
                                                    )
                                                }
                                                className="hidden"
                                            />

                                        </label>

                                        {formData.about_image && (
                                            <p className="mt-2 text-xs text-green-600">
                                                {
                                                    formData
                                                        .about_image
                                                        .name
                                                }
                                            </p>
                                        )}

                                    </div>

                                    <div>

                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Current Image
                                        </label>

                                        {formData.existing_about_image && (
                                            <img
                                                src={
                                                    formData.existing_about_image
                                                }
                                                alt="About"
                                                className="h-28 w-full rounded-lg object-cover"
                                            />
                                        )}

                                    </div>

                                </div>

                                <div className="mt-5 grid gap-4 md:grid-cols-4">

                                    <input
                                        value={
                                            formData.about_badge_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_badge_title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Badge Title"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.about_badge_subtitle
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_badge_subtitle",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Badge Subtitle"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.about_button_text
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_button_text",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Button Text"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.about_button_url
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "about_button_url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="/about"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                            </section>

                            {/* PHILOSOPHY */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Philosophy Section
                                    </h3>

                                </div>

                                <input
                                    value={
                                        formData.philosophy_label
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "philosophy_label",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        inputClass
                                    }
                                />

                                <textarea
                                    rows={3}
                                    value={
                                        formData.philosophy_title
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "philosophy_title",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                                <textarea
                                    rows={4}
                                    value={
                                        formData.philosophy_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "philosophy_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                            </section>

                            {/* MISSIONS */}

                            <section>

                                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Mission / Values
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addMission
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs text-white"
                                    >
                                        <Plus size={15} />
                                        Add Mission
                                    </button>

                                </div>

                                <div className="space-y-5">

                                    {formData.philosophy_items.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                            >

                                                <div className="mb-4 flex items-center justify-between">

                                                    <span className="text-sm font-semibold text-gray-700">
                                                        Mission{" "}
                                                        {index +
                                                            1}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeMission(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                                <div className="grid gap-4 md:grid-cols-4">

                                                    <input
                                                        value={
                                                            item.number
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateMission(
                                                                index,
                                                                "number",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <input
                                                        value={
                                                            item.title
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateMission(
                                                                index,
                                                                "title",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <select
                                                        value={
                                                            item.icon
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateMission(
                                                                index,
                                                                "icon",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    >
                                                        {iconOptions.map(
                                                            (
                                                                icon
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        icon
                                                                    }
                                                                    value={
                                                                        icon
                                                                    }
                                                                >
                                                                    {
                                                                        icon
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <input
                                                        value={
                                                            item.img
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateMission(
                                                                index,
                                                                "img",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="/images/ship.jpg"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>

                                                <textarea
                                                    rows={4}
                                                    value={
                                                        item.desc
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateMission(
                                                            index,
                                                            "desc",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className={`mt-4 ${inputClass}`}
                                                />

                                            </div>
                                        )
                                    )}

                                </div>

                            </section>

                            {/* BUSINESS */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Business Section
                                    </h3>

                                </div>

                                <div className="grid gap-4 md:grid-cols-3">

                                    <input
                                        value={
                                            formData.business_label
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "business_label",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.business_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "business_title",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.business_highlight
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "business_highlight",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                                <textarea
                                    rows={3}
                                    value={
                                        formData.business_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "business_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                            </section>

                            {/* DIVISIONS */}

                            <section>

                                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Business Divisions
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addDivision
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs text-white"
                                    >
                                        <Plus size={15} />
                                        Add Division
                                    </button>

                                </div>

                                <div className="space-y-5">

                                    {formData.business_divisions.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                            >

                                                <div className="mb-4 flex items-center justify-between">

                                                    <span className="text-sm font-semibold text-gray-700">
                                                        Division{" "}
                                                        {index +
                                                            1}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeDivision(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                                <div className="grid gap-4 md:grid-cols-4">

                                                    <input
                                                        value={
                                                            item.title
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateDivision(
                                                                index,
                                                                "title",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <select
                                                        value={
                                                            item.icon
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateDivision(
                                                                index,
                                                                "icon",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    >
                                                        {iconOptions.map(
                                                            (
                                                                icon
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        icon
                                                                    }
                                                                    value={
                                                                        icon
                                                                    }
                                                                >
                                                                    {
                                                                        icon
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <input
                                                        value={
                                                            item.image
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateDivision(
                                                                index,
                                                                "image",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="/images/Picture4.png"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <input
                                                        value={
                                                            item.url ||
                                                            "/services"
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateDivision(
                                                                index,
                                                                "url",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="/services"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>

                                                <textarea
                                                    rows={3}
                                                    value={
                                                        item.description
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateDivision(
                                                            index,
                                                            "description",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className={`mt-4 ${inputClass}`}
                                                />

                                            </div>
                                        )
                                    )}

                                </div>

                            </section>

                            {/* WHY */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Why MML
                                    </h3>

                                </div>

                                <div className="grid gap-4 md:grid-cols-3">

                                    <input
                                        value={
                                            formData.why_label
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "why_label",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.why_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "why_title",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                    <input
                                        value={
                                            formData.why_highlight
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "why_highlight",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                                <textarea
                                    rows={3}
                                    value={
                                        formData.why_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "why_description",
                                            e.target.value
                                        )
                                    }
                                    className={`mt-4 ${inputClass}`}
                                />

                                <div className="mt-5 grid gap-5 md:grid-cols-2">

                                    <div>

                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Why MML Image
                                        </label>

                                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-sm text-gray-600 hover:border-[#06245a]">

                                            <Upload
                                                size={17}
                                            />

                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={(e) =>
                                                    handleImageChange(
                                                        e,
                                                        "why_image"
                                                    )
                                                }
                                                className="hidden"
                                            />

                                        </label>

                                        {formData.why_image && (
                                            <p className="mt-2 text-xs text-green-600">
                                                {
                                                    formData
                                                        .why_image
                                                        .name
                                                }
                                            </p>
                                        )}

                                    </div>

                                    <div>

                                        {formData.existing_why_image && (
                                            <img
                                                src={
                                                    formData.existing_why_image
                                                }
                                                alt="Why MML"
                                                className="h-28 w-full rounded-lg object-cover"
                                            />
                                        )}

                                    </div>

                                </div>

                            </section>

                            {/* WHY ITEMS */}

                            <section>

                                <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Why MML Items
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addWhyItem
                                        }
                                        className="flex items-center gap-1.5 rounded-lg bg-[#06245a] px-3 py-2 text-xs text-white"
                                    >
                                        <Plus size={15} />
                                        Add Item
                                    </button>

                                </div>

                                <div className="space-y-4">

                                    {formData.why_items.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                            >

                                                <div className="mb-4 flex items-center justify-between">

                                                    <span className="text-sm font-semibold text-gray-700">
                                                        Item{" "}
                                                        {index +
                                                            1}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeWhyItem(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                                <div className="grid gap-4 md:grid-cols-2">

                                                    <input
                                                        value={
                                                            item.title
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateWhyItem(
                                                                index,
                                                                "title",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <select
                                                        value={
                                                            item.icon
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateWhyItem(
                                                                index,
                                                                "icon",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    >
                                                        {iconOptions.map(
                                                            (
                                                                icon
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        icon
                                                                    }
                                                                    value={
                                                                        icon
                                                                    }
                                                                >
                                                                    {
                                                                        icon
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                </div>

                                                <textarea
                                                    rows={3}
                                                    value={
                                                        item.desc
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateWhyItem(
                                                            index,
                                                            "desc",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className={`mt-4 ${inputClass}`}
                                                />

                                            </div>
                                        )
                                    )}

                                </div>

                            </section>

                            {/* RESPONSIBLE */}

                            <section>

                                <div className="mb-5 border-b border-gray-200 pb-3">

                                    <h3 className="text-base font-semibold text-[#06245a]">
                                        Responsible Growth
                                    </h3>

                                </div>

                                <div className="grid gap-4 md:grid-cols-2">

                                    <input
                                        value={
                                            formData.responsible_title
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "responsible_title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Responsible Growth"
                                        className={
                                            inputClass
                                        }
                                    />

                                    <textarea
                                        rows={2}
                                        value={
                                            formData.responsible_description
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "responsible_description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Description"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>

                            </section>

                            {/* STATUS */}

                            <section>

                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">

                                    <div>
                                        <div className="text-sm font-medium text-gray-700">
                                            Home Page Status
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            Show home page content on the website.
                                        </div>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer items-center">

                                        <input
                                            type="checkbox"
                                            checked={
                                                formData.status
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    "status",
                                                    e.target
                                                        .checked
                                                )
                                            }
                                            className="peer sr-only"
                                        />

                                        <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#06245a] peer-checked:after:translate-x-full peer-checked:after:border-white" />

                                    </label>

                                </div>

                            </section>

                            {/* ACTION */}

                            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-white pt-5">

                                <button
                                    type="button"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="flex items-center gap-2 rounded-lg bg-[#06245a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#041b45] disabled:opacity-50"
                                >

                                    {saving ? (
                                        "Saving..."
                                    ) : (
                                        <>
                                            <Save
                                                size={
                                                    17
                                                }
                                            />

                                            {home
                                                ? "Update Home Page"
                                                : "Create Home Page"}
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}
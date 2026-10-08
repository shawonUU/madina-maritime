"use client";

import Image from "next/image";
import {
    Award,
    Globe2,
    Leaf,
    ShieldCheck,
    Ship,
    Sparkles,
    Target,
    Waves,
    ArrowUpRight,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";

interface Milestone {
    year: string;
    title: string;
    description: string;
}

interface TonnageYear {
    year: number;
    tonnage: number;
}

interface CommodityMovement {
    commodity: string;
    customer: string;
    values: string[];
    total?: string;
}

interface AboutData {
    id: number;
    label: string | null;
    title: string | null;
    highlight: string | null;
    description: string | null;
    image: string | null;

    journey_description: string | null;
    milestones: Milestone[];

    mission_title: string | null;
    mission_description: string | null;

    vision_title: string | null;
    vision_description: string | null;

    looking_ahead_title: string | null;
    looking_ahead_description: string | null;

    tonnage: TonnageYear[];

    status: boolean;
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

const defaultAbout: AboutData = {
    id: 0,
    label: "About Madina Maritime",
    title: "Built on Trust. Driven by Progress.",
    highlight: "Trust.",
    description:
        "Discover the people, principles and ambitions behind Madina Maritime Limited and our journey toward a stronger maritime future.",
    image: "/images/ship2.jpg",

    journey_description:
        "Our story is one of continuous progress. From our early beginnings to our current maritime operations, each stage has shaped who we are today.",

    milestones: [
        {
            year: "2000+",
            title: "The Beginning",
            description:
                "The foundation of a long-term business journey built around ambition, discipline and trust.",
        },
        {
            year: "2010+",
            title: "Business Expansion",
            description:
                "Expansion across multiple business areas strengthened the group's capabilities and market presence.",
        },
        {
            year: "2020+",
            title: "Digital Evolution",
            description:
                "Technology and modern operational systems became increasingly important to our way of working.",
        },
        {
            year: "2026",
            title: "Moving Forward",
            description:
                "Continuing to develop our maritime capabilities with a strong focus on reliability, innovation and sustainable growth.",
        },
    ],

    mission_title: "Delivering meaningful maritime solutions.",
    mission_description:
        "Madina Maritime Ltd. is a concern of Madina Group, strive to develop this venture through its customer driven value-added shipping services by meeting the requirements of its customer/ partner through innovation, strategy and to create competitive edge in growing Maritime Trade development to/from Bangladesh.",

    vision_title: "Creating a stronger maritime future.",
    vision_description:
        "To become a trusted maritime organization recognized for operational excellence, innovation, safety and sustainable contribution to the industries and communities we serve.",

    looking_ahead_title: "Looking Ahead",
    looking_ahead_description:
        "We continue to invest in people, technology and operational capabilities to build a stronger future.",

    tonnage: [
        {
            year: 2022,
            tonnage: 185000,
        },
        {
            year: 2023,
            tonnage: 240000,
        },
        {
            year: 2024,
            tonnage: 315000,
        },
        {
            year: 2025,
            tonnage: 380000,
        },
    ],

    status: true,
};

const defaultStats: Stat[] = [
    {
        id: 1,
        value: "30+",
        label: "Years of Experience",
        sort_order: 1,
        status: true,
    },
    {
        id: 2,
        value: "05",
        label: "Business Divisions",
        sort_order: 2,
        status: true,
    },
    {
        id: 3,
        value: "50+",
        label: "Global Routes",
        sort_order: 3,
        status: true,
    },
    {
        id: 4,
        value: "1000+",
        label: "Successful Deliveries",
        sort_order: 4,
        status: true,
    },
];

const defaultCommodityData: CommodityMovement[] = [
    {
        commodity: "Scrap",
        customer: "Rahim Steel",
        values: ["180000", "200000", "150000", "122000"],
        total: "295K",
    },
    {
        commodity: "Manganese",
        customer: "Rahim Steel",
        values: ["165000", "250000", "170000", "234000"],
        total: "327K",
    },
    {
        commodity: "Stone",
        customer: "Awal & Brothers",
        values: ["240000", "300000", "320000", "370000"],
        total: "226K",
    },
    {
        commodity: "Lime Stone",
        customer: "Awal & Brothers",
        values: ["220000", "270000", "220000", "180000"],
        total: "182K",
    },
    {
        commodity: "Coal",
        customer: "QNS Shipping Logistics Lts",
        values: ["170000", "230000", "180000", "200000"],
        total: "90K",
    },
];

export default function AboutPage() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["website-about-page"],

        queryFn: async () => {
            const [
                aboutResponse,
                statsResponse,
                teamResponse,
            ] = await Promise.all([
                api.get("/website/about"),
                api.get("/website/about/stats"),
                api.get("/website/about/team"),
            ]);

            const aboutApiData = aboutResponse.data?.data;

            const aboutData: AboutData =
                aboutResponse.data?.status && aboutApiData
                    ? {
                        ...defaultAbout,
                        ...aboutApiData,

                        milestones: Array.isArray(
                            aboutApiData.milestones
                        )
                            ? aboutApiData.milestones
                            : defaultAbout.milestones,

                        tonnage: Array.isArray(
                            aboutApiData.tonnage
                        )
                            ? aboutApiData.tonnage
                            : defaultAbout.tonnage,
                    }
                    : defaultAbout;

            const statsData: Stat[] =
                statsResponse.data?.status &&
                Array.isArray(statsResponse.data?.data)
                    ? statsResponse.data.data
                        .filter(
                            (stat: Stat) =>
                                stat.status !== false
                        )
                        .sort(
                            (a: Stat, b: Stat) =>
                                a.sort_order - b.sort_order
                        )
                    : defaultStats;

            const teamData: TeamMember[] =
                teamResponse.data?.status &&
                Array.isArray(teamResponse.data?.data)
                    ? teamResponse.data.data
                    : [];

            const managementData = teamData
                .filter(
                    (member) =>
                        member.category === "management" &&
                        member.status !== false
                )
                .sort(
                    (a, b) =>
                        a.sort_order - b.sort_order
                );

            const leadershipData = teamData
                .filter(
                    (member) =>
                        member.category === "leadership" &&
                        member.status !== false
                )
                .sort(
                    (a, b) =>
                        a.sort_order - b.sort_order
                );

            return {
                about: aboutData,
                stats:
                    statsData.length > 0
                        ? statsData
                        : defaultStats,
                management: managementData,
                leadership: leadershipData,
            };
        },

        staleTime: Infinity,
        gcTime: Infinity,

        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,

        retry: 1,
    });

    const about = data?.about ?? defaultAbout;
    const stats = data?.stats ?? defaultStats;
    const management = data?.management ?? [];
    const leadership = data?.leadership ?? [];
    const commodityData = defaultCommodityData;

    const getStatIcon = (index: number) => {
        const icons = [
            Award,
            Globe2,
            Waves,
            Ship,
        ];

        return icons[index] || Award;
    };

    if (isLoading) {
        return (
            <main className="flex min-h-[600px] items-center justify-center bg-white">
                <div className="text-sm text-slate-500">
                    Loading...
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex min-h-[600px] items-center justify-center bg-white">
                <div className="text-sm text-red-500">
                    Failed to load About page data.
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white text-slate-900">

            {/* HERO */}
            <section className="relative h-[600px] overflow-hidden bg-[#041a35]">

                <Image
                    src={about.image || "/images/ship2.jpg"}
                    alt="Madina Maritime vessel"
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/70 to-[#062653]/20" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/80 via-transparent to-transparent" />

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                        backgroundSize: "70px 70px",
                    }}
                />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

                    <div className="max-w-4xl">

                        <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                            <span className="h-px w-12 bg-blue-400" />

                            {about.label || "About Madina Maritime"}
                        </div>

                        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {about.title || "Built on Trust. Driven by Progress."}
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
                            {about.description}
                        </p>

                    </div>

                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-white [clip-path:ellipse(70%_100%_at_50%_100%)]" />

            </section>

            {/* INTRO STATS */}
            <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

                <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((stat, index) => {
                        const LucideIcon = getStatIcon(index);

                        return (
                            <div
                                key={stat.id}
                                className={`flex items-center gap-5 p-7 ${
                                    index !== stats.length - 1
                                        ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                                        : ""
                                }`}
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                                    <LucideIcon size={22} />
                                </div>

                                <div>
                                    <div className="text-2xl font-bold text-[#06245a]">
                                        {stat.value}
                                    </div>

                                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </section>

            <section className="py-5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">

                        <div>

                            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                                Our Journey
                            </div>

                            <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
                                Growing with
                                <br />
                                purpose.
                            </h2>

                            <p className="mt-6 leading-7 text-slate-600">
                                {about.journey_description}
                            </p>

                            <div className="mt-8 rounded-2xl bg-[#06245a] p-7 text-white">

                                <div className="flex items-center gap-3">
                                    <Waves
                                        size={20}
                                        className="text-blue-300"
                                    />

                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        {about.looking_ahead_title ||
                                            "Looking Ahead"}
                                    </span>
                                </div>

                                <p className="mt-4 text-sm leading-6 text-blue-100/70">
                                    {about.looking_ahead_description}
                                </p>

                            </div>

                        </div>

                        <div className="relative">

                            <div className="absolute bottom-5 left-[31px] top-5 w-px bg-blue-100" />

                            <div className="space-y-10">

                                {(about.milestones || []).map(
                                    (item, index) => (
                                        <div
                                            key={`${item.year}-${index}`}
                                            className="relative flex gap-7"
                                        >

                                            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#06245a] text-xs font-bold text-white shadow-md">
                                                {item.year}
                                            </div>

                                            <div className="pt-1">

                                                <h3 className="text-xl font-bold text-[#06245a]">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                                    {item.description}
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* MISSION / VISION */}
            <section className="bg-[#06245a] py-5 text-white">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid gap-8 md:grid-cols-2">

                        <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                                <Target size={23} />
                            </div>

                            <div className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                                Our Mission
                            </div>

                            <h2 className="mt-3 text-3xl font-bold">
                                {about.mission_title}
                            </h2>

                            <p className="mt-5 leading-7 text-blue-100/70">
                                {about.mission_description}
                            </p>

                            <div className="mt-7 flex items-center gap-2 text-sm font-bold text-white">
                                Our Purpose
                                <ArrowUpRight size={16} />
                            </div>

                        </div>

                        <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                                <Globe2 size={23} />
                            </div>

                            <div className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                                Our Vision
                            </div>

                            <h2 className="mt-3 text-3xl font-bold">
                                {about.vision_title}
                            </h2>

                            <p className="mt-5 leading-7 text-blue-100/70">
                                {about.vision_description}
                            </p>

                            <div className="mt-7 flex items-center gap-2 text-sm font-bold text-white">
                                Our Direction
                                <ArrowUpRight size={16} />
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-slate-50 py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">

                        <div>
                            <div className="mb-4 flex items-center gap-3 text-blue-700">
                                <span className="h-px w-10 bg-blue-600" />

                                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                    Operational Performance
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold leading-tight text-[#06245a] sm:text-4xl lg:text-5xl">
                                Yearly Tonnage
                                <span className="text-blue-600">
                                    {" "}Movement{" "}
                                </span>
                            </h2>
                        </div>

                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {(about.tonnage || []).map(
                            (item) => (
                                <div
                                    key={item.year}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            {item.year}
                                        </span>

                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                                            MT
                                        </span>
                                    </div>

                                    <div className="mt-3 text-3xl font-bold text-[#06245a]">
                                        {item.tonnage}
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        Total Tonnage
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 px-6 py-5">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                                <div>
                                    <h3 className="text-lg font-bold text-[#06245a]">
                                        Commodity wise Tonnage Movement
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Annual cargo movement by commodity
                                    </p>
                                </div>

                                <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                                    Unit: Metric Ton (MT)
                                </div>

                            </div>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Commodity
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            2022
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            2023
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            2024
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                            2025
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {commodityData.map(
                                        (item) => (
                                            <tr
                                                key={item.commodity}
                                                className="transition hover:bg-slate-50"
                                            >

                                                <td className="px-6 py-4">

                                                    <div className="font-semibold text-[#06245a]">
                                                        <p>{item.commodity}</p>

                                                        <p className="text-xs">
                                                            {item.customer}
                                                        </p>
                                                    </div>

                                                </td>

                                                {item.values.map(
                                                    (value, index) => (
                                                        <td
                                                            key={index}
                                                            className="px-6 py-4 text-right text-sm text-slate-600"
                                                        >
                                                            {value}
                                                        </td>
                                                    )
                                                )}

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center">

                            <span className="text-xs text-slate-500">
                                Figures represent annual cargo movement by commodity.
                            </span>

                            <span className="text-xs font-semibold text-blue-700">
                                Madina Maritime Limited
                            </span>

                        </div>

                    </div>

                </div>
            </section>

            <section className="py-10">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

                        <div>

                            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                                05 — Management
                            </div>

                            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                                Meet Our Management Team
                            </h2>

                        </div>

                    </div>

                    <div className="mt-14 grid gap-7 md:grid-cols-4">

                        {management.map(
                            (person) => (
                                <div
                                    key={person.id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                                >

                                    <div className="relative h-[300px] overflow-hidden">

                                        {person.image ? (
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                unoptimized
                                                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-6 left-6">

                                            <h3 className="text-xl font-bold text-white">
                                                {person.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-blue-200">
                                                {person.designation}
                                            </p>

                                            {person.email && (
                                                <p className="mt-1 text-sm text-blue-200">
                                                    Email: {person.email}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </section>

            <section className="py-10">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

                        <div>

                            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                                06 — Leadership
                            </div>

                            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                                People behind our progress.
                            </h2>

                        </div>

                    </div>

                    <div className="mt-14 grid gap-7 md:grid-cols-4">

                        {leadership.map(
                            (person) => (
                                <div
                                    key={person.id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                                >

                                    <div className="relative h-[300px] overflow-hidden">

                                        {person.image ? (
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                unoptimized
                                                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-6 left-6">

                                            <h3 className="text-xl font-bold text-white">
                                                {person.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-blue-200">
                                                {person.designation}
                                            </p>

                                            {person.email && (
                                                <p className="mt-1 text-sm text-blue-200">
                                                    Email: {person.email}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </section>

        </main>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Leaf,
  ShieldCheck,
  Ship,
  Sparkles,
  Target,
  Users,
  Waves,
} from "lucide-react";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const fleetData = {
  labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2026"],
  datasets: [
    {
      label: "Fleet Size",
      data: [10, 15, 20, 25, 30, 40, 55],
      backgroundColor: "#123d7a",
      borderRadius: 6,
    },
  ],
};

const sustainabilityData = {
  labels: ["Renewable Energy", "Eco Vessels", "CSR Projects"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ["#123d7a", "#3b82f6", "#7dd3fc"],
      borderWidth: 0,
    },
  ],
};

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We conduct our business with honesty, transparency and accountability, building relationships that stand the test of time.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Innovation",
    description:
      "We continuously explore technology, new ideas and better processes to improve the way maritime business is delivered.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "We pursue high standards in operations, service quality, safety and every interaction with our customers and partners.",
    icon: Award,
  },
  {
    number: "04",
    title: "Sustainability",
    description:
      "We believe responsible growth means creating lasting value for our business, people, communities and environment.",
    icon: Leaf,
  },
];

const milestones = [
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
];

const leadership = [
  {
    name: "Mohammad Erfan Selim",
    role: "Director",
    image: "",
    email: "e.selim@madina.co"
  },
  {
    name: "Zarin Chowdhury Selim",
    role: "Director",
    image:"",
    email: "zarin.c@madina.co"
  },
  {
    name: "Mojmeen Akther",
    role: "AGM (A&F)",
    image: "/images/Mojmeen Akther.jpeg",
     email: "mojmeen@madina.co"
  },
    {
    name: "Azad Mollik",
    role: "Manager(Operation)",
    image: "/images/Azad Mollik.jpeg",
    email: "mallik@madina.co"
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative h-[600px] overflow-hidden bg-[#041a35]">

        <Image
          src="/images/ship2.jpg"
          alt="Madina Maritime vessel"
          fill
          priority
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
              About Madina Maritime
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Built on
              <br />
              <span className="text-blue-300">Trust.</span>
              <br />
              Driven by Progress.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              Discover the people, principles and ambitions behind Madina
              Maritime Limited and our journey toward a stronger maritime
              future.
            </p>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white [clip-path:ellipse(70%_100%_at_50%_100%)]" />

      </section>


      {/* =========================================================
          INTRO STATS
      ========================================================== */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["30+", "Years of Experience", Award],
            ["05", "Business Divisions", Globe2],
            ["50+", "Global Routes", Waves],
            ["1000+", "Successful Deliveries", Ship],
          ].map(([value, label, Icon], index) => {
            const LucideIcon = Icon as typeof Award;

            return (
              <div
                key={String(label)}
                className={`flex items-center gap-5 p-7 ${
                  index !== 3
                    ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                  <LucideIcon size={22} />
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#06245a]">
                    {String(value)}
                  </div>

                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {String(label)}
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
                Our story is one of continuous progress. From our early
                beginnings to our current maritime operations, each stage
                has shaped who we are today.
              </p>

              <div className="mt-8 rounded-2xl bg-[#06245a] p-7 text-white">

                <div className="flex items-center gap-3">
                  <Waves size={20} className="text-blue-300" />

                  <span className="text-sm font-bold uppercase tracking-wider">
                    Looking Ahead
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-blue-100/70">
                  We continue to invest in people, technology and
                  operational capabilities to build a stronger future.
                </p>

              </div>

            </div>


            <div className="relative">

              <div className="absolute bottom-5 left-[31px] top-5 w-px bg-blue-100" />

              <div className="space-y-10">

                {milestones.map((item) => (
                  <div
                    key={item.year}
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
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MISSION / VISION
      ========================================================== */}
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
                Delivering meaningful maritime solutions.
              </h2>

              <p className="mt-5 leading-7 text-blue-100/70">
                Madina Maritime Ltd. is a concern of Madina Group, strive to develop this venture through its customer driven value-added shipping services by meeting the requirements of its customer/ partner through innovation, strategy and to create competitive edge in growing Maritime Trade development to/from Bangladesh.
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
                Creating a stronger maritime future.
              </h2>

              <p className="mt-5 leading-7 text-blue-100/70">
                To become a trusted maritime organization recognized for
                operational excellence, innovation, safety and sustainable
                contribution to the industries and communities we serve.
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

          {/* Section Heading */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">

            <div>
              <div className="mb-4 flex items-center gap-3 text-blue-700">
                <span className="h-px w-10 bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Operational Performance
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight text-[#06245a] sm:text-4xl lg:text-5xl">
                Yearly Tonnage<span className="text-blue-600"> Movement </span>
              </h2>
            </div>
          </div>


          {/* Tonnage Summary */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                year: "2022",
                tonnage: "185K",
                label: "Total Tonnage",
              },
              {
                year: "2023",
                tonnage: "240K",
                label: "Total Tonnage",
              },
              {
                year: "2024",
                tonnage: "315K",
                label: "Total Tonnage",
              },
              {
                year: "2025",
                tonnage: "380K",
                label: "Total Tonnage",
              },
            ].map((item) => (
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
                  {item.label}
                </div>
              </div>
            ))}

          </div>


          {/* Commodity Wise Movement */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
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


            {/* Table */}
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

                  {[
                    {
                      commodity: "Cement",
                      values: ["45K", "60K", "85K", "105K"],
                      total: "295K",
                    },
                    {
                      commodity: "Coal",
                      values: ["55K", "72K", "90K", "110K"],
                      total: "327K",
                    },
                    {
                      commodity: "Clinker",
                      values: ["35K", "48K", "65K", "78K"],
                      total: "226K",
                    },
                    {
                      commodity: "Stone",
                      values: ["30K", "40K", "52K", "60K"],
                      total: "182K",
                    },
                    {
                      commodity: "Other",
                      values: ["20K", "20K", "23K", "27K"],
                      total: "90K",
                    },
                  ].map((item) => (
                    <tr
                      key={item.commodity}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#06245a]">
                          {item.commodity}
                        </div>
                      </td>

                      {item.values.map((value, index) => (
                        <td
                          key={index}
                          className="px-6 py-4 text-right text-sm text-slate-600"
                        >
                          {value}
                        </td>
                      ))}

                     

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>


            {/* Footer */}
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
                05 — Leadership
              </div>

              <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                People behind our progress.
              </h2>

            </div>

          </div>


          <div className="mt-14 grid gap-7 md:grid-cols-4">

            {leadership.map((person) => (
              <div
                key={person.name}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative h-[300px] overflow-hidden">

                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6">

                    <h3 className="text-xl font-bold text-white">
                      {person.name}
                    </h3>

                    <p className="mt-1 text-sm text-blue-200">
                      {person.role}
                    </p>
                    <p className="mt-1 text-sm text-blue-200">
                      Email: {person.email}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>




    </main>
  );
}
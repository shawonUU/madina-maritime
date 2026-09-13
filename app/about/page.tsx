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
    name: "John Doe",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
  },
  {
    name: "Jane Smith",
    role: "Chief Operating Officer",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  },
  {
    name: "Michael Lee",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
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


      {/* =========================================================
          WHO WE ARE
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

          <div className="relative">

            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-2xl border border-blue-100" />

            <div className="relative overflow-hidden rounded-3xl">

              <Image
                src="/images/ship1.jpg"
                alt="Madina Maritime operations"
                width={900}
                height={700}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/70 to-transparent" />

              <div className="absolute bottom-7 left-7">

                <div className="text-5xl font-bold text-white">
                  MML
                </div>

                <div className="mt-1 text-sm text-blue-100">
                  Madina Maritime Limited
                </div>

              </div>

            </div>

          </div>


          <div>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                01 — Who We Are
              </span>

              <span className="h-px w-12 bg-blue-200" />
            </div>

            <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
              A maritime company
              <br />
              with a bigger vision.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Madina Maritime Limited is a concern of Madina Group, one of
              the leading diversified business groups in Bangladesh.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              Our journey is driven by a simple philosophy: create
              sustainable value through reliable operations, strong
              relationships and continuous improvement.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              With interests across Marine Services, Polymer Industries,
              Trading, Cement Industries and Property Development, Madina
              Group brings a diversified perspective to every business it
              operates.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                "Customer focused",
                "Safety driven",
                "Technology enabled",
                "Future focused",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="text-blue-700"
                  />

                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MISSION / VISION
      ========================================================== */}
      <section className="bg-[#06245a] py-28 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-8 md:grid-cols-2">

            <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-9 transition hover:bg-white/[0.08]">

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
                To deliver reliable maritime solutions that create value
                for customers and partners while maintaining strong
                standards of safety, service, innovation and responsible
                growth.
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-white">
                Our Purpose
                <ArrowUpRight size={16} />
              </div>

            </div>


            <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-9 transition hover:bg-white/[0.08]">

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


      {/* =========================================================
          VALUES
      ========================================================== */}
      <section className="bg-[#f6f9fc] py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              02 — Our Values
            </div>

            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
              Principles that guide
              <br />
              every decision.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Our values are more than statements. They shape how we work,
              how we treat people and how we build long-term partnerships.
            </p>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-300">
                      {item.number}
                    </span>

                  </div>

                  <h3 className="mt-8 text-xl font-bold text-[#06245a]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-7 h-px bg-slate-100" />

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Our principle
                    <ArrowRight size={14} />
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          JOURNEY / TIMELINE
      ========================================================== */}
      <section className="py-5">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">

            <div>

              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                03 — Our Journey
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
          GROWTH DATA
      ========================================================== */}
      <section className="bg-[#f6f9fc] py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              04 — Growth & Performance
            </div>

            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
              Progress in numbers.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              A snapshot of our growth and the areas where we continue to
              invest for the future.
            </p>

          </div>


          <div className="mt-14 grid gap-7 lg:grid-cols-[1.3fr_.7fr]">

            {/* Fleet chart */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <BarChart3 size={18} />

                    <span className="text-xs font-bold uppercase tracking-wider">
                      Fleet Development
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-bold text-[#06245a]">
                    Fleet expansion
                  </h3>
                </div>

                <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
                  2018 — 2026
                </div>

              </div>

              <div className="h-[320px]">
                <Bar
                  data={fleetData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: "#eef2f7",
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </div>

            </div>


            {/* Sustainability */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-2 text-teal-700">
                <Leaf size={18} />

                <span className="text-xs font-bold uppercase tracking-wider">
                  Sustainability
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-bold text-[#06245a]">
                Our initiatives
              </h3>

              <div className="mx-auto mt-7 max-w-[270px]">
                <Doughnut
                  data={sustainabilityData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          padding: 18,
                          usePointStyle: true,
                        },
                      },
                    },
                    cutout: "68%",
                  }}
                />
              </div>

              <p className="mt-6 text-center text-sm leading-6 text-slate-500">
                Responsible growth remains an important part of our
                long-term strategy.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RESPONSIBILITY
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#06245a] py-28 text-white">

        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-5 -top-5 h-50 w-50 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="mb-5 flex items-center gap-3 text-blue-300">
                <Leaf size={19} />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  05 — Responsible Growth
                </span>
              </div>

              <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
                Business success
                <br />
                with responsibility.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-blue-100/70">
                We recognize that sustainable business growth goes beyond
                financial performance. It includes the safety of our
                people, responsible use of resources and contribution to
                our communities.
              </p>

              <Link
                href="/sustainability"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white"
              >
                Explore Sustainability
                <ArrowRight size={17} />
              </Link>

            </div>


            <div className="grid grid-cols-2 gap-4">

              {[
                ["01", "Safety"],
                ["02", "Environment"],
                ["03", "People"],
                ["04", "Community"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-7"
                >

                  <div className="text-sm font-bold text-blue-300">
                    {number}
                  </div>

                  <div className="mt-10 text-xl font-bold">
                    {title}
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          LEADERSHIP
      ========================================================== */}
      <section className="py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

            <div>

              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                06 — Leadership
              </div>

              <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                People behind
                <br />
                our progress.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Our people bring experience, discipline and a shared
              commitment to building a stronger organization.
            </p>

          </div>


          <div className="mt-14 grid gap-7 md:grid-cols-3">

            {leadership.map((person) => (
              <div
                key={person.name}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative h-[380px] overflow-hidden">

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
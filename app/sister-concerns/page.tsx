"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Factory,
  Globe2,
  Landmark,
  Ship,
  Truck,
  Waves,
  Wrench,
  Fuel,
  Package,
} from "lucide-react";

const concerns = [
  {
    title: "Madina Shipyard",
    shortTitle: "Shipyard",
    category: "Marine Engineering",
    desc: "Docking and repairing services supported by modern facilities and experienced maritime professionals.",
    img: "/images/shipyard.jpg",
    icon: Wrench,
    number: "01",
  },
  {
    title: "Madina Logistics & Shipping Ltd",
    shortTitle: "Logistics & Shipping",
    category: "Logistics",
    desc: "Clearing and shipping agency services designed to ensure smooth and efficient cargo operations.",
    img: "/images/shipyard.jpg",
    icon: Package,
    number: "02",
  },
  {
    title: "M M R (Bangladesh) Shipping Ltd",
    shortTitle: "MMR Shipping",
    category: "Shipping Agency",
    desc: "A trusted shipping agency supporting international trade and maritime operations.",
    img: "/images/shipyard.jpg",
    icon: Ship,
    number: "03",
  },
  {
    title: "Fleet International Ltd",
    shortTitle: "Fleet International",
    category: "Cargo Operations",
    desc: "Cargo handling operations focused on efficiency, reliability and dependable service delivery.",
    img: "/images/shipyard.jpg",
    icon: Building2,
    number: "04",
  },
  {
    title: "Madina Equipment Ltd",
    shortTitle: "Equipment",
    category: "Equipment Services",
    desc: "Equipment solutions supporting maritime, construction and industrial operational requirements.",
    img: "/images/shipyard.jpg",
    icon: Wrench,
    number: "05",
  },
  {
    title: "Bismillah Navigation Ltd",
    shortTitle: "Navigation",
    category: "Inland Water Transport",
    desc: "Inland river transportation services focused on safe and dependable movement of cargo.",
    img: "/images/shipyard.jpg",
    icon: Waves,
    number: "06",
  },
  {
    title: "Madina Transport Ltd",
    shortTitle: "Transport",
    category: "Road Transport",
    desc: "Reliable road transportation services connecting businesses and destinations across Bangladesh.",
    img: "/images/shipyard.jpg",
    icon: Truck,
    number: "07",
  },
  {
    title: "Madina Petroleum Service Ltd",
    shortTitle: "Petroleum Services",
    category: "Energy & Fuel",
    desc: "Fuel supply solutions serving maritime, transportation and industrial sectors.",
    img: "/images/shipyard.jpg",
    icon: Fuel,
    number: "08",
  },
  {
    title: "Madina Cement Industries Ltd",
    shortTitle: "Cement Industries",
    category: "Manufacturing",
    desc: "Cement manufacturing under the Tiger brand, contributing to infrastructure development.",
    img: "/images/shipyard.jpg",
    icon: Factory,
    number: "09",
  },
];

const sectors = [
  {
    title: "Marine",
    description: "Shipbuilding, repair, navigation and maritime services.",
    icon: Ship,
  },
  {
    title: "Logistics",
    description: "Cargo, shipping agency and transportation solutions.",
    icon: Package,
  },
  {
    title: "Industrial",
    description: "Equipment, cement and industrial support capabilities.",
    icon: Factory,
  },
  {
    title: "Energy",
    description: "Petroleum and fuel supply solutions for businesses.",
    icon: Fuel,
  },
];

export default function SisterConcern() {
  return (
    <main className="bg-white text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative h-[570px] overflow-hidden bg-[#041a35]">

        <Image
          src="/images/shipyard.jpg"
          alt="Madina Group business operations"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/70 via-transparent to-transparent" />

        {/* Grid texture */}
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
              Madina Group
            </div>

            <h1 className="text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
              One Group.
              <br />
              <span className="text-blue-300">
                Many Capabilities.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              Our sister concerns bring together expertise across marine
              services, logistics, transportation, equipment, energy and
              industrial operations.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="#concerns"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-blue-50"
              >
                Explore Our Companies
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#06245a]"
              >
                Contact Us
                <ArrowUpRight size={17} />
              </Link>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white [clip-path:ellipse(70%_100%_at_50%_100%)]" />

      </section>


      {/* =========================================================
          OVERVIEW STATS
      ========================================================== */}
      <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["09", "Sister Concerns", Building2],
            ["06+", "Business Sectors", Globe2],
            ["Marine", "Core Expertise", Ship],
            ["Bangladesh", "Primary Market", Landmark],
          ].map(([value, label, Icon], index) => {

            const LucideIcon = Icon as typeof Building2;

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
          INTRO
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center">

          <div className="relative">

            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-2xl border border-blue-100" />

            <div className="relative overflow-hidden rounded-3xl">

              <Image
                src="/images/shipyard.jpg"
                alt="Madina Group operations"
                width={900}
                height={700}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/75 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7">

                <div className="text-4xl font-bold text-white">
                  Madina Group
                </div>

                <div className="mt-1 text-sm text-blue-100">
                  Diversified Business Portfolio
                </div>

              </div>

            </div>

          </div>


          <div>

            <div className="mb-4 flex items-center gap-3">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Business Network
              </span>

              <span className="h-px w-12 bg-blue-200" />

            </div>

            <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
              Strength through
              <br />
              diversification.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Madina Group operates across multiple industries, bringing
              together specialized businesses that complement one another
              and create a stronger overall ecosystem.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              Our sister concerns allow us to combine expertise,
              infrastructure and operational capabilities across marine
              services, logistics, transportation, equipment, energy and
              manufacturing.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              This diversified structure helps us respond to changing
              market requirements while maintaining a long-term focus on
              reliability, quality and sustainable growth.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          BUSINESS SECTORS
      ========================================================== */}
      <section className="bg-[#f6f9fc] py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Our Capabilities
            </div>

            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
              An interconnected business ecosystem.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Each business contributes specialized expertise while
              strengthening the capabilities of the wider group.
            </p>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {sectors.map((sector) => {

              const Icon = sector.icon;

              return (
                <div
                  key={sector.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#06245a]">
                    {sector.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {sector.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Explore sector
                    <ArrowRight size={14} />
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          CONCERNS
      ========================================================== */}
      <section
        id="concerns"
        className="scroll-mt-20 py-28"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

            <div>

              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                01 — Sister Concerns
              </div>

              <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                Companies that
                <br />
                move us forward.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Explore the companies within our wider business network and
              discover the specialized services each one provides.
            </p>

          </div>


          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {concerns.map((item) => {

              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
                >

                  {/* Image */}
                  <div className="relative h-[260px] overflow-hidden">

                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/80 via-transparent to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                      <Icon size={14} />
                      {item.category}
                    </div>

                    <div className="absolute bottom-5 left-5 text-4xl font-bold text-white/30">
                      {item.number}
                    </div>

                  </div>


                  {/* Content */}
                  <div className="p-7">

                    <h3 className="text-xl font-bold leading-snug text-[#06245a]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {item.desc}
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.shortTitle}
                      </span>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white"
                      >
                        <ArrowUpRight size={16} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          GROUP ECOSYSTEM
      ========================================================== */}
      <section className="bg-[#06245a] py-28 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="mb-5 flex items-center gap-3 text-blue-300">

                <Globe2 size={19} />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  02 — Group Ecosystem
                </span>

              </div>

              <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
                Different businesses.
                <br />
                One shared direction.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-blue-100/70">
                Our businesses operate in different sectors, but they share
                a common commitment to service quality, operational
                discipline, innovation and long-term value creation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                {[
                  "Marine Services",
                  "Logistics",
                  "Transportation",
                  "Equipment",
                  "Energy",
                  "Manufacturing",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-blue-100"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>


            {/* Visual network */}
            <div className="relative min-h-[420px]">

              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 bg-blue-400/10 shadow-[0_0_100px_rgba(59,130,246,0.15)]">

                <div className="flex h-full items-center justify-center text-center">

                  <div>
                    <div className="text-2xl font-bold">
                      MML
                    </div>

                    <div className="mt-1 text-[9px] uppercase tracking-widest text-blue-200">
                      Maritime
                    </div>
                  </div>

                </div>

              </div>


              {[
                ["Marine", "top-0 left-1/2 -translate-x-1/2"],
                ["Logistics", "right-0 top-1/4"],
                ["Transport", "right-0 bottom-1/4"],
                ["Industrial", "bottom-0 left-1/2 -translate-x-1/2"],
                ["Energy", "left-0 bottom-1/4"],
                ["Equipment", "left-0 top-1/4"],
              ].map(([name, position]) => (

                <div
                  key={name}
                  className={`absolute ${position} rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-bold text-blue-100 backdrop-blur-sm`}
                >
                  {name}
                </div>

              ))}

              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="px-6 py-24 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06245a] to-[#075985]">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />



        </div>

      </section>

    </main>
  );
}
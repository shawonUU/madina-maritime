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
    title: "Madina Polymer Industries Ltd",
    shortTitle: "Polymer",
    category: "Polymer",
    desc: "Madina TANK · Madina PUMP · Madina Kitchen Sink · Madina Gas Stove · Madina HDPE Pipe",
    img: "/images/Madina Polymer Industries Ltd.jpg",
    icon: Wrench,
    number: "01",
  },

  {
    title: "Madina Developments Ltd",
    shortTitle: "Developments",
    category: "Developments",
    desc: "Madina Maritime Ltd",
    img: "/images/Madina Developments1.png",
    icon: Ship,
    number: "03",
  },

  {
    title: "ERZA Plastic Company Ltd",
    shortTitle: "Household",
    category: "Household",
    desc: "Household · Plastic Furniture",
    img: "/images/ERZA Plastic.png",
    icon: Wrench,
    number: "05",
  },
  {
    title: "Madina Trading Corporation (Pvt.) Ltd",
    shortTitle: "Trading",
    category: "Trading",
    desc: "Trading",
    img: "/images/Madina Trading Corporation.jpg",
    icon: Waves,
    number: "06",
  },
  {
    title: "Duroplast BD Ltd",
    shortTitle: "Duroplast",
    category: "Duroplast",
    desc: "Duroplast Tank · Duroplast Pipe",
    img: "/images/Duroplast BD Ltd.jpg",
    icon: Fuel,
    number: "08",
  },

  {
    title: "Chand Sarder Cold Storage Ltd.",
    shortTitle: "Cold Storage",
    category: "Cold Storage",
    desc: "Chand Sarder Cold Storage Ltd",
    img: "",
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
          src="/images/trust1.jpg"
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



  <section id="concerns" className="scroll-mt-20 py-5 ">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Sister Concerns
          </div>

          <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
            Our Group Sister Concerns
          </h2>
        </div>

        

      </div>


      {/* Concerns */}
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {concerns.map((item) => {

          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
            >

              {/* Small Image */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">

                {item.img ? (
                  <>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-blue-800">
                    {/* <Icon size={22} strokeWidth={1.7} /> */}
                    {/* <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    /> */}
                  </div>
                )}

              </div>


              {/* Content */}
              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-bold leading-5 text-[#06245a]">
                  {item.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">
                  {item.desc}
                </p>

              </div>


              {/* Arrow */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-800 transition duration-300 group-hover:bg-[#06245a] group-hover:text-white">
                <ArrowUpRight size={15} />
              </div>

            </article>
          );
        })}

      </div>

    </div>

  </section>


<section id="concerns" className="scroll-mt-20 bg-white py-10">

  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Header */}
    <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

      <div>

        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
          Sister Organizations
        </div>

        <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
          Our Sister Organizations.
        </h2>

      </div>

    </div>


    {/* Sister Concerns */}
    <div className="mt-5 grid gap-5 md:grid-cols-2">

      {[
        {
          name: "Madina Shipyard",
          function: "Docking & Repairing",
          icon: Ship,
        },
        {
          name: "Madina Logistics & Shipping Ltd",
          function: "Clearing and Shipping Agent",
          icon: Package,
        },
        {
          name: "M M R (Bangladesh) Shipping Ltd",
          function: "Shipping Agent",
          icon: Ship,
        },
        {
          name: "Fleet International Ltd",
          function: "Cargo Handling Operator",
          icon: Truck,
        },
        {
          name: "Madina Equipment Ltd",
          function: "Equipment Service",
          icon: Wrench,
        },
        {
          name: "Bismillah Navigation Ltd",
          function: "Inland River Carrier",
          icon: Waves,
        },
        {
          name: "Madina Transport Ltd",
          function: "Road Transport Service",
          icon: Truck,
        },
        {
          name: "Madina Petroleum Service Ltd",
          function: "Fuel Supply",
          icon: Fuel,
        },
        {
          name: "Madina Cement Industries Ltd",
          function: "Cement Producer (Tiger Brand)",
          icon: Factory,
        },
      ].map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.name}
            className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-1 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]"
          >

            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition duration-300 group-hover:bg-[#06245a] group-hover:text-white">
              <Icon size={24} />
            </div>


            {/* Content */}
            <div className="min-w-0 flex-1">

              <h3 className="text-lg font-bold leading-snug text-[#06245a]">
                {item.name}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {item.function}
              </p>

            </div>


            {/* Arrow */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-800 transition duration-300 group-hover:bg-[#06245a] group-hover:text-white">
              <ArrowUpRight size={16} />
            </div>

          </div>
        );
      })}

    </div>

  </div>

</section>


    </main>
  );
}
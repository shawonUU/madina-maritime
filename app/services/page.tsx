"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Compass,
  Globe2,
  Headphones,
  ShieldCheck,
  Ship,
  Truck,
  Users,
  Waves,
  FileCheck,
  Container,
  ShipWheel,
  PackageCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const services = [
  {
    number: "01",
    title: "Shipping Agency",
    description:
      "Providing reliable vessel agency services, including port coordination, documentation, and operational support.",
    icon: Ship,
  },
  {
    number: "02",
    title: "C&F Agency",
    description:
      "Handling customs clearance, documentation, and related procedures for smooth and efficient cargo movement.",
    icon: FileCheck,
  },
  {
    number: "03",
    title: "Ship Handling Operator",
    description:
      "Managing ship handling operations with efficient coordination, safety, and timely execution at port.",
    icon: ShipWheel,
  },
  {
    number: "04",
    title: "Filling Service",
    description:
      "Providing professional filling and cargo-related support services to ensure smooth and efficient operations.",
    icon: PackageCheck,
  },
  {
    number: "05",
    title: "Lighter Vessel Operator",
    description:
      "Operating lighter vessels for safe and efficient transportation of cargo between vessels and ports.",
    icon: Anchor,
  },
  {
    number: "06",
    title: "Logistics (Loading / Unloading) Service",
    description:
      "Providing efficient loading, unloading, cargo handling, and logistics support for seamless cargo movement.",
    icon: Container,
  },
  {
    number: "07",
    title: "International Trading",
    description:
      "Facilitating international trade through reliable sourcing, supply, import, and export solutions.",
    icon: Globe2,
  },
];

export default function MarineServicesPage() {
  return (
    <main className="bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#03172f]">

        <Image
          src="/images/ship2.jpg"
          alt="Madina Maritime marine services"
          fill
          priority
          className="object-cover"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/90 via-transparent to-transparent" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-10 lg:px-8">

          <div className="max-w-4xl">

            <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              <span className="h-px w-12 bg-blue-400" />
              Madina Maritime Limited
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Marine
              <br />
              <span className="text-blue-300">Services</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
              Reliable maritime solutions built around safety, operational
              excellence and long-term partnerships.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Button
                size="lg"
                className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
              >
                <Link
                  href="/contact"
                  className="flex items-center gap-2"
                >
                  Discuss Your Requirements

                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 px-7 text-white backdrop-blur-sm hover:bg-white hover:text-[#06245a]"
              >
                <Link href="/about">
                  About MML
                </Link>
              </Button>

            </div>

          </div>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 lg:left-10">
          <Compass size={15} />
          Maritime Excellence
        </div>

      </section>


      {/* =====================================================
          INTRO / STATS
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              value: "24/7",
              label: "Operational Support",
            },
            {
              value: "15+",
              label: "Years of Experience",
            },
            {
              value: "01",
              label: "Trusted Partner",
            },
            {
              value: "100%",
              label: "Safety Commitment",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-7 ${
                index !== 3
                  ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="text-3xl font-bold text-[#06245a]">
                {item.value}
              </div>

              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </div>
            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          OUR SERVICES
      ====================================================== */}
      <section className="bg-[#06245a] py-10 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="mb-5 flex items-center gap-3 text-blue-300">

                <Globe2 size={19} />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Our Services
                </span>

              </div>

              <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
                Reliable Maritime Solutions. One Trusted Partner.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-blue-100/70">
                We provide reliable and efficient maritime services designed
                to support vessel operations, cargo transportation and logistics.
                With a strong focus on safety, operational excellence and
                customer satisfaction, we deliver dependable solutions across
                every stage of maritime operations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                {[
                  "Shipping Agency",
                  "C&F Agency",
                  "Ship Handling Operator",
                  "Filling Service",
                  "Lighter Vessel Operator",
                  "Logistics (Loading / Unloading) Service",
                  "International Trading",
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
                ["Shipping Agency", "top-0 left-1/2 -translate-x-1/2"],
                ["C&F Agency", "right-0 top-1/4"],
                ["Ship Handling Operator", "right-0 bottom-1/4"],
                ["Filling Service", "bottom-0 left-1/2 -translate-x-1/2"],
                ["Lighter Vessel Operator", "left-0 bottom-1/5"],
                ["Logistics (Loading / Unloading) Service", "left-0 top-1/4"],
                ["International Trading", "left-10 top-1/2"],
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


      {/* =====================================================
          SERVICE DESCRIPTIONS
      ====================================================== */}

{/* =====================================================
    SERVICE DESCRIPTIONS
====================================================== */}
<section className="bg-slate-50 py-14">

  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    <div className="mx-auto max-w-3xl text-center">

      <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
        Our Expertise
      </div>

      <h2 className="text-3xl font-bold text-[#06245a] sm:text-4xl">
        Our Maritime Services
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        Comprehensive maritime and logistics services designed to support
        vessels, cargo and international business operations.
      </p>

    </div>


    <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">

      {services.map((service) => {

        const Icon = service.icon;

        return (
          <div
            key={service.title}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                <Icon size={18} />
              </div>

              <span className="text-xs font-bold tracking-widest text-slate-300">
                {service.number}
              </span>

            </div>

            <h3 className="mt-3 text-base font-bold text-[#06245a]">
              {service.title}
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              {service.description}
            </p>

            <div className="mt-3 h-px w-7 bg-blue-600 transition-all duration-300 group-hover:w-12" />

          </div>
        );

      })}

    </div>

  </div>

</section>




      {/* =====================================================
          CTA
      ====================================================== */}
      {/* <section className="px-6 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06245a]">

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 right-40 h-96 w-96 rounded-full border border-white/5" />

          <Ship
            size={420}
            strokeWidth={0.8}
            className="absolute -right-10 top-1/2 hidden -translate-y-1/2 text-white opacity-[0.06] lg:block"
          />

        </div>

      </section> */}


      {/* =====================================================
          WHY MML
      ====================================================== */}
      {/* <section className="py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Why MML
            </div>

            <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
              A trusted maritime partner.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              We combine operational discipline, experienced people and a
              long-term partnership mindset to deliver dependable maritime
              solutions.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                icon: ShieldCheck,
                title: "Safety & Compliance",
                desc: "Maintaining a strong safety culture across our operations.",
              },
              {
                icon: Users,
                title: "Experienced People",
                desc: "Skilled professionals supporting reliable maritime operations.",
              },
              {
                icon: Globe2,
                title: "Long-Term Partnership",
                desc: "Building relationships through trust, consistency and performance.",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#06245a]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.desc}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </section> */}

    </main>
  );
}
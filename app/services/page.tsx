"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Compass,
  Globe2,
  Headphones,
  ShieldCheck,
  Ship,
  Truck,
  Users,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
{
number: "01",
title: "Vessel Operations",
description:
"Reliable vessel operations supported by experienced teams, disciplined processes and a strong focus on safety.",
icon: Ship,
},
{
number: "02",
title: "Marine Logistics",
description:
"Coordinated marine logistics solutions designed to keep cargo, vessels and operations moving efficiently.",
icon: Truck,
},
{
number: "03",
title: "Port & Terminal Support",
description:
"Efficient coordination of port activities with a focus on smooth vessel movement and operational continuity.",
icon: Anchor,
},
{
number: "04",
title: "Cargo Handling",
description:
"Professional cargo handling practices designed to support safe, timely and reliable maritime operations.",
icon: Waves,
},
{
number: "05",
title: "Marine Support",
description:
"Practical marine support services tailored to the operational requirements of vessels and business partners.",
icon: Headphones,
},
{
number: "06",
title: "Integrated Solutions",
description:
"End-to-end maritime support combining people, processes and operational capabilities under one trusted partner.",
icon: Globe2,
},
];

const capabilities = [
"Safety-focused marine operations",
"Experienced operational teams",
"Reliable vessel coordination",
"Efficient cargo movement",
"Responsive customer support",
"Long-term partnership approach",
];

export default function MarineServicesPage() {
return ( 

<main className="bg-white text-slate-900">



  <section className="relative min-h-[620px] overflow-hidden bg-[#03172f]">

    <Image
      src="/images/ship1.jpg"
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
            <Link href="/contact" className="flex items-center gap-2">
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
      INTRODUCTION
  ====================================================== */}
  <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

    <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

      <div className="relative">

        <div className="absolute -left-5 -top-5 h-32 w-32 rounded-2xl border border-blue-100" />

        <div className="relative overflow-hidden rounded-3xl">

          <Image
            src="/images/ship2.jpg"
            alt="Marine operations"
            width={900}
            height={700}
            className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/70 to-transparent" />

          <div className="absolute bottom-7 left-7">

            <div className="text-5xl font-bold text-white">
              MML
            </div>

            <div className="mt-1 text-sm text-blue-100">
              Marine Services
            </div>

          </div>

        </div>

      </div>


      <div>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            01 — Our Services
          </span>

          <span className="h-px w-12 bg-blue-200" />
        </div>

        <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
          Maritime capability
          <br />
          you can rely on.
        </h2>

        <p className="mt-7 text-lg leading-8 text-slate-600">
          Madina Maritime Limited provides reliable marine services
          designed around operational efficiency, safety and dependable
          customer support.
        </p>

        <p className="mt-5 leading-7 text-slate-500">
          From vessel operations and cargo handling to marine logistics
          and operational support, our approach is built around
          disciplined execution and long-term relationships.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          {capabilities.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2
                size={18}
                className="shrink-0 text-blue-700"
              />

              {item}
            </div>
          ))}

        </div>

      </div>

    </div>

  </section>


  {/* =====================================================
      SERVICE GRID
  ====================================================== */}
  <section className="bg-[#f5f8fc] py-10">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="max-w-3xl">

        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
          02 — What We Do
        </div>

        <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
          Comprehensive marine
          <br />
          service capabilities.
        </h2>

        <p className="mt-5 max-w-2xl leading-7 text-slate-600">
          Our services are designed to support the complete operational
          needs of maritime businesses while maintaining high standards
          of safety, reliability and efficiency.
        </p>

      </div>


      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Card
              key={service.number}
              className="group overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
            >

              <CardContent className="p-8">

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <span className="text-sm font-bold tracking-[0.2em] text-blue-200">
                    {service.number}
                  </span>

                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#06245a]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  Marine Capability

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

              </CardContent>

            </Card>
          );
        })}

      </div>

    </div>

  </section>


  {/* =====================================================
      OPERATIONAL EXCELLENCE
  ====================================================== */}
  <section className="bg-[#06245a] py-10 text-white">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

        <div>

          <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            03 — Operational Excellence
          </div>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Built around
            <br />
            reliability.
          </h2>

          <p className="mt-6 max-w-xl leading-7 text-blue-100/70">
            Maritime operations demand precision, coordination and
            consistency. Our teams work with a clear focus on delivering
            dependable service at every stage.
          </p>

          <div className="mt-9 space-y-5">

            {[
              "Safety-led operational practices",
              "Experienced maritime professionals",
              "Clear communication and coordination",
              "Continuous improvement",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <CheckCircle2
                    size={17}
                    className="text-blue-300"
                  />
                </div>

                <span className="text-sm font-medium text-blue-50">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>


        <div className="relative">

          <div className="overflow-hidden rounded-3xl">

            <Image
              src="/images/ship3.jpg"
              alt="Maritime operational excellence"
              width={900}
              height={700}
              className="h-[520px] w-full object-cover"
            />

          </div>

          <div className="absolute -bottom-8 -left-8 hidden w-64 rounded-2xl bg-white p-6 text-[#06245a] shadow-2xl sm:block">

            <ShieldCheck
              size={28}
              className="text-blue-700"
            />

            <div className="mt-4 text-lg font-bold">
              Safety First
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Responsible operations with safety at the centre of
              everything we do.
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>


  {/* =====================================================
      WHY CHOOSE MML
  ====================================================== */}
  <section className="py-10">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="mx-auto max-w-3xl text-center">

        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
          04 — Why MML
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


      <div className="mt-14 grid gap-6 md:grid-cols-3">

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

  </section>


  {/* =====================================================
      CTA
  ====================================================== */}
  <section className="px-6 lg:px-8">

    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#06245a]">

      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute -bottom-32 right-40 h-96 w-96 rounded-full border border-white/5" />

      <Ship
        size={420}
        strokeWidth={0.8}
        className="absolute -right-10 top-1/2 hidden -translate-y-1/2 text-white opacity-[0.06] lg:block"
      />

    </div>

  </section>

</main>


);
}

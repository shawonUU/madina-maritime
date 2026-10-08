"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
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
import type { LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";

interface SisterConcernPageData {
  id?: number;
  label: string;
  title: string;
  highlight: string;
  description: string;
  hero_image?: string | null;
  hero_image_url?: string | null;
  status?: boolean;
}

interface SectorsData {
  id: number;
  value: string;
  label: string;
  icon: string;
  sort_order: number;
  status: boolean;
}

interface ConcernData {
  id: number;
  title: string;
  short_title: string;
  category: string;
  description: string;
  image?: string | null;
  image_url?: string | null;
  icon: string;
  number: string;
  sort_order: number;
  status: boolean;
}

interface OrganizationData {
  id: number;
  name: string;
  function: string;
  icon: string;
  sort_order: number;
  status: boolean;
}

interface SisterConcernResponse {
  page: SisterConcernPageData | null;
  sectors: SectorsData[];
  concerns: ConcernData[];
  organizations: OrganizationData[];
}

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Factory,
  Globe2,
  Landmark,
  Ship,
  Truck,
  Waves,
  Wrench,
  Fuel,
  Package,
};

const getIcon = (iconName?: string): LucideIcon => {
  return iconMap[iconName || "Building2"] || Building2;
};

async function getSisterConcerns(): Promise<SisterConcernResponse> {
  const response = await api.get("/website/sister-concerns");

  const responseData = response.data;

  let source = responseData?.data;

  if (
    source?.data &&
    typeof source.data === "object" &&
    !Array.isArray(source.data)
  ) {
    source = source.data;
  }

  return {
    page: source?.page ?? null,

    sectors: Array.isArray(source?.sectors)
      ? source.sectors
      : [],

    concerns: Array.isArray(source?.concerns)
      ? source.concerns
      : [],

    organizations: Array.isArray(source?.organizations)
      ? source.organizations
      : [],
  };
}

export default function SisterConcern() {
  const { data } = useQuery<SisterConcernResponse>({
    queryKey: ["sister-concerns"],
    queryFn: getSisterConcerns,
  });

  const page = data?.page;

  const sectors = data?.sectors ?? [];

  const concerns = data?.concerns ?? [];

  const organizations = data?.organizations ?? [];

  const heroImage =
    page?.hero_image_url ||
    page?.hero_image ||
    "/images/ship-new3.jpeg";

  return (
    <main className="bg-white text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative h-[570px] overflow-hidden bg-[#041a35]">

        <Image
          src={heroImage}
          alt={page?.title || "Madina Group business operations"}
          fill
          priority
          className="object-cover"
          unoptimized
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

              {page?.label || "Madina Group"}
            </div>

            <h1 className="text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {page?.title || "One Group."}
              <br />

              <span className="text-blue-300">
                {page?.highlight || ""}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              {page?.description ||
                "Our sister concerns bring together expertise across marine services, logistics, transportation, equipment, energy and industrial operations."}
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

          {sectors.map((item, index) => {

            const Icon = getIcon(item.icon);

            return (
              <div
                key={item.id}
                className={`flex items-center gap-5 p-7 ${
                  index !== sectors.length - 1
                    ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                  <Icon size={22} />
                </div>

                <div>

                  <div className="text-2xl font-bold text-[#06245a]">
                    {item.value}
                  </div>

                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =========================================================
          SISTER CONCERNS
      ========================================================== */}
      <section id="concerns" className="scroll-mt-20 py-5">

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

              const Icon = getIcon(item.icon);

              const image =
                item.image_url ||
                item.image ||
                "";

              return (
                <article
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
                >

                  {/* Small Image */}
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">

                    {image ? (
                      <>
                        <Image
                          src={image}
                          alt={item.title}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="object-cover transition duration-500 group-hover:scale-110"
                          unoptimized
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-blue-800">
                        <Icon size={22} strokeWidth={1.7} />
                      </div>
                    )}

                  </div>


                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <h3 className="text-sm font-bold leading-5 text-[#06245a]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SISTER ORGANIZATIONS
      ========================================================== */}
      <section id="organizations" className="scroll-mt-20 bg-white py-10">

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


          {/* Sister Organizations */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {organizations.map((item) => {

              const Icon = getIcon(item.icon);

              return (
                <div
                  key={item.id}
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

                </div>
              );
            })}

          </div>

        </div>

      </section>


    </main>
  );
}
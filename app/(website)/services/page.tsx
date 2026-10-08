"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Compass,
  Globe2,
  Ship,
  FileCheck,
  Container,
  ShipWheel,
  PackageCheck,
  Warehouse,
  ShipIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import api from "@/services/api";

interface PageData {
  id?: number;
  label: string;
  title: string;
  highlight: string;
  description: string;
  hero_image?: string | null;
  hero_image_url?: string | null;
  hero_bottom_label: string;
  contact_button_text: string;
  contact_button_url: string;
  about_button_text: string;
  about_button_url: string;

  services_section_label: string;
  services_section_title: string;
  services_section_description: string;

  expertise_label: string;
  expertise_title: string;
  expertise_description: string;

  resources_label: string;
  resources_title: string;
  resources_description: string;

  status: boolean;
}

interface StatData {
  id?: number;
  value: string;
  label: string;
  sort_order: number;
  status: boolean;
}

interface ServiceData {
  id?: number;
  number: string;
  title: string;
  description: string;
  icon: string;
  network_position: string;
  sort_order: number;
  status: boolean;
}

interface EquipmentData {
  id?: number;
  name: string;
  category: string;
  units: string | null;
  description: string;
  image?: string | null;
  image_url?: string | null;
  sort_order: number;
  status: boolean;
}

interface ServicesData {
  page: PageData;
  stats: StatData[];
  services: ServiceData[];
  equipments: EquipmentData[];
}

const iconMap: Record<string, any> = {
  Ship,
  FileCheck,
  ShipWheel,
  PackageCheck,
  Anchor,
  Container,
  Globe2,
  Warehouse,
  ShipIcon,
};

async function getServices(): Promise<ServicesData> {
  const response = await api.get("/website/services");

  return response.data.data;
}

export default function ServicesPage() {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  if (isLoading || !data) {
    return (
      <main className="bg-white text-slate-900">
        <section className="relative min-h-[620px] overflow-hidden bg-[#03172f]" />
      </main>
    );
  }

  const {
    page,
    stats,
    services,
    equipments,
  } = data;

  return (
    <main className="bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#03172f]">

        <Image
          src={page.hero_image_url || "/images/ship2.jpg"}
          alt={page.title || "Madina Maritime services"}
          fill
          priority
          unoptimized
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
              {page.label}
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-8xl">
              {page.title}
              <br />
              <span className="text-blue-300">
                {page.highlight}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
              {page.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Button
                size="lg"
                className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
              >
                <Link
                  href={page.contact_button_url || "/contact"}
                  className="flex items-center gap-2"
                >
                  {page.contact_button_text || 'Discuss Your Requirements'}

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
                <Link href={page.about_button_url || "/about"}>
                  {page.about_button_text || 'About MML'}
                </Link>
              </Button>

            </div>

          </div>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 lg:left-10">
          <Compass size={15} />
          {page.hero_bottom_label}
        </div>

      </section>


      {/* =====================================================
          INTRO / STATS
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

          {stats
            .filter((item) => item.status)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((item, index, activeStats) => (
              <div
                key={item.id ?? item.label}
                className={`p-7 ${
                  index !== activeStats.length - 1
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
          SERVICE DESCRIPTIONS
      ====================================================== */}
      <section className="bg-slate-50 py-14">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              {page.expertise_label || 'Our Expertise'}
            </div>

            <h2 className="text-3xl font-bold text-[#06245a] sm:text-4xl">
              {page.expertise_title || 'Our Maritime Services'}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {page.expertise_description || 'Comprehensive maritime and logistics services designed to support vessels, cargo and international business operations.'}
            </p>

          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">

            {services
              .filter((item) => item.status)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((service) => {

                const Icon =
                  iconMap[service.icon] || Ship;

                return (
                  <div
                    key={service.id ?? service.title}
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
          EQUIPMENT & MACHINERY
      ====================================================== */}
      <section className="bg-white py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              {page.resources_label || 'Our Resources'}
            </div>

            <h2 className="text-3xl font-bold text-[#06245a] sm:text-4xl">
              {page.resources_title || 'Equipment & Machinery'}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {page.resources_description || 'Our extensive fleet of marine vessels and heavy equipment supports efficient cargo handling, transportation, dredging and maritime operations.'}
            </p>

          </div>


          {/* Equipment List */}
          <div className="mt-10 space-y-5">

            {equipments
              .filter((item) => item.status)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((equipment) => (

                <div
                  key={equipment.id ?? equipment.name}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >

                  <div className="grid md:grid-cols-[280px_1fr]">

                    <div className="relative h-56 overflow-hidden bg-slate-100 md:h-auto">

                      <Image
                        src={
                          equipment.image_url ||
                          "/images/ship2.jpg"
                        }
                        alt={equipment.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        unoptimized
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                    </div>


                    <div className="flex items-center p-6 md:p-8">

                      <div className="w-full">

                        <div className="flex items-start justify-between gap-5">

                          <div>

                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                              {equipment.category}
                            </div>

                            <h3 className="mt-2 text-2xl font-bold text-[#06245a]">
                              {equipment.name}
                            </h3>

                          </div>


                          <div className="shrink-0 text-right">

                            <div className="text-3xl font-bold text-[#06245a]">
                              {equipment.units || ""}
                            </div>

                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              Units
                            </div>

                          </div>

                        </div>


                        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                          {equipment.description}
                        </p>

                      </div>

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
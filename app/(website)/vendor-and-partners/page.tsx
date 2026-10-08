"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Handshake,
  Ship,
  Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import api from "@/services/api";

interface PageData {
  id?: number;
  label?: string;
  title?: string;
  highlight?: string;
  description?: string;
  hero_image?: string | null;
  hero_image_url?: string | null;
  explore_button_text?: string;
  explore_button_url?: string;
  partner_button_text?: string;
  partner_button_url?: string;
  status?: boolean;
}

interface Stat {
  id: number;
  value: string;
  label: string;
  icon?: string | null;
  sort_order: number;
  status: boolean;
}

interface Partner {
  id: number;
  name: string;
  category: string;
  logo?: string | null;
  logo_url?: string | null;
  description?: string | null;
  sort_order: number;
  status: boolean;
}

interface VendorPartnerResponse {
  page: PageData | null;
  stats: Stat[];
  partners: Partner[];
}

const iconMap = {
  Handshake,
  Globe2,
  Ship,
  Star,
};

async function getVendorPartners(): Promise<VendorPartnerResponse> {
  const response = await api.get("/website/vendors-partners");

  return response.data.data;
}

export default function VendorsAndPartnersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["vendors-partners"],
    queryFn: getVendorPartners,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const page = data?.page;

  const stats = data?.stats || [];

  const vendors = data?.partners || [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#06245a]" />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[570px] overflow-hidden bg-[#041a35]">
        <Image
          src={page?.hero_image_url || "/images/ship-new2.jpeg"}
          alt="Madina Maritime Vendors and Partners"
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/80 to-[#062653]/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/70 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[570px] max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              <span className="h-px w-12 bg-blue-400" />

              {page?.label || "Vendors & Partners"}
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {page?.title || "Strong partnerships."}
              <br />
              <span className="text-blue-300">
                {page?.highlight || "Reliable operations."}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              {page?.description ||
                "We work with trusted vendors, suppliers and service partners who help us deliver safe, reliable and efficient maritime operations across Bangladesh."}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={page?.explore_button_url || "#partners"}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-blue-50"
              >
                {page?.explore_button_text || "Explore Partners"}
                <ArrowRight size={17} />
              </Link>

              <Link
                href={page?.partner_button_url || "/contact"}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#06245a]"
              >
                {page?.partner_button_text || "Become a Partner"}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </section>

      <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon =
              iconMap[stat.icon as keyof typeof iconMap] || Handshake;

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
                  <Icon size={22} />
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

      <section id="partners" className="scroll-mt-20 py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Partner Network
              </div>

              <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                Trusted partners
                <br />
                behind our operations.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"
              >
                <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-50 p-6 transition group-hover:bg-blue-50">
                  {vendor.logo_url || vendor.logo ? (
                    <Image
                      src={vendor.logo_url || vendor.logo || ""}
                      alt={vendor.name}
                      width={180}
                      height={90}
                      unoptimized
                      className="max-h-20 w-auto object-contain grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  ) : null}
                </div>

                <div className="mt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {vendor.category}
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-[#06245a]">
                    {vendor.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                    {vendor.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-xs font-semibold text-slate-400">
                      Trusted Partner
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-[#06245a] group-hover:text-white">
                      <ArrowUpRight size={15} />
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
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
  Ship,
  Star,
  Users,
} from "lucide-react";

const vendors = [
  {
    name: "MJL Bangladesh PLC",
    category: "Lubricant",
    logo: "/images/MJL Bangladesh PLC.svg",
    description:
      "MJL Bangladesh PLC is an embodiment of trust when it comes to providing excellence in petroleum products and retaining optimum performance.",
  },
  {
    name: "Ranks Petroleum Ltd",
    category: "Lubricant",
    logo: "/images/Ranks Petroleum Ltd.png",
    description:
      "Ranks Petroleum Ltd. (RKPL), one of the prominent SBUs of Rancon, has been the Macro Distributor of Shell Lubricants in Bangladesh since 2004.",
  },
  {
    name: "ACI Motors",
    category: "Tyre",
    logo: "/images/ACI Motors.svg",
    description:
      "ACI Motors Limited provides Complete Farm Mechanization Solution to farmers by offering a wide range of agriculture machineries.",
  },
  {
    name: "Rahimafrooz Batteries Ltd",
    category: "Battery",
    logo: "/images/Rahimafrooz Batteries Ltd.png",
    description:
      "Rahimafrooz Batteries Ltd. (RBL) is the largest lead-acid battery manufacturer in Bangladesh.",
  },
  {
    name: "Panna Battery Ltd",
    category: "Battery",
    logo: "/images/Panna Battery Ltd.png",
    description:
      "Panna Battery Ltd.(PBL) is the largest lead-acid battery manufacturer in Bangladesh started its journey 2006 with 5,76,000 Sq. Feet area.",
  },
  {
    name: "Hamko Corporation",
    category: "Tyre",
    logo: "/images/Hamko Corporation.png",
    description:
      "Become the leading battery manufacturer in Bangladesh and offer other daily life products and solutions to customers with highest quality to make HAMKO a chosen brand name in multiple industries.",
  },
  {
    name: "Fuch Lubricant",
    category: "Lubricant",
    logo: "/images/Fuch Lubricant.png",
    description:
      "FUCHS is a global lubricant supplier offering automotive lubricants, industrial lubricants, lubricating greases, metal processing lubricants.",
  },
  {
    name: "Esab Bangladesh",
    category: "Welding Electrodes",
    logo: "/images/Esab Bangladesh.webp",
    description:
      "ESAB is a world leader in welding and cutting equipment and consumables. We offer a complete line of fabrication solutions for virtually every application.",
  },

    {
    name: "BSRM Wires Ltd",
    category: "Welding Electrodes",
    logo: "/images/BSRM Wires Ltd.png",
    description:
      "BSRM ventured into a new business area as part of continuous innovation philosophy and diversification plan and set up BSRM Wires at Mirsarai.",
  },
  {
    name: "Elite Paint",
    category: "Marine Paint",
    logo: "/images/Elite Paint.png.svg",
    description:
      "We are proud to offer a comprehensive range of premium paints and coatings that will elevate the beauty and protection of your surfaces. product.",
  },
  {
    name: "Berger Bangladesh",
    category: "Marine Paint",
    logo: "/images/Berger Bangladesh.png",
    description:
      "Transform your home with Berger Paints, the best paint company in Bangladesh.",
  },
  {
    name: "Jotun Bangladesh",
    category: "Marine Paint",
    logo: "/images/Jotun Bangladesh.svg",
    description:
      "As one of the world's leading paint and coating manufacturers, Jotun protects all types of property - from iconic buildings to beautiful homes.",
  },
];

const partnerCategories = [
  {
    title: "Marine Suppliers",
    count: "20+",
    description:
      "Reliable suppliers providing marine equipment, tools, spare parts and operational supplies.",
  },
  {
    title: "Technical Partners",
    count: "15+",
    description:
      "Experienced technical partners supporting vessel maintenance, inspection and specialized services.",
  },
  {
    title: "Logistics Partners",
    count: "12+",
    description:
      "Transportation and logistics partners helping us maintain efficient cargo and supply movement.",
  },
  {
    title: "Service Providers",
    count: "10+",
    description:
      "Professional service providers supporting our day-to-day maritime and business operations.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Trusted Partners",
    icon: Handshake,
  },
  {
    value: "15+",
    label: "Service Categories",
    icon: Globe2,
  },
  {
    value: "1000+",
    label: "Successful Operations",
    icon: Ship,
  },
  {
    value: "98%",
    label: "Partner Satisfaction",
    icon: Star,
  },
];

export default function VendorsAndPartnersPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative min-h-[570px] overflow-hidden bg-[#041a35]">
        <Image
          src="/images/ship22.jpg"
          alt="Madina Maritime Vendors and Partners"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/80 to-[#062653]/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/70 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[570px] max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              <span className="h-px w-12 bg-blue-400" />
              Vendors & Partners
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Strong partnerships.
              <br />
              <span className="text-blue-300">
                Reliable operations.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              We work with trusted vendors, suppliers and service partners
              who help us deliver safe, reliable and efficient maritime
              operations across Bangladesh.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#partners"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-blue-50"
              >
                Explore Partners
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#06245a]"
              >
                Become a Partner
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </section>

      {/* =========================================================
          STATS
      ========================================================== */}

      <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
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

      {/* =========================================================
          PARTNER NETWORK
      ========================================================== */}

      <section
        id="partners"
        className="scroll-mt-20 py-5"
      >
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

          {/* =====================================================
              PARTNER CARDS
          ====================================================== */}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"
              >
                <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-50 p-6 transition group-hover:bg-blue-50">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    width={180}
                    height={90}
                    className="max-h-20 w-auto object-contain grayscale transition duration-500 group-hover:grayscale-0"
                  />
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
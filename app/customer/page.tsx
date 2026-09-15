
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

const customers = [
  {
    name: "Rahim Group",
    category: "Industrial",
    logo: "/images/customer_rahim_steel.png",
    description:
      "Supporting large-scale industrial and logistics operations with dependable maritime solutions.",
  },
  {
    name: "Awal & Brothers Chemicals Company Limited",
    category: "Industrial",
    logo: "/images/Awal & Brothers Chemicals Company Limited.jpg",
    description:
      "Providing reliable transportation and maritime support for large-scale commercial operations.",
  },
  {
    name: "Astha Feed Industries Limited",
    category: "Manufacturing",
    logo: "/images/Astha Feed Industries Ltd.png",
    description:
      "Delivering efficient logistics and marine transportation solutions for industrial requirements.",
  },
  {
    name: "PRAN-RFL Group",
    category: "Manufacturing",
    logo: "/images/customer-4.png",
    description:
      "Supporting supply-chain movement through reliable transportation and operational services.",
  },
  {
    name: "Abul Khair Group",
    category: "Industrial",
    logo: "/images/customer-5.png",
    description:
      "Trusted maritime and logistics support for industrial cargo movement.",
  },
  {
    name: "City Group",
    category: "Consumer & Industrial",
    logo: "/images/customer-6.png",
    description:
      "Providing dependable marine transportation and logistics support.",
  },
  {
    name: "TK Group",
    category: "Trading & Manufacturing",
    logo: "/images/customer-7.png",
    description:
      "Supporting business operations with efficient maritime transportation solutions.",
  },
  {
    name: "Confidence Group",
    category: "Infrastructure",
    logo: "/images/customer-8.png",
    description:
      "Maritime and logistics support for infrastructure and industrial operations.",
  },
];

const industries = [
  {
    title: "Industrial",
    count: "20+",
    description:
      "Supporting Bangladesh's leading industrial organizations with dependable maritime services.",
  },
  {
    title: "Manufacturing",
    count: "15+",
    description:
      "Reliable transportation and logistics solutions for manufacturing businesses.",
  },
  {
    title: "Trading",
    count: "12+",
    description:
      "Helping trading organizations move cargo efficiently across key routes.",
  },
  {
    title: "Infrastructure",
    count: "10+",
    description:
      "Supporting major infrastructure and development projects with marine logistics.",
  },
];

const stats = [
  {
    value: "50+",
    label: "Corporate Clients",
    icon: Building2,
  },
  {
    value: "15+",
    label: "Industries Served",
    icon: Globe2,
  },
  {
    value: "1000+",
    label: "Successful Operations",
    icon: Ship,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: Star,
  },
];

export default function CustomersPage() {
  return (
    <main className="bg-white text-slate-900">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative min-h-[570px] overflow-hidden bg-[#041a35]">

        <Image
          src="/images/ship1.jpg"
          alt="Madina Maritime Customers"
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
              Our Customers
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Trusted by
              <br />
              <span className="text-blue-300">
                industry leaders.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/80">
              We build long-term relationships with organizations that
              value reliability, operational excellence and dependable
              maritime solutions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="#customers"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-blue-50"
              >
                Explore Customers
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
          INTRO
      ========================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Built on Trust
              </span>

              <span className="h-px w-12 bg-blue-200" />

            </div>

            <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
              Partnerships that
              <br />
              create lasting value.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Our customers are at the heart of everything we do. We work
              closely with businesses across different sectors to provide
              dependable maritime and logistics solutions.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              From industrial cargo movement to marine transportation,
              our team works to understand each customer's operational
              requirements and deliver solutions that are safe, efficient
              and reliable.
            </p>

            <div className="mt-8 space-y-4">

              {[
                "Long-term business relationships",
                "Reliable maritime operations",
                "Professional service delivery",
                "Customer-focused solutions",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-blue-700"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>

              ))}

            </div>

          </div>


          <div className="relative">

            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-3xl border border-blue-100" />

            <div className="relative overflow-hidden rounded-[2rem]">

              <Image
                src="/images/ship2.jpg"
                alt="Maritime operations"
                width={900}
                height={650}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/80 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">

                <div className="flex items-center gap-3 text-white">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                    <Handshake size={21} />
                  </div>

                  <div>

                    <div className="font-bold">
                      Trusted Partnerships
                    </div>

                    <div className="text-sm text-blue-100/70">
                      Built for the long term
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          INDUSTRIES
      ========================================================== */}

      <section className="bg-[#f6f9fc] py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Customer Industries
            </div>

            <h2 className="mt-4 text-4xl font-bold text-[#06245a] sm:text-5xl">
              Serving diverse industries.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Our customer portfolio spans multiple sectors, each with
              unique operational requirements and challenges.
            </p>

          </div>


          <div className=" grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {industries.map((industry, index) => (

              <div
                key={industry.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
              >

                <div className="absolute right-5 top-5 text-6xl font-black text-slate-100 transition group-hover:text-blue-50">
                  0{index + 1}
                </div>

                <div className="relative">

                  <div className="text-4xl font-bold text-[#06245a]">
                    {industry.count}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#06245a]">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {industry.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Learn more
                    <ArrowRight size={14} />
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          CUSTOMER LOGOS
      ========================================================== */}

      <section
        id="customers"
        className="scroll-mt-20 py-10"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>

              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Customer Network
              </div>

              <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
                Organizations that
                <br />
                trust our services.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              A growing network of businesses across Bangladesh that
              rely on our maritime and logistics capabilities.
            </p>

          </div>


          <div className=" grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {customers.map((customer) => (

              <div
                key={customer.name}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"
              >

                <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-50 p-6 transition group-hover:bg-blue-50">

                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    width={180}
                    height={90}
                    className="max-h-20 w-auto object-contain grayscale transition duration-500 group-hover:grayscale-0"
                  />

                </div>

                <div className="mt-6">

                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {customer.category}
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-[#06245a]">
                    {customer.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                    {customer.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                    <span className="text-xs font-semibold text-slate-400">
                      Valued Partner
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


      {/* =========================================================
          CTA
      ========================================================== */}



    </main>
  );
}


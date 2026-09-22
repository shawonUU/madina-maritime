"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Anchor,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Leaf,
  MoveUpRight,
  ShieldCheck,
  Ship,
  Target,
  Users,
  Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const slides = [
  {
    type: "video",
    src: "/videos/ship-video-1.mp4",
  },
  {
    type: "video",
    src: "/videos/ship-video-4.mp4",
  },
  {
    type: "video",
    src: "/videos/ship-video-2.mp4",
  },
  {
    type: "video",
    src: "/videos/ship-video-3.mp4",
  },
  {
    type: "image",
    src: "/images/ship32.jpeg",
  },
];

const missions = [
  {
    number: "01",
    title: "Rapid Progress",
    desc: "Madina Maritime Limited is a concern of Madina Group, one of the leading companies in Bangladesh, with diversified interests across Polymer Industries, Marine Services, Trading, Cement Industries and Property Development.",
    img: "/images/rapid-progress1.jpg",
    icon: MoveUpRight,
  },
  {
    number: "02",
    title: "Trust",
    desc: "We continuously strive to accomplish what has not easily been done before through the ideas, efforts and capabilities of every member of our team. A challenging mindset is fundamental to our approach.",
    img: "/images/trust1.jpg",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Action",
    desc: "Economic success is a common objective across industries. At MML, successful results matter, but we also place strong emphasis on the process, discipline and continuous improvement behind those results.",
    img: "/images/Picture5.png",
    icon: Target,
  },
];

const divisions = [
  {
    title: "Marine Services",
    description:
      "Reliable marine operations supported by experienced teams and modern operational practices.",
    image: "/images/Picture4.png",
    icon: Ship,
  },
  {
    title: "Marine Logistics",
    description:
      "Efficient commercial operations connecting products, partners and markets.",
    image: "/images/ship2.jpg",
    icon: Globe2,
  },
  {
    title: "Industrial Operations",
    description:
      "Supporting diversified industrial activities through disciplined and reliable operations.",
    image: "/images/Picture3.png",
    icon: Anchor,
  },
];

const news = [
  {
    date: "01 AUG 2026",
    category: "PRESS RELEASE",
    title: "Madina Maritime Expands Fleet",
    image: "/images/ship1.jpg",
    slug: "fleet-expansion",
  },
  {
    date: "25 JUL 2026",
    category: "EVENTS",
    title: "Annual Shipping Conference 2026",
    image: "/images/ship2.jpg",
    slug: "annual-conference",
  },
  {
    date: "15 JUL 2026",
    category: "SUSTAINABILITY",
    title: "Building a More Sustainable Maritime Future",
    image: "/images/ship3.jpg",
    slug: "green-shipping",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative h-[680px] min-h-[650px] overflow-hidden bg-[#041a35]">

        {/* Background carousel */}
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-all duration-[1200ms] ${
              current === index
                ? "scale-100 opacity-100"
                : "scale-110 opacity-0"
            }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt="Madina Maritime vessel"
                fill
                unoptimized
                priority={index === 0}
                className="object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay={current === index}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/20 via-[#062653]/65 to-[#062653]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/80 via-transparent to-transparent" />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">

          <div className="max-w-4xl pt-12">

            <div className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              <span className="h-px w-12 bg-blue-400" />
              Madina Maritime Limited
            </div>

            <h1 className="text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Connecting
              <br />
              <span className="text-blue-300">
                Business
              </span>
              <br />
              Through The Sea.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-blue-50/80 sm:text-lg">
              Flexible, reliable and on-time maritime services built around
              operational excellence, trust and long-term partnerships.
            </p>

            <div className="mt-9 mb-10 flex flex-wrap gap-4">

              <Button
                size="lg"
                className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Discover MML
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={18}
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 px-7 text-white backdrop-blur-sm hover:bg-white hover:text-[#06245a]"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us
                </Link>
              </Button>

            </div>

          </div>
        </div>

        {/* Hero controls */}
        <div className="absolute bottom-28 right-6 z-20 flex gap-2 lg:right-10">

          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#06245a]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-[#06245a]"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-16 left-6 z-20 flex gap-2 lg:left-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all ${
                current === index
                  ? "w-12 bg-white"
                  : "w-5 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60 md:flex">
          Scroll to explore
          <ArrowDown size={15} className="animate-bounce" />
        </div>

      </section>


      {/* =====================================================
          FLOATING STATS
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              value: "24/7",
              label: "Operational Support",
              icon: Waves,
            },
            {
              value: "30+",
              label: "Years of Experience",
              icon: Award,
            },
            {
              value: "05",
              label: "Business Divisions",
              icon: Globe2,
            },
            {
              value: "100%",
              label: "Commitment",
              icon: CheckCircle2,
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group flex items-center gap-5 p-7 ${
                  index !== 3
                    ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                  <Icon size={22} />
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#06245a]">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center">

          {/* Image */}
          <div className="relative">

            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-2xl border border-blue-100" />

            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/ship2.jpg"
                alt="Madina Maritime"
                unoptimized
                width={800}
                height={650}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/70 to-transparent" />

              <div className="absolute bottom-7 left-7 text-white">
                <div className="text-5xl font-bold">MML</div>
                <div className="mt-1 text-sm text-blue-100">
                  Madina Maritime Limited
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -right-5 hidden rounded-2xl bg-[#06245a] p-6 text-white shadow-xl sm:block">
              <Anchor size={26} className="text-blue-300" />
              <div className="mt-3 text-2xl font-bold">
                Maritime
              </div>
              <div className="text-sm text-blue-200">
                Excellence
              </div>
            </div>

          </div>


          {/* Content */}
          <div>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                01 — About Us
              </span>
              <span className="h-px w-12 bg-blue-200" />
            </div>

            <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
              Built on trust.
              <br />
              Driven by progress.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Madina Maritime Limited is part of Madina Group, one of the
              leading diversified business groups in Bangladesh.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              We are a group of professionals committed to expand services &
              business in the field of Maritime Trade, Transportation and
              Logistics, Supply Chain Management business with an innovative
              idea through meeting the international standard of best business
              practice.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                "Reliable marine operations",
                "Experienced professionals",
                "Safety-focused culture",
                "Long-term partnerships",
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

            <Button
              className="mt-9 rounded-full bg-[#06245a] px-7 hover:bg-blue-800"
            >
              <Link href="/about" className="flex items-center gap-2">
                More About Us
                <ArrowRight className="ml-2" size={17} />
              </Link>
            </Button>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION / VALUES
      ====================================================== */}
      <section className="bg-[#f5f8fc] py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              02 — Our Philosophy
            </div>

            <h3 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
              Delivering flexible, reliable, and timely shipping solutions
              across waters.
            </h3>

            <p className="mt-5 leading-7 text-slate-600">
              We are delighted to introduce ourselves as Madina Maritime Limited
              (MML). From a modest company to an International conglomerate,
              take a journey through our historic timeline to learn more about
              how Madina Maritime come to be how we are today.
            </p>

          </div>


          <div className="mt-14 grid gap-7 md:grid-cols-3">

            {missions.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.number}
                  className="group overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
                >

                  <div className="relative h-64 overflow-hidden">

                    <Image
                      src={item.img}
                      alt={item.title}
                      unoptimized
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#06245a]/80 via-transparent to-transparent" />

                    <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-[#06245a] backdrop-blur-sm">
                      <Icon size={20} />
                    </div>

                    <div className="absolute bottom-5 left-6">
                      <span className="text-xs font-bold tracking-[0.25em] text-blue-200">
                        {item.number}
                      </span>

                      <h3 className="mt-1 text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>

                  </div>

                  <CardContent className="p-7">

                    <p className="text-sm leading-7 text-slate-600">
                      {item.desc}
                    </p>

                    <div className="mt-6 h-px bg-slate-100" />

                    <div className="mt-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-700">
                      Our Principle
                      <ArrowUpRight size={17} />
                    </div>

                  </CardContent>

                </Card>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          BUSINESS DIVISIONS
      ====================================================== */}
      <section className="bg-[#06245a] py-10 text-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                03 — Our Business
              </div>

              <h2 className="text-4xl font-bold sm:text-5xl">
                Diverse capabilities.
                <br />
                One trusted partner.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-blue-100/70">
              Our diversified business capabilities allow us to create
              long-term value across multiple industries and markets.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {divisions.map((division) => {
              const Icon = division.icon;

              return (
                <Link
                  href="/services"
                  key={division.title}
                  className="group relative h-[420px] overflow-hidden rounded-3xl"
                >

                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03172f] via-[#06245a]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7">

                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                      <Icon size={21} />
                    </div>

                    <h3 className="text-2xl font-bold">
                      {division.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-blue-100/70">
                      {division.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white">
                      Explore
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY MML
      ====================================================== */}
      <section className="py-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                04 — Why MML
              </div>

              <h2 className="text-4xl font-bold leading-tight text-[#06245a] sm:text-5xl">
                Reliability is not
                <br />
                just a promise.
              </h2>

              <p className="mt-6 leading-7 text-slate-600">
                It is reflected in the way we operate, communicate and
                build relationships with our customers and partners.
              </p>

              <div className="mt-10 space-y-6">

                {[
                  {
                    icon: ShieldCheck,
                    title: "Safety First",
                    desc: "Safety remains central to our operational culture.",
                  },
                  {
                    icon: Users,
                    title: "Experienced Team",
                    desc: "Skilled people driving disciplined maritime operations.",
                  },
                  {
                    icon: Award,
                    title: "Operational Excellence",
                    desc: "Focused on consistency, quality and continuous improvement.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#06245a]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>


            <div className="relative">

              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/images/ship32.jpeg"
                  alt="Maritime operations"
                  unoptimized
                  width={900}
                  height={700}
                  className="h-[560px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 hidden w-64 rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:block">

                <Leaf
                  size={25}
                  className="text-green-600"
                />

                <div className="mt-4 text-lg font-bold text-[#06245a]">
                  Responsible Growth
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Building sustainable value for our business, people
                  and communities.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
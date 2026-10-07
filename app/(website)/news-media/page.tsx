"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Mail,
  Search,
  Ship,
  Sparkles,
  TrendingUp,
  Waves,
} from "lucide-react";

type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  img: string;
  category: string;
  date: string;
  time: string;
  readTime: string;
  featured?: boolean;
};

const news: NewsItem[] = [
  {
    slug: "fleet-expansion",
    title: "Madina Maritime Expands Fleet",
    summary:
      "We are proud to announce the addition of new vessels to strengthen our global shipping capacity and operational capabilities.",
    img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    category: "Press Release",
    date: "2026-08-01",
    time: "10:30 AM",
    readTime: "4 min read",
    featured: true,
  },
  {
    slug: "annual-conference",
    title: "Annual Shipping Conference 2026",
    summary:
      "Madina Maritime participated in the global shipping conference, showcasing innovation, technology and sustainability.",
    img: "https://images.unsplash.com/photo-1505839673365-e3971f8d9184",
    category: "Events",
    date: "2026-07-25",
    time: "2:00 PM",
    readTime: "3 min read",
  },
  {
    slug: "green-shipping",
    title: "Green Shipping Practices",
    summary:
      "Exploring eco-friendly initiatives designed to reduce our environmental footprint and build a more sustainable maritime future.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    category: "Sustainability",
    date: "2026-07-15",
    time: "11:00 AM",
    readTime: "5 min read",
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation in Shipping",
    summary:
      "How AI, IoT and connected systems are transforming fleet management and maritime operations.",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    category: "Technology",
    date: "2026-06-10",
    time: "09:00 AM",
    readTime: "6 min read",
  },
  {
    slug: "maritime-safety",
    title: "Strengthening Maritime Safety",
    summary:
      "Our continued commitment to operational excellence, crew safety and responsible maritime practices.",
    img: "https://images.unsplash.com/photo-1540946485063-a40da27545f8",
    category: "Company News",
    date: "2026-05-22",
    time: "01:15 PM",
    readTime: "4 min read",
  },
  {
    slug: "port-operations",
    title: "Building Smarter Port Operations",
    summary:
      "Modern technology is helping maritime operators improve visibility, efficiency and operational decision-making.",
    img: "https://images.unsplash.com/photo-1566847438217-76e82d383f84",
    category: "Technology",
    date: "2026-04-18",
    time: "10:00 AM",
    readTime: "5 min read",
  },
];

const categories = [
  "All",
  "Press Release",
  "Company News",
  "Events",
  "Technology",
  "Sustainability",
];

export default function NewsPage() {
  const [visible, setVisible] = useState(4);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const featuredNews = news.find((item) => item.featured);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#061a36]">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-34">
          {/* Breadcrumb */}
        

          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div className="max-w-4xl">
              <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
                <span className="h-px w-12 bg-blue-400" />
                Madina Maritime Limited
              </div>

              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                News,
                <br />
                <span className="text-blue-300">Stories & Insights</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Discover the latest news, company announcements, maritime
                insights and stories shaping the future of Madina Maritime.
              </p>
            </div>

            {/* Hero side stats */}
            <div className="lg:pl-10">
              <div className="border-l border-white/10 pl-7">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300">
                  Latest update
                </p>

                <p className="mt-3 text-2xl font-semibold text-white">
                  Connecting business through the sea.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-white">24+</div>
                    <div className="mt-1 text-sm text-slate-400">
                      News stories
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-white">2026</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Latest edition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f7f9fc] [clip-path:ellipse(65%_100%_at_50%_100%)]" />
      </section>

      {/* =========================================================
          FEATURED STORY
      ========================================================== */}
      {featuredNews && (
        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
          <div className="group grid overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(15,23,42,0.14)] lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[360px] overflow-hidden lg:min-h-[500px]">
              <Image
                src={featuredNews.img}
                alt={featuredNews.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#061a36]/80 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08224a]">
                  Featured Story
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <span>{featuredNews.category}</span>
                <span className="h-1 w-1 rounded-full bg-blue-400" />
                <span>{featuredNews.date}</span>
              </div>

              <h2 className="text-3xl font-bold leading-tight text-[#06245a] sm:text-4xl">
                {featuredNews.title}
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {featuredNews.summary}
              </p>

              <div className="mt-7 flex items-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {featuredNews.readTime}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {featuredNews.time}
                </span>
              </div>

              <Link
                href={`/news-details`}
                className="group/link mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-[#06245a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Read Full Story
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover/link:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          LATEST NEWS BAR
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex-row">
          <div className="flex shrink-0 items-center gap-3 bg-[#06245a] px-6 py-4 text-sm font-bold text-white">
            <TrendingUp size={17} />
            LATEST NEWS
          </div>

          <div className="flex min-w-0 items-center gap-5 overflow-hidden px-6 py-4">
            <span className="shrink-0 text-sm font-semibold text-blue-800">
              01 AUG 2026
            </span>

            <p className="truncate text-sm text-slate-600">
              Madina Maritime announces fleet expansion and continued
              investment in maritime capabilities.
            </p>

            <ArrowUpRight
              size={17}
              className="ml-auto shrink-0 text-blue-700"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          NEWS SECTION
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-blue-600" />
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                Latest stories
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-[#06245a] sm:text-5xl">
              Explore our latest news
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              Stay informed with company updates, maritime insights,
              technology, sustainability and events.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(4);
              }}
              className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisible(4);
                }}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "border-[#06245a] bg-[#06245a] text-white shadow-lg shadow-blue-900/10"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* News grid */}
        {filteredNews.length > 0 ? (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.slice(0, visible).map((item) => (
              <article
                key={item.slug}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#06245a] shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-xs font-medium text-white">
                    <CalendarDays size={14} />
                    {item.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 size={14} />
                    {item.readTime}
                  </div>

                  <h3 className="line-clamp-2 text-xl font-bold leading-snug text-[#06245a] transition group-hover:text-blue-700">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {item.summary}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <Link
                      href={`/news-details`}
                      className="group/read inline-flex items-center gap-2 text-sm font-bold text-[#06245a]"
                    >
                      Read More
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/read:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <Search className="mx-auto text-slate-300" size={40} />
            <h3 className="mt-4 text-lg font-bold text-slate-700">
              No news found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or category.
            </p>
          </div>
        )}

        {/* Load More */}
        {visible < filteredNews.length && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setVisible((prev) => prev + 3)}
              className="group inline-flex items-center gap-3 rounded-full border border-[#06245a] bg-white px-7 py-3.5 text-sm font-bold text-[#06245a] transition hover:bg-[#06245a] hover:text-white"
            >
              Load More News
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================
          MARITIME INSIGHTS / STATS
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#06245a]">
        <div className="absolute right-0 top-0 opacity-[0.06]">
          <Ship size={420} strokeWidth={1} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 flex items-center gap-3 text-blue-300">
                <Waves size={20} />
                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Maritime Insights
                </span>
              </div>

              <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Moving forward,
                <br />
                together.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-blue-100/70">
                From fleet operations to digital innovation, we continue to
                evolve our maritime capabilities while keeping safety,
                efficiency and sustainability at the heart of what we do.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300"
              >
                Discover Madina Maritime
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 border-t border-l border-white/10 sm:grid-cols-3">
              <div className="border-b border-r border-white/10 p-7">
                <div className="text-4xl font-bold text-white">24+</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  Published stories
                </p>
              </div>

              <div className="border-b border-r border-white/10 p-7">
                <div className="text-4xl font-bold text-white">06</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  News categories
                </p>
              </div>

              <div className="border-b border-white/10 p-7">
                <div className="text-4xl font-bold text-white">2026</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  Latest updates
                </p>
              </div>

              <div className="border-r border-white/10 p-7">
                <div className="text-4xl font-bold text-white">24/7</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  Maritime operations
                </p>
              </div>

              <div className="border-r border-white/10 p-7">
                <div className="text-4xl font-bold text-white">100%</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  Commitment
                </p>
              </div>

              <div className="p-7">
                <div className="text-4xl font-bold text-white">∞</div>
                <p className="mt-2 text-sm text-blue-100/60">
                  Possibilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EVENTS
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-blue-600" />
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                Events
              </span>
            </div>

            <h2 className="text-4xl font-bold text-[#06245a]">
              Where maritime minds meet
            </h2>
          </div>

          <Link
            href="/events"
            className="hidden items-center gap-2 text-sm font-bold text-blue-700 sm:flex"
          >
            View all events
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              month: "AUG",
              day: "18",
              title: "Global Maritime Technology Forum",
              location: "Singapore",
            },
            {
              month: "SEP",
              day: "05",
              title: "International Shipping Conference",
              location: "Dubai",
            },
            {
              month: "OCT",
              day: "12",
              title: "Maritime Sustainability Summit",
              location: "Hamburg",
            },
          ].map((event) => (
            <div
              key={event.title}
              className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-[#06245a] text-white">
                <span className="text-xs font-bold tracking-widest text-blue-300">
                  {event.month}
                </span>
                <span className="text-3xl font-bold">{event.day}</span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Upcoming Event
                </p>

                <h3 className="mt-2 font-bold leading-6 text-[#06245a]">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {event.location}
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="ml-auto shrink-0 text-slate-300 transition group-hover:text-blue-600"
              />
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          NEWSLETTER CTA
      ========================================================== */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#06245a] via-[#0a3478] to-[#075985] px-7 py-14 sm:px-12 lg:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-blue-200">
                <Mail size={19} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Stay informed
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Get the latest from Madina Maritime
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-blue-100/70">
                Receive company news, maritime insights and important updates
                directly in your inbox.
              </p>
            </div>

            <div className="flex w-full max-w-md rounded-full bg-white p-1.5 shadow-2xl">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button className="shrink-0 rounded-full bg-[#06245a] px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-950">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
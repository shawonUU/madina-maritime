"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Ship,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface ContactSettings {
  id: number;

  hero_label: string | null;
  hero_title: string | null;
  hero_highlight: string | null;
  hero_description: string | null;
  hero_image: string | null;
  hero_button_text: string | null;
  hero_button_url: string | null;

  bottom_caption: string | null;

  address_label: string | null;
  office_title: string | null;
  address: string | null;

  phone_label: string | null;
  phone_title: string | null;
  phone_description: string | null;

  email_label: string | null;
  email: string | null;

  hours_label: string | null;
  working_days: string | null;
  working_hours: string | null;

  form_label: string | null;
  form_title: string | null;
  form_description: string | null;

  map_title: string | null;
  map_embed_url: string | null;

  status: number;
}

interface ContactResponse {
  status: boolean;
  data: ContactSettings;
}

async function fetchContactSettings(): Promise<ContactSettings> {
  const response = await api.get<ContactResponse>("/website/contact");

  return response.data.data;
}

export default function Contact() {
  const {
    data: page,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["website-contact"],
    queryFn: fetchContactSettings,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  if (isLoading) {
    return (
      <main className="bg-white text-slate-900">
        <section className="relative min-h-[560px] overflow-hidden bg-[#03172f]">
          <div className="absolute inset-0 bg-[#03172f]" />

          <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl items-center px-6 lg:px-8">
            <div className="h-48 w-full max-w-3xl animate-pulse rounded-2xl bg-white/10" />
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
          <div className="h-52 animate-pulse rounded-2xl bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)]" />
        </section>
      </main>
    );
  }

  if (isError || !page) {
    return (
      <main className="bg-white text-slate-900">
        <section className="flex min-h-[500px] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#06245a]">
              Contact information is currently unavailable.
            </h1>

            <p className="mt-3 text-slate-500">
              Please try again later.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[560px] overflow-hidden bg-[#03172f]">
        <Image
          src={page.hero_image || "/images/Picture4.png"}
          alt="Contact Madina Maritime Limited"
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/90 via-transparent to-transparent" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              <span className="h-px w-12 bg-blue-400" />

              {page.hero_label || "Madina Maritime Limited"}
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {page.hero_title}
              {page.hero_highlight && (
                <>
                  <br />
                  <span className="text-blue-300">
                    {page.hero_highlight}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
              {page.hero_description}
            </p>

            <div className="mt-9">
              <Button
                size="lg"
                className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
              >
                <Link
                  href={page.hero_button_url || "#contact-form"}
                  className="flex items-center gap-2"
                >
                  {page.hero_button_text || "Send an Enquiry"}

                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 lg:left-10">
          <Ship size={15} />

          {page.bottom_caption || "Connecting Through The Sea"}
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] md:grid-cols-4">
          <div className="group p-7 transition hover:bg-blue-50/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
              <MapPin size={21} />
            </div>

            <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              {page.address_label || "Visit Us"}
            </div>

            <h3 className="mt-2 text-lg font-bold text-[#06245a]">
              {page.office_title || "Head Office"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {page.address}
            </p>
          </div>

          <div className="group border-y border-slate-100 p-7 transition hover:bg-blue-50/50 md:border-x md:border-y-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
              <Phone size={21} />
            </div>

            <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              {page.phone_label || "Call Us"}
            </div>

            <h3 className="mt-2 text-lg font-bold text-[#06245a]">
              {page.phone_title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {page.phone_description || "Our team is available to assist you."}
            </p>
          </div>

          <div className="group p-7 transition hover:bg-blue-50/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
              <Mail size={21} />
            </div>

            <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              {page.email_label || "Email Us"}
            </div>

            <h3 className="mt-2 break-words text-lg font-bold text-[#06245a]">
              {page.email}
            </h3>
          </div>

          <div className="group p-7 transition hover:bg-blue-50/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#06245a] transition group-hover:bg-[#06245a] group-hover:text-white">
              <Clock3 size={21} />
            </div>

            <div className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
              {page.hours_label || "Working Hours"}
            </div>

            <h3 className="mt-2 text-lg font-bold text-[#06245a]">
              {page.working_days}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {page.working_hours}
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
      >
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                {page.form_label || "Send a Message"}
              </div>

              <h3 className="mt-2 text-2xl font-bold text-[#06245a]">
                {page.form_title || "Tell us how we can help."}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {page.form_description ||
                  "Fill out the form below and our team will respond as soon as possible."}
              </p>
            </div>

            <ContactForm />
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                {page.map_title || "Our Location"}
              </div>

              <div className="relative h-[380px] overflow-hidden rounded-3xl bg-[#06245a] shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                  {page.map_embed_url ? (
                    <iframe
                      className="h-full w-full rounded-xl border-0"
                      src={page.map_embed_url}
                      loading="lazy"
                      title={page.map_title || "Madina Maritime Location"}
                    />
                  ) : (
                    <div className="text-white">
                      <MapPin className="mx-auto mb-3" size={32} />

                      <p className="text-sm text-white/70">
                        Location map is currently unavailable.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
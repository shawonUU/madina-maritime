"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
ArrowRight,
ArrowUpRight,
BriefcaseBusiness,
CheckCircle2,
ChevronDown,
Clock3,
Compass,
GraduationCap,
MapPin,
Ship,
Sparkles,
Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const jobs = [
{
id: 1,
title: "Frontend Developer",
location: "Dhaka, Bangladesh",
type: "Full-time",
experience: "2+ Years",
desc: "Build modern, responsive and high-quality web experiences using Next.js, React and modern UI technologies.",
details:
"You will work closely with product, design and backend teams to build scalable web applications and digital experiences. The role requires strong knowledge of React, Next.js, TypeScript and Tailwind CSS.",
responsibilities: [
"Develop responsive web applications using React and Next.js.",
"Build reusable UI components and maintain design consistency.",
"Collaborate with designers and backend developers.",
"Optimize applications for performance and accessibility.",
],
},
{
id: 2,
title: "Backend Engineer",
location: "Dhaka, Bangladesh",
type: "Full-time",
experience: "2+ Years",
desc: "Develop reliable APIs and backend systems that support maritime operations and business applications.",
details:
"You will design and develop secure, scalable backend services while working with databases, APIs and enterprise applications. Experience with PHP, Laravel and relational databases will be valuable.",
responsibilities: [
"Develop and maintain scalable REST APIs.",
"Design efficient database structures and queries.",
"Integrate backend systems with internal and external services.",
"Maintain security, reliability and application performance.",
],
},
{
id: 3,
title: "UI/UX Designer",
location: "Remote",
type: "Contract",
experience: "1+ Years",
desc: "Create intuitive and engaging digital experiences across corporate websites and business applications.",
details:
"You will work with product and development teams to translate business requirements into clear, user-friendly digital experiences. Strong visual design and user-centered thinking are essential.",
responsibilities: [
"Create wireframes, prototypes and high-fidelity designs.",
"Develop and maintain design systems.",
"Work closely with developers during implementation.",
"Conduct design reviews and improve user experiences.",
],
},
];

const benefits = [
{
icon: GraduationCap,
title: "Professional Growth",
desc: "Opportunities to learn, develop new skills and grow with the organization.",
},
{
icon: Sparkles,
title: "Innovation",
desc: "Work on modern digital solutions and technology-driven business initiatives.",
},
{
icon: Users,
title: "Collaborative Culture",
desc: "A professional environment where people, ideas and teamwork are valued.",
},
];

export default function CareerPage() {
const [selectedJob, setSelectedJob] = useState<number | null>(null);

return ( <main className="bg-white text-slate-900">
  {/* =====================================================
      HERO
  ====================================================== */}
  <section className="relative min-h-[600px] overflow-hidden bg-[#03172f]">

    <Image
      src="/images/ship32.jpeg"
      alt="Careers at Madina Maritime"
      fill
      priority
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/95 via-[#062653]/75 to-[#062653]/25" />

    <div className="absolute inset-0 bg-gradient-to-t from-[#03172f]/90 via-transparent to-transparent" />

    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />

    <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center px-6 lg:px-8">

      <div className="max-w-4xl">

        <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
          <span className="h-px w-12 bg-blue-400" />
          Careers at MML
        </div>

        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Build your
          <br />
          <span className="text-blue-300">future with us.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50/80 sm:text-lg">
          Join a growing maritime organization where talented people,
          technology and operational excellence come together.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">

          <Button
            
            size="lg"
            className="group rounded-full bg-white px-7 text-[#06245a] hover:bg-blue-50"
          >
            <Link href="#open-positions" className="flex items-center gap-2">
              Explore Opportunities
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
      <BriefcaseBusiness size={15} />
      Careers & Opportunities
    </div>

  </section>


  <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">

    <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          value: "01",
          label: "Growing Organization",
        },
        {
          value: "24/7",
          label: "Operational Environment",
        },
        {
          value: "100%",
          label: "Commitment to People",
        },
        {
          value: "∞",
          label: "Opportunities to Grow",
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


  <section className="py-15">

    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="mx-auto max-w-3xl text-center">

        <div className=" text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
          01 — Why MML
        </div>

      </div>


      <div className="mt-5 grid gap-6 md:grid-cols-3">

        {benefits.map((benefit) => {

          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="group rounded-3xl border border-slate-100 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition group-hover:bg-[#06245a] group-hover:text-white">
                <Icon size={22} />
              </div>

              <h3 className="mt-7 text-xl font-bold text-[#06245a]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {benefit.desc}
              </p>

            </div>
          );

        })}

      </div>

    </div>

  </section>


  <section
    id="open-positions"
    className="bg-[#f5f8fc] py-0"
  >

    <div className="mx-auto max-w-6xl px-6 lg:px-8">

      <div className="max-w-3xl">

        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
          02 — Open Positions
        </div>

        <h2 className="text-4xl font-bold text-[#06245a] sm:text-5xl">
          Find your next opportunity.
        </h2>

        <p className="mt-5 leading-7 text-slate-600">
          Explore our current openings and find a role where your skills
          and experience can make an impact.
        </p>

      </div>


      <div className="mt-14 space-y-5">

        {jobs.map((job) => {

          const isSelected = selectedJob === job.id;

          return (
            <div
              key={job.id}
              className={`overflow-hidden rounded-3xl border bg-white transition duration-300 ${
                isSelected
                  ? "border-blue-200 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
                  : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl"
              }`}
            >

              {/* Job Header */}
              <div className="p-4">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#06245a]">
                      <BriefcaseBusiness size={23} />
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-[#06245a]">
                        {job.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">

                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {job.type}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <GraduationCap size={14} />
                          {job.experience}
                        </span>

                      </div>

                    </div>

                  </div>


                  <Button
                    variant="outline"
                    className="group w-full rounded-full border-slate-200 text-[#06245a] hover:bg-[#06245a] hover:text-white lg:w-auto"
                    onClick={() =>
                      setSelectedJob(isSelected ? null : job.id)
                    }
                  >
                    {isSelected ? "Hide Details" : "View Details"}

                    <ChevronDown
                      size={17}
                      className={`ml-2 transition-transform ${
                        isSelected ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                </div>


                <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-500">
                  {job.desc}
                </p>

              </div>


              {/* Expanded Details */}
              {isSelected && (

                <div className="border-t border-slate-100 bg-[#f8fbff] px-7 py-8 sm:px-8">

                  <div className="grid gap-10 lg:grid-cols-[1fr_.8fr]">

                    <div>

                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                        About the Role
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {job.details}
                      </p>

                    </div>


                    <div>

                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                        Key Responsibilities
                      </div>

                      <div className="mt-4 space-y-3">

                        {job.responsibilities.map((responsibility) => (

                          <div
                            key={responsibility}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                          >
                            <CheckCircle2
                              size={17}
                              className="mt-1 shrink-0 text-blue-700"
                            />

                            {responsibility}

                          </div>

                        ))}

                      </div>

                    </div>

                  </div>


                  <div className="mt-8 flex flex-wrap gap-4">

                    <Button
                      
                      className="group rounded-full bg-[#06245a] px-7 hover:bg-blue-800"
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        Apply for This Position
                        <ArrowRight
                          size={17}
                          className="ml-2 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="rounded-full border-slate-200 text-[#06245a]"
                      onClick={() => setSelectedJob(null)}
                    >
                      Close
                    </Button>

                  </div>

                </div>

              )}

            </div>
          );

        })}

      </div>

    </div>

  </section>

</main>

);
}

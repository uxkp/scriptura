"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar page="about" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        <div className="pt-32 mx-[8vw] text-center">
          <h1 className="text-[38px] font-semibold">About This Project</h1>
          <p className="mt-7 text-[16px] text-gray-300 max-w-2xl mx-auto leading-relaxed">
            This application is built to explore and share stories, ideas, and
            more. It is crafted with modern web technologies, focusing on
            functionality, simplicity, and design.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                name: "Next.js",
                desc: "Powerful React framework for SSR and SSG.",
                link: "https://nextjs.org/",
              },
              {
                name: "TailwindCSS",
                desc: "Utility-first styling for fast UI building.",
                link: "https://tailwindcss.com/",
              },
              {
                name: "Appwrite",
                desc: "Backend-as-a-service for auth and database.",
                link: "https://appwrite.io/",
              },
              {
                name: "Redux",
                desc: "State management for predictable global store.",
                link: "https://redux.js.org/",
                logo: "/logos/redux.svg",
              },
              {
                name: "Zod",
                desc: "Schema validation for type-safe inputs.",
                link: "https://zod.dev/",
              },
              {
                name: "Vercel",
                desc: "Powerful and intuitive tool, used for deploying this website.",
                link: "https://vercel.com/",
              },
            ].map((tech, id) => (
              <Link
                key={id}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2d] p-6 rounded-2xl shadow-lg shadow-black/30 hover:shadow-xl transition block text-center duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-[#d6c7ff]">
                  {tech.name}
                </h2>
                <p className="mt-2 text-gray-300 text-sm">{tech.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

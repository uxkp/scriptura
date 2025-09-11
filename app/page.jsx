"use client";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import dbConfig from "@/services/dbConfig";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dbConfig.getPosts().then((posts) => {
      console.log("Fetched posts:", posts);
      setBlogs(posts?.rows);
    });
  }, []);

  return (
    <>
      <Navbar page="home" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px]  top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        <div className="pt-32 mx-[8vw]">
          <h1 className="text-[38px] font-semibold">
            Stories, Ideas, and{" "}
            <span className="bg-linear-to-r from-[#d6c7ff] to-[#ab8bff] bg-clip-text text-transparent">
              Everything
            </span>{" "}
            In Between.
          </h1>
          <h1 className="mt-7 text-[16px]">
            Dive into articles, stories, and ideas that inspire, inform, and
            entertain.
          </h1>
          <div className="mt-10 pb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs &&
              [...blogs]
                .reverse()
                .map((blog, index) => <BlogCard key={index} blog={blog} />)}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { categoryColors } from "@/assets/sampleBlogs";
import BlogCard from "@/components/BlogCard";
import dbConfig from "@/services/dbConfig";
import { useEffect, useState } from "react";
import spinner from "@/assets/spinner1.svg";
import Image from "next/image";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbConfig.getPosts().then((posts) => {
      setBlogs(posts?.rows);
      setLoading(false);
    });
  }, []);

  const categories = [
    "All",
    ...new Set(Array.isArray(blogs) ? blogs.map((blog) => blog.category) : []),
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      <Navbar page="home" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        <div className="pt-32 mx-[8vw]">
          <h1 className="text-[38px] text-center font-semibold">
            Stories, Ideas, and{" "}
            <span className="bg-linear-to-r from-[#d6c7ff] to-[#ab8bff] bg-clip-text text-transparent">
              Everything
            </span>{" "}
            In Between.
          </h1>
          <h1 className="mt-7 text-center text-[16px]">
            Dive into articles, stories, and ideas that inspire, inform, and
            entertain.
          </h1>
          {loading ? (
            <div className="flex mt-50 justify-center items-center">
              <Image src={spinner} width={50} alt="Loading..." />
            </div>
          ) : (
            <>
              <div className="flex justify-center mt-8">
                <div className="flex flex-wrap justify-center gap-3 px-3 py-2 bg-[#2a2a2d] rounded-3xl sm:rounded-full shadow-lg shadow-black/30 max-w-full">
                  {categories.map((category, id) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCategory(category)}
                      style={
                        selectedCategory === category
                          ? {
                              backgroundColor:
                                category === "All"
                                  ? "#4f4f4f"
                                  : categoryColors[category],
                              borderColor:
                                category === "All"
                                  ? "#4f4f4f"
                                  : categoryColors[category],
                              color: category === "All" ? "#fff" : "#000",
                            }
                          : {}
                      }
                      className={`px-4 py-2 rounded-full cursor-pointer border transition ${
                        selectedCategory === category
                          ? "shadow-md"
                          : "bg-transparent text-gray-300 border-[#4f4f4f] hover:bg-[#4f4f4f]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-10 pb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs &&
                  [...filteredBlogs]
                    .reverse()
                    .map((blog, index) => <BlogCard key={index} blog={blog} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

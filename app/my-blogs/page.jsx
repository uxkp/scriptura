"use client";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import dbConfig from "@/services/dbConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const loggedIn = useSelector((state) => state.auth.status);
  const router = useRouter();

  useEffect(() => {
    dbConfig.getPosts().then((posts) => {
      console.log("Fetched posts:", posts);
      setBlogs(posts?.rows);
    });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return (
    <>
      <Navbar page="home" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        <div className="pt-32 mx-[8vw]">
          {blogs ? (
            <h1 className="text-[32px] font-semibold">
              You haven't posted any blogs yet.{" "}
              <Link className="text-[#ab8bff] hover:underline" href="/create">
                Get Started.
              </Link>
            </h1>
          ) : (
            <div className="pb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...blogs]
                .reverse()
                .map(
                  (blog, index) =>
                    userData?.data?.email === blog.userEmail && (
                      <BlogCard key={index} blog={blog} />
                    )
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

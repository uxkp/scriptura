"use client";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import dbConfig from "@/services/dbConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const loggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    dbConfig.getPosts().then((posts) => {
      setBlogs(posts?.rows);
    });
  }, []);

  return (
    <>
      <Navbar page="home" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        {loggedIn ? (
          <div className="pt-32 mx-[8vw]">
            <div className="pb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...blogs]
                .reverse()
                .map(
                  (blog, index) =>
                    userData?.data?.email === blog.userEmail && (
                      <BlogCard blog={blog} showDelete="true" key={index} />
                    )
                )}
            </div>
          </div>
        ) : (
          <p className="pt-[70px]">Not logged in.</p>
        )}
      </div>
    </>
  );
}

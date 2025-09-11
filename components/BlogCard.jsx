import { categoryColors } from "@/assets/sampleBlogs";
import Link from "next/link";

const BlogCard = ({ blog, image }) => {
  return (
    <Link
      href={`/posts/${blog.$id}`}
      className="relative cursor-pointer bg-[#27272a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
    >
      <div className="h-48 w-full bg-[#171717] flex items-center justify-center"></div>
      <div className="p-6 relative">
        <span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-medium mb-3 text-black"
          style={{ backgroundColor: categoryColors[blog.category] }}
        >
          {blog.category}
        </span>
        <h2 className="text-xl font-semibold mb-4 text-white">{blog.title}</h2>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-[14px]">{blog.userName}</p>
          <p className="text-[14px]">•</p>
          <p className="text-[14px]">{blog.$createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

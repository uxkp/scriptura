import { categoryColors } from "@/assets/sampleBlogs";
import dbConfig from "@/services/dbConfig";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogCard = ({ blog, image, showDelete }) => {
  const router = useRouter();
  return (
    <Link
      href={`/posts/${blog.$id}`}
      className="relative cursor-pointer bg-[#27272a] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
    >
      {/* Delete button */}
      {showDelete && (
        <button
          className="absolute top-3 right-3 px-2 py-2 w-[40px] h-[40px] z-10 flex justify-center items-center text-white cursor-pointer bg-[#ff6d6d] hover:scale-110 transition-all duration-300 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dbConfig.deletePost(blog.$id);
            router.push("/");
          }}
        >
          <Trash />
        </button>
      )}

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

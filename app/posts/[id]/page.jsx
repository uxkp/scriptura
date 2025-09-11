import Navbar from "@/components/Navbar";
import dbConfig from "@/services/dbConfig";

export const categoryColors = {
  Tech: "#6fcf97",
  Health: "#ff9f68",
  Travel: "#4da6ff",
  Productivity: "#ffd54f",
  Lifestyle: "#ff8fab",
  Education: "#b497ff",
};

export default async function PostPage({ params }) {
  const { id } = params;
  const blog = await dbConfig.getPost(id);

  if (!blog) {
    return <div className="p-8 text-white">Post not found</div>;
  }

  return (
    <>
      <Navbar page="home" />
      <div className="relative w-full min-h-screen pb-10 bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        <div className="pt-32 mx-[8vw] flex justify-center">
          <div className="bg-[#27272A] rounded-2xl shadow-lg w-full max-w-4xl text-white overflow-hidden">
            <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-xl font-medium">
              Banner Image
            </div>
            <div className="p-10">
              <span
                className="inline-block px-3 py-1 text-xs font-medium text-black rounded-full mb-3"
                style={{
                  backgroundColor: categoryColors[blog.category] || "#888",
                }}
              >
                {blog.category}
              </span>
              <h1 className="text-4xl font-extrabold mb-6 leading-tight text-[#E4E4E7]">
                {blog.title}
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                By{" "}
                <span className="font-medium text-gray-200">
                  {blog.userName}
                </span>{" "}
                • {blog.$createdAt.slice(0, 10)}
              </p>
              <div
                className="max-w-full leading-relaxed break-words
             [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-6 [&>h1]:mb-4
             [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-5 [&>h2]:mb-3
             [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-4 [&>h3]:mb-2
             [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6
             [&>strong]:font-bold [&>em]:italic"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./style.css";
import dropdownArrow from "@/assets/dropdown-arrow-svgrepo-com.svg";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import dbConfig from "@/services/dbConfig";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const categories = [
    "Tech",
    "Health",
    "Travel",
    "Productivity",
    "Lifestyle",
    "Education",
  ];

  const router = useRouter();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(categories[1]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const options = {
    debug: "info",
    modules: { toolbar: true },
    theme: "snow",
  };
  const { quill, quillRef } = useQuill(options);
  const userData = useSelector((state) => state.auth.userData);
  const loggedIn = useSelector((state) => state.auth.status);

  const submit = async () => {
    if (image) {
      const file = await dbConfig.uploadImage(image);
      if (file) {
        await dbConfig.createPost({
          title,
          content,
          imageId: file.$id,
          userName: userData.data.name,
          userEmail: userData.data.email,
          category: selected,
        });
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div>
      <Navbar page="create" />
      <div className="relative w-[100%] min-h-screen z-0 h-[100%] bg-[#19191C]">
        <div className="absolute -z-1 blur-[100px] top-0 left-0 w-[50vw] h-[100vh] bg-[#1f192d] rounded-br-full" />
        {loggedIn ? (
          <div className="pt-28 px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter the title"
                  className="w-full bg-transparent border-b-2 border-[#616161] text-2xl font-semibold outline-none p-2 text-white focus:border-[#8a5cff] transition"
                />
                <div className="quill-container bg-[#1f1f24] rounded-xl w-full p-4 shadow-lg">
                  <div ref={quillRef} />
                </div>
              </div>
              <div className="w-full md:w-80 space-y-6">
                <div className="bg-[#2a2a31] rounded-xl p-5 shadow-md">
                  <label className="block text-lg font-semibold mb-3 text-white">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                    ref={inputRef}
                  />
                  {!image && (
                    <button
                      onClick={() => inputRef.current.click()}
                      className="w-full cursor-pointer px-6 py-3 text-white bg-[#8a5cff] rounded-lg hover:scale-105 focus:ring-2 focus:ring-[#8a5cff]/50 transition"
                    >
                      Upload Image
                    </button>
                  )}
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Image Preview"
                      width={320}
                      height={200}
                      className="rounded-lg mt-3 w-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-[#2a2a31] rounded-xl p-5 shadow-md">
                  <label className="block text-lg font-semibold mb-3 text-white">
                    Category
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setOpen(!open)}
                      className="w-full flex justify-between items-center rounded-lg bg-[#222222]/50 px-4 py-3 text-white ring-1 ring-white/10 hover:bg-black/50 transition"
                    >
                      {selected}
                      <Image
                        src={dropdownArrow}
                        alt=""
                        width={20}
                        height={20}
                      />
                    </button>
                    {open && (
                      <ul className="absolute mt-2 w-full rounded-lg bg-[#27272a] p-2 backdrop-blur-sm shadow-lg ring-1 ring-white/10 z-10">
                        {categories.map((category) => (
                          <li
                            key={category}
                            onClick={() => {
                              setSelected(category);
                              setOpen(false);
                            }}
                            className={`px-3 py-2 rounded-md text-white hover:bg-white/10 cursor-pointer transition ${
                              selected === category ? "bg-white/20" : ""
                            }`}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <button
                  onClick={submit}
                  className="w-full cursor-pointer px-6 py-3 text-white bg-[#8a5cff] rounded-lg hover:scale-105 focus:ring-2 focus:ring-[#8a5cff]/50 transition"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="pt-[70px]">Not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default CreatePage;

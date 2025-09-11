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

  const { push } = useRouter();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(categories[1]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const options = {
    debug: "info",
    modules: {
      toolbar: true,
    },
    theme: "snow",
  };
  const { quill, quillRef } = useQuill(options);
  const userData = useSelector((state) => state.auth.userData);

  const submit = async () => {
    if (image) {
      const file = await dbConfig.uploadImage(image); // TODO: what if there's no image?
      if (file) {
        const imageId = file.$id;
        await dbConfig.createPost({
          title: title,
          content: content,
          imageId: imageId,
          userName: userData.data.name,
          userEmail: userData.data.email,
          category: selected,
        });
        push("/");
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
        <div className="pt-32 mx-[8vw]">
          <div className="flex flex-col md:flex-row gap-6 mt-10">
            <div className="flex-1 space-y-4">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Enter the title"
                className="w-full bg-transparent border-b-2 border-[#616161] text-2xl font-semibold outline-none p-2"
              />
              <div className="quill-container bg-[#1e1e22] rounded-xl max-w-[60vw] mb-5 p-4">
                <div ref={quillRef} />
              </div>
            </div>
            <div className="w-full md:w-[320px] space-y-4">
              <div className="bg-[#1e1e22] rounded-xl p-4">
                <label className="block text-[16px] font-semibold mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                  ref={inputRef}
                />
                {image ? null : (
                  <button
                    onClick={() => {
                      inputRef.current.click();
                    }}
                    className="px-6 py-3 mt-3 text-white cursor-pointer bg-[#8a5cff] hover:text-white hover:shadow-[0_0_10px_2px_rgba(30,30,30,0.5)] hover:scale-103 transition-all duration-300 rounded-full"
                  >
                    Upload Image
                  </button>
                )}
                {image && (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Image Preview"
                    width={300}
                    height={200}
                    className="rounded-xl"
                  />
                )}
              </div>
              <div className="bg-[#1e1e22] rounded-xl p-4">
                <label className="block text-[16px] font-semibold mb-2">
                  Categories
                </label>
                <div className="relative w-56">
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center rounded-lg bg-[#222222]/40 cursor-pointer px-4 py-2 text-white shadow-sm ring-1 ring-white/10 hover:bg-black/60 transition"
                  >
                    {selected}
                    <Image src={dropdownArrow} alt="" width={25} height={25} />
                  </button>
                  {open && (
                    <ul className="absolute mt-2 w-full rounded-xl bg-[#27272a]/50 p-2 z-100 backdrop-blur-sm shadow-lg ring-1 ring-white/10">
                      {categories.map((category) => (
                        <li
                          key={category}
                          onClick={() => {
                            setSelected(category);
                            setOpen(false);
                          }}
                          className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg text-white hover:bg-white/10 transition ${
                            selected === category ? "bg-white/20" : ""
                          }`}
                        >
                          {category}
                          {selected === category && <span>✓</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button
                onClick={submit}
                className="px-6 py-3 w-full text-white cursor-pointer bg-[#8a5cff] hover:text-white hover:shadow-[0_0_10px_2px_rgba(30,30,30,0.5)] hover:scale-103 transition-all duration-300 rounded-full"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { appwriteConfig } from "@/services/config";
import { login, logout } from "@/store/authSlice";
import authService from "@/services/auth";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";
import { Menu, X } from "lucide-react";

const Navbar = ({ hidden }) => {
  const loggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [loginModalToggle, setLoginModalToggle] = useState(false);
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const logoutHandler = () => {
    try {
      authService.logout().then(() => {
        dispatch(logout());
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ data }));
        } else {
          dispatch(logout());
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = userData?.data?.name || userData?.data?.email;

  return (
    <div
      className={`backdrop-blur-lg flex ${
        hidden && "hidden"
      } justify-between px-4 md:px-10 py-3 bg-[#404040]/10 border-b-[#3d3d41] border-b-1 items-center fixed top-0 left-0 w-full z-[10000] h-[70px]`}
    >
      <LoginModal
        isOpen={loginModalToggle}
        onClose={() => setLoginModalToggle(false)}
        desc={desc}
      />
      <div className="flex items-center gap-4 md:gap-8">
        <button
          className="sm:hidden text-white transition-transform duration-300 hover:scale-110"
          onClick={() => setMobileMenu((prev) => !prev)}
        >
          {mobileMenu ? (
            <X size={32} className="cursor-pointer" />
          ) : (
            <Menu size={32} className="cursor-pointer" />
          )}
        </button>
        <Link href="/">
          <Image
            src={logo}
            className="mr-4 md:mr-10"
            alt="logo"
            width={110}
            height={45}
          />
        </Link>

        <div className="hidden sm:flex gap-6 md:gap-10">
          <Link
            className="text-sm md:text-base hover:text-[#ab8bff] transition-colors duration-300"
            href="/create"
            onClick={(e) => {
              if (!loggedIn) {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setDesc("You must be logged in, to create a blog.");
                setLoginModalToggle(true);
              }
            }}
          >
            Create
          </Link>
          <Link
            className="text-sm md:text-base hover:text-[#ab8bff] transition-colors duration-300"
            href="/my-blogs"
            onClick={(e) => {
              if (!loggedIn) {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setDesc("You must be logged in to see your blogs.");
                setLoginModalToggle(true);
              }
            }}
          >
            My Blogs
          </Link>
          <Link
            className="text-sm md:text-base hover:text-[#ab8bff] transition-colors duration-300"
            href="/about"
          >
            About
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        {!loggedIn && !loading && (
          <Link
            href="/sign-up"
            className="hidden sm:block px-5 md:px-6 py-2 md:py-3 text-white cursor-pointer bg-[#8a5cff] hover:scale-102 transition-all duration-300 rounded-full text-sm md:text-base"
          >
            Sign Up
          </Link>
        )}
        <div className="relative" ref={dropdownRef}>
          {displayName ? (
            <>
              <Image
                src={`${
                  appwriteConfig.endpointUrl
                }/avatars/initials?name=${encodeURIComponent(displayName)}`}
                alt={displayName || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setOpen((prev) => !prev)}
              />

              {open && (
                <div className="absolute z-50 right-0 mt-2 w-44 md:w-52 bg-[#27272A] rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white truncate">
                      {userData?.data?.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {userData?.data?.email}
                    </p>
                  </div>
                  <button
                    onClick={logoutHandler}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-white hover:bg-[#343437] transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      {mobileMenu && (
        <div className="bg-[#212121] absolute top-[70px] left-0 w-full flex flex-col gap-5 p-6 sm:hidden z-[49]">
          <Link
            className="text-base font-medium hover:text-[#ab8bff] transition-colors duration-300"
            href="/create"
            onClick={(e) => {
              if (!loggedIn) {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setDesc("You must be logged in, to create a blog.");
                setLoginModalToggle(true);
              }
              setMobileMenu(false);
            }}
          >
            Create
          </Link>
          <Link
            className="text-base font-medium hover:text-[#ab8bff] transition-colors duration-300"
            href="/my-blogs"
            onClick={(e) => {
              if (!loggedIn) {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setDesc("You must be logged in to see your blogs.");
                setLoginModalToggle(true);
              }
              setMobileMenu(false);
            }}
          >
            My Blogs
          </Link>
          <Link
            className="text-base font-medium hover:text-[#ab8bff] transition-colors duration-300"
            href="/my-blogs"
          >
            About
          </Link>
          {!loggedIn && (
            <Link
              href="/sign-up"
              className="px-5 py-3 text-white cursor-pointer bg-[#8a5cff] rounded-full text-lg font-medium text-center transition-all duration-300"
              onClick={() => setMobileMenu(false)}
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "@/services/auth";
import { login as authLogin } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import OAuthBar from "./OAuthBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import spinner from "@/assets/spinner1.svg";
import Image from "next/image";
import { handwritten } from "@/app/fonts";

const schema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const login = async (data) => {
    try {
      const session = await authService.loginEmailPassword(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        router.push("/");
      }
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <div className="w-full max-w-[580px] px-4 sm:px-6">
      <form
        className="flex flex-col justify-center space-y-5"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col items-center lg:items-start mb-8">
          <h1
            className={`${handwritten.className} text-[42px] lg:hidden bg-linear-to-r from-[#D6C7FF] to-[#602be8] bg-clip-text text-transparent mb-2 tracking-wide`}
          >
            Scriptura
          </h1>
          <h2 className="text-base lg:text-[32px] font-semibold text-center lg:text-left text-white">
            Login
          </h2>
        </div>
        <div className="flex flex-col">
          <input
            {...register("email")}
            className="bg-[#28282b] outline-none px-6 sm:px-8 py-3 sm:py-4 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 rounded-full w-full"
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-300 text-[11px] ml-4 sm:ml-8 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("password")}
            className="bg-[#28282b] outline-none px-6 sm:px-8 py-3 sm:py-4 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 rounded-full w-full"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-300 text-[11px] ml-4 sm:ml-8 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 mt-6 py-3 flex items-center justify-center text-white cursor-pointer bg-[#8a5cff] hover:text-white hover:shadow-[0_0_10px_2px_rgba(138,92,255,0.5)] hover:scale-101 transition-all duration-300 rounded-full w-full"
        >
          {isSubmitting ? <Image src={spinner} alt="Loading..." /> : "Login"}
        </button>
        <div className="flex flex-wrap justify-center gap-1 text-[14px] mt-3">
          <p>Don't have an account?</p>
          <Link href="/sign-up" className="text-[#ab8bff]">
            Sign Up
          </Link>
        </div>
      </form>
      <div className="mt-6">
        <OAuthBar />
      </div>
    </div>
  );
};

export default Login;

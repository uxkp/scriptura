"use client";

import Link from "next/link";
import OAuthBar from "./OAuthBar";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import spinner from "@/assets/spinner1.svg";
import Image from "next/image";
import { useAlert } from "./AlertProvider";
import { handwritten } from "@/app/fonts";

const schema = z.object({
  email: z.string().email("Please enter a valid email."),
  name: z.string().min(1, "Please enter a name."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { showAlert } = useAlert();

  const createAccount = async (data) => {
    setError("root", { message: "" });
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        showAlert("Account created successfully!");
        push("/");
      }
    } catch (error) {
      setError("root", { message: error.message });
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-[580px] px-4 sm:px-6">
      <form
        className="flex flex-col justify-center space-y-5"
        onSubmit={handleSubmit(createAccount)}
      >
        <div className="flex flex-col items-center lg:items-start mb-8">
          <h1
            className={`${handwritten.className} text-[42px] lg:hidden bg-linear-to-r from-[#D6C7FF] to-[#602be8] bg-clip-text text-transparent mb-2 tracking-wide`}
          >
            Scriptura
          </h1>
          <h2 className="text-base lg:text-[32px] font-semibold text-center lg:text-left text-white">
            Sign Up
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
            {...register("name")}
            className="bg-[#28282b] outline-none px-6 sm:px-8 py-3 sm:py-4 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 rounded-full w-full"
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-300 text-[11px] ml-4 sm:ml-8 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("password")}
            className="bg-[#28282b] outline-none px-6 sm:px-8 py-3 sm:py-4 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 rounded-full w-full"
            type="password"
            placeholder="Enter a password"
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
          {isSubmitting ? <Image src={spinner} alt="Loading..." /> : "Sign Up"}
        </button>
        <div className="flex flex-wrap justify-center gap-1 text-[14px] mt-3">
          <p>Already have an account?</p>
          <Link href="/login" className="text-[#ab8bff]">
            Login
          </Link>
        </div>
      </form>
      <div className="mt-6">
        <OAuthBar />
      </div>
    </div>
  );
};

export default SignUp;

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
  const { push } = useRouter();

  const login = async (data) => {
    try {
      const session = await authService.loginEmailPassword(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        push("/");
      }
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <div className="max-h-[800px] w-full max-w-[580px]">
      <form
        className="flex flex-col justify-center space-y-5"
        onSubmit={handleSubmit(login)}
      >
        <h1 className="text-[34px] mb-7 font-semibold">Login</h1>
        <div className="flex flex-col">
          <input
            {...register("email")}
            className="bg-[#28282b] outline-none px-8 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 py-4 rounded-full"
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-300 text-[13px] ml-8 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("password")}
            className="bg-[#28282b] outline-none px-8 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 py-4 rounded-full"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-300 text-[13px] ml-8 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 mt-6 py-3 text-white flex justify-center items-center cursor-pointer bg-[#8a5cff] hover:text-white hover:shadow-[0_0_10px_2px_rgba(138,92,255,0.5)] hover:scale-101 transition-all duration-300 rounded-full"
        >
          {isSubmitting ? <Image src={spinner} alt="Loading..." /> : "Login"}
        </button>
        <div className="flex gap-1 text-[14px] self-center mt-3">
          <p>Don't have an account?</p>
          <Link href="/sign-up" className="text-[#ab8bff]">
            Sign Up
          </Link>
        </div>
      </form>
      <OAuthBar />
    </div>
  );
};

export default Login;

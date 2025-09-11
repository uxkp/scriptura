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
    <div className="max-h-[800px] w-full max-w-[580px]">
      <form
        className="flex flex-col justify-center space-y-5"
        onSubmit={handleSubmit(createAccount)}
      >
        <h1 className="text-[34px] mb-7 font-semibold">Sign Up</h1>
        <div className="flex flex-col">
          <input
            {...register("email")}
            className="bg-[#28282b] outline-none px-8 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 py-4 rounded-full"
            type="text"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-300 text-[11px] ml-8 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("name")}
            className="bg-[#28282b] outline-none px-8 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 py-4 rounded-full"
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-300 text-[11px] ml-8 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register("password")}
            className="bg-[#28282b] outline-none px-8 hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 py-4 rounded-full"
            type="password"
            placeholder="Enter a password"
          />
          {errors.password && (
            <p className="text-red-300 text-[11px] ml-8 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 mt-6 py-3 flex items-center justify-center text-white cursor-pointer bg-[#8a5cff] hover:text-white hover:shadow-[0_0_10px_2px_rgba(138,92,255,0.5)] hover:scale-101 transition-all duration-300 rounded-full"
        >
          {isSubmitting ? <Image src={spinner} alt="Loading..." /> : "Sign Up"}
        </button>
        <div className="flex gap-1 text-[14px] self-center mt-3">
          <p>Already have an account?</p>
          <Link href="/login" className="text-[#ab8bff]">
            Login
          </Link>
        </div>
      </form>
      <OAuthBar />
    </div>
  );
};

export default SignUp;

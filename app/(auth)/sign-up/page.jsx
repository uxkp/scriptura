"use client";

import Navbar from "@/components/Navbar";
import SignUp from "@/components/SignUp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const router = useRouter();
  const loggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (loggedIn) {
      router.replace("/");
    }
  }, [loggedIn, router]);

  if (loggedIn) {
    return null;
  }

  return (
    <>
      <Navbar hidden={true} />
      <SignUp />
    </>
  );
};

export default SignUpPage;

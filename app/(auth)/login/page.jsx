"use client";

import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
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
      <Login />
    </>
  );
};

export default LoginPage;

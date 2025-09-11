import Image from "next/image";
import googleLogo from "@/assets/google.svg";
import githubLogo from "@/assets/github.svg";
import authService from "@/services/auth";
import { login as authLogin } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const OAuthBar = () => {
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    try {
      const session = await authService.loginGoogleOAuth();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGithub = async () => {
    try {
      const session = await authService.loginGithubOAuth();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative mt-10 flex items-center justify-center">
        <div className="w-full border-t-2 border-[#303033]" />
        <span className="absolute bg-[#19191c] font-semibold px-3 text-[#999] text-sm">
          OR
        </span>
      </div>

      <div className="flex flex-col sm:flex-row mt-10 justify-center gap-4 sm:gap-6">
        <button
          onClick={loginWithGithub}
          className="bg-[#28282b] hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 cursor-pointer flex items-center justify-center gap-3 px-6 sm:px-8 py-3 w-full rounded-full text-sm sm:text-base whitespace-nowrap"
        >
          <Image src={githubLogo} alt="" width={18} />
          Continue with GitHub
        </button>

        <button
          onClick={loginWithGoogle}
          className="bg-[#28282b] hover:scale-101 shadow-[0_0_30px_5px_rgba(35,35,35,0.5)] transition-all duration-250 cursor-pointer flex items-center justify-center gap-3 px-6 sm:px-8 py-3 w-full rounded-full text-sm sm:text-base whitespace-nowrap"
        >
          <Image src={googleLogo} alt="" width={18} />
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default OAuthBar;

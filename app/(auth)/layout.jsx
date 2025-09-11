import Image from "next/image";
import { handwritten } from "../layout";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-screen bg-[#19191C]">
      <section className="bg-[#19191C] border-r-2 border-r-[#232325] relative shadow-2xl max-w-[35vw] overflow-hidden p-10 z-1000">
        <div className="w-[300px] h-[300px] rounded-br-full absolute top-0 left-0 bg-[#1f192d] blur-3xl -z-20" />
        <div className="w-[300px] h-[300px] rounded-tl-full absolute bottom-0 right-0 bg-[#1f2b38] blur-3xl -z-20" />
        <div className="mt-10">
          <h1 className={`${handwritten.className} text-7xl bg-linear-to-r from-[#D6C7FF] to-[#602be8] bg-clip-text text-transparent`}>Scriptura</h1>
          <div className="space-y-5 text-[#fff]">
            <h1 className="mt-[30px] text-[30px] leading-[42px] max-w-100 font-semibold">Read and write informative blogs.</h1>
            <p className="text-[14px] leading-[24px] font-normal">
              Explore insightful blogs from others and share your own thoughts with the community.
            </p>
          </div>
        </div>
        {/* <Image src={vector} alt="vector" width={230} className="mx-auto mt-10" /> */}
      </section>
      <section className="flex flex-1 flex-col items-center p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        {children}
      </section>
    </div>
  )
}

export default Layout;

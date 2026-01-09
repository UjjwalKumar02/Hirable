"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import img1 from "../public/feature_1.png";
import img2 from "../public/feature_2.png";
import img3 from "../public/feature_3.png";

export default function Home() {
  const images = [img3, img1, img2];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="bg- border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex justify-between mt-1 py-4">
          <h1 className="text-2xl font-medium tracking-tighter">Hirable</h1>

          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push("/auth")}
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto flex flex-col ">
        {/* Hero section */}
        <div className="flex justify-center items-center p-8 mt-21">
          <div className=" flex flex-col items-center gap-5">
            <h2 className="text-4xl font-medium tracking-tight">
              Hiring becomes easy with{" "}
              <span className="text-sky-500">Hirable</span>
            </h2>

            <p className="text-gray-800">
              Build personalized forms and track responses through a dashboard
            </p>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/auth")}
            >
              Get Started &gt;
            </Button>
          </div>
        </div>

        {/* Scroller */}
        <div
          className="relative w-full overflow-hidden mt-4
  mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...images, ...images].map((img, idx) => (
              <motion.div
                key={idx}
                className="shrink-0"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <Image
                  src={img}
                  alt="feature"
                  width={500}
                  height={300}
                  className="w-80 h-52 border border-gray-200 rounded-2xl object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="bg-white px-10 py-16 mt-20 border border-gray-200 rounded-2xl flex flex-col justify-center items-center gap-7 shadow-xs">
          <h2 className="text-2xl font-medium tracking-tight text-center leading-9">
            Design personalized forms
            <br />& keep responses organized
          </h2>

          <Button
            variant="primary"
            size="md"
            onClick={() => router.push("/auth")}
          >
            Try Hirable &gt;
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black  mt-8 text-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-10 py-20">
          <div>
            <p className="text-lg font-medium tracking-tight">Hirable</p>
          </div>

          <div className="flex flex-col gap-2 tracking-tight">
            <a href="https://github.com/UjjwalKumar02/hirable" target="_blank">
              GitHub
            </a>
            <a href="https://ujjwalkumar02.github.io/pro/" target="_blank">
              Connect with me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

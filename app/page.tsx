"use client";

import LandingV2 from "../componentsV2/landingV2";

export default function Home() {
  return <LandingV2 />;
}

// import { motion } from "framer-motion";
// import { Button } from "@/components/Button";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import img1 from "../public/feature_1.png";
// import img2 from "../public/feature_2.png";
// import img3 from "../public/feature_03.png";
// const images = [img3, img1, img2];

// const router = useRouter();

// return (
//   <div className="  min-h-screen bg-white">
//     {/* Navbar */}
//     <div className="sticky top-0 bg-white border-b border-gray-200">
//       <div className="max-w-6xl mx-auto flex justify-between mt-1 md:py-5 py-6 px-6">
//         <h1 className="md:text-2xl text-xl font-medium tracking-tighter">
//           Hirable
//         </h1>

//         <Button
//           variant="secondary"
//           size="md"
//           onClick={() => router.push("/auth")}
//           className="md:block hidden"
//         >
//           Sign In
//         </Button>

//         {/* Mobile btn */}
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={() => router.push("/auth")}
//           className="md:hidden block"
//         >
//           Sign In
//         </Button>
//       </div>
//     </div>

//     {/* Main content */}
//     <div className="max-w-6xl mx-auto flex flex-col ">
//       {/* Hero section */}
//       <div className="flex justify-center items-center md:p-8 px-14 md:mt-23 mt-24">
//         <div className=" flex flex-col md:items-center items-start gap-5">
//           <h2 className="text-4xl font-semibold tracking-tight">
//             Hiring becomes easy with{" "}
//             <span className="text-sky-500">Hirable</span>
//           </h2>

//           <p className="text-gray-800">
//             Build personalized forms and track responses through a dashboard
//           </p>

//           <Button
//             variant="secondary"
//             size="lg"
//             onClick={() => router.push("/auth")}
//           >
//             Get Started &gt;
//           </Button>
//         </div>
//       </div>

//       {/* Scroller */}
//       <div
//         className="relative w-full overflow-hidden md:mt-9 mt-20
// mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
//       >
//         <motion.div
//           className="flex gap-8"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{
//             duration: 25,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {[...images, ...images].map((img, idx) => (
//             <motion.div
//               key={idx}
//               className="shrink-0"
//               whileHover={{ scale: 1.01 }}
//               transition={{ type: "spring", stiffness: 250, damping: 18 }}
//             >
//               <Image
//                 src={img}
//                 alt="feature"
//                 width={500}
//                 height={300}
//                 className="md:w-88 w-70 h-fit border border-gray-200 rounded-2xl object-contain"
//               />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* CTA */}
//       <div className="bg-white px-10 py-20 mt-32 border border-gray-200 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-xs">
//         <h2 className="md:block hidden text-2xl font-medium tracking-tight text-center leading-9">
//           Design personalized forms and
//           <br /> responses organized
//         </h2>
//         <Button
//           variant="primary"
//           size="lg"
//           onClick={() => router.push("/auth")}
//           className="md:block hidden"
//         >
//           Try Hirable &gt;
//         </Button>

//         {/* Mobile CTA */}
//         <h2 className="md:hidden block text-xl font-medium tracking-tight text-center">
//           Design personalized forms and responses organized
//         </h2>

//         <Button
//           variant="primary"
//           size="md"
//           onClick={() => router.push("/auth")}
//           className="md:hidden block"
//         >
//           Try Hirable &gt;
//         </Button>
//       </div>
//     </div>

//     {/* Footer */}
//     <div className="bg-black mt-8 text-gray-300">
//       <div className="max-w-6xl mx-auto flex gap-10 justify-between items-center md:px-14 px-10 py-30">
//         <div>
//           <p className="text-lg font-medium tracking-tight">Hirable</p>
//         </div>

//         <div className="flex flex-col gap-2 md:text-md text-sm font-medium">
//           <a href="https://github.com/UjjwalKumar02/hirable" target="_blank">
//             GitHub
//           </a>
//           <a href="https://ujjwalkumar02.github.io/pro/" target="_blank">
//             Connect with me
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// );

import { ButtonV2 } from "@/componentsV2/ButtonV2";
import { useRouter } from "next/navigation";
import img2 from "../public/dashboard.png";
import img3 from "../public/design.png";
import img4 from "../public/submission.png";
import Image from "next/image";

export default function LandingV2() {
  const router = useRouter();

  return (
    <div className="scroll-smooth transition-all duration-300 ease-in-out">
      {/* nav */}
      <div className="border-b border-gray-200 sticky top-0 bg-white shadow-xs">
        <div className="py-5 px-6 lg:px-0 max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center font-bold text-xl text-white italic">
              H
            </div>
            <h2 className="text-xl font-medium tracking-tighter">Hirable</h2>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <a href="#contact" className="text-sm">
              Contact
            </a>
            <ButtonV2
              variant="primary"
              size="md"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </ButtonV2>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center gap-9 lg:px-0 px-6">
        <div className="flex flex-col items-center gap-3 pt-36 md:pt-28 text-center">
          <h1 className="text-3xl lg:text-4xl font-medium tracking-tight">
            Build custom forms with Hirable
          </h1>
          <p>Create personalized forms and track responses</p>
          <ButtonV2
            variant="primary"
            size="lg"
            onClick={() => router.push("/auth")}
          >
            Get started &gt;
          </ButtonV2>
        </div>

        <Image
          src={img2}
          alt="heroImage"
          width={2000}
          height={2000}
          className="hover:scale-101 hover:z-10 transition-all duration-300 ease-in-out lg:max-w-240 border border-gray-200 rounded-lg shadow-xs"
        />
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-14 mt-28 px-6">
        <h1 className="text-3xl lg:text-4xl font-medium tracking-tight">
          Features
        </h1>

        <div className="w-full flex md:flex-row flex-col justify-between items-center gap-8 md:text-left text-center">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl lg:text-3xl font-medium tracking-tight">
              Design
            </h1>
            <p>Craft according to your needs</p>
          </div>

          <Image
            src={img3}
            alt="heroImage"
            width={2000}
            height={2000}
            className="max-w-[90%] md:max-w-120 border border-gray-200 rounded-lg shadow-xs"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[90%] md:max-w-5xl mx-auto border border-gray-200 mt-40 rounded-xl shadow-xs">
        <Image
          src={img4}
          alt="heroImage"
          width={2000}
          height={2000}
          className="h-70 border border-gray-200 rounded-xl object-cover object-top"
        />
        <div className="flex md:flex-row flex-col items-center justify-center gap-4 py-6">
          <h1 className="text-xl lg:text-3xl font-medium tracking-tight">
            Explore new forms
          </h1>

          <ButtonV2
            variant="primary"
            size="md"
            onClick={() => router.push("/auth")}
          >
            Try Hirable &gt;
          </ButtonV2>
        </div>
      </div>

      {/* Footer */}
      <div
        id="contact"
        className="bg-black h-75 flex justify-center items-center text-gray-200 mt-6 lg:px-0 px-8"
      >
        <div className="max-w-4xl w-full mx-auto flex justify-between items-center">
          <h2 className="text-xl font-medium tracking-tight">Hirable</h2>
          <div className="flex flex-col gap-2 items-center">
            <p className="font-medium mb-2">Connect</p>
            <a
              href="https://github.com/ujjwalkumar02/Hirable"
              target="_blank"
              className="text-sm"
            >
              GitHub
            </a>
            <a
              href="https://ujjwalkumar02.github.io/pro/"
              target="_blank"
              className="text-sm"
            >
              Author
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

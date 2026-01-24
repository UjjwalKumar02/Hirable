// import { DesignIcon } from "@/icons/DesignIcon";
import { ExpandIcon } from "@/icons/ExpandIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function MobileNav({
  mobileNav,
  setMobileNav,
}: {
  mobileNav: boolean;
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${mobileNav ? "left-0" : "left-300"} lg:hidden fixed top-0 w-full min-h-screen bg-white flex flex-col transition-all duration-300 ease-in-out py-7 px-6 border-l border-gray-200`}
    >
      <button onClick={() => setMobileNav(false)}>
        <ExpandIcon />
      </button>

      {/* Links */}
      <div className="flex flex-col gap-6 mt-12">
        <Link href={"/dashboard"}>
          <div className="flex items-center gap-2.5 text-sm">
            <HomeIcon />
            <p>Home</p>
          </div>
        </Link>

        {/* <div className="flex items-center gap-2.5 text-sm">
          <DesignIcon />
          <p>Design (soon)</p>
        </div> */}

        <button
          className="flex items-center gap-2.5 text-sm cursor-pointer"
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  );
}

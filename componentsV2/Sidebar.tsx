import { CollapseIcon } from "@/icons/CollapseIcon";
import { DesignIcon } from "@/icons/DesignIcon";
import { ExpandIcon } from "@/icons/ExpandIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function Sidebar({
  collapse,
  setCollapse,
}: {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="hidden lg:block transition-all duration-300 ease-in-out">
      {collapse ? (
        <div className="min-h-screen fixed top-0 bg-gray-50 border-r-2 border-gray-200 px-7 py-7 space-y-10 transition-all duration-300 ease-in-out">
          {/* Collapsed Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCollapse((prev) => !prev)}
              className="cursor-pointer"
            >
              <ExpandIcon />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-5">
            <Link href={"/dashboard"}>
              <HomeIcon />
            </Link>

            <DesignIcon />

            <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen min-w-65 fixed top-0 bg-gray-50 border-r-2 border-gray-200 px-8 py-7 space-y-10 transition-all duration-300 ease-in-out">
          {/* Expanded Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center font-bold text-xl text-white italic">
                H
              </div>
              <h2 className="text-xl font-medium tracking-tighter">Hirable</h2>
            </div>

            <button
              onClick={() => setCollapse((prev) => !prev)}
              className="cursor-pointer"
            >
              <CollapseIcon />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-5">
            <Link href={"/dashboard"}>
              <div className="flex items-center gap-2.5 text-sm">
                <HomeIcon />
                <p>Home</p>
              </div>
            </Link>

            <div className="flex items-center gap-2.5 text-sm">
              <DesignIcon />
              <p>Design (soon)</p>
            </div>

            <button
              className="flex items-center gap-2.5 text-sm cursor-pointer"
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

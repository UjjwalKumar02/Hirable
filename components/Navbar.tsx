"use client";

import { signOut } from "next-auth/react";
import { Button } from "./Button";
import Image from "next/image";
import { useState } from "react";

export function Navbar({ avatar }: { avatar: string }) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-full px-8 py-6 mt-2 flex justify-between items-center border-b border-gray-200">
      <h1 className="text-2xl font-medium tracking-tighter">Hirable</h1>

      {/* Conditional rendering if image is empty string */}
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => setDropdown((prev) => !prev)}
      >
        {avatar === "" ? (
          <p className="h-7 w-7 rounded-full border border-sky-200 text-white">
            o
          </p>
        ) : (
          <Image
            src={avatar}
            alt="profilePic"
            width={37}
            height={37}
            className="border border-sky-200 rounded-full"
          />
        )}

        {dropdown && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
}

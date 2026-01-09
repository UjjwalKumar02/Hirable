"use client";

import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Auth() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white px-10 py-8 flex flex-col gap-6 items-center rounded-2xl border border-gray-200">
        <h1 className="text-2xl font-medium tracking-tighter">Hirable</h1>

        <Button variant="secondary" size="lg" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>

        <Link href={"/"} className="text-gray-800">
          &lt; back
        </Link>
      </div>
    </div>
  );
}

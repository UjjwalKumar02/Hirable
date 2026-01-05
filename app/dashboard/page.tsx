"use client";

import { Button } from "@/components/Button";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex justify-center items-center gap-4">
      <h1>Protected dashboard</h1>

      <Button
        variant="primary"
        size="md"
        onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
      >
        Logout
      </Button>
    </div>
  );
}

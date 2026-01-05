"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center gap-4">
      <h1 className="text-3xl font-medium tracking-tighter">Hirable</h1>

      <Button
        variant="primary"
        size="md"
        onClick={() => router.push("/auth")}
      >
        Get started &gt;
      </Button>
    </div>
  );
}

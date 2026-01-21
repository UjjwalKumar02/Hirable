"use client";

import { DashboardContentProps } from "@/types";
// import { FormCard } from "./FormCard";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { Button } from "./Button";
import { CreateFormCard } from "./CreateFormCard";
import { useSession } from "next-auth/react";

export function DashboardContent({ forms }: DashboardContentProps) {
  const { data: session } = useSession();
  const [popup, setPopup] = useState<"create" | null>(null);

  return (
    <div className="max-w-4xl min-h-screen mx-auto flex flex-col items-center shadow-xs">
      <Navbar avatar={session?.user.image ?? ""} />

      {/* Main content */}
      <div className="my-10 w-full md:px-18 px-7 flex flex-col justify-center items-center gap-8">
        <div className="w-full flex justify-between items-center">
          {/* Title bar */}
          <h1 className="text-xl font-medium tracking-tight">Your forms</h1>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setPopup("create")}
          >
            Create a new form
          </Button>
        </div>

        {/* Forms list */}
        {forms.length === 0 ? (
          <div>You dont have any form right now!</div>
        ) : (
          <div className="w-full flex flex-col justify-center gap-4">
            {forms.map((f) => (
              <div key={f.id}>
                {/* <FormCard
                  title={f.title}
                  slug={f.slug}
                  isPublic={f.isPublic}
                  createdAt={f.createdAt}
                /> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {popup === "create" && (
        <CreateFormCard setPopup={setPopup} userId={session?.user.id} />
      )}
    </div>
  );
}

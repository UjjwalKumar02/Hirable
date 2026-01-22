"use client";

import { FormCardV2 } from "@/componentsV2/FormCardV2";
import { Sidebar } from "@/componentsV2/Sidebar";
import { AddIcon } from "@/icons/AddIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import Image from "next/image";
import { useState } from "react";
import { Form } from "../app/generated/prisma/client";
import { CreateFormCardV2 } from "@/componentsV2/CreateFormCardV2";
import { ButtonV2 } from "@/componentsV2/ButtonV2";
import { MobileNav } from "./MobileNav";

export default function DashboardContentV2({
  userId,
  avatar,
  forms,
}: {
  userId: string;
  avatar: string;
  forms: Form[];
}) {
  const [collapse, setCollapse] = useState(false);
  const [popup, setPopup] = useState<"create" | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      {/* Main content */}
      <div
        className={`flex ${collapse ? "lg:ml-18" : "lg:ml-65"} bg-gray-50 transition-all duration-300 ease-in-out `}
      >
        {/* Container */}
        <div className="max-w-7xl w-full mx-auto">
          <div className="min-h-screen bg-gray-50 py-7 lg:px-10 px-6">
            {/* Header */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <button onClick={() => setMobileNav(true)}>
                  <HomeIcon />
                </button>
                {/* Mobile nav */}
                <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
                <p>Home</p>
              </div>

              {avatar === "" ? (
                <div className="h-9 w-9 rounded-lg border border-gray-300"></div>
              ) : (
                <Image
                  src={avatar}
                  alt="profilePic"
                  width={37}
                  height={37}
                  className="border border-gray-300 rounded-lg"
                />
              )}
            </div>

            {/* Second header */}
            <div className="w-full flex items-center justify-between mt-6">
              <h2 className="text-xl font-medium tracking-tight">Forms</h2>
              <ButtonV2
                variant="primary"
                size="md"
                onClick={() => setPopup("create")}
                className="flex items-center gap-1"
              >
                <AddIcon />
                Create a new form
              </ButtonV2>
            </div>

            {/* Forms */}
            <div className="mt-6 flex flex-wrap items-center gap-7">
              {forms.map((f) => (
                <FormCardV2
                  key={f.id}
                  title={f.title}
                  slug={f.slug}
                  isPublic={f.isPublic}
                  createdAt={f.createdAt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {popup === "create" && (
        <CreateFormCardV2 setPopup={setPopup} userId={userId} />
      )}
    </>
  );
}

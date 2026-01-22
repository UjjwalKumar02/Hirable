"use client";

import { useState } from "react";
import { ButtonV2 } from "./ButtonV2";
import { Sidebar } from "./Sidebar";
import { FormDashboardContentProps } from "@/types";
import Image from "next/image";
import { deleteForm } from "@/actions/deleteForm";
import { togglePublish } from "@/actions/togglePublish";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/helpers/formatDate";
import InputBox from "@/components/InputBox";
import { DashboardIcon } from "@/icons/DashboardIcon";
import { ToggleIcon } from "@/icons/ToggleIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { MobileNav } from "./MobileNav";

export function FormDashboardContentV2({
  title,
  desc,
  isPublic,
  fields,
  submissions,
  avatar,
  slug,
  adminId,
  createdAt,
}: FormDashboardContentProps) {
  const [collapse, setCollapse] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);

  // Toggle publish handler
  const handleTogglePublish = async (isPublic: boolean) => {
    setPublishLoading(true);
    try {
      await togglePublish({ slug, adminId, isPublic });
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setPublishLoading(false);
    }
  };

  // Delete form handler
  const handleDeleteForm = async () => {
    setDeleteLoading(true);
    try {
      await deleteForm({ slug, adminId });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      {/* Main content */}
      <div
        className={`flex ${collapse ? "lg:ml-18" : "lg:ml-65"} bg-gray-50 transition-all duration-300 ease-in-out `}
      >
        {/* Container */}
        <div className="max-w-7xl w-full mx-auto min-h-screen bg-gray-50 py-7 lg:px-10 px-6">
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <button onClick={() => setMobileNav(true)}>
                <DashboardIcon />
              </button>
              {/* Mobile nav */}
              <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
              <p>Dashboard</p>
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
          <div className="w-full flex lg:flex-row flex-col lg:items-center justify-between gap-3 mt-6">
            <h2 className="text-xl font-medium tracking-tight">
              Form &gt; Dashboard
            </h2>

            <div className="flex items-center gap-3">
              <ButtonV2
                variant="primary"
                size="md"
                onClick={() => handleTogglePublish(!isPublic)}
                className="flex items-center gap-1.5"
                loading={publishLoading}
                disabled={publishLoading}
              >
                <ToggleIcon />
                {isPublic ? "Make Private" : "Publish Form"}
              </ButtonV2>

              <ButtonV2
                variant="secondary"
                size="md"
                onClick={handleDeleteForm}
                className="flex items-center gap-1"
                loading={deleteLoading}
                disabled={deleteLoading}
              >
                <DeleteIcon />
                Delete Form
              </ButtonV2>
            </div>
          </div>

          {/* Upper one */}
          <div className="w-full flex lg:flex-row  flex-col justify-between items-center gap-4 mt-5">
            {/* From card */}
            <div className="min-h-46 w-full flex flex-col justify-between gap-7 bg-white border border-gray-200 shadow-xs rounded-lg p-10">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-medium tracking-tight">{title}</h1>
                <p className="text-sm">{formatDate(createdAt)}</p>
              </div>

              <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-3">
                {isPublic ? (
                  <>
                    <p className="text-sky-500 font-medium">
                      Form published at:
                    </p>

                    <InputBox
                      type="text"
                      size="sm"
                      defaultValue={`https://hirable-rho.vercel.app/${slug}/submit`}
                      className="lg:min-w-120"
                      readonly={true}
                    />
                  </>
                ) : (
                  <p className="text-gray-800">{desc}</p>
                )}
              </div>
            </div>

            {/* Response card */}
            <div className="min-h-46 lg:max-w-85 w-full flex flex-col justify-between gap-7 bg-white border border-gray-200 shadow-xs rounded-lg p-10">
              <div className="flex justify-between items-center gap-3">
                <h1 className="text-xl font-medium tracking-tight">
                  Submissions
                </h1>
                {isPublic ? (
                  <p className="text-green-500 font-medium">Published</p>
                ) : (
                  <p className="text-sky-500 font-medium">Draft</p>
                )}
              </div>

              <p className="pl-1 text-3xl font-medium tracking-tight">
                {submissions.length}
              </p>
            </div>
          </div>

          {/* Response table */}
          <div className="mt-4 flex flex-col gap-5 bg-white border border-gray-200 shadow-xs rounded-lg p-10">
            <h1 className="text-xl font-medium tracking-tight pl-1">
              Responses
            </h1>
            {/* X scroll */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-gray-700 border border-gray-200">
                {/* Column names */}
                <thead className="text-gray-700 border-b border-gray-200">
                  <tr className="bg-sky-50">
                    <th className="px-4 py-2 font-medium">#</th>
                    {fields.map((f, index) => (
                      <th key={index} className="px-4 py-2 font-medium">
                        {f.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Answers */}
                <tbody className="text-center">
                  {submissions.length === 0 ? (
                    <tr className="px-4 py-2">
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2">No responses yet!</td>
                      <td className="px-4 py-2"></td>
                    </tr>
                  ) : (
                    submissions.map((s, index) => (
                      <tr key={index} className="px-4 py-2">
                        <td className="px-4 py-2">{index + 1}</td>
                        {s.map((a, i) => (
                          <td className="px-4 py-2" key={i}>
                            {a.answer ?? "-"}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

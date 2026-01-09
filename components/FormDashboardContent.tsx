"use client";

import { FormDashboardContentProps } from "@/types";
import { Navbar } from "./Navbar";
import { Button } from "./Button";
import { useState } from "react";
import { togglePublish } from "@/actions/togglePublish";
import { deleteForm } from "@/actions/deleteForm";
import { useRouter } from "next/navigation";

export function FormDashboardContent({
  title,
  desc,
  isPublic,
  fields,
  submissions,
  avatar,
  slug,
  adminId,
}: FormDashboardContentProps) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col items-center gap-5 shadow-xs">
      <Navbar avatar={avatar} />

      <div className="w-full space-y-6 px-6">
        {/* Form headings card */}
        <div className="px-10 space-y-4">
          <div className="border border-gray-200 rounded-xl flex flex-col gap-5 px-8 py-8">
            <h1 className="text-2xl font-medium tracking-tight pl-1">
              {title}
            </h1>
            <p className="text-gray-800 pl-1">{desc}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                {isPublic ? (
                  <p className="border border-green-500 px-3 py-1 text-sm text-green-500 rounded-xl font-medium">
                    Status : Published
                  </p>
                ) : (
                  <p className="border border-purple-500 px-3 py-1 text-sm text-purple-500 rounded-xl font-medium">
                    Status : Draft
                  </p>
                )}
                <p className="border border-sky-500 px-3 py-1 text-sm text-sky-500 rounded-xl font-medium">
                  Responses : {submissions.length}
                </p>
              </div>

              {!isPublic && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleTogglePublish(!isPublic)}
                  className="w-fit"
                  loading={publishLoading}
                  disabled={publishLoading}
                >
                  {isPublic ? "Make Private" : "Publish"}
                </Button>
              )}
            </div>

            {isPublic && (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p>Link :</p>
                  <p className="bg-sky-50 text-xs px-2 py-1.5 font-medium rounded-xl border border-gray-200">{`http://localhost:3000/${slug}/submit`}</p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleTogglePublish(!isPublic)}
                  className="w-fit"
                  loading={publishLoading}
                  disabled={publishLoading}
                >
                  Make Private
                </Button>
              </div>
            )}
          </div>

          {/* Form responses */}
          <p className="text-center text-xl font-medium tracking-tight">
            Responses
          </p>

          <div className="border border-gray-200">
            {/* X scroll wrapper */}
            <div className="overflow-x-auto">
              <table className="min-w-max w-full border-collapse p-3 text-sm text-gray-700">
                {/* Table header */}
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left  font-medium">#</th>

                    {fields.map((f, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left font-medium "
                      >
                        {f.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table body */}
                <tbody>
                  {submissions.length !== 0 ? (
                    submissions.map((s, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-gray-100 bg-sky-50"
                      >
                        <td className="px-4 py-3 ">{rowIndex + 1}</td>

                        {s.map((a, i) => (
                          <td key={i} className="px-6 py-3  ">
                            {a.answer ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td></td>
                      <td className="text-sky-600"> No responses yet!</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <div className="flex justify-end px-10 mt-10">
          <Button
            variant="primary"
            size="md"
            onClick={handleDeleteForm}
            className="w-fit"
            loading={deleteLoading}
            disabled={deleteLoading}
          >
            Delete Form
          </Button>
        </div>
      </div>
    </div>
  );
}

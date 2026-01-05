"use client";
import { FormCardProps } from "@/types";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/helpers/formatDate";

export function FormCard({ title, slug, isPublic, createdAt }: FormCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-4xl px-7 py-5 flex flex-col gap-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium tracking-tight">{title}</h1>

          {isPublic ? (
            <p className="text-green-500 border border-green-500 px-2 py-0.5 font-medium text-sm rounded-xl">
              Published
            </p>
          ) : (
            <p className="text-sky-500 border border-sky-500 px-2 py-0.5 font-medium text-sm rounded-xl">
              Draft
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push(`/form/${slug}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push(`/form/${slug}/dashboard`)}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <p className="text-gray-700 text-xs">{formatDate(createdAt)}</p>
    </div>
  );
}

"use client";
import { FormCardProps } from "@/types";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/helpers/formatDate";

export function FormCard({ title, slug, isPublic, createdAt }: FormCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-4xl px-7 md:py-5 py-7 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-xs">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium tracking-tight">{title}</h1>

          {isPublic ? (
            <p className="text-green-500 border border-green-500 px-2 py-0.5 font-medium text-sm rounded-xl">
              Published
            </p>
          ) : (
            <p className="text-purple-500 border border-purple-500 px-2 py-0.5 font-medium text-sm rounded-xl">
              Draft
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push(`/${slug}/design`)}
          >
            Design
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push(`/${slug}/dashboard`)}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <p className="text-gray-700 text-xs">{formatDate(createdAt)}</p>
    </div>
  );
}

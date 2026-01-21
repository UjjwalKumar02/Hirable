import { formatDate } from "@/lib/helpers/formatDate";
import { FormCardProps } from "@/types";
import { useRouter } from "next/navigation";
import { ButtonV2 } from "./ButtonV2";

export function FormCardV2({
  title,
  slug,
  isPublic,
  createdAt,
}: FormCardProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-70 bg-white lg:min-w-90 flex flex-col gap-6 rounded-lg border border-gray-200 px-8 py-8 text-gray-700 shadow-xs">
      {/* Header */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-1.5">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        {isPublic ? (
          <p className="text-green-500 font-medium">Published</p>
        ) : (
          <p className="text-sky-500 font-medium">Draft</p>
        )}
      </div>

      <div>
        <p className="text-gray-700 text-sm">{formatDate(createdAt)}</p>
      </div>

      {/* Btns */}
      <div className="w-full flex justify-between gap-4 items-center">
        <ButtonV2
          variant="primary"
          size="md"
          onClick={() => router.push(`/${slug}/design`)}
          className="w-full"
        >
          Design
        </ButtonV2>
        <ButtonV2
          variant="secondary"
          size="md"
          onClick={() => router.push(`/${slug}/dashboard`)}
          className="w-full"
        >
          Dashboard
        </ButtonV2>
      </div>
    </div>
  );
}

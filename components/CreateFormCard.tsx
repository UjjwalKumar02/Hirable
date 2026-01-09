import { createForm } from "@/actions/createForm";
import { CreateFormCardProps } from "@/types";
import { useRef, useState } from "react";
import { Button } from "./Button";
import InputBox from "./InputBox";

export function CreateFormCard({ setPopup, userId }: CreateFormCardProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const coverImageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  // Create form handler
  const handleCreate = async () => {
    if (
      titleRef.current?.value === "" ||
      descRef.current?.value === ""
    ) {
      alert("All fields are required!");
      return;
    }

    if (userId === "" || !userId) {
      return;
    }

    setLoading(true);

    // calling createForm server action
    await createForm({
      title: titleRef.current?.value ?? "",
      description: descRef.current?.value ?? "",
      coverImage: "temp-image",
      adminId: userId,
    });

    setLoading(false);
    setPopup(null);
  };

  return (
    <div className="min-h-screen fixed inset-0 bg-black/15 flex justify-center items-center">
      <div className="bg-white px-10 py-9 flex flex-col gap-3 border border-gray-200 rounded-xl">
        <h1 className="text-2xl font-medium tracking-tight mb-1 text-center">
          New Form
        </h1>
        <InputBox
          reference={titleRef}
          label="Title"
          type="text"
          size="md"
          placeholder="Cooking Hub"
        />
        <InputBox
          reference={descRef}
          label="Description"
          type="text"
          size="md"
          placeholder="cooks..."
        />
        {/* <InputBox
          reference={coverImageRef}
          label="CoverImage"
          type="text"
          size="md"
          placeholder=":)"
        /> */}

        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleCreate}
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            Create
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setPopup(null)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

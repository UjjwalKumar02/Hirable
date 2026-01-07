"use client";

import { useState } from "react";
import { Button } from "./Button";
import DesignForm from "./DesignForm";
import { DesignContentProps, Field } from "@/types";
import { updateForm } from "@/actions/updateForm";
import { useRouter } from "next/navigation";

export function DesignContent({
  formTitle,
  formDesc,
  fields,
  formId,
}: DesignContentProps) {
  const [title, setTitle] = useState<string | null>(formTitle);
  const [desc, setDesc] = useState<string | null>(formDesc);
  const [fieldList, setFieldList] = useState<Field[]>(fields);
  const [currentEditField, setCurrentEditField] = useState<number | null>(null);
  const [currentEditHeading, setCurrentEditHeading] = useState<
    "title" | "desc" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Save form handler
  const handleSaveForm = async () => {
    setLoading(true);
    try {
      await updateForm({
        title: title ?? "",
        desc: desc ?? "",
        fieldList,
        formId,
      });
    } catch (error) {
      console.log(error);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  };

  // New field
  const newField: Field = {
    label: "New",
    type: "text",
    required: false,
  };

  return (
    <div className="min-h-screen mx-auto bg-gray-100 flex flex-col items-center gap-6">
      {/* Title bar */}
      <div className="sticky top-0 w-5xl flex items-center justify-between py-6">
        <h1 className="text-xl font-medium tracking-tight mb-2 text-center">
          Design
        </h1>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setFieldList((prev) => [...prev, newField])}
          disabled={loading}
        >
          Add a new field
        </Button>
      </div>

      {/* DesignForm */}
      <div className="w-xl space-y-5">
        <DesignForm
          title={title ?? ""}
          description={desc ?? ""}
          fieldList={fieldList}
          setFieldList={setFieldList}
          currentEditField={currentEditField}
          setCurrentEditField={setCurrentEditField}
          currentEditHeading={currentEditHeading}
          setCurrentEditHeading={setCurrentEditHeading}
          setTitle={setTitle}
          setDesc={setDesc}
        />

        {/* Save button */}
        <div className="flex items-center justify-end gap-2 mb-40">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSaveForm}
            loading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { updateForm } from "@/actions/updateForm";
import { ButtonV2 } from "@/componentsV2/ButtonV2";
import DesignForm from "@/components/DesignForm";
import { Sidebar } from "@/componentsV2/Sidebar";
import { AddIcon } from "@/icons/AddIcon";
import { DesignIcon } from "@/icons/DesignIcon";
import { SaveIcon } from "@/icons/SaveIcon";
import { Field } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function DesignContentV2({
  avatar,
  formId,
  formTitle,
  formDesc,
  fields,
}: {
  avatar: string;
  formTitle: string;
  formDesc: string;
  fields: Field[];
  formId: string;
}) {
  const [collapse, setCollapse] = useState(false);
  const [title, setTitle] = useState<string | null>(formTitle);
  const [desc, setDesc] = useState<string | null>(formDesc);
  const [fieldList, setFieldList] = useState<Field[]>(fields);
  const [currentEditField, setCurrentEditField] = useState<number | null>(null);
  const [currentEditHeading, setCurrentEditHeading] = useState<
    "title" | "desc" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);

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
    } finally {
      setLoading(false);
    }

    router.push("/dashboard");
  };

  // New field
  const newField: Field = {
    label: "New",
    type: "text",
    required: false,
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
                <DesignIcon />
              </button>
              {/* Mobile nav */}
              <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
              <p>Design</p>
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
              Form &gt; {formTitle}
            </h2>

            <div className="flex items-center gap-3">
              <ButtonV2
                variant="primary"
                size="md"
                onClick={() => setFieldList((prev) => [...prev, newField])}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <AddIcon />
                Add a new field
              </ButtonV2>
              <ButtonV2
                variant="primary"
                size="md"
                onClick={handleSaveForm}
                loading={loading}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <SaveIcon />
                Save
              </ButtonV2>
            </div>
          </div>

          <div className="w-full max-w-146 mx-auto mt-4 mb-4">
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
          </div>
        </div>
      </div>
    </>
  );
}

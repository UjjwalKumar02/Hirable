"use client";

import { FieldAnswer, SubmitFormProps } from "@/types";
import { Button } from "./Button";
import InputBox from "./InputBox";
import TextAreaBox from "./TextAreaBox";
import DropdownInput from "./DropdownInput";
import { useState } from "react";
import { submitForm } from "@/actions/submitForm";
import { useRouter } from "next/navigation";

export default function SubmitForm({
  title,
  desc,
  fieldList,
  formId,
}: SubmitFormProps) {
  const [formData, setFormData] = useState<FieldAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page reload
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      // shows browser validation messages
      form.reportValidity();
      return;
    }

    setLoading(true);
    try {
      submitForm({ formId, answers: formData });
      setDisabled(true);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }

    console.log(formData);
    console.log("Form submitted!");
    router.push(`/done`);
  };

  // Onchange handler
  const handleOnChange = ({
    e,
    id,
    label,
  }: {
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;
    id: string;
    label: string;
  }) => {
    const value = e.target.value;
    setFormData((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        // update existing field
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], answer: value };
        return updated;
      } else {
        // add new field
        return [...prev, { id: id, label: label, answer: value }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-8 pt-11 pb-20">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="md:w-120 bg-white flex flex-col border border-gray-200 rounded-xl"
      >
        <div className="flex flex-col gap-6 md:px-18 px-10 pt-14 pb-9 border-b border-gray-200">
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          <p className="text-gray-800 tracking-tight">{desc}</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-5 md:px-18 px-10 py-8">
          {fieldList.length !== 0 &&
            fieldList.map((f, index) => (
              <div key={index}>
                {f.type === "text" && (
                  <InputBox
                    type={f.type}
                    label={`${f.required ? f.label + "*" : f.label} ${
                      f.wordLimit !== 0 &&
                      f.wordLimit !== undefined &&
                      f.wordLimit !== null
                        ? "(word limit: " + f.wordLimit + ")"
                        : ""
                    }`}
                    size="md"
                    className="w-full"
                    required={f.required}
                    maxLength={f.wordLimit ?? 10000}
                    onChange={(e) =>
                      handleOnChange({ e, label: f.label, id: f.id ?? "" })
                    }
                  />
                )}
                {f.type === "longtext" && (
                  <TextAreaBox
                    label={`${f.required ? f.label + "*" : f.label} ${
                      f.wordLimit !== 0 &&
                      f.wordLimit !== undefined &&
                      f.wordLimit !== null
                        ? "(word limit: " + f.wordLimit + ")"
                        : ""
                    }`}
                    className="w-full px-2 py-2"
                    required={f.required}
                    maxLength={f.wordLimit ?? 10000}
                    onChange={(e) =>
                      handleOnChange({ e, label: f.label, id: f.id ?? "" })
                    }
                  />
                )}
                {(f.type === "email" || f.type === "number") && (
                  <InputBox
                    label={f.required ? f.label + "*" : f.label}
                    type={f.type}
                    size="md"
                    className="w-full"
                    required={f.required}
                    onChange={(e) =>
                      handleOnChange({ e, label: f.label, id: f.id ?? "" })
                    }
                  />
                )}
                {f.type === "dropdown" && (
                  <DropdownInput
                    label={f.required ? f.label + "*" : f.label}
                    options={f.options ?? []}
                    className="w-full"
                    required={f.required}
                    onChange={(e) =>
                      handleOnChange({ e, label: f.label, id: f.id ?? "" })
                    }
                    selectOption={true}
                  />
                )}
              </div>
            ))}
        </div>

        {/* Sumbit button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => console.log("Submitting...")}
          type="submit"
          className="mt-5 md:mx-18 mx-10 mb-14 space-y-8 w-fit"
          loading={loading}
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
      <p className="text-center text-md font-medium tracking-tighter text-gray-800">
        Made with Hirable &hearts;
      </p>
    </div>
  );
}

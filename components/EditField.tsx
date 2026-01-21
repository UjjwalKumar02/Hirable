import { useRef, useState } from "react";
import DropdownInput from "./DropdownInput";
import InputBox from "./InputBox";
import { EditFieldProps, Field, FieldType } from "@/types";
import { ButtonV2 } from "../componentsV2/ButtonV2";

const OPTION_TYPES = ["dropdown"];
const WORDLIMIT_TYPES = ["text", "longtext"];

export default function EditField({
  index,
  fieldData,
  setFieldList,
  setCurrentEditField,
}: EditFieldProps) {
  const labelRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const optionsRef = useRef<HTMLInputElement | null>(null);
  const requiredRef = useRef<HTMLSelectElement | null>(null);
  const wordLimitRef = useRef<HTMLInputElement | null>(null);

  const [fieldtype, setFieldType] = useState<FieldType>(fieldData.type);

  // Converting Options array to string
  const defaultOptionString = fieldData.options?.join(",") ?? "";

  // Save Field handler
  const handleSaveField = () => {
    if (labelRef.current?.value === "") {
      alert("Label is required!");
      return;
    }
    if (OPTION_TYPES.includes(fieldtype) && optionsRef.current?.value === "") {
      alert("Options cant be empty!");
      return;
    }

    const wordLimitValue = Number(wordLimitRef.current?.value);

    const field: Field = {
      label: labelRef.current?.value ?? "",
      type: typeRef.current?.value as FieldType,
      options: OPTION_TYPES.includes(fieldtype)
        ? optionsRef.current?.value.split(",").map((o) => o.trim())
        : [],
      required: requiredRef.current?.value === "true" ? true : false,
      wordLimit:
        wordLimitValue === null ||
        wordLimitValue === undefined ||
        wordLimitValue === 0 ||
        isNaN(wordLimitValue)
          ? null
          : wordLimitValue,
    };

    setFieldList((prev) => prev.map((item, i) => (i === index ? field : item)));
    setCurrentEditField(null);
  };

  return (
    <div className="bg-gray-50 p-3 border border-gray-200 rounded-xl flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        {/* Label */}
        <InputBox
          reference={labelRef}
          size="sm"
          label="Label"
          type="text"
          defaultValue={fieldData.label}
        />

        {/* Type */}
        <DropdownInput
          reference={typeRef}
          label="Type"
          options={["text", "longtext", "number", "dropdown", "email"]}
          onChange={(e) => {
            setFieldType(e.target.value as FieldType);
          }}
          defaultValue={fieldData.type}
        />

        {/* Options */}
        {OPTION_TYPES.includes(fieldtype) && (
          <InputBox
            reference={optionsRef}
            size="sm"
            label="Options"
            type="text"
            placeholder="first, second, third"
            defaultValue={defaultOptionString}
          />
        )}

        {/* Required */}
        <DropdownInput
          reference={requiredRef}
          label="Required"
          options={["true", "false"]}
          defaultValue={String(fieldData.required)}
        />

        {/* Word limit */}
        {WORDLIMIT_TYPES.includes(fieldtype) && (
          <InputBox
            reference={wordLimitRef}
            size="sm"
            label="Word limit (optional)"
            type="text"
            defaultValue={`${
              fieldData.wordLimit === null ||
              fieldData.wordLimit === undefined ||
              fieldData.wordLimit === 0 ||
              isNaN(fieldData.wordLimit)
                ? ""
                : fieldData.wordLimit
            }`}
          />
        )}
      </div>

      <div>
        <ButtonV2
          variant="primary"
          size="md"
          onClick={handleSaveField}
          className="h-fit w-full"
        >
          Save
        </ButtonV2>
      </div>
    </div>
  );
}

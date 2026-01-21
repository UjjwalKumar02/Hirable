import { DesignFormProps } from "@/types";
import DropdownInput from "./DropdownInput";
import EditField from "./EditField";
import InputBox from "./InputBox";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import TextAreaBox from "./TextAreaBox";
import { useRef } from "react";
import { ButtonV2 } from "../componentsV2/ButtonV2";

export default function DesignForm({
  title,
  description,
  fieldList,
  currentEditField,
  setCurrentEditField,
  setFieldList,
  currentEditHeading,
  setCurrentEditHeading,
  setTitle,
  setDesc,
}: DesignFormProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);

  // Save title handler
  const handleSaveTitle = () => {
    if (titleRef.current?.value === "") {
      alert("Title cant be empty");
      return;
    }
    setTitle(titleRef.current?.value ?? "");
    setCurrentEditHeading(null);
  };

  // Save Desc handler
  const handleSaveDesc = () => {
    setDesc(descRef.current?.value ?? "");
    setCurrentEditHeading(null);
  };

  return (
    <div className="bg-white flex flex-col border border-gray-200 rounded-lg py-4">
      {/* Form headings */}
      <div className="border-b border-gray-200">
        <div className="md:px-18 px-9 pt-10 pb-6 space-y-7">
          {/* Title */}
          <div className="flex md:flex-row flex-col gap-3 justify-between md:items-center">
            {currentEditHeading === "title" ? (
              <>
                <InputBox
                  reference={titleRef}
                  size="sm"
                  type="text"
                  defaultValue={title}
                  className="md:min-w-70"
                />

                <ButtonV2
                  variant="primary"
                  size="md"
                  onClick={handleSaveTitle}
                  className="h-fit w-fit"
                >
                  Save
                </ButtonV2>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-medium tracking-tight">{title}</h1>

                <button
                  className="h-fit w-fit border border-gray-300 rounded-full p-1"
                  onClick={() => setCurrentEditHeading("title")}
                >
                  <EditIcon />
                </button>
              </>
            )}
          </div>

          {/* Description */}
          <div className="flex md:flex-row flex-col gap-3 justify-between md:items-center">
            {currentEditHeading === "desc" ? (
              <>
                <InputBox
                  reference={descRef}
                  size="sm"
                  type="text"
                  defaultValue={description}
                  className="md:min-w-70"
                />

                <ButtonV2
                  variant="primary"
                  size="md"
                  onClick={handleSaveDesc}
                  className="h-fit w-fit"
                >
                  Save
                </ButtonV2>
              </>
            ) : (
              <>
                <p className="text-gray-700 tracking-tight">{description}</p>

                <button
                  className="h-fit w-fit border border-gray-300 rounded-full p-1"
                  onClick={() => setCurrentEditHeading("desc")}
                >
                  <EditIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="md:px-16 px-9 py-10 flex flex-col gap-5">
        {fieldList.length === 0 ? (
          <p>This form dont have any fields!</p>
        ) : (
          // If field list is non-empty
          fieldList.map((f, index) => (
            <div key={index}>
              {/* If current field is in editing */}
              {currentEditField === index ? (
                <EditField
                  index={index}
                  fieldData={f}
                  setFieldList={setFieldList}
                  setCurrentEditField={setCurrentEditField}
                />
              ) : (
                <div className="flex md:flex-row flex-col gap-3 justify-between">
                  {/* If type of field is dropdown */}
                  {f.type === "dropdown" && (
                    <DropdownInput
                      label={f.required ? f.label + "*" : f.label}
                      options={f.options ?? []}
                      className="md:min-w-70"
                      disabled={true}
                    />
                  )}
                  {/* If type of field is text */}
                  {f.type === "text" && (
                    <InputBox
                      type="text"
                      size="sm"
                      label={`${f.required ? f.label + "*" : f.label} ${
                        f.wordLimit !== 0 &&
                        f.wordLimit !== undefined &&
                        f.wordLimit !== null
                          ? "(word limit: " + f.wordLimit + ")"
                          : ""
                      }`}
                      readonly={true}
                      className="md:min-w-70 "
                    />
                  )}
                  {/* If type of field is number or email */}
                  {(f.type === "number" || f.type === "email") && (
                    <InputBox
                      type="text"
                      size="sm"
                      label={f.required ? f.label + "*" : f.label}
                      readonly={true}
                      className="md:min-w-70"
                    />
                  )}
                  {/* If type of field is dropdown */}
                  {f.type === "longtext" && (
                    <TextAreaBox
                      label={`${f.required ? f.label + "*" : f.label} ${
                        f.wordLimit !== 0 &&
                        f.wordLimit !== undefined &&
                        f.wordLimit !== null
                          ? "(word limit: " + f.wordLimit + ")"
                          : ""
                      }`}
                      disabled={true}
                      className="md:min-w-70 px-2 py-2"
                    />
                  )}

                  {/* Edit and Delete buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      className="h-fit border border-gray-300 rounded-full p-1"
                      onClick={() => setCurrentEditField(index)}
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="h-fit border border-gray-300 rounded-full p-1"
                      onClick={() =>
                        setFieldList((prev) =>
                          prev.filter((f, i) => i !== index),
                        )
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

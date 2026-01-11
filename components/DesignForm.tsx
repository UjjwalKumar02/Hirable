import { DesignFormProps } from "@/types";
import { Button } from "./Button";
import DropdownInput from "./DropdownInput";
import EditField from "./EditField";
import InputBox from "./InputBox";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import TextAreaBox from "./TextAreaBox";
import { useRef } from "react";

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
    <div className="bg-white flex flex-col border border-gray-200 rounded-xl py-2">
      {/* Form headings */}
      <div className="border-b border-gray-200">
        <div className="md:px-16 px-9 pt-10 pb-6 space-y-6">
          {/* Title */}
          <div className="flex md:flex-row flex-col gap-3 justify-between md:items-center">
            {currentEditHeading === "title" ? (
              <>
                <InputBox
                  reference={titleRef}
                  size="md"
                  type="text"
                  defaultValue={title}
                  className="min-w-70"
                />
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleSaveTitle}
                  className="h-fit w-fit"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentEditHeading("title")}
                  className="h-fit w-fit"
                >
                  <EditIcon />
                </Button>
              </>
            )}
          </div>

          {/* Description */}
          <div className="flex md:flex-row flex-col gap-3 justify-between md:items-center">
            {currentEditHeading === "desc" ? (
              <>
                <InputBox
                  reference={descRef}
                  size="md"
                  type="text"
                  defaultValue={description}
                  className="min-w-70"
                />
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleSaveDesc}
                  className="h-fit w-fit"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-700 tracking-tight">{description}</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentEditHeading("desc")}
                  className="h-fit w-fit"
                >
                  <EditIcon />
                </Button>
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
                      className="min-w-70"
                      disabled={true}
                    />
                  )}
                  {/* If type of field is text */}
                  {f.type === "text" && (
                    <InputBox
                      type="text"
                      size="md"
                      label={`${f.required ? f.label + "*" : f.label} ${
                        f.wordLimit !== 0 &&
                        f.wordLimit !== undefined &&
                        f.wordLimit !== null
                          ? "(word limit: " + f.wordLimit + ")"
                          : ""
                      }`}
                      readonly={true}
                      className="min-w-70"
                    />
                  )}
                  {/* If type of field is number or email */}
                  {(f.type === "number" || f.type === "email") && (
                    <InputBox
                      type="text"
                      size="md"
                      label={f.required ? f.label + "*" : f.label}
                      readonly={true}
                      className="min-w-70"
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
                      className="min-w-70 px-2 py-2"
                    />
                  )}

                  {/* Edit and Delete buttons */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setCurrentEditField(index)}
                      className="h-fit"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setFieldList((prev) =>
                          prev.filter((f, i) => i !== index)
                        )
                      }
                      className="h-fit"
                    >
                      <DeleteIcon />
                    </Button>
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
